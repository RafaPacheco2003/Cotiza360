import { Inject } from "@nestjs/common";
import { DeleteQuotationUseCase } from "src/quotation/domain/ports/in/DeleteQuotationUseCase";
import type { QuotationRepositoryPort } from "src/quotation/domain/ports/out/QuotationRepositoryPort";

export class DeleteQuotationUseCaseImpl implements DeleteQuotationUseCase {

    constructor(
        @Inject('QuotationRepositoryPort')
        private readonly quotationRepository: QuotationRepositoryPort,
    ) {}

    async delete(id: string): Promise<void> {
        await this.quotationRepository.delete(id);
    }

}