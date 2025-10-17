import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ModelRequest {
  @IsNotEmpty({ message: 'El nombre del modelo es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El ID de la marca es requerido' })
  @IsString({ message: 'El ID debe ser una cadena de texto' })
  branchId: string;
}
