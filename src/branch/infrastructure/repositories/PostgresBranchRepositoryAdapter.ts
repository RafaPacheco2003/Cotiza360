import { PrismaClient } from '@prisma/client';
import { Branch } from 'src/branch/domian/Branch';
import { RepositoryBranchPort } from 'src/branch/domian/ports/out/RepositoryBranchPort';
import { BranchId } from 'src/branch/domian/valueObject/BranchId';
import { domainToPrisma, prismaToDomain } from '../mappers/MappperBranch';

export class PostgresBranchRepositoryAdapter implements RepositoryBranchPort {
  private prisma = new PrismaClient();

  async create(branch: Branch): Promise<void> {
    const prismaData = domainToPrisma(branch);
    await this.prisma.branch.create({
      data: prismaData,
    });
  }
  async findAll(): Promise<Branch[]> {
    const results = await this.prisma.branch.findMany();
    return results.map(prismaToDomain);
  }
  async findById(id: BranchId): Promise<Branch | null> {
    const result = await this.prisma.branch.findUnique({
      where: { id: id.value },
    });
    return result ? prismaToDomain(result) : null;
  }
  async delete(id: BranchId): Promise<void> {
    await this.prisma.branch.delete({
      where: { id: id.value },
    });
  }
}
