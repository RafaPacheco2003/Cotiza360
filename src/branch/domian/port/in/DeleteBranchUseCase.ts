import { DescriptionId } from "src/description/domain/valueObject/DescriptionId";

export interface DeleteBranchUseCase{
    delete(id: string): Promise<void>;
}