import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServiceQuotation } from 'src/quotation/application/services/ServiceQuotation';
import { QuotationRequest } from '../dtos/request/QuotationRequest';
import { QuotationResponse } from '../dtos/response/QuotationResponse';
import { domainToResponse, requestToDomain } from '../mappers/QuotationMapper';

@Controller('quotations')
export class ControllerQuotation {
  constructor(
    private readonly service: ServiceQuotation
  ) {}

  @Post()
  async create(@Body() request: QuotationRequest): Promise<QuotationResponse> {
    const domain = requestToDomain(request);
    await this.service.create(domain);
    // Recuperar con relaciones para devolver nombres completos
    const created = await this.service.findById(domain.id.value);
    return created ? domainToResponse(created) : domainToResponse(domain);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<QuotationResponse | null> {
    const quotation = await this.service.findById(id);
    return quotation ? domainToResponse(quotation) : null;
  }

  @Get()
  async findAll(): Promise<QuotationResponse[]> {
    const quotations = await this.service.findAll();
    return quotations.map(domainToResponse);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
