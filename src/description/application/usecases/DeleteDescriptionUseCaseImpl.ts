import { DeleteDescriptionUseCase } from "src/description/domain/port/in/DeleteDescriptionUseCase";
import { DescriptionRepositoryPort } from "src/description/domain/port/out/DescriptionRepositoryPort";
import { DescriptionId } from "src/description/domain/valueObject/DescriptionId";
import { DescriptionErrors } from "src/description/domain/errors/DescriptionErrors";

export class DeleteDescriptionUseCaseImpl implements DeleteDescriptionUseCase {
    constructor(private descriptionRepository: DescriptionRepositoryPort) {}

    async delete(id: string): Promise<void> {
        const descriptionId = new DescriptionId(id);
    
        const description = await this.descriptionRepository.findById(descriptionId);
        if (!description) {
            throw DescriptionErrors.notFound(id);
        }
        await this.descriptionRepository.delete(descriptionId);
    }

}