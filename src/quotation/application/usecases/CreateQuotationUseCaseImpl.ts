import { CreateQuotationUseCase } from "src/quotation/domain/ports/in/CreateQuotationUseCase";
import { Quotation } from "src/quotation/domain/Quotation";
import { Inject } from "@nestjs/common";
import type { QuotationRepositoryPort } from "src/quotation/domain/ports/out/QuotationRepositoryPort";

export class CreateQuotationUseCaseImpl implements CreateQuotationUseCase {


    constructor(
        @Inject('QuotationRepositoryPort')
        private readonly quotationRepository: QuotationRepositoryPort,
    ) {}

    async create(quotation: Quotation): Promise<void> {
        await this.quotationRepository.create(quotation);
    }

}