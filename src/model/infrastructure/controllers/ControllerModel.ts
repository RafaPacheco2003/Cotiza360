import { Body, Controller, Post } from '@nestjs/common';
import { ServiceModel } from 'src/model/application/services/ServiceModel';
import { ModelResponse } from '../dtos/response/ModelResponse';
import { domainToResponse, requestToDomain } from '../mappers/ModelMapper';
import { ModelRequest } from '../dtos/request/ModelRequest';

@Controller('models')
export class ControllerModel {
  constructor(private readonly service: ServiceModel) {}

  @Post()
  async create(@Body() request: ModelRequest): Promise<ModelResponse> {
    const domain = requestToDomain(request);
    await this.service.create(domain);
    return domainToResponse(domain);
  }
  
}
