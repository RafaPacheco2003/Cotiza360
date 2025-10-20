import { Module } from '@nestjs/common';
import { DescriptionModule } from './description/infrastructure/DescriptionModule';
import { BranchModule } from './branch/infrastructure/BranchModule';
import { ModelModule } from './model/infrastructure/ModelModule';

@Module({
  imports: [DescriptionModule, BranchModule, ModelModule],
})
export class AppModule {}
