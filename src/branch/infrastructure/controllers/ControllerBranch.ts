import { Body, Controller, Get, Post } from '@nestjs/common';
import { ServiceBranch } from 'src/branch/application/services/ServiceBranch';

import { BranchRequest } from '../dtos/request/BranchRequest';
import { BranchResponse } from '../dtos/response/BranchResponse';
import { domainToResponse, requestToDomain } from '../mappers/MappperBranch';

@Controller('branches')
export class ControllerBranch {
  constructor(private readonly service: ServiceBranch) {}

  @Post()
  async create(@Body() request: BranchRequest): Promise<BranchResponse> {
    const domain = requestToDomain(request);
    await this.service.create(domain);
    return domainToResponse(domain);
  }

  @Get()
  async findAll(): Promise<BranchResponse[]> {
    const domains = await this.service.findAll();
    return domains.map(domainToResponse);
  }
}
