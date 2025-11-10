import { PrismaClient } from "@prisma/client";
import { UserRepositoryPort } from "src/user/domain/ports/out/UserRepositoryPort";
import { User } from "src/user/domain/User";
import { domainToPrisma, prismaToDomain } from "../mappers/UserMapper";

export class PostgresUserRepositoryAdapter implements UserRepositoryPort {
    
    private prisma = new PrismaClient();
    
    
    
    
    async create(user: User): Promise<void> {
        const prismaData = domainToPrisma(user);

        await this.prisma.user.create({
            data: prismaData,
        });
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map(prismaToDomain);
    }
    
    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user ? prismaToDomain(user) : null;
    }
    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }

}