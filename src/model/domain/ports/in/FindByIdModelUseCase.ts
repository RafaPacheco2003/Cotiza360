import { Branch } from '@prisma/client';

export interface FindByIdBranchUseCase {
  findById(id: string): Promise<Branch | null>;
}
