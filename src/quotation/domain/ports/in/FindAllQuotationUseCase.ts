import { Quotation } from "../../Quotation";

export interface FindAllQuotationUseCase {
    findAll(): Promise<Quotation[]>;
}