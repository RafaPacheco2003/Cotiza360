import { Inject } from "@nestjs/common";
import { DeleteUserUsecase } from "src/user/domain/ports/in/DeleteUserUsecase";
import type { UserRepositoryPort } from "src/user/domain/ports/out/UserRepositoryPort";

export class DeleteUserUsecaseImpl implements DeleteUserUsecase {
    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort
    ) {}

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

}