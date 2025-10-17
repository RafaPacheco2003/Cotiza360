import { Model } from 'src/model/domain/Model';
import { CreateModelUseCase } from 'src/model/domain/ports/in/CreateModelUseCase';
import { DeleteModelUseCase } from 'src/model/domain/ports/in/DeleteModelUseCase';
import { FindAllModelUseCase } from 'src/model/domain/ports/in/FindAllModelUseCase';
import { FindByIdModelUseCase } from 'src/model/domain/ports/in/FindByIdModelUseCase';

export class ServiceModel
  implements
    CreateModelUseCase,
    FindByIdModelUseCase,
    FindAllModelUseCase,
    DeleteModelUseCase
{
  constructor(
    private readonly createModelUseCase: CreateModelUseCase,
    private readonly findByIdModelUseCase: FindByIdModelUseCase,
    private readonly findAllModelUseCase: FindAllModelUseCase,
    private readonly deleteModelUseCase: DeleteModelUseCase,
  ) {}
  create(model: Model): Promise<void> {
    return this.createModelUseCase.create(model);
  }
  findById(id: string): Promise<Model | null> {
    return this.findByIdModelUseCase.findById(id);
  }
  findAll(): Promise<Model[]> {
    return this.findAllModelUseCase.findAll();
  }
  delete(id: string): Promise<void> {
    return this.deleteModelUseCase.delete(id);
  }
}
