import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { QuotationResponse } from '../../quotation/infrastructure/dtos/response/QuotationResponse';

@Injectable()
export class QuotationLookupService {
  private readonly logger = new Logger(QuotationLookupService.name);
  private prisma = new PrismaClient();

  async buildQuotationResponse(
    branchId: string,
    modelId: string,
    descriptionId: string
  ): Promise<QuotationResponse> {
    try {
      // Buscar en paralelo todas las relaciones
      const [branch, model, description] = await Promise.all([
        this.prisma.branch.findUnique({ where: { id: branchId } }),
        this.prisma.model.findUnique({ where: { id: modelId } }),
        this.prisma.description.findUnique({ where: { id: descriptionId } }),
      ]);

      const response: QuotationResponse = {
        id: uuidv4(),
        ...(branch && {
          branch: {
            id: branch.id,
            name: branch.name,
          }
        }),
        ...(model && {
          model: {
            id: model.id,
            name: model.name,
          }
        }),
        ...(description && {
          description: {
            id: description.id,
            name: description.description,
          }
        })
      };

      this.logger.log(`✓ QuotationResponse construido: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      this.logger.error(`✗ Error buscando datos: ${error.message}`);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
