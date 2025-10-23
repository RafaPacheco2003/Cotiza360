import { Description } from "../../Description";

export interface FindByIdWithModelUseCase {
  findByIdWithModel(id: string): Promise<Description | null>;
}
