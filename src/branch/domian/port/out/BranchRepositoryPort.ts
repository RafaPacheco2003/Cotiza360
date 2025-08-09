import { Branch } from "../../Branch";
import { BranchId } from "../../valueObject/BranchId";

export interface BranchRepositoryPort{
    create(branch: Branch): Promise<void>;
    findAll():Promise<Branch[]>;
    findById(id: BranchId): Promise<Branch | null>;
    delete(id: BranchId): Promise<void>;

}