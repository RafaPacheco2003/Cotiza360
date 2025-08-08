import { Description } from "src/description/domain/Description";

export interface GetAllDescriptionUseCase {
    getAll(): Promise<Description[]>;
}
