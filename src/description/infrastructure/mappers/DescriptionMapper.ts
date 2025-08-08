import { DescriptionResponse } from '../https/response/DescriptionResponse';
import { Description } from '../../domain/Description';
import { DescriptionId } from '../../domain/valueObject/DescriptionId';
import { DescriptionDescription } from '../../domain/valueObject/DescriptionDescription';
import { DescriptionRequest } from '../https/request/DescriptionRequest';
import { Description as PrismaDescription } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// De DTO a Entity de dominio
export function requestToDomain(request: DescriptionRequest): Description {
  // El id se genera en la infraestructura o en el repositorio, aquí solo pasamos description
  return new Description(
    new DescriptionId(uuidv4()), // o puedes dejarlo opcional si tu constructor lo permite
    new DescriptionDescription(request.description)
  );
}

// De Prisma Model a Entity de dominio
export function prismaToDomain(prisma: PrismaDescription): Description {
  return new Description(
    new DescriptionId(prisma.id),
    new DescriptionDescription(prisma.description)
  );
}

// De Entity de dominio a Prisma Model (para crear/actualizar)
export function domainToPrisma(entity: Description): { id: string; description: string } {
  return {
    id: entity.id.value,
    description: entity.description.value
  };
}


// De Entity de dominio a DTO de respuesta
export function domainToResponse(entity: Description): DescriptionResponse {
  return {
    id: entity.id.value,
    description: entity.description.value
  };
}