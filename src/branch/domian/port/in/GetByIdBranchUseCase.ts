import { Description } from "generated/prisma";
import { Branch } from "../../Branch";

export interface GetByIdBranchUseCase {
    getById(id: string): Promise<Branch | null>;
}