import { IsNotEmpty, IsString, Length } from 'class-validator';

export class BranchRequest {
  @IsNotEmpty({ message: 'El nombre de la sucursal es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  name: string;
}
