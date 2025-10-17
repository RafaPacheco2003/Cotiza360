import { Model } from '../../Model';
export interface CreateModelUseCase {
  create(model: Model): Promise<void>;
}
