import { PrismaClient } from '@prisma/client';
import { Model } from 'src/model/domain/Model';
import { ModelRepositoryPort } from 'src/model/domain/ports/out/ModelRepositoryPort';
import { ModelId } from 'src/model/domain/valueObject/ModelId';
import { domainToPrisma, prismaToDomain, prismaWithBranchToDomain } from '../mappers/ModelMapper';

export class PostgresModelRepositoryAdapter implements ModelRepositoryPort {
  private prisma = new PrismaClient();

  async create(model: Model): Promise<void> {
    const prismaData = domainToPrisma(model);
    await this.prisma.model.create({
      data: prismaData,
    });
  }

  async findAll(): Promise<Model[]> {
    const results = await this.prisma.model.findMany({
      include: {
        branch: true,
      },
    });
    return results.map(prismaToDomain);
  }

  async findById(id: string): Promise<Model | null> {
    const result = await this.prisma.model.findUnique({
      where: { id },
      include: {
        branch: true,
      },
    });
    return result ? prismaToDomain(result) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.model.delete({
      where: { id },
    });
  }

  async findAllWithBranch(): Promise<Model[]> {
    const results = await this.prisma.model.findMany({
      include: {
        branch: true,
      },
    });
    return results.map(prismaWithBranchToDomain);
  }
  

  async findByIdWithBranch(id: string): Promise<Model | null> {
    const result = await this.prisma.model.findUnique({
      where: { id },
      include: {
        branch: true,
      },
    });
    return result ? prismaWithBranchToDomain(result) : null;
  }
}