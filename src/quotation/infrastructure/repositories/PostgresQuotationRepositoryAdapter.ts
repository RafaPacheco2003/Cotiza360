import { PrismaClient } from '@prisma/client';
import { Quotation } from 'src/quotation/domain/Quotation';
import { QuotationRepositoryPort } from 'src/quotation/domain/ports/out/QuotationRepositoryPort';
import { domainToPrisma, prismaWithRelationsToDomain } from '../mappers/QuotationMapper';

export class PostgresQuotationRepositoryAdapter implements QuotationRepositoryPort {
  private prisma = new PrismaClient();

  async create(quotation: Quotation): Promise<void> {
    const prismaData = domainToPrisma(quotation);
    await this.prisma.quotation.create({
      data: prismaData,
    });
  }

  async findAll(): Promise<Quotation[]> {
    const results = await this.prisma.quotation.findMany({
      include: {
        branch: true,
        model: true,
        description: true,
      },
    });
    return results.map(prismaWithRelationsToDomain);
  }

  async findById(id: string): Promise<Quotation | null> {
    const result = await this.prisma.quotation.findUnique({
      where: { id },
      include: {
        branch: true,
        model: true,
        description: true,
      },
    });
    return result ? prismaWithRelationsToDomain(result) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.quotation.delete({
      where: { id },
    });
  }
}
