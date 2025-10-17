import { Model } from '../../Model';
export interface FindAllModelUseCase {
  findAll(): Promise<Model[]>;
}
