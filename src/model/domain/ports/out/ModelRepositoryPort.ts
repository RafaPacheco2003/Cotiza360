import { Model } from '../../Model';

export interface ModelRepositoryPort {
  create(model: Model): Promise<void>;
  findAll(): Promise<Model[]>;
  findById(id: string): Promise<Model | null>;
  delete(id: string): Promise<void>;
  findByIdWithBranch(id: string): Promise<Model | null>;
  findAllWithBranch(): Promise<Model[]>;
}