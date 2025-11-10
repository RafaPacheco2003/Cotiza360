import { Controller, Module } from "@nestjs/common";
import { ControllerUser } from "./infrastructure/controllers/ControllerUser";
import { PostgresUserRepositoryAdapter } from "./infrastructure/repositories/PostgresUserRepositoryAdapter";
import { CreateUserUseCaseImpl } from "./application/usecases/CreateUserUseCaseImpl";
import { GetAllUserUseCaseImpl } from "./application/usecases/GetAllUserUseCaseImpl";
import { GetByIdUserUseCaseImpl } from "./application/usecases/GetByIdUserUseCaseImpl";
import { DeleteUserUsecaseImpl } from "./application/usecases/DeleteUserUseCaseImpl";
import { ServiceUser } from "./application/services/ServicesUser";


@Module({
    controllers: [ControllerUser],
    providers: [

        PostgresUserRepositoryAdapter,

        {
            provide: 'UserRepositoryPort',
            useClass: PostgresUserRepositoryAdapter,
        },
        {
            provide: 'CreateUserUseCase',
            useClass: CreateUserUseCaseImpl,
        },
        {   provide: 'GetAllUserUseCase',
            useClass: GetAllUserUseCaseImpl,
        },
        {
            provide: 'GetByIdUserUseCase',
            useClass: GetByIdUserUseCaseImpl,
        },
        {
            provide: 'DeleteUserUseCase',
            useClass: DeleteUserUsecaseImpl,
        },
        {
            provide: ServiceUser,
            useFactory: (create, getAll, getById, del) =>
                new ServiceUser(create, getAll, getById, del),
            inject: [
                'CreateUserUseCase',
                'GetAllUserUseCase',
                'GetByIdUserUseCase',
                'DeleteUserUseCase',
            ],
        }
        
    ],

})

export class UserModule {}