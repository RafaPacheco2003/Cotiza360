import { CreateModelUseCase } from "src/model/domain/ports/in/CreateModelUseCase";

export class ServiceModel implements CreateModelUseCase, FindByIdModelUseCase, FindAllModelUseCase, DeleteModelUseCase {



    constructor(
        private readonly createModelUseCase: CreateModelUseCase,
        private readonly findByIdModelUseCase: FindByIdModelUseCase,
        private readonly findAllModelUseCase: FindAllModelUseCase,
        private readonly deleteModelUseCase: DeleteModelUseCase,
    ) {}
    ){}
}