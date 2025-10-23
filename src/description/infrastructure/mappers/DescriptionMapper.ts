import { Description as PrismaDescription, Model as PrismaModel } from '@prisma/client';
import { Description } from '../../domain/Description';
import { DescriptionResponse } from '../dtos/response/DescriptionResponse';
import { DescriptionId } from '../../domain/valueObject/DescriptionId';
import { DescriptionDescription } from '../../domain/valueObject/DescriptionDescription';
import { DescriptionRequest } from '../dtos/request/DescriptionRequest';

import { v4 as uuidv4 } from 'uuid';
import { DescriptionModelId } from 'src/description/domain/valueObject/DescriptionModelId';
import { DescriptionModelName } from 'src/description/domain/valueObject/DescriptionModelName';

// Tipo para el resultado con JOIN (igual que ModelWithBranch en ModelMapper)
type PrismaDescriptionWithModel = PrismaDescription & {
  model?: PrismaModel;
};




/**
 * 
 * Factory para value object 
 *  Factory para value objects
 */
class ValueObjectFactory {
  static description = {
    id: (value: string) => new DescriptionId(value),
    description: (value: string) => new DescriptionDescription(value),
    modelId: (value: string) => new DescriptionModelId(value),
    modelName: (value?: string) => value ? new DescriptionModelName(value) : undefined,
  }
}






export class DescriptionMapper {

  static fromPrisma = {
    toDomain: (data: PrismaDescriptionWithModel): Description => new Description(
      ValueObjectFactory.description.id(data.id),
      ValueObjectFactory.description.description(data.description),
      ValueObjectFactory.description.modelId(data.modelId)
    ),


    toDomainWithModel: (data: PrismaDescriptionWithModel): Description => new Description(
      ValueObjectFactory.description.id(data.id),
      ValueObjectFactory.description.description(data.description),
      ValueObjectFactory.description.modelId(data.modelId),
      ValueObjectFactory.description.modelName(data.model?.name)
    )


  };


  static fromRequest = {
    toDomain: (data: DescriptionRequest): Description => new Description(
      ValueObjectFactory.description.id(uuidv4()),
      ValueObjectFactory.description.description(data.description),
      ValueObjectFactory.description.modelId(data.modelId),
    )
  }



  static fromDomain = {
    toPrisma: (description: Description) => ({
      id: description.id.value,
      description: description.description.value,
      modelId: description.modelId.value,
    }),
    
    toResponse: (description: Description): DescriptionResponse => ({
      id: description.id.value,
      description: description.description.value,
      ... (description.modelName && {
        model: {
          id: description.modelId.value,
          name: description.modelName.value,
        }
      })
    })
  };
}



export const prismaToDomain = DescriptionMapper.fromPrisma.toDomain;
export const prismaToDomainWithModel = DescriptionMapper.fromPrisma.toDomainWithModel;
export const requestToDomain = DescriptionMapper.fromRequest.toDomain;
export const domainToPrisma = DescriptionMapper.fromDomain.toPrisma;
export const domainToResponse = DescriptionMapper.fromDomain.toResponse;
