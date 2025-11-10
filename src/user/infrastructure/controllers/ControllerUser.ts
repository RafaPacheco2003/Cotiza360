import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServiceUser } from 'src/user/application/services/ServicesUser';
import { User } from 'src/user/domain/User';
import { UserRequest } from '../dtos/request/UserRequest';
import { UserResponse } from '../dtos/response/UserResponse';
import { domainToResponse, requestToDomain } from '../mappers/UserMapper';

@Controller('users')
export class ControllerUser {
    constructor(private readonly service: ServiceUser) {}

    @Post()
    async create(@Body() request: UserRequest): Promise<UserResponse> {
        const domain = requestToDomain(request);
        await this.service.create(domain);
        return domainToResponse(domain);
    }

     @Get()
    async findAll(): Promise<UserResponse[]> {
    const users = await this.service.findAll();
    return users.map(domainToResponse);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User | null> {
        return this.service.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.service.delete(id);
    }
}