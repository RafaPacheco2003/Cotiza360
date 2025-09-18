import { ModelId } from './valueObject/ModelId';
import { ModelName } from './valueObject/ModelName';

export class Model {
  id: ModelId;
  name: ModelName;

  constructor(id: ModelId, name: ModelName) {
    this.id = id;
    this.name = name;
  }
}
