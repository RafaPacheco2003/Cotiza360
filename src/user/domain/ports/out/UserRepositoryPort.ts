import { User } from "../../User";

export interface UserRepositoryPort {

    create(user: User  ): Promise<void>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    delete(id: string): Promise<void>;
    
}