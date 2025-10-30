import { Inject } from "@nestjs/common";
import { FindByIdUserUseCase } from "src/user/domain/ports/in/FindByIdUserUseCase";
import type { UserRepositoryPort } from "src/user/domain/ports/out/UserRepositoryPort";
import { User } from "src/user/domain/User";

export  class GetByIdUserUseCaseImpl implements FindByIdUserUseCase{

    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort
    ) {}

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

}