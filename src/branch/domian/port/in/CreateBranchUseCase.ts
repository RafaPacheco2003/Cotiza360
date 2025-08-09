
import { Branch } from "../../Branch";

export interface CreateBranchUseCase{
    create(branch: Branch): Promise<void>;
}