import { User } from "../../User";

export interface CreateUserUseCase {

    create(user: User): Promise<void>;

}