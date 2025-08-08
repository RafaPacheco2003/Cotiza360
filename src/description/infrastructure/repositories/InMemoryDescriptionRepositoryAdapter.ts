import { Description } from "src/description/domain/Description";
import { DescriptionRepositoryPort } from "src/description/domain/port/out/DescriptionRepositoryPort";
import { DescriptionId } from "src/description/domain/valueObject/DescriptionId";

export class InMemoryDescriptionRepositoryAdapter implements DescriptionRepositoryPort {

    private descriptions: Description[] = [];



    create(description: Description): Promise<void> {
        this.descriptions.push(description);
        return Promise.resolve();
    }
    findAll(): Promise<Description[]> {
        return Promise.resolve(this.descriptions);
    }
    findById(id: DescriptionId): Promise<Description | null> {
        const description = this.descriptions.find(desc => desc.id.value === id.value);
        return Promise.resolve(description || null);
    }
   
    delete(id: DescriptionId): Promise<void> {
        const index = this.descriptions.findIndex(desc => desc.id.value === id.value);
        if (index !== -1) {
            this.descriptions.splice(index, 1);
        }
        return Promise.resolve();
    }
   

}