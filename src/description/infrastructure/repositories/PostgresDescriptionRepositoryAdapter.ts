import { PrismaClient } from '@prisma/client';
import { DescriptionRepositoryPort } from 'src/description/domain/ports/out/DescriptionRepositoryPort';
import { Description } from 'src/description/domain/Description';
import { DescriptionId } from 'src/description/domain/valueObject/DescriptionId';
import { prismaToDomain, prismaToDomainWithModel, domainToPrisma } from '../mappers/DescriptionMapper';

export class PostgresDescriptionRepositoryAdapter
  implements DescriptionRepositoryPort
{
 
  private prisma = new PrismaClient();

  async create(description: Description): Promise<void> {
    const prismaData = domainToPrisma(description);
    await this.prisma.description.create({
      data: prismaData,
    });
  }

  async findAll(): Promise<Description[]> {
    const results = await this.prisma.description.findMany({
      include: {
        model: true,
      },
    });
    return results.map(prismaToDomain);
  }

  async findById(id: DescriptionId): Promise<Description | null> {
    const result = await this.prisma.description.findUnique({
      where: { id: id.value },
      include: {
        model: true,
      },
    });
    return result ? prismaToDomain(result) : null;
  }

  async delete(id: DescriptionId): Promise<void> {
    await this.prisma.description.delete({ where: { id: id.value } });
  }

  async findAllWithModel(): Promise<Description[]>  {
    const results = await this.prisma.description.findMany({
      include: {
        model: true,
      },
    });
    return results.map(prismaToDomainWithModel);
  }

  async findByIdWithModel(id: string): Promise<Description | null> {
    const result = await this.prisma.description.findUnique({
      where: { id },
      include: {
        model: true,
      },
    });
    return result ? prismaToDomainWithModel(result) : null;
  }
}
