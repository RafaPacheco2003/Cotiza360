export class QuotationRequest {

    branchId: string;
    modelId: string;
    descriptionId: string;
    year: number;

    constructor(branchId: string, modelId: string, descriptionId: string, year: number){
        this.branchId = branchId;
        this.modelId = modelId;
        this.descriptionId = descriptionId;
        this.year = year;
    }
}