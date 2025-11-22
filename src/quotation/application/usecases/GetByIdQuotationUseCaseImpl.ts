import { Inject } from "@nestjs/common";
import { FindByIdQuotationUseCase } from "src/quotation/domain/ports/in/FindByIdQuotationUseCase";
import type { QuotationRepositoryPort } from "src/quotation/domain/ports/out/QuotationRepositoryPort";
import { Quotation } from "src/quotation/domain/Quotation";

export class GetByIdQuotationUseCaseImpl implements FindByIdQuotationUseCase {
    constructor(
        @Inject('QuotationRepositoryPort')
        private readonly quotationRepository: QuotationRepositoryPort,
    ) {}
   
    async findById(id: string): Promise<Quotation | null> {
        return await this.quotationRepository.findById(id);
    }

}