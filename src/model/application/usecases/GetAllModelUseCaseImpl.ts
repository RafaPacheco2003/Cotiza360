import { Inject } from '@nestjs/common';
import { Model } from 'src/model/domain/Model';
import { FindAllModelUseCase } from 'src/model/domain/ports/in/FindAllModelUseCase';
import type { ModelRepositoryPort } from 'src/model/domain/ports/out/ModelRepositoryPort';
export class GetAllModelUseCaseImpl implements FindAllModelUseCase {
  constructor(
    @Inject('ModelRepositoryPort')
    private readonly modelRepository: ModelRepositoryPort,
  ) {}

  async findAll(): Promise<Model[]> {
    return this.modelRepository.findAll();
  }
}
