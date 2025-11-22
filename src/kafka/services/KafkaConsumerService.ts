import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { KAFKA_CONFIG } from '../kafka.config';
import { QuotationLookupService } from './QuotationLookupService';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private kafka: Kafka;
  private consumer: Consumer;
  private readonly ECHO_ENDPOINT = 'http://host.docker.internal:8000/api/v1/echo/';

  constructor(
    private readonly httpService: HttpService
  ) {
    this.kafka = new Kafka({
      clientId: KAFKA_CONFIG.clientId,
      brokers: KAFKA_CONFIG.brokers,
    });
    this.consumer = this.kafka.consumer({ groupId: KAFKA_CONFIG.groupId });
  }

  async onModuleInit() {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ 
        topic: KAFKA_CONFIG.topic, 
        fromBeginning: false 
      });
      
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          await this.processMessage(message);
        },
      });

      this.logger.log(`Consumer iniciado en topic: ${KAFKA_CONFIG.topic}`);
    } catch (error) {
      this.logger.error('Error al iniciar Consumer:', error.message);
    }
  }

  private async processMessage(message: any): Promise<void> {
    try {
      const value = message.value?.toString();
      if (!value) return;

      const payload = JSON.parse(value);
      
      this.logger.log(`
╔════════════════════════════════════════════════════════╗
║ � KAFKA CONSUMER - MENSAJE RECIBIDO                   ║
║ Topic: ${KAFKA_CONFIG.topic}
╠════════════════════════════════════════════════════════╣
║ RESPONSE MAPEADO RECIBIDO:
║ ${JSON.stringify(payload, null, 2)}
╚════════════════════════════════════════════════════════╝
      `);

      // 📤 ENVIAR POST a la API externa en localhost:8000
      const response = await firstValueFrom(
        this.httpService.post(this.ECHO_ENDPOINT, payload)
      );

      this.logger.log(`
╔════════════════════════════════════════════════════════╗
║ ✅ POST ENVIADO A: ${this.ECHO_ENDPOINT}
║ Status: ${response.status}
╚════════════════════════════════════════════════════════╝
      `);
    } catch (error) {
      this.logger.error(`✗ Error procesando mensaje Kafka: ${error.message}`);
    }
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    this.logger.log('Consumer desconectado');
  }
}
