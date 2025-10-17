import { IsNotEmpty, IsString, Length } from 'class-validator';

export class BranchRequest {
  @IsNotEmpty({ message: 'El nombre de la marca es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(2, 20, { message: 'El nombre debe tener entre 2 y 20 caracteres' })
  name: string;
}
