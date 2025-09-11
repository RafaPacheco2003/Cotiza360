import { Inject } from '@nestjs/common';
import { Branch } from 'src/branch/domian/Branch';
import { GetAllBranchUseCase } from 'src/branch/domian/port/in/GetAllBranchUseCase';
import type { RepositoryBranchPort } from 'src/branch/domian/port/out/RepositoryBranchPort';

export class GetAllBranchUseCaseImpl implements GetAllBranchUseCase {
  constructor(
    @Inject('BranchRepositoryPort')
    private readonly branchRepository: RepositoryBranchPort,
  ) {}
  async findAll(): Promise<Branch[]> {
    return this.branchRepository.findAll();
  }
}
