import { Model } from '../../Model';

export interface RepositoryModelPort {
  create(model: Model): Promise<void>;
  findAll(): Promise<Model[]>;
  findById(id: string): Promise<Model | null>;
  delete(id: string): Promise<void>;
}
