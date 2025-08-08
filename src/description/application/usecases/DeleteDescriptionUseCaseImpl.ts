import { DeleteDescriptionUseCase } from "src/description/domain/port/in/DeleteDescriptionUseCase";
import type { DescriptionRepositoryPort } from "src/description/domain/port/out/DescriptionRepositoryPort";
import { DescriptionId } from "src/description/domain/valueObject/DescriptionId";
import { DescriptionErrors } from "src/description/domain/errors/DescriptionErrors";
import { Inject } from '@nestjs/common';
export class DeleteDescriptionUseCaseImpl implements DeleteDescriptionUseCase {
    constructor(
        @Inject('DescriptionRepositoryPort')
        private descriptionRepository: DescriptionRepositoryPort
    ) {}

    async delete(id: string): Promise<void> {
        const descriptionId = new DescriptionId(id);
    
        const description = await this.descriptionRepository.findById(descriptionId);
        if (!description) {
            throw DescriptionErrors.notFound(id);
        }
        await this.descriptionRepository.delete(descriptionId);
    }

}