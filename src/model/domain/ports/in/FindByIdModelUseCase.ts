import { Model } from '../../Model';
export interface FindByIdModelUseCase {
  findById(id: string): Promise<Model | null>;
}
