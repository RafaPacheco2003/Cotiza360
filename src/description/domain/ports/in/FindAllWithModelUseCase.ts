import { Description } from "../../Description";

export interface FindAllWithModelUseCase {
    findAllWithModel(): Promise<Description[]>;
}