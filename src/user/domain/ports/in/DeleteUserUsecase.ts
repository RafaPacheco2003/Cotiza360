export interface DeleteUserUsecase {
    delete(id: string): Promise<void>;
}