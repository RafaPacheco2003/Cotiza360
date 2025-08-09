import { DescriptionDescription } from "./valueObject/DescriptionDescription";
import { DescriptionId } from "./valueObject/DescriptionId";

export class Description{
    id: DescriptionId;
    description: DescriptionDescription;

    constructor(id: DescriptionId, description: DescriptionDescription) {
        this.id = id;
        this.description = description;
    }
    


}