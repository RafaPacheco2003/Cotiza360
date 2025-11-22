import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EchoController } from './controllers/EchoController';
import { QuotationLookupService } from 'src/kafka/services/QuotationLookupService';
import { KafkaProducerService } from 'src/kafka/services/KafkaProducerService';

@Module({
  imports: [HttpModule],
  controllers: [EchoController],
  providers: [QuotationLookupService, KafkaProducerService],
})
export class IntegrationModule {}
