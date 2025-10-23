import { BranchId } from './valueObject/BranchId';
import { BranchName } from './valueObject/BranchName';
import { ModelId } from './valueObject/ModelId';
import { ModelName } from './valueObject/ModelName';

export class Model {
  id: ModelId;
  name: ModelName;
  branchId: BranchId; // FK al Branch
  branchName?: BranchName; // Opcional - se incluye cuando se necesita información completa del branch

  constructor(id: ModelId, name: ModelName, branchId: BranchId, branchName?: BranchName) {
    this.id = id;
    this.name = name;
    this.branchId = branchId;
    this.branchName = branchName;
  }
}
