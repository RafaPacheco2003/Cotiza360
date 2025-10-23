import { Body, Controller, Post, Get, Param, HttpCode } from '@nestjs/common';
import { DescriptionRequest } from '../dtos/request/DescriptionRequest';
import { DescriptionResponse } from '../dtos/response/DescriptionResponse';
import {
  requestToDomain,
  domainToResponse,
} from '../mappers/DescriptionMapper';
import { ServiceDescription } from 'src/description/application/services/ServiceDescription';

@Controller('descriptions')
export class DescriptionController {
  constructor(private readonly service: ServiceDescription) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() request: DescriptionRequest,
  ): Promise<DescriptionResponse> {
    const domain = requestToDomain(request);
    await this.service.create(domain);
    return domainToResponse(domain);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<DescriptionResponse | null> {
    const domain = await this.service.findByIdWithModel(id);
    return domain ? domainToResponse(domain) : null;
  }

  @Get()
  async findAll(): Promise<DescriptionResponse[]> {
    const domain = await this.service.findAllWithModel();
    return domain.map(domainToResponse);
  }
}
