import { Description } from 'src/description/domain/Description';
import { CreateDescriptionUseCase } from 'src/description/domain/ports/in/CreateDescriptionUseCase';
import { DeleteDescriptionUseCase } from 'src/description/domain/ports/in/DeleteDescriptionUseCase';
import { FindAllDescriptionUseCase } from 'src/description/domain/ports/in/FindAllDescriptionUseCase';
import { FindAllWithModelUseCase } from 'src/description/domain/ports/in/FindAllWithModelUseCase';
import { FindByIdDescriptionUseCase } from 'src/description/domain/ports/in/FindByIdDescriptionUseCase';
import { FindByIdWithModelUseCase } from 'src/description/domain/ports/in/FindByIdWithModelUseCase';

export class ServiceDescription
  implements
    CreateDescriptionUseCase,
    FindByIdDescriptionUseCase,
    FindAllDescriptionUseCase,
    DeleteDescriptionUseCase,
    FindAllWithModelUseCase,
    FindByIdWithModelUseCase
{
  constructor(
    private readonly createDescriptionUseCase: CreateDescriptionUseCase,
    private readonly FindAllDescriptionUseCase: FindAllDescriptionUseCase,
    private readonly FindByIdDescriptionUseCase: FindByIdDescriptionUseCase,
    private readonly deleteDescriptionUseCase: DeleteDescriptionUseCase,
    private readonly getAllWithModelUseCase: FindAllWithModelUseCase,
    private readonly getByIdWithModelUseCase: FindByIdWithModelUseCase,
  ) {}
  async findAllWithModel(): Promise<Description[]> {
    return this.getAllWithModelUseCase.findAllWithModel();
  }
  async findByIdWithModel(id: string): Promise<Description | null> {
    return this.getByIdWithModelUseCase.findByIdWithModel(id);
  }

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
