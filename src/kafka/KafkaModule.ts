import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KafkaProducerService } from './services/KafkaProducerService';
import { KafkaConsumerService } from './services/KafkaConsumerService';
import { KafkaRequestConsumerService } from './services/KafkaRequestConsumerService';
import { QuotationLookupService } from './services/QuotationLookupService';

@Module({
  imports: [HttpModule],
  providers: [KafkaProducerService, KafkaConsumerService, KafkaRequestConsumerService, QuotationLookupService],
  exports: [KafkaProducerService],
})
export class KafkaModule {}
