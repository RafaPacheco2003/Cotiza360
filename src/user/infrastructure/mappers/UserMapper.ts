import { User as PrismaUser } from '@prisma/client';
import { User } from 'src/user/domain/User';
import { UserDateOfBirth } from 'src/user/domain/valueObject/UserDateOfBirth';
import { UserEmail } from 'src/user/domain/valueObject/UserEmail';
import { UserExt } from 'src/user/domain/valueObject/UserExt';
import { UserId } from 'src/user/domain/valueObject/UserId';
import { UserName } from 'src/user/domain/valueObject/UserName';
import { UserNumber } from 'src/user/domain/valueObject/UserNumber';
import { UserZipCode } from 'src/user/domain/valueObject/UserZipCode';
import { UserRequest } from '../dtos/request/UserRequest';
import { UserResponse } from '../dtos/response/UserResponse';
import { v4 as uuidv4 } from 'uuid';

class ValueObjectFactory {
  static user = {
    id: (value: string) => new UserId(value),
    name: (value: string) => new UserName(value),
    lastName: (value: string) => new UserName(value),
    ext: (value: string) => new UserExt(value),
    number: (value: string) => new UserNumber(value),
    email: (value: string) => new UserEmail(value),
    dateOfBirth: (value: Date) => new UserDateOfBirth(value),
    zipCode: (value: string) => new UserZipCode(value),
  };
}

export class UserMapper {
  // 🔁 PRISMA → DOMINIO
  static fromPrisma = {
    toDomain: (data: PrismaUser): User =>
      new User(
        ValueObjectFactory.user.id(data.id),
        ValueObjectFactory.user.name(data.name),
        ValueObjectFactory.user.lastName(data.lastName),
        ValueObjectFactory.user.ext(data.ext),
        ValueObjectFactory.user.number(data.number),
        ValueObjectFactory.user.email(data.email),
        ValueObjectFactory.user.dateOfBirth(data.dateOfBirth),
        ValueObjectFactory.user.zipCode(data.zipCode),
      ),
  };

  // 🔁 REQUEST → DOMINIO
  static fromRequest = {
    toDomain: (data: UserRequest): User =>
      new User(
        ValueObjectFactory.user.id(uuidv4()),
        ValueObjectFactory.user.name(data.name),
        ValueObjectFactory.user.lastName(data.lastName),
        ValueObjectFactory.user.ext(data.ext),
        ValueObjectFactory.user.number(data.number),
        ValueObjectFactory.user.email(data.email),
        ValueObjectFactory.user.dateOfBirth(data.dateOfBirth),
        ValueObjectFactory.user.zipCode(data.zipCode),
      ),
  };

  // 🔁 DOMINIO → PRISMA / RESPONSE
  static fromDomain = {
    toPrisma: (data: User): PrismaUser =>
      ({
        id: data.id.value,
        name: data.name.value,
        lastName: data.lastName.value,
        ext: data.ext.value,
        number: data.number.value,
        email: data.email.value,
        dateOfBirth: new Date(data.dateOfBirth.value),
        zipCode: data.zipCode.value,
      } as PrismaUser),

    toResponse: (data: User): UserResponse => ({
      id: data.id.value,
      fullName: `${data.name.value} ${data.lastName.value}`,
      email: data.email.value,
      number: data.number.value,
      ext: data.ext.value,
      zipCode: data.zipCode.value,
      dateOfBirth: data.dateOfBirth.value,
    }),
  };
}

// ✅ Exportaciones limpias
export const prismaToDomain = UserMapper.fromPrisma.toDomain;
export const requestToDomain = UserMapper.fromRequest.toDomain;
export const domainToPrisma = UserMapper.fromDomain.toPrisma;
export const domainToResponse = UserMapper.fromDomain.toResponse;
