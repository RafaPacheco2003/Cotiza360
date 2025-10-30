import { Inject } from "@nestjs/common";
import { CreateUserUseCase } from "src/user/domain/ports/in/CreateUserUseCase";
import type { UserRepositoryPort } from "src/user/domain/ports/out/UserRepositoryPort";
import { User } from "src/user/domain/User";

export class CreateUserUseCaseImpl implements CreateUserUseCase {
    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort) {}

    async create(user: User): Promise<void> {
        await this.userRepository.create(user);
    }
}