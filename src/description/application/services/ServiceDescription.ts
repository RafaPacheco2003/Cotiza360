import { Description } from 'src/description/domain/Description';
import { CreateDescriptionUseCase } from 'src/description/domain/ports/in/CreateDescriptionUseCase';
import { DeleteDescriptionUseCase } from 'src/description/domain/ports/in/DeleteDescriptionUseCase';
import { FindAllDescriptionUseCase } from 'src/description/domain/ports/in/FindAllDescriptionUseCase';
import { FindByIdDescriptionUseCase } from 'src/description/domain/ports/in/FindByIdDescriptionUseCase';

export class ServiceDescription
  implements
    CreateDescriptionUseCase,
    FindByIdDescriptionUseCase,
    FindAllDescriptionUseCase,
    DeleteDescriptionUseCase
{
  constructor(
    private readonly createDescriptionUseCase: CreateDescriptionUseCase,
    private readonly FindAllDescriptionUseCase: FindAllDescriptionUseCase,
    private readonly FindByIdDescriptionUseCase: FindByIdDescriptionUseCase,
    private readonly deleteDescriptionUseCase: DeleteDescriptionUseCase,
  ) {}

  async create(description: Description): Promise<void> {
    await this.createDescriptionUseCase.create(description);
  }

  async getById(id: string): Promise<Description | null> {
    return this.FindByIdDescriptionUseCase.getById(id);
  }

  async getAll(): Promise<Description[]> {
    return this.FindAllDescriptionUseCase.getAll();
  }

  async delete(id: string): Promise<void> {
    await this.deleteDescriptionUseCase.delete(id);
  }
}
