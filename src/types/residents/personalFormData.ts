import type { PlaceType } from '@/components/LocationAutoComplete'

export type PersonalFormData = {
  rut: string
  name: string
  birthDate: string
  flagRsh: boolean
  direction?: PlaceType | null | string
  sisCode?: number
  houseId: number
  disability?: string
  hobbie?: string
  gender: string
}
