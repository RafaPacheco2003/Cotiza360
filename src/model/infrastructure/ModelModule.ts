import { Module } from '@nestjs/common';
import { ControllerModel } from './controllers/ControllerModel';
import { PostgresModelRepositoryAdapter } from './repositories/PostgresModelRepositoryAdapter';
import { ServiceModel } from '../application/services/ServiceModel';
import { CreateModelUseCaseImpl } from '../application/usecases/CreateModelUseCaseImpl';
import { GetAllModelUseCaseImpl } from '../application/usecases/GetAllModelUseCaseImpl';
import { GetByIdModelUseCaseImpl } from '../application/usecases/GetByIdModelUseCaseImpl';
import { DeleteModelUseCaseImpl } from '../application/usecases/DeleteModelUseCaseImpl';

@Module({
  controllers: [ControllerModel],
  providers: [
    // 🎯 Agregar repository como provider directo
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
      provide: ServiceModel,
      useFactory: (create, getAll, getById, del) => 
        new ServiceModel(create, getAll, getById, del),
      inject: [
        'CreateModelUseCase',
        'GetAllModelUseCase',
        'GetByIdModelUseCase',
        'DeleteModelUseCase'
      ],
    },
  ],
})
export class ModelModule {}