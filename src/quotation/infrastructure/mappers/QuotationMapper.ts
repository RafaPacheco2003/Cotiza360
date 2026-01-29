import { Quotation as PrismaQuotation, Model as PrismaModel, Branch as PrismaBranch, Description as PrismaDescription } from '@prisma/client';
import { Quotation } from 'src/quotation/domain/Quotation';
import { QuotationId } from 'src/quotation/domain/valueObject/QuotationId';
import { QuotationYear } from 'src/quotation/domain/valueObject/QuotationYear';
import { QuotationBranch } from 'src/quotation/domain/QuotationBranch';
import { QuotationModel } from 'src/quotation/domain/QuotationModel';
import { QuotationDescription } from 'src/quotation/domain/QuotationDescription';
import { QuotationRequest } from '../dtos/request/QuotationRequest';
import { QuotationResponse } from '../dtos/response/QuotationResponse';
import { v4 as uuidv4 } from 'uuid';

// TIPO DE PERSISTENCIA (viene de Prisma/BD)
type PrismaQuotationWithRelations = PrismaQuotation & { 
  branch?: PrismaBranch; 
  model?: PrismaModel; 
  description?: PrismaDescription 
};

/**
 * FACTORY PARA VALUE OBJECTS
 * Centraliza la creación de value objects para evitar repetición
 */
class ValueObjectFactory {
  static quotation = {
    id: (value: string) => new QuotationId(value),
    year: (value: number) => new QuotationYear(value),
    branch: (id: string, name: string) => new QuotationBranch(id, name),
    model: (id: string, name: string) => new QuotationModel(id, name),
    description: (id: string, name: string) => new QuotationDescription(id, name),
  };
}

/**
 * MAPPER UNIFICADO Y SUPER LIMPIO
 */
export class QuotationMapper {
  
  /**
   * 🗄️ PRISMA (BD) → DOMAIN
   */
  static fromPrisma = {
    // Sin relaciones
    toDomain: (data: PrismaQuotationWithRelations): Quotation => new Quotation(
      ValueObjectFactory.quotation.id(data.id),
      ValueObjectFactory.quotation.branch(data.branchId, ''),
      ValueObjectFactory.quotation.model(data.modelId, ''),
      ValueObjectFactory.quotation.description(data.descriptionId, ''),
      ValueObjectFactory.quotation.year(data.year)
    ),
 
    // Con relaciones (USADO en repositorio para métodos WithRelations)
    toDomainWithRelations: (data: PrismaQuotationWithRelations): Quotation => new Quotation(
      ValueObjectFactory.quotation.id(data.id),
      ValueObjectFactory.quotation.branch(data.branchId, data.branch?.name || ''),
      ValueObjectFactory.quotation.model(data.modelId, data.model?.name || ''),
      ValueObjectFactory.quotation.description(data.descriptionId, data.description?.description || ''),
      ValueObjectFactory.quotation.year(data.year)
    )
  };

  /**
   * 🎯 REQUEST → DOMAIN
   */
  static fromRequest = {
    // Nueva cotización (genera UUID) - USADO en controller para CREATE
    toDomain: (data: QuotationRequest): Quotation => new Quotation(
      ValueObjectFactory.quotation.id(uuidv4()),
      ValueObjectFactory.quotation.branch(data.branchId, ''),
      ValueObjectFactory.quotation.model(data.modelId, ''),
      ValueObjectFactory.quotation.description(data.descriptionId, ''),
      ValueObjectFactory.quotation.year(data.year)
    )
  };

  /**
   * 🏗️ DOMAIN → OUTPUT
   */
  static fromDomain = {
    // A Prisma (para writes)
    toPrisma: (quotation: Quotation) => ({
      id: quotation.id.value,
      branchId: quotation.branch.branchId,
      modelId: quotation.model.modelId,
      descriptionId: quotation.description.descriptionId,
      year: quotation.year.value,
    }),

    // A Response (para APIs)
    toResponse: (quotation: Quotation): QuotationResponse => ({
      id: quotation.id.value,
      year: quotation.year.value,
      ...(quotation.branch.branchName && {
        branch: {
          id: quotation.branch.branchId,
          name: quotation.branch.branchName,
        }
      }),
      ...(quotation.model.modelName && {
        model: {
          id: quotation.model.modelId,
          name: quotation.model.modelName,
        }
      }),
      ...(quotation.description.descriptionName && {
        description: {
          id: quotation.description.descriptionId,
          name: quotation.description.descriptionName,
        }
      })
    } as QuotationResponse)
  };
}

// 🔄 EXPORTS DE COMPATIBILIDAD (solo las que realmente se usan)
export const prismaToDomain = QuotationMapper.fromPrisma.toDomain;
export const prismaWithRelationsToDomain = QuotationMapper.fromPrisma.toDomainWithRelations;
export const requestToDomain = QuotationMapper.fromRequest.toDomain;
export const domainToPrisma = QuotationMapper.fromDomain.toPrisma;
export const domainToResponse = QuotationMapper.fromDomain.toResponse;
