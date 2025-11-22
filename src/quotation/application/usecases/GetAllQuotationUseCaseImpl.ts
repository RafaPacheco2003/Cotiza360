import { Inject } from "@nestjs/common";
import { FindAllQuotationUseCase } from "src/quotation/domain/ports/in/FindAllQuotationUseCase";
import type { QuotationRepositoryPort } from "src/quotation/domain/ports/out/QuotationRepositoryPort";
import  { Quotation } from "src/quotation/domain/Quotation";

export class GetAllQuotationUseCaseImpl implements FindAllQuotationUseCase {

    constructor(
        @Inject('QuotationRepositoryPort')
        private readonly quotationRepository: QuotationRepositoryPort,
    ){

    }
    
    async findAll(): Promise<Quotation[]> {
        return await this.quotationRepository.findAll();
    }
    
}