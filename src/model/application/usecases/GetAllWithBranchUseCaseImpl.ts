import { Inject } from "@nestjs/common";
import { Model } from "src/model/domain/Model";
import { FindAllWithBranchUseCase } from "src/model/domain/ports/in/FindAllWithBranchUseCase";
import type { ModelRepositoryPort } from "src/model/domain/ports/out/ModelRepositoryPort";

export class GetAllWithBranchUseCaseImpl implements FindAllWithBranchUseCase {

    constructor(
        @Inject('ModelRepositoryPort')
        private readonly modelRepository: ModelRepositoryPort,
    ) {}


    findAllWithBranch(): Promise<Model[]> {
        return this.modelRepository.findAllWithBranch();
    }
}