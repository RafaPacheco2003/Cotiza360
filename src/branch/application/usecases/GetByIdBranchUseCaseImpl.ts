import { Inject } from "@nestjs/common";
import { Branch } from "src/branch/domian/Branch";
import { GetByIdBranchUseCase } from "src/branch/domian/port/in/GetByIdBranchUseCase";
import type { BranchRepositoryPort } from "src/branch/domian/port/out/BranchRepositoryPort";
import { BranchId } from "src/branch/domian/valueObject/BranchId";

export class GetByIdBranchUseCaseImpl implements GetByIdBranchUseCase {
    constructor(
        @Inject('BranchRepositoryPort')
        private readonly branchRepository: BranchRepositoryPort
    ) { }

    async getById(id: string): Promise<Branch | null> {
        return this.branchRepository.findById(new BranchId(id));
    }
}