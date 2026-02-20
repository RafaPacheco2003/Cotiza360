import { UserDateOfBirth } from "./valueObject/UserDateOfBirth";
import { UserEmail } from "./valueObject/UserEmail";
import { UserExt } from "./valueObject/UserExt";
import { UserId } from "./valueObject/UserId";
import { UserName } from "./valueObject/UserName";
import { UserNumber } from "./valueObject/UserNumber";
import { UserZipCode } from "./valueObject/UserZipCode";

export class User {
    id: UserId;
    name: UserName;
    lastName: UserName; 
    ext: UserExt;
    number: UserNumber;
    email: UserEmail;
    dateOfBirth: UserDateOfBirth;
    zipCode: UserZipCode;
    isActive: boolean;

    constructor(
        id: UserId,
        name: UserName,
        lastName: UserName,
        ext: UserExt,
        number: UserNumber,
        email: UserEmail,
        dateOfBirth: UserDateOfBirth,
        zipCode: UserZipCode,
        isActive: boolean
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.ext = ext;
        this.number = number;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.zipCode = zipCode;
        this.isActive = isActive;
    }

}