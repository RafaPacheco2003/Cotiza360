import { BranchId } from "./valueObject/BranchId";
import { BranchName } from "./valueObject/BranchName";

export class Branch {
    id: BranchId;
    name: BranchName;

    constructor(id: BranchId, name: BranchName) {
        this.id = id;
        this.name = name;
    }
}