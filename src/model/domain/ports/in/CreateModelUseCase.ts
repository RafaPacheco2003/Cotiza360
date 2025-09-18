import { Branch } from '@prisma/client';

export interface CreateBranchUseCase {
  create(branch: Branch): Promise<void>;
}
