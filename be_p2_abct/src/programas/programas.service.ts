import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
  ) {}

  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    let programa = await this.programaRepository.findOneBy({
      idNivelAcademico: createProgramaDto.idNivelAcademico,
      nombre: createProgramaDto.nombre,
    });
    if (programa) throw new ConflictException('El programa ya existe para ese nivel académico');

    programa = new Programa();
    Object.assign(programa, createProgramaDto);
    return this.programaRepository.save(programa);
  }

  async findAll(): Promise<Programa[]> {
    return this.programaRepository.find({
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        version: true,
        duracionMeses: true,
        costo: true,
        fechaInicio: true,
        estado: true,
        nivelAcademico: { id: true, nombre: true },
      },
      relations: { nivelAcademico: true },
      order: { nivelAcademico: { nombre: 'ASC' }, nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Programa> {
    const programa = await this.programaRepository.findOne({
      where: { id },
      relations: { nivelAcademico: true },
    });
    if (!programa) throw new NotFoundException('El programa no existe');
    return programa;
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto): Promise<Programa> {
    const programa = await this.findOne(id);
    Object.assign(programa, updateProgramaDto);
    return this.programaRepository.save(programa);
  }

  async remove(id: number): Promise<Programa> {
    const programa = await this.findOne(id);
    return this.programaRepository.softRemove(programa);
  }
}
