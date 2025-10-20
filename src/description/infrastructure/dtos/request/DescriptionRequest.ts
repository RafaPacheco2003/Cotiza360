// DescriptionRequest.ts
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class DescriptionRequest {
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @Length(10, 300, {
    message: 'La descripción debe tener entre 10 y 300 caracteres',
  })
  description: string;
  modelId?: string;
}
