import { Inject } from "@nestjs/common";
import { DeleteBranchUseCase } from "src/branch/domian/port/in/DeleteBranchUseCase";
import type { BranchRepositoryPort } from "src/branch/domian/port/out/BranchRepositoryPort";
import { BranchId } from "src/branch/domian/valueObject/BranchId";
import { DescriptionId } from "src/description/domain/valueObject/DescriptionId";

export class DeleteBranchUseCaseImpl implements DeleteBranchUseCase {
    constructor(
        @Inject('BranchRepositoryPort')
        private readonly branchRepository: BranchRepositoryPort
    ) { }
    async delete(id: string): Promise<void> {
        await this.branchRepository.delete(new BranchId(id));
    }

}