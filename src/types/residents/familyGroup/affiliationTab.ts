import type { PlaceType } from '@/components/LocationAutoComplete'

export type IAffiliationForm = {
  nombrePadre?: string
  ocupacionPadre?: string
  fechaNacPadre?: string
  direccionPadre?: PlaceType | null | string
  condicionPadre?: string
  nombreMadre?: string
  ocupacionMadre?: string
  fechaNacMadre?: string
  direccionMadre?: PlaceType | null | string
  condicionMadre?: string
}
