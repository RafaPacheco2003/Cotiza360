import { Description } from '../../domain/Description';
import { DescriptionId } from '../../domain/valueObject/DescriptionId';
import { DescriptionDescription } from '../../domain/valueObject/DescriptionDescription';
import { PrismaDescriptionEntity } from '../entities/PrismaDescriptionEntity';

export class DescriptionMapper {
  // Convierte de Prisma a dominio
  static toDomain(entity: PrismaDescriptionEntity): Description {
    return new Description(
      new DescriptionId(entity.id),
      new DescriptionDescription(entity.description)
    );
  }

  // Convierte de dominio a Prisma (para crear o actualizar)
  static toPrisma(description: Description): PrismaDescriptionEntity {
    return {
      id: description.id.value,
      description: description.description.value,
      createdAt: new Date(), // Puedes ajustar según tu lógica
      updatedAt: new Date(), // Puedes ajustar según tu lógica
    };
  }
}
