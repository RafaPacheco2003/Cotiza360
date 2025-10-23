import { Inject } from '@nestjs/common';
import { CreateModelUseCase } from '../../domain/ports/in/CreateModelUseCase';
import { Model } from 'src/model/domain/Model';
import type { ModelRepositoryPort } from 'src/model/domain/ports/out/ModelRepositoryPort';

export class CreateModelUseCaseImpl implements CreateModelUseCase {
  constructor(
    @Inject('ModelRepositoryPort')
    private readonly modelRepository: ModelRepositoryPort,
  ) {}

  async create(model: Model): Promise<void> {
    await this.modelRepository.create(model);
  }
}
