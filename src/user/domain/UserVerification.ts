import { UserId } from "./valueObject/UserId";
import { UserVerificationId } from "./valueObject/UserVerificationId";
import { UserVerificationToken } from "./valueObject/UserVerificationToken";
import { UserVerificationExpiration } from "./valueObject/UserVerificationExpiration";

export class UserVerification {
    id: UserVerificationId;
    userId: UserId;
    token: UserVerificationToken;
    expiration: UserVerificationExpiration;
    used: boolean;
    isActive: boolean;
    createdAt: Date;

    constructor(
        id: UserVerificationId,
        userId: UserId,
        token: UserVerificationToken,
        expiration: UserVerificationExpiration,
        used: boolean,
        isActive: boolean,
        createdAt: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.expiration = expiration;
        this.used = used;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }
}