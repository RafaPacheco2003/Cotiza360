import { BranchId } from './valueObject/BranchId';
import { ModelId } from './valueObject/ModelId';
import { ModelName } from './valueObject/ModelName';

export class Model {
  id: ModelId;
  name: ModelName;
  branchId: BranchId; // FK al Branch

  constructor(id: ModelId, name: ModelName, branchId: BranchId) {
    this.id = id;
    this.name = name;
    this.branchId = branchId;
  }
}
