export class QuotationResponse {
    id: string;
    branch?: {
        id: string;
        name: string;
    };
    model?: {
        id: string;
        name: string;
    };
    description?: {
        id: string;
        name: string;
    };
}