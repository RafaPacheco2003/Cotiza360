import { Module } from '@nestjs/common';
import { ControllerQuotation } from './controllers/ControllerQuotation';
import { PostgresQuotationRepositoryAdapter } from './repositories/PostgresQuotationRepositoryAdapter';
import { ServiceQuotation } from '../application/services/ServiceQuotation';
import { CreateQuotationUseCaseImpl } from '../application/usecases/CreateQuotationUseCaseImpl';
import { GetAllQuotationUseCaseImpl } from '../application/usecases/GetAllQuotationUseCaseImpl';
import { GetByIdQuotationUseCaseImpl } from '../application/usecases/GetByIdQuotationUseCaseImpl';
import { DeleteQuotationUseCaseImpl } from '../application/usecases/DeleteQuotationUseCaseImpl';

@Module({
  controllers: [ControllerQuotation],
  providers: [
    PostgresQuotationRepositoryAdapter,
    {
      provide: 'QuotationRepositoryPort',
      useClass: PostgresQuotationRepositoryAdapter,
    },
    {
      provide: 'CreateQuotationUseCase',
      useClass: CreateQuotationUseCaseImpl,
    },
    {
      provide: 'FindAllQuotationUseCase',
      useClass: GetAllQuotationUseCaseImpl,
    },
    {
      provide: 'FindByIdQuotationUseCase',
      useClass: GetByIdQuotationUseCaseImpl,
    },
    {
      provide: 'DeleteQuotationUseCase',
      useClass: DeleteQuotationUseCaseImpl,
    },
    {
      provide: ServiceQuotation,
      useFactory: (create, findById, findAll, del) =>
        new ServiceQuotation(create, findById, findAll, del),
      inject: [
        'CreateQuotationUseCase',
        'FindByIdQuotationUseCase',
        'FindAllQuotationUseCase',
        'DeleteQuotationUseCase',
      ],
    },
  ],
})
export class QuotationModule {}
