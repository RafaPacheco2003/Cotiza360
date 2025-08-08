import { Description } from "../../Description";

export interface CreateDescriptionUseCase {

    create(description: Description): Promise<void>;
}
