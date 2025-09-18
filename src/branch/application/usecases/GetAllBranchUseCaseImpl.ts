import { Inject } from '@nestjs/common';
import { Branch } from 'src/branch/domian/Branch';
import { FindAllBranchUseCase } from 'src/branch/domian/ports/in/FindAllBranchUseCase';
import type { RepositoryBranchPort } from 'src/branch/domian/ports/out/RepositoryBranchPort';

export class GetAllBranchUseCaseImpl implements FindAllBranchUseCase {
  constructor(
    @Inject('BranchRepositoryPort')
    private readonly branchRepository: RepositoryBranchPort,
  ) {}
  async findAll(): Promise<Branch[]> {
    return this.branchRepository.findAll();
  }
}
