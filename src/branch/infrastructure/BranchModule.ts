import { Module } from '@nestjs/common';
import { ControllerBranch } from './controllers/ControllerBranch';
import { ServiceBranch } from '../application/services/ServiceBranch';
import { CreateBranchUseCaseImpl } from '../application/usecases/CreateBranchUseCaseImpl';
import { GetAllBranchUseCaseImpl } from '../application/usecases/GetAllBranchUseCaseImpl';
import { GetByIdBranchUseCaseImpl } from '../application/usecases/GetByIdBranchUseCaseImpl';
import { DeleteBranchUseCaseImpl } from '../application/usecases/DeleteBranchUseCaseImpl';
import { PostgresBranchRepositoryAdapter } from './repositories/PostgresBranchRepositoryAdapter';
import { CreateBranchUseCase } from '../domian/ports/in/CreateBranchUseCase';
import { FindAllBranchUseCase } from '../domian/ports/in/FindAllBranchUseCase';
import { FindByIdBranchUseCase } from '../domian/ports/in/FindByIdBranchUseCase';
import { DeleteBranchUseCase } from '../domian/ports/in/DeleteBranchUseCase';

// Tokens para casos de uso y repositorio
const TOKENS = {
  CREATE: 'CreateBranchUseCase',
  GET_ALL: 'GetAllBranchUseCase',
  GET_BY_ID: 'GetByIdBranchUseCase',
  DELETE: 'DeleteBranchUseCase',
  REPO: 'BranchRepositoryPort',
};

@Module({
  controllers: [ControllerBranch],
  providers: [
    // Repositorio
    {
      provide: TOKENS.REPO,
      useClass: PostgresBranchRepositoryAdapter,
    },

    // Casos de uso
    { provide: TOKENS.CREATE, useClass: CreateBranchUseCaseImpl },
    { provide: TOKENS.GET_ALL, useClass: GetAllBranchUseCaseImpl },
    { provide: TOKENS.GET_BY_ID, useClass: GetByIdBranchUseCaseImpl },
    { provide: TOKENS.DELETE, useClass: DeleteBranchUseCaseImpl },

    // Servicio principal - Versión compacta
    {
      provide: ServiceBranch,
      useFactory: (
        create: CreateBranchUseCase,
        getAll: FindAllBranchUseCase,
        getById: FindByIdBranchUseCase,
        del: DeleteBranchUseCase,
      ) => new ServiceBranch(create, getAll, getById, del),
      inject: [TOKENS.CREATE, TOKENS.GET_ALL, TOKENS.GET_BY_ID, TOKENS.DELETE],
    },
  ],
})
export class BranchModule {}
