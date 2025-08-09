import { Branch } from "src/branch/domian/Branch";
import { Description } from "../../Description";

export interface CreateDescriptionUseCase {

    create(description: Description): Promise<void>;
}
