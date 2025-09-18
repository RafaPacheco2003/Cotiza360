import { Inject } from '@nestjs/common';
import { ErrorsBranch } from 'src/branch/domian/errors/ErrorsBranch';
import { DeleteBranchUseCase } from 'src/branch/domian/ports/in/DeleteBranchUseCase';
import type { RepositoryBranchPort } from 'src/branch/domian/ports/out/RepositoryBranchPort';
import { BranchId } from 'src/branch/domian/valueObject/BranchId';

export class DeleteBranchUseCaseImpl implements DeleteBranchUseCase {
  constructor(
    @Inject('BranchRepositoryPort')
    private readonly branchRepository: RepositoryBranchPort,
  ) {}
  async delete(id: string): Promise<void> {
    const branchId = new BranchId(id);
    const branch = await this.branchRepository.findById(branchId);

    if (!branch) {
      throw ErrorsBranch.notFound(id);
    }

    await this.branchRepository.delete(branchId);
  }
}
