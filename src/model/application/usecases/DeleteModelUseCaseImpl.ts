import { Inject } from '@nestjs/common';
import { DeleteModelUseCase } from 'src/model/domain/ports/in/DeleteModelUseCase';
import type { ModelRepositoryPort } from 'src/model/domain/ports/out/RepositoryModelPort';

export class DeleteModelUseCaseImpl implements DeleteModelUseCase {
  constructor(
    @Inject('ModelRepositoryPort')
    private readonly modelRepository: ModelRepositoryPort,
  ) {}

  async delete(id: string): Promise<void> {
    await this.modelRepository.delete(id);
  }
}
