export interface DeleteBranchUseCase {
  delete(id: string): Promise<void>;
}
