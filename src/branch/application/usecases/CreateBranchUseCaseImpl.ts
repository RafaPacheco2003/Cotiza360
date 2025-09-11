import { Inject } from '@nestjs/common';
import type { RepositoryBranchPort } from 'src/branch/domian/port/out/RepositoryBranchPort';
import { Branch } from 'src/branch/domian/Branch';
import { CreateBranchUseCase } from 'src/branch/domian/port/in/CreateBranchUseCase';

export class CreateBranchUseCaseImpl implements CreateBranchUseCase {
  constructor(
    @Inject('BranchRepositoryPort')
    private readonly branchRepository: RepositoryBranchPort,
  ) {}
  async create(branch: Branch): Promise<void> {
    await this.branchRepository.create(branch);
  }
}
