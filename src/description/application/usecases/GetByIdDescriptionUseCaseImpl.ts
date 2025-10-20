import { Description } from 'src/description/domain/Description';
import { DescriptionErrors } from 'src/description/domain/errors/DescriptionErrors';
import { FindByIdDescriptionUseCase } from 'src/description/domain/ports/in/FindByIdDescriptionUseCase';
import type { DescriptionRepositoryPort } from 'src/description/domain/ports/out/DescriptionRepositoryPort';
import { DescriptionId } from 'src/description/domain/valueObject/DescriptionId';
import { Inject } from '@nestjs/common';

export class GetByIdDescriptionUseCaseImpl
  implements FindByIdDescriptionUseCase
{
  constructor(
    @Inject('DescriptionRepositoryPort')
    private descriptionRepository: DescriptionRepositoryPort,
  ) {}

  async getById(id: string): Promise<Description | null> {
    const description = await this.descriptionRepository.findById(
      new DescriptionId(id),
    );

    if (!description) throw DescriptionErrors.notFound(id);

    return description;
  }
}
