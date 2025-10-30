export interface FindAllUserUseCase {
    findAll(): Promise<User[]>;
}