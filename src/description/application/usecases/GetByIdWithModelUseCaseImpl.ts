import { Inject } from "@nestjs/common";
import { Description } from "src/description/domain/Description";
import { FindByIdWithModelUseCase } from "src/description/domain/ports/in/FindByIdWithModelUseCase";
import type { DescriptionRepositoryPort } from "src/description/domain/ports/out/DescriptionRepositoryPort";

export class GetByIdWithModelUseCaseImpl implements FindByIdWithModelUseCase {
    
    constructor(
        @Inject('DescriptionRepositoryPort')
        private readonly descriptionRepository: DescriptionRepositoryPort
    ) {}
    
    async findByIdWithModel(id: string): Promise<Description | null> {
        return this.descriptionRepository.findByIdWithModel(id);
    }
}