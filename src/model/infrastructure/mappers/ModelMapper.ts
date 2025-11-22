import { Model as PrismaModel, Branch as PrismaBranch } from '@prisma/client';
import { Model } from 'src/model/domain/Model';
import { ModelName } from 'src/model/domain/valueObject/ModelName';
import { ModelId } from 'src/model/domain/valueObject/ModelId';
import { BranchId } from 'src/model/domain/valueObject/BranchId';
import { BranchName } from 'src/model/domain/valueObject/BranchName';
import { ModelRequest } from '../dtos/request/ModelRequest';
import { ModelResponse } from '../dtos/response/ModelResponse';
import { v4 as uuidv4 } from 'uuid';

// TIPO DE PERSISTENCIA (viene de Prisma/BD)
type PrismaModelWithBranch = PrismaModel & { branch?: PrismaBranch };

/**
 * FACTORY PARA VALUE OBJECTS
 * Centraliza la creación de value objects para evitar repetición
 */
class ValueObjectFactory {
  static model = {
    id: (value: string) => new ModelId(value),
    name: (value: string) => new ModelName(value),
    branchId: (value: string) => new BranchId(value),
    branchName: (value?: string) => value ? new BranchName(value) : undefined,
  };
}

/**
 * MAPPER UNIFICADO Y SUPER LIMPIO
 */
export class ModelMapper {
  
  /**
   * 🗄️ PRISMA (BD) → DOMAIN
   */
  static fromPrisma = {
    // Sin branch info
    toDomain: (data: PrismaModelWithBranch): Model => new Model(
      ValueObjectFactory.model.id(data.id),
      ValueObjectFactory.model.name(data.name),
      ValueObjectFactory.model.branchId(data.branchId)
    ),
 
    // Con branch info (USADO en repositorio para WithBranch methods)
    toDomainWithBranch: (data: PrismaModelWithBranch): Model => new Model(
      ValueObjectFactory.model.id(data.id),
      ValueObjectFactory.model.name(data.name),
      ValueObjectFactory.model.branchId(data.branchId),
      ValueObjectFactory.model.branchName(data.branch?.name)
    )
  };

  /**
   * 🎯 REQUEST → DOMAIN
   */
  static fromRequest = {
    // Nuevo modelo (genera UUID) - USADO en controller para CREATE
    toDomain: (data: ModelRequest): Model => new Model(
      ValueObjectFactory.model.id(uuidv4()),
      ValueObjectFactory.model.name(data.name),
      ValueObjectFactory.model.branchId(data.branchId)
    )
  };

  /**
   * 🏗️ DOMAIN → OUTPUT
   */
  static fromDomain = {
    // A Prisma (para writes)
    toPrisma: (model: Model) => ({
      id: model.id.value,
      name: model.name.value,
      branchId: model.branchId.value,
    }),

    // A Response (para APIs)
    toResponse: (model: Model): ModelResponse => ({
      id: model.id.value,
      name: model.name.value,
      ...(model.branchName && {
        branch: {
          id: model.branchId.value,
          name: model.branchName.value,
        }
      })
    } as ModelResponse)
  };
}

// 🔄 EXPORTS DE COMPATIBILIDAD (solo las que realmente se usan)
export const prismaToDomain = ModelMapper.fromPrisma.toDomain;
export const prismaWithBranchToDomain = ModelMapper.fromPrisma.toDomainWithBranch;
export const requestToDomain = ModelMapper.fromRequest.toDomain;
export const domainToPrisma = ModelMapper.fromDomain.toPrisma;
export const domainToResponse = ModelMapper.fromDomain.toResponse;