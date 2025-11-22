import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';
import { KAFKA_CONFIG } from '../kafka.config';
import { QuotationResponse } from 'src/quotation/infrastructure/dtos/response/QuotationResponse';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducerService.name);
  private kafka: Kafka;
  private producer: Producer;
  private responseConsumer: Consumer;
  
  // Map para almacenar promesas pendientes: correlationId -> resolve/reject
  private pendingRequests = new Map<string, {
    resolve: (value: QuotationResponse) => void;
    reject: (error: Error) => void;
    timeout: NodeJS.Timeout;
  }>();

  constructor() {
    this.kafka = new Kafka({
      clientId: KAFKA_CONFIG.clientId,
      brokers: KAFKA_CONFIG.brokers,
    });
    this.producer = this.kafka.producer();
    this.responseConsumer = this.kafka.consumer({ groupId: KAFKA_CONFIG.responseGroupId });
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      this.logger.log('✓ Producer conectado');
      
      // Inicializar consumer para respuestas
      await this.responseConsumer.connect();
      await this.responseConsumer.subscribe({ topic: KAFKA_CONFIG.responseTopic });
      
      await this.responseConsumer.run({
        eachMessage: async ({ message }) => {
          await this.handleResponseMessage(message);
        },
      });
      
      this.logger.log(`✓ Response Consumer iniciado en topic: ${KAFKA_CONFIG.responseTopic}`);
    } catch (error) {
      this.logger.error('Error al inicializar Producer:', error.message);
    }
  }

  /**
   * 🔄 REQUEST-REPLY: Envía request y espera response
   */
  async sendRequestAndWaitResponse(
    data: any,
    timeoutMs: number = 30000
  ): Promise<QuotationResponse> {
    const correlationId = uuidv4();
    
    return new Promise((resolve, reject) => {
      // Crear timeout
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(correlationId);
        reject(new Error(`Timeout esperando response para correlationId: ${correlationId}`));
      }, timeoutMs);

      // Guardar promesa pendiente
      this.pendingRequests.set(correlationId, { resolve, reject, timeout });

      // Enviar request con correlationId
      this.sendRequestMessage(data, correlationId).catch((error) => {
        clearTimeout(timeout);
        this.pendingRequests.delete(correlationId);
        reject(error);
      });
    });
  }

  /**
   * 📤 Envía mensaje REQUEST a Kafka
   */
  private async sendRequestMessage(data: any, correlationId: string): Promise<void> {
    try {
      const messagePayload = { data, correlationId };
      
      this.logger.log(`
╔════════════════════════════════════════════════════════╗
║ 📤 ENVIANDO A KAFKA - TOPIC: quotations-request        ║
╠════════════════════════════════════════════════════════╣
║ Correlation ID: ${correlationId}
║ 
║ PAYLOAD COMPLETO:
║ ${JSON.stringify(messagePayload, null, 2)}
╚════════════════════════════════════════════════════════╝
      `);

      await this.producer.send({
        topic: KAFKA_CONFIG.requestTopic,
        messages: [
          {
            value: JSON.stringify(messagePayload),
            headers: {
              'correlation-id': correlationId,
            },
          },
        ],
      });
      this.logger.log(`✅ Request enviado correctamente a Kafka`);
    } catch (error) {
      this.logger.error(`✗ Error enviando request: ${error.message}`);
      throw error;
    }
  }

  /**
   * 📥 Procesa mensajes RESPONSE
   */
  private async handleResponseMessage(message: any): Promise<void> {
    try {
      const correlationId = message.headers['correlation-id']?.toString();
      const response = JSON.parse(message.value?.toString());

      if (!correlationId) {
        this.logger.warn('Response sin correlation-id');
        return;
      }

      const pending = this.pendingRequests.get(correlationId);
      if (!pending) {
        this.logger.warn(`Response para correlationId desconocido: ${correlationId}`);
        return;
      }

      this.logger.log(`
╔════════════════════════════════════════════════════════╗
║ 📥 RECIBIDO DE KAFKA - TOPIC: quotations-response      ║
╠════════════════════════════════════════════════════════╣
║ Correlation ID: ${correlationId}
║
║ RESPONSE RECIBIDO:
║ ${JSON.stringify(response, null, 2)}
║
║ ✅ Resolviendo promesa pendiente para cliente
╚════════════════════════════════════════════════════════╝
      `);
      
      clearTimeout(pending.timeout);
      this.pendingRequests.delete(correlationId);
      
      pending.resolve(response);
    } catch (error) {
      this.logger.error(`✗ Error procesando response: ${error.message}`);
    }
  }

  /**
   * 📨 (LEGACY) Envía mensaje simple al topic antiguo
   */
  async sendMessage(data: any): Promise<void> {
    try {
      await this.producer.send({
        topic: KAFKA_CONFIG.topic,
        messages: [{ value: JSON.stringify({ data }) }],
      });
      this.logger.log(`✓ Mensaje enviado a topic: ${KAFKA_CONFIG.topic}`);
    } catch (error) {
      this.logger.error('Error al enviar mensaje:', error.message);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.responseConsumer.disconnect();
    this.logger.log('Producer y Response Consumer desconectados');
  }
}
