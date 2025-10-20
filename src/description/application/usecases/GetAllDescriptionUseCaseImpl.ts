import { Description } from 'src/description/domain/Description';
import { FindAllDescriptionUseCase } from 'src/description/domain/ports/in/FindAllDescriptionUseCase';
import type { DescriptionRepositoryPort } from 'src/description/domain/ports/out/DescriptionRepositoryPort';
import { Inject } from '@nestjs/common';

export class GetAllDescriptionUseCaseImpl implements FindAllDescriptionUseCase {
  constructor(
    @Inject('DescriptionRepositoryPort')
    private readonly descriptionRepository: DescriptionRepositoryPort,
  ) {}

  async getAll(): Promise<Description[]> {
    return this.descriptionRepository.findAll();
  }
}
