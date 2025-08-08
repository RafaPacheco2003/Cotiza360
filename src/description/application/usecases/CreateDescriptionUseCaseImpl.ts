import { Inject } from "@nestjs/common";
import { Description } from "src/description/domain/Description";
import { CreateDescriptionUseCase } from "src/description/domain/port/in/CreateDescriptionUseCase";
import type { DescriptionRepositoryPort } from "src/description/domain/port/out/DescriptionRepositoryPort";

export class CreateDescriptionUseCaseImpl implements CreateDescriptionUseCase {
    constructor(
        @Inject('DescriptionRepositoryPort')
        private readonly descriptionRepository: DescriptionRepositoryPort
    ) { }
    async create(description: Description): Promise<void> {
        await this.descriptionRepository.create(description);
    }

}