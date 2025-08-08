import { Description } from "src/description/domain/Description";
import { GetAllDescriptionUseCase } from "src/description/domain/port/in/GetAllDescriptionUseCase";
import { DescriptionRepositoryPort } from "src/description/domain/port/out/DescriptionRepositoryPort";

export class GetAllDescriptionUseCaseImpl implements GetAllDescriptionUseCase {
    constructor(private descriptionRepository: DescriptionRepositoryPort) {}

    async run(): Promise<Description[]> {
        return this.descriptionRepository.findAll();
    }

}
