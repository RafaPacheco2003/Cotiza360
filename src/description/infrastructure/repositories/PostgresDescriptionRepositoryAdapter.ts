import { PrismaClient } from '@prisma/client';
import { DescriptionRepositoryPort } from 'src/description/domain/port/out/DescriptionRepositoryPort';
import { Description } from 'src/description/domain/Description';
import { DescriptionId } from 'src/description/domain/valueObject/DescriptionId';
import { prismaToDomain, domainToPrisma } from '../mappers/DescriptionMapper';

export class PostgresDescriptionRepositoryAdapter implements DescriptionRepositoryPort {
  private prisma = new PrismaClient();

  async create(description: Description): Promise<void> {
    const prismaData = domainToPrisma(description);
    await this.prisma.description.create({
      data: prismaData
    });
  }

  async findAll(): Promise<Description[]> {
    const results = await this.prisma.description.findMany();
    return results.map(prismaToDomain);
  }

  async findById(id: DescriptionId): Promise<Description | null> {
    const result = await this.prisma.description.findUnique({ where: { id: id.value } });
    return result ? prismaToDomain(result) : null;
  }

  async delete(id: DescriptionId): Promise<void> {
    await this.prisma.description.delete({ where: { id: id.value } });
  }
}
