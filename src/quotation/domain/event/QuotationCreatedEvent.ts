export class QuotationCreatedEvent {
    constructor(
        public readonly quotationId: string, 
        public readonly occurredAt: Date = new Date()
    ) {}
}