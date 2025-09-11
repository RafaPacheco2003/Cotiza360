import { Module } from '@nestjs/common';
import { DescriptionController } from './controller/DescriptionController';
import { ServiceDescription } from '../application/services/ServiceDescription';
import { CreateDescriptionUseCase } from '../domain/port/in/CreateDescriptionUseCase';
import { GetAllDescriptionUseCase } from '../domain/port/in/GetAllDescriptionUseCase';
import { GetByIdDescriptionUseCase } from '../domain/port/in/GetByIdDescriptionUseCase';
import { DeleteDescriptionUseCase } from '../domain/port/in/DeleteDescriptionUseCase';
import { CreateDescriptionUseCaseImpl } from '../application/usecases/CreateDescriptionUseCaseImpl';
import { GetAllDescriptionUseCaseImpl } from '../application/usecases/GetAllDescriptionUseCaseImpl';
import { GetByIdDescriptionUseCaseImpl } from '../application/usecases/GetByIdDescriptionUseCaseImpl';
import { DeleteDescriptionUseCaseImpl } from '../application/usecases/DeleteDescriptionUseCaseImpl';
import { PostgresDescriptionRepositoryAdapter } from './repositories/PostgresDescriptionRepositoryAdapter';

// Tokens para casos de uso y repositorio
const TOKENS = {
  CREATE: 'CreateDescriptionUseCase',
  GET_ALL: 'GetAllDescriptionUseCase',
  GET_BY_ID: 'GetByIdDescriptionUseCase',
  DELETE: 'DeleteDescriptionUseCase',
  REPO: 'DescriptionRepositoryPort',
};

@Module({
  controllers: [DescriptionController],
  providers: [
    // Repositorio
    {
      provide: TOKENS.REPO,
      useClass: PostgresDescriptionRepositoryAdapter,
    },

    // Casos de uso
    { provide: TOKENS.CREATE, useClass: CreateDescriptionUseCaseImpl },
    { provide: TOKENS.GET_ALL, useClass: GetAllDescriptionUseCaseImpl },
    { provide: TOKENS.GET_BY_ID, useClass: GetByIdDescriptionUseCaseImpl },
    { provide: TOKENS.DELETE, useClass: DeleteDescriptionUseCaseImpl },

    // Servicio principal - Versión compacta
    {
      provide: ServiceDescription,
      useFactory: (
        create: CreateDescriptionUseCase,
        getAll: GetAllDescriptionUseCase,
        getById: GetByIdDescriptionUseCase,
        del: DeleteDescriptionUseCase,
      ) => new ServiceDescription(create, getAll, getById, del),
      inject: [TOKENS.CREATE, TOKENS.GET_ALL, TOKENS.GET_BY_ID, TOKENS.DELETE],
    },
  ],
})
export class DescriptionModule {}
