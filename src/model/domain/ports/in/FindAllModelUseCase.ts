import { Branch } from '@prisma/client';

export interface FindAllBranchUseCase {
  findAll(): Promise<Branch[]>;
}
