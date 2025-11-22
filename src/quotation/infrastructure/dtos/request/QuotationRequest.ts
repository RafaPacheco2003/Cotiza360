export class QuotationRequest {

    branchId: string;
    modelId: string;
    descriptionId: string;

    constructor(branchId: string, modelId: string, descriptionId: string){
        this.branchId = branchId;
        this.modelId = modelId;
        this.descriptionId = descriptionId;
    }
}