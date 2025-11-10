import { Quotation } from "../../Quotation";

export interface CreateQuotationUseCase {
    create(quotation: Quotation): Promise<void>;
}