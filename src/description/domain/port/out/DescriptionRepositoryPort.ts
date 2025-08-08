import { Description } from "../../Description";
import { DescriptionId } from "../../valueObject/DescriptionId";

export interface DescriptionRepositoryPort {
    create(description: Description): Promise<void>;
    getAll(): Promise<Description[]>;
    findById(id: DescriptionId): Promise<Description | null>;
    update(description: Description): Promise<void>;
    delete(id: DescriptionId): Promise<void>;
}
