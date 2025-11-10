import { QuotationBranch } from "./QuotationBranch";
import { QuotationDescription } from "./QuotationDescription";
import { QuotationModel } from "./QuotationModel";
import { QuotationId } from "./valueObject/QuotationId";

export class Quotation{
    id: QuotationId;
    branch: QuotationBranch;
    model: QuotationModel;
    description: QuotationDescription;

    constructor(id: QuotationId, branch: QuotationBranch, model: QuotationModel, description: QuotationDescription){
        this.branch = branch;
        this.model = model;
        this.description = description;
        this.id = id;
    }
}