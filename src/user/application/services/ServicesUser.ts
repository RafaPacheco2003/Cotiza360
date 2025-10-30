import { CreateUserUseCase } from "src/user/domain/ports/in/CreateUserUseCase";
import { DeleteUserUsecase } from "src/user/domain/ports/in/DeleteUserUsecase";
import { FindAllUserUseCase } from "src/user/domain/ports/in/FindAllUserUseCase";
import { FindByIdUserUseCase } from "src/user/domain/ports/in/FindByIdUserUseCase";
import { User } from "src/user/domain/User";

export class ServiceUser implements CreateUserUseCase, FindAllUserUseCase, FindByIdUserUseCase, DeleteUserUsecase {




    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findAllUserUseCase: FindAllUserUseCase,
        private readonly findByIdUserUseCase: FindByIdUserUseCase,
        private readonly deleteUserUsecase: DeleteUserUsecase
    ) {}

    create(user: User): Promise<void> {
        return this.createUserUseCase.create(user);
    }
    findAll(): Promise<User[]> {
        return this.findAllUserUseCase.findAll();
    }
    findById(id: string): Promise<User | null> {
        return this.findByIdUserUseCase.findById(id);
    }
    delete(id: string): Promise<void> {
        return this.deleteUserUsecase.delete(id);
    }

}
