import { Branch } from "../../Branch";

export interface GetAllBranchUseCase{
    findAll(): Promise<Branch[]>;
}