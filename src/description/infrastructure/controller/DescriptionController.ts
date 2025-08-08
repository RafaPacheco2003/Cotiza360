import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { DescriptionRequest } from '../https/request/DescriptionRequest';
import { DescriptionResponse } from '../https/response/DescriptionResponse';
import { requestToDomain, domainToResponse } from '../mappers/DescriptionMapper';
import { ServiceDescription } from 'src/description/application/services/ServiceDescription';

@Controller('descriptions')
export class DescriptionController {
  constructor(private readonly service: ServiceDescription) {}

  @Post()
  async create(@Body() request: DescriptionRequest): Promise<DescriptionResponse> {
    const entity = requestToDomain(request);
    await this.service.create(entity);
    // Si quieres retornar el objeto creado, deberías obtenerlo por id después de crearlo
    return domainToResponse(entity);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<DescriptionResponse | null> {
    const entity = await this.service.getById(id);
    return entity ? domainToResponse(entity) : null;
  }

  @Get()
  async findAll(): Promise<DescriptionResponse[]> {
    const entities = await this.service.getAll();
    return entities.map(domainToResponse);
  }
}