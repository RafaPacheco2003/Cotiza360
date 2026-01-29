import { QuotationCreatedEvent } from "../../event/QuotationCreatedEvent";

export interface QuotationEventPublisher {

    publishQuotationCreatedEvent(event: QuotationCreatedEvent): Promise<void>;
}