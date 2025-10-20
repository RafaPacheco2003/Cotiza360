import { Inject } from '@nestjs/common';
import { Model } from 'src/model/domain/Model';
import { FindByIdModelUseCase } from 'src/model/domain/ports/in/FindByIdModelUseCase';
import type { RepositoryModelPort } from 'src/model/domain/ports/out/RepositoryModelPort';

export class GetByIdModelUseCaseImpl implements FindByIdModelUseCase {
  constructor(
    @Inject('ModelRepositoryPort')
    private readonly modelRepository: RepositoryModelPort,
  ) {}
  async findById(id: string): Promise<Model | null> {
    return this.modelRepository.findById(id);
  }
}
