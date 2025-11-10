import { Transport, KafkaOptions } from '@nestjs/microservices';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'cotiza360-client',
      brokers: ['localhost:9092'], 
    },
    consumer: {
      groupId: 'cotiza360-group',
    },
  },
};
