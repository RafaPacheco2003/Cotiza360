import { Body, Controller, Delete, Get, Param, Post, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { ServiceQuotation } from 'src/quotation/application/services/ServiceQuotation';
import { QuotationRequest } from '../dtos/request/QuotationRequest';
import { QuotationResponse } from '../dtos/response/QuotationResponse';
import { domainToResponse, requestToDomain } from '../mappers/QuotationMapper';

@Controller('quotations')
export class ControllerQuotation {
  private readonly logger = new Logger(ControllerQuotation.name);

  constructor(
    private readonly service: ServiceQuotation
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() request: QuotationRequest): Promise<QuotationResponse> {
    

      const domain = requestToDomain(request);
      await this.service.create(domain);
      
      const created = await this.service.findById(domain.id.value);
      const response = created ? domainToResponse(created) : domainToResponse(domain);

      
      return response;
    
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
