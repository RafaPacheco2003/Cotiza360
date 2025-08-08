import { Description } from "src/description/domain/Description";
import { DescriptionErrors } from "src/description/domain/errors/DescriptionErrors";
import { GetByIdDescriptionUseCase } from "src/description/domain/port/in/GetByIdDescriptionUseCase";
import { DescriptionRepositoryPort } from "src/description/domain/port/out/DescriptionRepositoryPort";
import { DescriptionId } from "src/description/domain/valueObject/DescriptionId";

export class GetByIdDescriptionUseCaseImpl implements GetByIdDescriptionUseCase {
    constructor(private descriptionRepository: DescriptionRepositoryPort) { }

    async getById(id: string): Promise<Description | null> {

        const description = await this.descriptionRepository.findById(new DescriptionId(id));

        if (!description) throw DescriptionErrors.notFound(id);
        
        return description;
    }

}