import { Inject } from '@nestjs/common';
import { Branch } from 'src/branch/domian/Branch';
import { FindByIdBranchUseCase } from 'src/branch/domian/ports/in/FindByIdBranchUseCase';
import type { RepositoryBranchPort } from 'src/branch/domian/ports/out/RepositoryBranchPort';
import { BranchId } from 'src/branch/domian/valueObject/BranchId';
import { ErrorsBranch } from 'src/branch/domian/errors/ErrorsBranch';

export class GetByIdBranchUseCaseImpl implements FindByIdBranchUseCase {
  constructor(
    @Inject('BranchRepositoryPort')
    private readonly branchRepository: RepositoryBranchPort,
  ) {}

  async getById(id: string): Promise<Branch | null> {
    const branch = await this.branchRepository.findById(new BranchId(id));

    if (!branch) {
      throw ErrorsBranch.notFound(id);
    }

    return branch;
  }
}
