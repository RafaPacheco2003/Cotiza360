import { CreateQuotationUseCase } from "src/quotation/domain/ports/in/CreateQuotationUseCase";
import { Quotation } from "src/quotation/domain/Quotation";
import { Inject } from "@nestjs/common";
import type { QuotationRepositoryPort } from "src/quotation/domain/ports/out/QuotationRepositoryPort";
import type { QuotationEventPublisher } from "src/quotation/domain/ports/out/QuotationEventPublisher";
import { QuotationCreatedEvent } from "src/quotation/domain/event/QuotationCreatedEvent";

export class CreateQuotationUseCaseImpl implements CreateQuotationUseCase {


    constructor(
        @Inject('QuotationRepositoryPort')
        private readonly quotationRepository: QuotationRepositoryPort,

         @Inject('QuotationEventPublisher')
        private readonly quotationEventPublisher: QuotationEventPublisher,
    ) {}

    async create(quotation: Quotation): Promise<void> {
        await this.quotationRepository.create(quotation);

        await this.quotationEventPublisher.publishQuotationCreatedEvent(
            new QuotationCreatedEvent(quotation.id.value)
        );
    }

}