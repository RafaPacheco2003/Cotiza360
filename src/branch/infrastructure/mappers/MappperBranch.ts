import { Branch as PrismaBranch } from '@prisma/client';
import { Branch } from 'src/branch/domian/Branch';
import { BranchName } from 'src/branch/domian/valueObject/BranchName';
import { BranchId } from 'src/branch/domian/valueObject/BranchId';
import { BranchRequest } from '../dtos/request/BranchRequest';
import { BranchResponse } from '../dtos/response/BranchResponse';
import { v4 as uuidv4 } from 'uuid';

/**
 * Convierte una entidad Branch de Prisma a la entidad Branch del dominio
 */
export function prismaToDomain(branch: PrismaBranch): Branch {
  const branchId = new BranchId(branch.id);
  const branchName = new BranchName(branch.name);
  return new Branch(branchId, branchName);
}

/**
 * Convierte una entidad Branch del dominio a un objeto que Prisma puede usar para crear/actualizar
 */
export function domainToPrisma(branch: Branch): {
  id: string;
  name: string;
} {
  return {
    id: branch.id.value,
    name: branch.name.value,
  };
}

/**
 * Convierte un DTO Request a una entidad Branch del dominio
 * El ID se deja vacío, ya que lo asigna la base de datos al persistir
 *
 * @param request DTO con datos del request
 * @returns Entidad Branch del dominio sin ID asignado
 */
export function requestToDomain(request: BranchRequest): Branch {
  const branchName = new BranchName(request.name);
  const branchId = new BranchId(uuidv4());
  return new Branch(branchId, branchName);
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
  request: BranchRequest,
  id: string,
): Branch {
  const branchName = new BranchName(request.name);
  const branchId = new BranchId(id);

  return new Branch(branchId, branchName);
}

/**
 * Convierte una entidad del dominio a un objeto DTO Response
 * para enviar como respuesta al cliente
 *
 * @param branch Entidad de dominio Branch
 * @returns Objeto BranchResponse con los datos para el cliente
 */
export function domainToResponse(branch: Branch): BranchResponse {
  const response = new BranchResponse();
  response.id = branch.id.value;
  response.name = branch.name.value;

  return response;
}

/**
 * Convierte directamente una entidad de Prisma a un objeto DTO Response
 * Útil para operaciones de solo lectura donde no se necesita pasar por el dominio
 *
 * @param branch Entidad de Prisma
 * @returns Objeto BranchResponse con los datos para el cliente
 */
export function prismaToResponse(branch: PrismaBranch): BranchResponse {
  const response = new BranchResponse();
  response.id = branch.id;
  response.name = branch.name;

  return response;
}
