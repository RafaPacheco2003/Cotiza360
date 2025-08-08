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
    const domain = requestToDomain(request);
    await this.service.create(domain);
    return domainToResponse(domain);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<DescriptionResponse | null> {
    const domain = await this.service.getById(id);
    return domain ? domainToResponse(domain) : null;
  }

  @Get()
  async findAll(): Promise<DescriptionResponse[]> {
    const domain = await this.service.getAll();
    return domain.map(domainToResponse);
  }
}