import { Module } from '@nestjs/common';
import { DescriptionModule } from './description/infrastructure/DescriptionModule';
import { BranchModule } from './branch/infrastructure/BranchModule';

@Module({
  imports: [DescriptionModule, BranchModule],
})
export class AppModule {}
