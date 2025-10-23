import { Model } from "../../Model";

export interface FindAllWithBranchUseCase {
    findAllWithBranch(): Promise<Model[]>;
}