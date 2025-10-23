import { DescriptionDescription } from './valueObject/DescriptionDescription';
import { DescriptionId } from './valueObject/DescriptionId';
import { DescriptionModelId } from './valueObject/DescriptionModelId';
import { DescriptionModelName } from './valueObject/DescriptionModelName';

export class Description {
  id: DescriptionId;
  description: DescriptionDescription;
  modelId: DescriptionModelId;
  modelName?: DescriptionModelName; // Opcional - se incluye cuando se necesita información completa del modelo

  constructor(id: DescriptionId, description: DescriptionDescription, modelId: DescriptionModelId, modelName?: DescriptionModelName) {
    this.id = id;
    this.description = description;
    this.modelId = modelId;
    this.modelName = modelName;
  }
}
