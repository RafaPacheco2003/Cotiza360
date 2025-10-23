import { Inject } from "@nestjs/common";
import { Model } from "src/model/domain/Model";
import { FindByIdWithBranch } from "src/model/domain/ports/in/FindByIdWithBranch";
import type { ModelRepositoryPort } from "src/model/domain/ports/out/ModelRepositoryPort";


export class GetByIdModelUseCaseImpl implements FindByIdWithBranch {

    constructor(
        @Inject('ModelRepositoryPort')
        private readonly modelRepository: ModelRepositoryPort,
    ) {}


    async findByIdWithBranch(id: string): Promise<Model | null> {
        return this.modelRepository.findByIdWithBranch(id);
    }

    
}