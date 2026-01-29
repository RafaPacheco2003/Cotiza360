import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";
import { KAFKA_CONFIG } from "src/quotation/infrastructure/config/kafka.config";
import { QuotationCreatedEvent } from "src/quotation/domain/event/QuotationCreatedEvent";
import { QuotationEventPublisher } from "src/quotation/domain/ports/out/QuotationEventPublisher";

@Injectable()
export class KafkaQuotationEventPublisher
  implements QuotationEventPublisher, OnModuleInit, OnModuleDestroy {


  private readonly logger = new Logger(KafkaQuotationEventPublisher.name);
  private producer: Producer;


  async publishQuotationCreatedEvent(event: QuotationCreatedEvent): Promise<void> {
      await this.producer.send({
      topic: KAFKA_CONFIG.topic,
      messages: [
        {
          key: event.quotationId,
          value: JSON.stringify(event),
        },
      ],
    });
  }

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: KAFKA_CONFIG.clientId,
      brokers: KAFKA_CONFIG.brokers,
    });

    this.producer = kafka.producer();
    await this.producer.connect();

    this.logger.log('Kafka producer connected');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

}
