import { Module } from '@nestjs/common';
import { DescriptionController } from './controller/DescriptionController';
import { ServiceDescription } from '../application/services/ServiceDescription';
import { CreateDescriptionUseCaseImpl } from '../application/usecases/CreateDescriptionUseCaseImpl';
import { DeleteDescriptionUseCaseImpl } from '../application/usecases/DeleteDescriptionUseCaseImpl';
import { PostgresDescriptionRepositoryAdapter } from './repositories/PostgresDescriptionRepositoryAdapter';
import { GetByIdDescriptionUseCaseImpl } from '../application/usecases/GetByIdDescriptionUseCaseImpl';
import { GetAllDescriptionUseCaseImpl } from '../application/usecases/GetAllDescriptionUseCaseImpl';

@Module({
  controllers: [DescriptionController],
  providers: [
    // Repositorio
    {
      provide: 'DescriptionRepositoryPort',
      useClass: PostgresDescriptionRepositoryAdapter,
    },
    
    // Casos de uso
    {
      provide: 'CreateDescriptionUseCase',
      useClass: CreateDescriptionUseCaseImpl,
    },
    {
      provide: 'FindAllDescriptionUseCase',
      useClass: GetAllDescriptionUseCaseImpl,
    },
    {
      provide: 'FindByIdDescriptionUseCase',
      useClass: GetByIdDescriptionUseCaseImpl,
    },
    {
      provide: 'DeleteDescriptionUseCase',
      useClass: DeleteDescriptionUseCaseImpl,
    },
    
    // Servicio
    {
      provide: ServiceDescription,
      useFactory: (create, getAll, getById, del) => 
        new ServiceDescription(create, getAll, getById, del),
      inject: [
        'CreateDescriptionUseCase',
        'FindAllDescriptionUseCase',
        'FindByIdDescriptionUseCase', 
        'DeleteDescriptionUseCase'
      ],
    },
  ],
})
export class DescriptionModule {}
