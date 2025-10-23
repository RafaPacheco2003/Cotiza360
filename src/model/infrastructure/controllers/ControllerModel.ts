import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServiceModel } from 'src/model/application/services/ServiceModel';
import { ModelResponse } from '../dtos/response/ModelResponse';
import { domainToResponse, requestToDomain } from '../mappers/ModelMapper';
import { ModelRequest } from '../dtos/request/ModelRequest';
import { PostgresModelRepositoryAdapter } from '../repositories/PostgresModelRepositoryAdapter';

@Controller('models')
export class ControllerModel {
  constructor(
    private readonly service: ServiceModel
  ) {}

  @Post()
  async create(@Body() request: ModelRequest): Promise<ModelResponse> {
    const domain = requestToDomain(request);
    await this.service.create(domain);
    return domainToResponse(domain);
  }

  
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<ModelResponse | null> {
    const modelWithBranch = await this.service.findByIdWithBranch(id);
    return modelWithBranch ? domainToResponse(modelWithBranch) : null;
  }

  @Get()
  async findAll(): Promise<ModelResponse[]> {
    const modelsWithBranch = await this.service.findAllWithBranch();
    return modelsWithBranch.map(domainToResponse);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}