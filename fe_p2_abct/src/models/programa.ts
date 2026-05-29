import type { NivelAcademico } from './nivel-academico'
export type Modalidad = 'Presencial' | 'Virtual' | 'Mixto'
export const modalidadClases: { label: string; value: Modalidad }[] = [
  { label: 'Presencial', value: 'Presencial' },
  { label: 'Virtual', value: 'Virtual' },
  { label: 'Mixto', value: 'Mixto' },
]

export interface Programa {
  id: number
  idNivelAcademico: number
  nombre: string
  descripcion: string
  version: number
  duracionMeses: number
  costo: number
  fechaInicio: string
  estado: string
  nivelAcademico: NivelAcademico
  modalidad: Modalidad
}
