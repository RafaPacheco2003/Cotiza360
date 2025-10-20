import { Description } from 'src/description/domain/Description';

export interface FindByIdDescriptionUseCase {
  getById(id: string): Promise<Description | null>;
}
