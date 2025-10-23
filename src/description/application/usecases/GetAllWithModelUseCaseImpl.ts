import { Inject } from "@nestjs/common";
import { Description } from "src/description/domain/Description";
import { FindAllWithModelUseCase } from "src/description/domain/ports/in/FindAllWithModelUseCase";
import type { DescriptionRepositoryPort } from "src/description/domain/ports/out/DescriptionRepositoryPort";

export class GetAllWithModelUseCaseImpl implements FindAllWithModelUseCase {
    constructor(
        @Inject('DescriptionRepositoryPort')
        private readonly descriptionRepository: DescriptionRepositoryPort) {}
    
    
    
    async findAllWithModel(): Promise<Description[]> {
        return this.descriptionRepository.findAllWithModel();
    }
}