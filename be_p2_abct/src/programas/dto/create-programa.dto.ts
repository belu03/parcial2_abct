import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { EstadoPrograma } from '../entities/programa.entity';
import { ModalidadPrograma } from '../entities/programa.entity';

export class CreateProgramaDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del nivel académico es obligatorio' })
  @IsInt({ message: 'El id del nivel académico debe ser un número entero' })
  @Min(1, { message: 'El id del nivel académico debe ser un número entero positivo' })
  readonly idNivelAcademico: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La descripcion es obligatoria' })
  @IsString({ message: 'La descripcion debe ser una cadena de texto' })
  @MaxLength(2000, { message: 'La descripcion no puede tener más de 2000 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly descripcion: string;

  @ApiProperty()
  @IsDefined({ message: 'La version es obligatoria' })
  @IsInt({ message: 'La version debe ser un número entero' })
  @Min(1, { message: 'La version debe ser un número entero positivo' })
  readonly version: number;

  @ApiProperty()
  @IsDefined({ message: 'La duracion en meses es obligatoria' })
  @IsInt({ message: 'La duracion en meses debe ser un número entero' })
  @Min(1, { message: 'La duracion en meses debe ser un número entero positivo' })
  readonly duracionMeses: number;

  @ApiProperty()
  @IsDefined({ message: 'El costo es obligatorio' })
  @IsNumber({}, { message: 'El costo debe ser un número' })
  @Min(0, { message: 'El costo no puede ser negativo' })
  readonly costo: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  @IsString({ message: 'La fecha de inicio debe tener formato YYYY-MM-DD' })
  readonly fechaInicio: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La modalidad de clases es obligatoria' })
  @IsString({ message: 'La modalidad de clases debe ser una cadena de texto' })
  readonly modalidadClases: string;

  @ApiProperty({ enum: EstadoPrograma })
  @IsDefined({ message: 'El estado es obligatorio' })
  @IsEnum(EstadoPrograma, {
    message: `El estado debe ser: ${Object.values(EstadoPrograma).join(', ')}`,
  })
  readonly estado: EstadoPrograma;

  @ApiProperty({ enum: ModalidadPrograma })
  @IsDefined({ message: 'Es necesario especificar la modalidad de clases' })
  @IsEnum(ModalidadPrograma, {
  message: `La modalidad debe ser: ${Object.values(ModalidadPrograma).join(', ')}`,
  })
   readonly modalidad: ModalidadPrograma;
}
