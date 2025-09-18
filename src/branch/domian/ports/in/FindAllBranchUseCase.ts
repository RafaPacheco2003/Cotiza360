import { Branch } from '../../Branch';

export interface FindAllBranchUseCase {
  findAll(): Promise<Branch[]>;
}
