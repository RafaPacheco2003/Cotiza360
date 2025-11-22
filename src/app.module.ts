import { Module } from '@nestjs/common';
import { DescriptionModule } from './description/infrastructure/DescriptionModule';
import { BranchModule } from './branch/infrastructure/BranchModule';
import { ModelModule } from './model/infrastructure/ModelModule';
import { QuotationModule } from './quotation/infrastructure/QuotationModule';
import { UserModule } from './user/UserModule'
import { KafkaModule } from './kafka/KafkaModule';
import { IntegrationModule } from './integration/IntegrationModule';

@Module({
  imports: [
    DescriptionModule,
    BranchModule,
    ModelModule,
    UserModule,
    QuotationModule,
    KafkaModule,
    IntegrationModule,
  ],
})
export class AppModule {}
