import { DescriptionDescription } from './valueObject/DescriptionDescription';
import { DescriptionId } from './valueObject/DescriptionId';
import { DescriptionModelId } from './valueObject/DescriptionModelId';

export class Description {
  id: DescriptionId;
  description: DescriptionDescription;
  modelId: DescriptionModelId;

  constructor(id: DescriptionId, description: DescriptionDescription, modelId: DescriptionModelId) {
    this.id = id;
    this.description = description;
    this.modelId = modelId;
  }
}
