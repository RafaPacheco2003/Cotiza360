import { Model } from 'src/model/domain/Model';
import { CreateModelUseCase } from 'src/model/domain/ports/in/CreateModelUseCase';
import { DeleteModelUseCase } from 'src/model/domain/ports/in/DeleteModelUseCase';
import { FindAllModelUseCase } from 'src/model/domain/ports/in/FindAllModelUseCase';
import { FindAllWithBranchUseCase } from 'src/model/domain/ports/in/FindAllWithBranchUseCase';
import { FindByIdModelUseCase } from 'src/model/domain/ports/in/FindByIdModelUseCase';
import { FindByIdWithBranch } from 'src/model/domain/ports/in/FindByIdWithBranch';

export class ServiceModel
  implements
    CreateModelUseCase,
    FindByIdModelUseCase,
    FindAllModelUseCase,
    DeleteModelUseCase,
    FindByIdWithBranch,
    FindAllWithBranchUseCase
{
  constructor(
    private readonly createModelUseCase: CreateModelUseCase,
    private readonly findByIdModelUseCase: FindByIdModelUseCase,
    private readonly findAllModelUseCase: FindAllModelUseCase,
    private readonly deleteModelUseCase: DeleteModelUseCase,
    private readonly findByIdWithBranchUseCase: FindByIdWithBranch,
    private readonly findAllWithBranchUseCase: FindAllWithBranchUseCase,
  ) {}
  
  findByIdWithBranch(id: string): Promise<Model | null> {
    return this.findByIdWithBranchUseCase.findByIdWithBranch(id);
  }
  
  findAllWithBranch(): Promise<Model[]> {
    return this.findAllWithBranchUseCase.findAllWithBranch();
  }
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
