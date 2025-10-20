import { Inject } from '@nestjs/common';
import { Model } from 'src/model/domain/Model';
import { FindAllModelUseCase } from 'src/model/domain/ports/in/FindAllModelUseCase';
import type { RepositoryModelPort } from 'src/model/domain/ports/out/RepositoryModelPort';
export class GetAllModelUseCaseImpl implements FindAllModelUseCase {
  constructor(
    @Inject('ModelRepositoryPort')
    private readonly modelRepository: RepositoryModelPort,
    // eslint-disable-next-line prettier/prettier
    ){

    }
  async findAll(): Promise<Model[]> {
    return this.modelRepository.findAll();
  }
}
