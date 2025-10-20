import { Model as PrismaModel, Branch as PrismaBranch } from '@prisma/client';
import { Model } from 'src/model/domain/Model';
import { ModelName } from 'src/model/domain/valueObject/ModelName';
import { ModelId } from 'src/model/domain/valueObject/ModelId';
import { BranchId } from 'src/model/domain/valueObject/BranchId';
import { ModelRequest } from '../dtos/request/ModelRequest';
import { ModelResponse } from '../dtos/response/ModelResponse';
import { v4 as uuidv4 } from 'uuid';

// Tipo para el resultado con JOIN
type ModelWithBranch = PrismaModel & {
  branch?: PrismaBranch;
};

/**
 * Convierte una entidad Model de Prisma a la entidad Model del dominio
 */
export function prismaToDomain(model: ModelWithBranch): Model {
  const modelId = new ModelId(model.id);
  const modelName = new ModelName(model.name);
  const branchId = new BranchId(model.branchId);
  return new Model(modelId, modelName, branchId);
}

/**
 * Convierte una entidad Model del dominio a un objeto que Prisma puede usar para crear/actualizar
 */
export function domainToPrisma(model: Model): {
  id: string;
  name: string;
  branchId: string;
} {
  return {
    id: model.id.value,
    name: model.name.value,
    branchId: model.branchId.value,
  };
}

/**
 * Convierte un DTO Request a una entidad Model del dominio
 * El ID se genera automáticamente
 *
 * @param request DTO con datos del request
 * @returns Entidad Model del dominio con ID generado
 */
export function requestToDomain(request: ModelRequest): Model {
  const modelName = new ModelName(request.name);
  const modelId = new ModelId(uuidv4());
  const branchId = new BranchId(request.branchId);
  return new Model(modelId, modelName, branchId);
}

/**
 * Convierte un DTO Request a una entidad del dominio con un ID específico
 * Útil para actualizaciones donde ya se conoce el ID
 *
 * @param request DTO con datos del request
 * @param id ID de la entidad a actualizar
 * @returns Entidad del dominio con el ID especificado
 */
export function requestToDomainWithId(
  request: ModelRequest,
  id: string,
): Model {
  const modelName = new ModelName(request.name);
  const modelId = new ModelId(id);
  const branchId = new BranchId(request.branchId);

  return new Model(modelId, modelName, branchId);
}

/**
 * Convierte una entidad del dominio a un objeto DTO Response
 * para enviar como respuesta al cliente
 *
 * @param model Entidad de dominio Model
 * @returns Objeto ModelResponse con los datos para el cliente
 */
export function domainToResponse(model: Model): ModelResponse {
  const response = new ModelResponse();
  response.id = model.id.value;
  response.name = model.name.value;

  return response;
}

/**
 * Convierte directamente una entidad de Prisma CON BRANCH a un objeto DTO Response
 * Útil para operaciones de solo lectura donde no se necesita pasar por el dominio
 * INCLUYE TODO EL OBJETO BRANCH desde el JOIN
 *
 * @param model Entidad de Prisma con branch incluido
 * @returns Objeto ModelResponse con los datos para el cliente incluyendo el objeto branch completo
 */
export function prismaToResponse(model: ModelWithBranch): ModelResponse {
  const response = new ModelResponse();
  response.id = model.id;
  response.name = model.name;
  
  if (model.branch) {
    response.branch = {
      id: model.branch.id,
      name: model.branch.name
    };
  }

  return response;
}