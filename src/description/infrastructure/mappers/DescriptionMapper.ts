import { Description as PrismaDescription, Model as PrismaModel } from '@prisma/client';
import { Description } from '../../domain/Description';
import { DescriptionResponse } from '../dtos/response/DescriptionResponse';
import { DescriptionId } from '../../domain/valueObject/DescriptionId';
import { DescriptionDescription } from '../../domain/valueObject/DescriptionDescription';
import { DescriptionRequest } from '../dtos/request/DescriptionRequest';

import { v4 as uuidv4 } from 'uuid';
import { DescriptionModelId } from 'src/description/domain/valueObject/DescriptionModelId';

// De DTO a Entity de dominio
export function requestToDomain(request: DescriptionRequest): Description {
  // El id se genera en la infraestructura o en el repositorio, aquí solo pasamos description
  return new Description(
    new DescriptionId(uuidv4()), // o puedes dejarlo opcional si tu constructor lo permite
    new DescriptionDescription(request.description),
    new DescriptionModelId(request.modelId || '')
  );
}

// De Prisma Model a Entity de dominio
export function prismaToDomain(prisma: PrismaDescription): Description {
  return new Description(
    new DescriptionId(prisma.id),
    new DescriptionDescription(prisma.description),
    new DescriptionModelId(prisma.id)
  );
}

// De Entity de dominio a Prisma Model (para crear/actualizar)
export function domainToPrisma(entity: Description): {
  id: string;
  description: string;
  modelId: string;
} {
  return {
    id: entity.id.value,
    description: entity.description.value,
    modelId: entity.modelId.value,
  };
}

// De Entity de dominio a DTO de respuesta
export function domainToResponse(entity: Description): DescriptionResponse {
  return {
    id: entity.id.value,
    description: entity.description.value,
  };
}
