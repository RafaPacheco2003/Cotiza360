import { Quotation } from "../../Quotation";

export interface FindByIdQuotationUseCase {
    findById(id:string): Promise<Quotation | null>;
}