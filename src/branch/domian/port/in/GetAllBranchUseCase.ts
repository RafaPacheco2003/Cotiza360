import { Branch } from "../../Branch";

export interface GetAllBranchUseCase{
    finAdll(): Promise<Branch[]>;
}