import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNivelAcademicoDto } from './dto/create-nivel-academico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivel-academico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelAcademico } from './entities/nivel-academico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NivelesAcademicosService {
  constructor(
    @InjectRepository(NivelAcademico)
    private readonly nivelAcademicoRepository: Repository<NivelAcademico>,
  ) {}

  async create(createNivelAcademicoDto: CreateNivelAcademicoDto): Promise<NivelAcademico> {
    let nivelAcademico = await this.nivelAcademicoRepository.findOneBy({
      nombre: createNivelAcademicoDto.nombre,
    });
    if (nivelAcademico) throw new ConflictException('El nivel académico ya existe');

    nivelAcademico = new NivelAcademico();
    Object.assign(nivelAcademico, createNivelAcademicoDto);
    return this.nivelAcademicoRepository.save(nivelAcademico);
  }

  async findAll(): Promise<NivelAcademico[]> {
    return this.nivelAcademicoRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<NivelAcademico> {
    const nivelAcademico = await this.nivelAcademicoRepository.findOneBy({ id });
    if (!nivelAcademico) throw new NotFoundException('El nivel académico no existe');
    return nivelAcademico;
  }

  async update(id: number, updateNivelAcademicoDto: UpdateNivelAcademicoDto): Promise<NivelAcademico> {
    const nivelAcademico = await this.findOne(id);
    Object.assign(nivelAcademico, updateNivelAcademicoDto);
    return this.nivelAcademicoRepository.save(nivelAcademico);
  }

  async remove(id: number): Promise<NivelAcademico> {
    const nivelAcademico = await this.findOne(id);
    return this.nivelAcademicoRepository.softRemove(nivelAcademico);
  }
}
