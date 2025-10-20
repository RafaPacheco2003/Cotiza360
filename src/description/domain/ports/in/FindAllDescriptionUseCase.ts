import { Description } from 'src/description/domain/Description';

export interface FindAllDescriptionUseCase {
  getAll(): Promise<Description[]>;
}
