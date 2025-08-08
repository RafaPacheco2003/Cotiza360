import { Description } from "src/description/domain/Description";
import { GetAllDescriptionUseCase } from "src/description/domain/port/in/GetAllDescriptionUseCase";
import type { DescriptionRepositoryPort } from "src/description/domain/port/out/DescriptionRepositoryPort";
import { Inject } from '@nestjs/common';

export class GetAllDescriptionUseCaseImpl implements GetAllDescriptionUseCase {
    constructor(
        @Inject('DescriptionRepositoryPort')
        private readonly descriptionRepository: DescriptionRepositoryPort
    ) {}

    async getAll(): Promise<Description[]> {
        return this.descriptionRepository.findAll();
    }

}
