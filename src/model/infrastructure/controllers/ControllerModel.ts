import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServiceModel } from 'src/model/application/services/ServiceModel';
import { ModelResponse } from '../dtos/response/ModelResponse';
import { domainToResponse, requestToDomain, prismaToResponse } from '../mappers/ModelMapper';
import { ModelRequest } from '../dtos/request/ModelRequest';
import { PostgresModelRepositoryAdapter } from '../repositories/PostgresModelRepositoryAdapter';

@Controller('models')
export class ControllerModel {
  constructor(
    private readonly service: ServiceModel,
    private readonly repository: PostgresModelRepositoryAdapter,
  ) {}

  @Post()
  async create(@Body() request: ModelRequest): Promise<ModelResponse> {
    const domain = requestToDomain(request);
    await this.service.create(domain);
    return domainToResponse(domain);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<ModelResponse | null> {
    // 🎯 Usar el método que retorna datos RAW con JOIN
    const modelWithBranch = await this.repository.findByIdWithBranchName(id);
    return modelWithBranch ? prismaToResponse(modelWithBranch) : null;
  }

  @Get()
  async findAll(): Promise<ModelResponse[]> {
    // 🎯 Nuevo endpoint para obtener todos con brandName
    const modelsWithBranch = await this.repository.findAllWithBranchName();
    return modelsWithBranch.map(prismaToResponse);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}