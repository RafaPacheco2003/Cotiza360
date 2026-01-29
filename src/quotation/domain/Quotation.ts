import { QuotationBranch } from "./QuotationBranch";
import { QuotationDescription } from "./QuotationDescription";
import { QuotationModel } from "./QuotationModel";
import { QuotationId } from "./valueObject/QuotationId";
import { QuotationYear } from "./valueObject/QuotationYear";

export class Quotation{
    id: QuotationId;
    branch: QuotationBranch;
    model: QuotationModel;
    description: QuotationDescription;
    year: QuotationYear;

    constructor(id: QuotationId, branch: QuotationBranch, model: QuotationModel, description: QuotationDescription, year: QuotationYear){
        this.branch = branch;
        this.model = model;
        this.description = description;
        this.id = id;
        this.year = year;
    }
}