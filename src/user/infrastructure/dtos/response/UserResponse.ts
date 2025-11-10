export class UserResponse {
    id: string;
    fullName: string;
    email: string;
    number: string;
    ext: string;
    zipCode: string;
    dateOfBirth: Date;

    constructor(
        id: string,
        fullName: string,
        email: string,
        number: string,
        ext: string,
        zipCode: string,
        dateOfBirth: Date,
    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.number = number;
        this.ext = ext;
        this.zipCode = zipCode;
        this.dateOfBirth = dateOfBirth;
    }
}