import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserRequest {
    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 100)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(7, 15)
    number: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 10)
    ext: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 10)
    dateOfBirth: Date;

    @IsNotEmpty()
@IsString()
@Length(5, 10)
zipCode: string;

}