import { Inject } from '@nestjs/common';
import { CreateModelUseCase } from '../../domain/ports/in/CreateModelUseCase';
import type { RepositoryModelPort } from 'src/model/domain/ports/out/RepositoryModelPort';
import { Model } from 'src/model/domain/Model';

export class CreateModelUseCaseImpl implements CreateModelUseCase {
  constructor(
    @Inject('ModelRepositoryPort')
    private readonly modelRepository: RepositoryModelPort,
  ) {}

  async create(model: Model): Promise<void> {
    await this.modelRepository.create(model);
  }
}
