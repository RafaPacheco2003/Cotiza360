import { Module } from '@nestjs/common';
import { DescriptionModule } from './description/infrastructure/DescriptionModule';
import { BranchModule } from './branch/infrastructure/BranchModule';
import { ModelModule } from './model/infrastructure/ModelModule';
import { QuotationModule } from './quotation/infrastructure/QuotationModule';
import { UserModule } from './user/UserModule'

@Module({
  imports: [
    DescriptionModule,
    BranchModule,
    ModelModule,
    UserModule,
    QuotationModule,
  ],
})
export class AppModule {}
