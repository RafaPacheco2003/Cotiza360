import { UserId } from "./valueObject/UserId";
import { UserPasswordId } from "./valueObject/UserPasswordId";
import { UserPasswordValue } from "./valueObject/UserPasswordValue";
import { UserPasswordSalt } from "./valueObject/UserPasswordSalt";

export class UserPassword {
    id: UserPasswordId;
    userId: UserId;
    password: UserPasswordValue;
    salt: UserPasswordSalt;
    isActive: boolean;

    constructor(
        id: UserPasswordId,
        userId: UserId,
        password: UserPasswordValue,
        salt: UserPasswordSalt,
        isActive: boolean
    ) {
        this.id = id;
        this.userId = userId;
        this.password = password;
        this.salt = salt;
        this.isActive = isActive;
    }
}