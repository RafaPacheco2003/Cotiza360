import { CreateQuotationUseCase } from "src/quotation/domain/ports/in/CreateQuotationUseCase";
import { DeleteQuotationUseCase } from "src/quotation/domain/ports/in/DeleteQuotationUseCase";
import { FindAllQuotationUseCase } from "src/quotation/domain/ports/in/FindAllQuotationUseCase";
import { FindByIdQuotationUseCase } from "src/quotation/domain/ports/in/FindByIdQuotationUseCase";
import { Quotation } from "src/quotation/domain/Quotation";

export class ServiceQuotation implements CreateQuotationUseCase, FindByIdQuotationUseCase, FindAllQuotationUseCase, DeleteQuotationUseCase {


    constructor(
        private readonly createQuotationUseCase: CreateQuotationUseCase,
        private readonly findByIdQuotationUseCase: FindByIdQuotationUseCase,
        private readonly findAllQuotationUseCase: FindAllQuotationUseCase,
        private readonly deleteQuotationUseCase: DeleteQuotationUseCase,
    ){}




    create(quotation: Quotation): Promise<void> {
        return this.createQuotationUseCase.create(quotation);
    }
    findById(id: string): Promise<Quotation | null> {
        return this.findByIdQuotationUseCase.findById(id);
    }
    findAll(): Promise<Quotation[]> {
        return this.findAllQuotationUseCase.findAll();
    }
    delete(id: string): Promise<void> {
        return this.deleteQuotationUseCase.delete(id);
    }

}