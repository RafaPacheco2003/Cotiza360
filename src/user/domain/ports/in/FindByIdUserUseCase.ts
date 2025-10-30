import { User } from "../../User";

export interface FindByIdUserUseCase {
    findById(id: string): Promise<User | null>;
}