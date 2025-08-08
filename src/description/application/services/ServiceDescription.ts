import { Description } from "src/description/domain/Description";
import { CreateDescriptionUseCase } from "src/description/domain/port/in/CreateDescriptionUseCase";
import { DeleteDescriptionUseCase } from "src/description/domain/port/in/DeleteDescriptionUseCase";
import { GetAllDescriptionUseCase } from "src/description/domain/port/in/GetAllDescriptionUseCase";
import { GetByIdDescriptionUseCase } from "src/description/domain/port/in/GetByIdDescriptionUseCase";

export class ServiceDescription implements CreateDescriptionUseCase, GetByIdDescriptionUseCase, GetAllDescriptionUseCase, DeleteDescriptionUseCase {
    constructor(
        private readonly createDescriptionUseCase: CreateDescriptionUseCase,
        private readonly getAllDescriptionUseCase: GetAllDescriptionUseCase,
        private readonly getByIdDescriptionUseCase: GetByIdDescriptionUseCase,
        private readonly deleteDescriptionUseCase: DeleteDescriptionUseCase
    ) {}

    async create(description: Description): Promise<void> {
        await this.createDescriptionUseCase.create(description);
    }

    async getById(id: string): Promise<Description | null> {
        return this.getByIdDescriptionUseCase.getById(id);
    }

    async getAll(): Promise<Description[]> {
        return this.getAllDescriptionUseCase.getAll();
    }

    async delete(id: string): Promise<void> {
        await this.deleteDescriptionUseCase.delete(id);
    }

}