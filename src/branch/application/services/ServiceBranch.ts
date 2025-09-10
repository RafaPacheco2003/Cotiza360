import { Branch } from 'src/branch/domian/Branch';
import { CreateBranchUseCase } from 'src/branch/domian/port/in/CreateBranchUseCase';
import { DeleteBranchUseCase } from 'src/branch/domian/port/in/DeleteBranchUseCase';
import { GetAllBranchUseCase } from 'src/branch/domian/port/in/GetAllBranchUseCase';
import { GetByIdBranchUseCase } from 'src/branch/domian/port/in/GetByIdBranchUseCase';

export class ServiceBranch
  implements
    CreateBranchUseCase,
    GetByIdBranchUseCase,
    GetAllBranchUseCase,
    DeleteBranchUseCase
{
  constructor(
    private readonly createBranchUseCase: CreateBranchUseCase,
    private readonly getAllBranchUseCase: GetAllBranchUseCase,
    private readonly getByIdBranchUseCase: GetByIdBranchUseCase,
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
