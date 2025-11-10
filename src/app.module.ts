import { Module } from '@nestjs/common';
import { DescriptionModule } from './description/infrastructure/DescriptionModule';
import { BranchModule } from './branch/infrastructure/BranchModule';
import { ModelModule } from './model/infrastructure/ModelModule';
import { UserModule } from './user/UserModule';

@Module({
  imports: [DescriptionModule, BranchModule, ModelModule, UserModule],
})
export class AppModule {}
