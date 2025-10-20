import { Module } from '@nestjs/common';
import { ControllerBranch } from './controllers/ControllerBranch';
import { ServiceBranch } from '../application/services/ServiceBranch';
import { CreateBranchUseCaseImpl } from '../application/usecases/CreateBranchUseCaseImpl';
import { GetAllBranchUseCaseImpl } from '../application/usecases/GetAllBranchUseCaseImpl';
import { GetByIdBranchUseCaseImpl } from '../application/usecases/GetByIdBranchUseCaseImpl';
import { DeleteBranchUseCaseImpl } from '../application/usecases/DeleteBranchUseCaseImpl';
import { PostgresBranchRepositoryAdapter } from './repositories/PostgresBranchRepositoryAdapter';

@Module({
  controllers: [ControllerBranch],
  providers: [
    // Repositorio
    {
      provide: 'BranchRepositoryPort',
      useClass: PostgresBranchRepositoryAdapter,
    },
    
    // Casos de uso
    {
      provide: 'CreateBranchUseCase',
      useClass: CreateBranchUseCaseImpl,
    },
    {
      provide: 'GetAllBranchUseCase',
      useClass: GetAllBranchUseCaseImpl,
    },
    {
      provide: 'GetByIdBranchUseCase',
      useClass: GetByIdBranchUseCaseImpl,
    },
    {
      provide: 'DeleteBranchUseCase',
      useClass: DeleteBranchUseCaseImpl,
    },
    
    // Servicio
    {
      provide: ServiceBranch,
      useFactory: (create, getAll, getById, del) => 
        new ServiceBranch(create, getAll, getById, del),
      inject: [
        'CreateBranchUseCase',
        'GetAllBranchUseCase', 
        'GetByIdBranchUseCase',
        'DeleteBranchUseCase'
      ],
    },
  ],
})
export class BranchModule {}
