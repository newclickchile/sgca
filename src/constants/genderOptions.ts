import { Gender } from '@/enums'
import type { GenderOption } from '@/types/forms'

export const genderOptions: GenderOption[] = [
  {
    id: Gender.Male,
    nombre: 'Masculino'
  },
  {
    id: Gender.Female,
    nombre: 'Femenino'
  }
]
