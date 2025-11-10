export interface DeleteQuotationUseCase {
    delete(id: string): Promise<void>;
}