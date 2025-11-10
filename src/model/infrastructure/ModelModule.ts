import { Module } from '@nestjs/common';
import { ControllerModel } from './controllers/ControllerModel';
import { PostgresModelRepositoryAdapter } from './repositories/PostgresModelRepositoryAdapter';
import { ServiceModel } from '../application/services/ServiceModel';
import { CreateModelUseCaseImpl } from '../application/usecases/CreateModelUseCaseImpl';
import { GetAllModelUseCaseImpl } from '../application/usecases/GetAllModelUseCaseImpl';
import { GetByIdModelUseCaseImpl } from '../application/usecases/GetByIdModelUseCaseImpl';
import { DeleteModelUseCaseImpl } from '../application/usecases/DeleteModelUseCaseImpl';
import { GetAllWithBranchUseCaseImpl } from '../application/usecases/GetAllWithBranchUseCaseImpl';

@Module({
  controllers: [ControllerModel],
  providers: [
   
    PostgresModelRepositoryAdapter,
    
    
    {
      provide: 'ModelRepositoryPort',
      useClass: PostgresModelRepositoryAdapter,
    },
    {
      provide: 'CreateModelUseCase',
      useClass: CreateModelUseCaseImpl,
    },
    {
      provide: 'GetAllModelUseCase',
      useClass: GetAllModelUseCaseImpl,
    },
    {
      provide: 'GetByIdModelUseCase',
      useClass: GetByIdModelUseCaseImpl,
    },
    {
      provide: 'DeleteModelUseCase',
      useClass: DeleteModelUseCaseImpl,
    },
    {
      provide: 'FindAllWithBranchUseCase',
      useClass: GetAllWithBranchUseCaseImpl,
    },
    {
      provide: 'FindByIdWithBranchUseCase',
      useClass: GetByIdModelUseCaseImpl,
    },
    {
      provide: ServiceModel,
      useFactory: (create, getAll, getById, del, findByIdWithBranch, findAllWithBranch) => 
        new ServiceModel(create, getAll, getById, del, findByIdWithBranch, findAllWithBranch),
      inject: [
        'CreateModelUseCase',
        'GetAllModelUseCase',
        'GetByIdModelUseCase',
        'DeleteModelUseCase',
        'FindByIdWithBranchUseCase',
        'FindAllWithBranchUseCase'
      ],
    },
  ],
})
export class ModelModule {}