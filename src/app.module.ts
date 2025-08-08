import { Module } from '@nestjs/common';
import { DescriptionController } from './description/infrastructure/controller/DescriptionController';
import { ServiceDescription } from './description/application/services/ServiceDescription';
import { CreateDescriptionUseCase } from './description/domain/port/in/CreateDescriptionUseCase';
import { GetAllDescriptionUseCase } from './description/domain/port/in/GetAllDescriptionUseCase';
import { GetByIdDescriptionUseCase } from './description/domain/port/in/GetByIdDescriptionUseCase';
import { DeleteDescriptionUseCase } from './description/domain/port/in/DeleteDescriptionUseCase';
import { CreateDescriptionUseCaseImpl } from './description/application/usecases/CreateDescriptionUseCaseImpl';
import { GetAllDescriptionUseCaseImpl } from './description/application/usecases/GetAllDescriptionUseCaseImpl';
import { GetByIdDescriptionUseCaseImpl } from './description/application/usecases/GetByIdDescriptionUseCaseImpl';
import { DeleteDescriptionUseCaseImpl } from './description/application/usecases/DeleteDescriptionUseCaseImpl';
import { PostgresDescriptionRepositoryAdapter } from './description/infrastructure/repositories/PostgresDescriptionRepositoryAdapter';

const descriptionProviders = [
  { provide: 'DescriptionRepositoryPort', useClass: PostgresDescriptionRepositoryAdapter },
  { provide: 'CreateDescriptionUseCase', useClass: CreateDescriptionUseCaseImpl },
  { provide: 'GetAllDescriptionUseCase', useClass: GetAllDescriptionUseCaseImpl },
  { provide: 'GetByIdDescriptionUseCase', useClass: GetByIdDescriptionUseCaseImpl },
  { provide: 'DeleteDescriptionUseCase', useClass: DeleteDescriptionUseCaseImpl },
  {
    provide: ServiceDescription,
    useFactory: (
      create: CreateDescriptionUseCase,
      getAll: GetAllDescriptionUseCase,
      getById: GetByIdDescriptionUseCase,
      del: DeleteDescriptionUseCase
    ) => new ServiceDescription(create, getAll, getById, del),
    inject: [
      'CreateDescriptionUseCase',
      'GetAllDescriptionUseCase',
      'GetByIdDescriptionUseCase',
      'DeleteDescriptionUseCase',
    ],
  },
];

@Module({
  controllers: [DescriptionController],
  providers: [...descriptionProviders],
})
export class AppModule {}