import { Model } from '../../Model';

export interface FindByIdWithBranch {
    findByIdWithBranch(id: string): Promise<Model | null>;
}