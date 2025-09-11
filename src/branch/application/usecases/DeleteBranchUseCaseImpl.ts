import { Inject } from '@nestjs/common';
import { BranchErrors } from 'src/branch/domian/errors/BranchErrors';
import { DeleteBranchUseCase } from 'src/branch/domian/port/in/DeleteBranchUseCase';
import type { RepositoryBranchPort } from 'src/branch/domian/port/out/RepositoryBranchPort';
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
      throw BranchErrors.notFound(id);
    }

    await this.branchRepository.delete(branchId);
  }
}
