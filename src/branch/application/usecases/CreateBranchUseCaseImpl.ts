import { Inject } from "@nestjs/common";
import { CreateDescriptionUseCase } from "src/description/domain/port/in/CreateDescriptionUseCase";
import type { BranchRepositoryPort } from "src/branch/domian/port/out/BranchRepositoryPort";
import { Branch } from "src/branch/domian/Branch";
import { CreateBranchUseCase } from "src/branch/domian/port/in/CreateBranchUseCase";


export class CreateBranchUseCaseImpl implements CreateBranchUseCase{
    constructor(
        @Inject('BranchRepositoryPort')
        private readonly branchRepository: BranchRepositoryPort
    ) { }
    async create(branch: Branch): Promise<void> {
        await this.branchRepository.create(branch);
    }

}