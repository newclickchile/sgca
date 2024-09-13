import type { PlaceType } from '@/components/LocationAutoComplete'

export type AffiliationFormData = {
  name?: string
  birthDate?: string
  occupation?: string
  direction?: PlaceType | null | string
  condition?: string
}
