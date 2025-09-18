import { Branch } from '../../Branch';

export interface FindByIdBranchUseCase {
  getById(id: string): Promise<Branch | null>;
}
