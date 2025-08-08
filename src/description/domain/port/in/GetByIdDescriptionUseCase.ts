import { Description } from "src/description/domain/Description";

export interface GetByIdDescriptionUseCase {
    getById(id: string): Promise<Description | null>;
}