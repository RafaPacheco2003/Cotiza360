import { Description } from "../../Description";
import { DescriptionId } from "../../valueObject/DescriptionId";

export interface DescriptionRepositoryPort {
    create(description: Description): Promise<void>;
    findAll(): Promise<Description[]>;
    findById(id: DescriptionId): Promise<Description | null>;
    delete(id: DescriptionId): Promise<void>;
}
