import { Gender } from '@/enums'
import type { GenderOption } from '@/types/commons'

export const genderOptions: GenderOption[] = [
  {
    id: Gender.Male,
    nombre: 'Masculino'
  },
  {
    id: Gender.Female,
    nombre: 'Femenino'
  },
  {
    id: Gender.Other,
    nombre: 'Otro'
  }
]
