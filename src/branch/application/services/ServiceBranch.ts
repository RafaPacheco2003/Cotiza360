import { Branch } from 'src/branch/domian/Branch';
import { CreateBranchUseCase } from 'src/branch/domian/ports/in/CreateBranchUseCase';
import { DeleteBranchUseCase } from 'src/branch/domian/ports/in/DeleteBranchUseCase';
import { FindAllBranchUseCase } from 'src/branch/domian/ports/in/FindAllBranchUseCase';
import { FindByIdBranchUseCase } from 'src/branch/domian/ports/in/FindByIdBranchUseCase';

export class ServiceBranch
  implements
    CreateBranchUseCase,
    FindByIdBranchUseCase,
    FindAllBranchUseCase,
    DeleteBranchUseCase
{
  constructor(
    private readonly createBranchUseCase: CreateBranchUseCase,
    private readonly getAllBranchUseCase: FindAllBranchUseCase,
    private readonly getByIdBranchUseCase: FindByIdBranchUseCase,
    private readonly deleteBranchUseCase: DeleteBranchUseCase,
  ) {}

  async getById(id: string): Promise<Branch | null> {
    return this.getByIdBranchUseCase.getById(id);
  }
  async findAll(): Promise<Branch[]> {
    return this.getAllBranchUseCase.findAll();
  }
  async delete(id: string): Promise<void> {
    return this.deleteBranchUseCase.delete(id);
  }
  async create(branch: Branch): Promise<void> {
    return this.createBranchUseCase.create(branch);
  }
}
