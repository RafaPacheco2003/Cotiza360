import { PrismaClient } from '@prisma/client';
import { Model } from 'src/model/domain/Model';
import { RepositoryModelPort } from 'src/model/domain/ports/out/RepositoryModelPort';
import { domainToPrisma, prismaToDomain } from '../mappers/ModelMapper';

export class PostgresModelRepositoryAdapter implements RepositoryModelPort {
  private prisma = new PrismaClient();

  async create(model: Model): Promise<void> {
    const prismaData = domainToPrisma(model);
    await this.prisma.model.create({ data: prismaData });
  }
  async findAll(): Promise<Model[]> {
    const models = await this.prisma.model.findMany();
    return models.map(prismaToDomain);
  }
  async findById(id: string): Promise<Model | null> {
    const model = await this.prisma.model.findUnique({ where: { id } });
    return model ? prismaToDomain(model) : null;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.model.delete({ where: { id } });
  }
}
