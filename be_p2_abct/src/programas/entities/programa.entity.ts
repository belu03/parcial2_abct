import { NivelAcademico } from 'src/niveles-academicos/entities/nivel-academico.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EstadoPrograma {
  EN_PLANIFICACION = 'En Planificación',
  EN_CURSO = 'En curso',
  FINALIZADO = 'Finalizado',
}

export enum ModalidadPrograma {
  PRESENCIAL = 'Presencial',
  VIRTUAL = 'Virtual',
  MIXTO = 'Mixto',
}

@Entity('programas')
export class Programa {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_nivel_academico' })
  idNivelAcademico: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 2000 })
  descripcion: string;

  @Column('integer')
  version: number;

  @Column('integer', { name: 'duracion_meses' })
  duracionMeses: number;

  @Column('decimal', { precision: 10, scale: 2 })
  costo: number;

  @Column('date', { name: 'fecha_inicio' })
  fechaInicio: string;

  @Column({
    type: 'enum',
    enum: EstadoPrograma,
    default: EstadoPrograma.EN_PLANIFICACION,
  })
  estado: EstadoPrograma;

  @Column({
  type: 'enum',
  enum: ModalidadPrograma,
  default: ModalidadPrograma.PRESENCIAL,
  })
  modalidad: ModalidadPrograma;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  
  @ManyToOne(() => NivelAcademico, (nivelAcademico) => nivelAcademico.programas)
  @JoinColumn({ name: 'id_nivel_academico', referencedColumnName: 'id' })
  nivelAcademico: NivelAcademico;
}
