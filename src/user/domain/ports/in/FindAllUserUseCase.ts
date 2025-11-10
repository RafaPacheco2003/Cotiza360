import { User } from "../../User";

export interface FindAllUserUseCase {
    findAll(): Promise<User[]>;
}