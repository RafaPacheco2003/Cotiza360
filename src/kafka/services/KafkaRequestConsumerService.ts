import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer, Producer } from 'kafkajs';
import { KAFKA_CONFIG } from '../kafka.config';
import { QuotationLookupService } from './QuotationLookupService';

@Injectable()
export class KafkaRequestConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaRequestConsumerService.name);
  private kafka: Kafka;
  private consumer: Consumer;
  private responseProducer: Producer;

  constructor(
    private readonly quotationLookup: QuotationLookupService
  ) {
    this.kafka = new Kafka({
      clientId: KAFKA_CONFIG.clientId,
      brokers: KAFKA_CONFIG.brokers,
    });
    this.consumer = this.kafka.consumer({ groupId: KAFKA_CONFIG.requestGroupId });
    this.responseProducer = this.kafka.producer();
  }

  async onModuleInit() {
    try {
      await this.consumer.connect();
      await this.responseProducer.connect();
      
      await this.consumer.subscribe({ 
        topic: KAFKA_CONFIG.requestTopic, 
        fromBeginning: false 
      });
      
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          await this.processRequestMessage(message);
        },
      });

      this.logger.log(`✓ Request Consumer iniciado en topic: ${KAFKA_CONFIG.requestTopic}`);
    } catch (error) {
      this.logger.error('Error al iniciar Request Consumer:', error.message);
    }
  }

  /**
   * 📨 Procesa requests entrantes
   */
  private async processRequestMessage(message: any): Promise<void> {
    try {
      const correlationId = message.headers['correlation-id']?.toString();
      const value = message.value?.toString();
      
      if (!value || !correlationId) {
        this.logger.warn('Request inválido sin value o correlation-id');
        return;
      }

      const payload = JSON.parse(value);
      const { branchId, modelId, descriptionId } = payload.data;

      this.logger.log(`
╔════════════════════════════════════════════════════════╗
║ 📥 RECIBIDO DE KAFKA - TOPIC: quotations-request       ║
╠════════════════════════════════════════════════════════╣
║ Correlation ID: ${correlationId}
║
║ PAYLOAD COMPLETO RECIBIDO:
║ ${JSON.stringify(payload, null, 2)}
║
║ DATOS EXTRAÍDOS:
║ • BranchId: ${branchId}
║ • ModelId: ${modelId}
║ • DescriptionId: ${descriptionId}
╚════════════════════════════════════════════════════════╝
      `);

      // Enriquecer datos con relaciones
      const quotationResponse = await this.quotationLookup.buildQuotationResponse(
        branchId,
        modelId,
        descriptionId
      );

      // Enviar response
      await this.sendResponseMessage(quotationResponse, correlationId);
    } catch (error) {
      this.logger.error(`✗ Error procesando request: ${error.message}`);
    }
  }

  /**
   * 📤 Envía response al topic de respuestas
   */
  private async sendResponseMessage(quotationResponse: any, correlationId: string): Promise<void> {
    try {
      this.logger.log(`
╔════════════════════════════════════════════════════════╗
║ 📤 ENVIANDO A KAFKA - TOPIC: quotations-response       ║
╠════════════════════════════════════════════════════════╣
║ Correlation ID: ${correlationId}
║
║ RESPONSE ENVIADO:
║ ${JSON.stringify(quotationResponse, null, 2)}
╚════════════════════════════════════════════════════════╝
      `);

      await this.responseProducer.send({
        topic: KAFKA_CONFIG.responseTopic,
        messages: [
          {
            value: JSON.stringify(quotationResponse),
            headers: {
              'correlation-id': correlationId,
            },
          },
        ],
      });
      this.logger.log(`✅ Response enviado correctamente a Kafka`);
    } catch (error) {
      this.logger.error(`✗ Error enviando response: ${error.message}`);
    }
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    await this.responseProducer.disconnect();
    this.logger.log('Request Consumer desconectado');
  }
}
