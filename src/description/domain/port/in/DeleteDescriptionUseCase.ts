export interface DeleteDescriptionUseCase {
    delete(id: string): Promise<void>;
}
