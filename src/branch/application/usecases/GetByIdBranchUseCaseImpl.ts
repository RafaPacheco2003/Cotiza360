import { Inject } from '@nestjs/common';
import { Branch } from 'src/branch/domian/Branch';
import { GetByIdBranchUseCase } from 'src/branch/domian/port/in/GetByIdBranchUseCase';
import type { RepositoryBranchPort } from 'src/branch/domian/port/out/RepositoryBranchPort';
import { BranchId } from 'src/branch/domian/valueObject/BranchId';
import { BranchErrors } from 'src/branch/domian/errors/BranchErrors';

export class GetByIdBranchUseCaseImpl implements GetByIdBranchUseCase {
  constructor(
    @Inject('BranchRepositoryPort')
    private readonly branchRepository: RepositoryBranchPort,
  ) {}

  async getById(id: string): Promise<Branch | null> {
    const branch = await this.branchRepository.findById(new BranchId(id));

    if (!branch) {
      throw BranchErrors.notFound(id);
    }

    return branch;
  }
}
