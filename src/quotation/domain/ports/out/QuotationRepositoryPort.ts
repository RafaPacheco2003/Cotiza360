import { Quotation } from "../../Quotation";

export interface QuotationRepositoryPort {
    create(quotation: Quotation): Promise<void>;
    findById(id: string): Promise<Quotation | null>;
    findAll(): Promise<Quotation[]>;
    delete(id: string): Promise<void>;

}