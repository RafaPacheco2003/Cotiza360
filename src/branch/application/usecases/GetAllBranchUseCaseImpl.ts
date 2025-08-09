import { Inject } from "@nestjs/common";
import { Branch } from "src/branch/domian/Branch";
import { GetAllBranchUseCase } from "src/branch/domian/port/in/GetAllBranchUseCase";
import type { BranchRepositoryPort } from "src/branch/domian/port/out/BranchRepositoryPort";

export class GetAllBranchUseCaseImpl implements GetAllBranchUseCase {
    constructor(
        @Inject('BranchRepositoryPort')
        private readonly branchRepository: BranchRepositoryPort
    ) { }
    async findAll(): Promise<Branch[]> {
        return this.branchRepository.findAll();
    }

    
}