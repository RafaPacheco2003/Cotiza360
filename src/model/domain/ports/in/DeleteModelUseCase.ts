export interface DeleteModelUseCase {
  delete(id: string): Promise<void>;
}
