import { Description } from "../../Description";

export interface CreateDescriptionUseCase {

    run(description: Description): Promise<void>;
}
