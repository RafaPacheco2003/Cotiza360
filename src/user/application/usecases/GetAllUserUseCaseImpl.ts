import { Inject } from "@nestjs/common";
import { FindAllUserUseCase } from "src/user/domain/ports/in/FindAllUserUseCase";
import type { UserRepositoryPort } from "src/user/domain/ports/out/UserRepositoryPort";
import { User } from "src/user/domain/User";

export class GetAllUserUseCaseImpl implements FindAllUserUseCase {

    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

}