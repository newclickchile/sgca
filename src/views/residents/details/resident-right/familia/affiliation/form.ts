import type { FieldConfig } from '@/components/forms/CustomForm'

export const fieldsMother: FieldConfig[] = [
  {
    name: 'nombreMadre',
    label: 'Nombre',
    isRequired: true,
    width: 9
  },
  {
    name: 'fechaNacimientoMadre',
    label: 'Fecha Nacimiento',
    width: 3,

    // isRequired: true,
    type: 'datepicker'
  },
  {
    name: 'ocupacionMadre',
    label: 'Ocupación',
    width: 6

    // isRequired: true
  },
  {
    name: 'condicionMadre',
    label: 'Condición / Estado',
    width: 6

    // isRequired: true
  },
  {
    name: 'direccionMadre',
    label: 'Dirección',
    type: 'autocomplete',
    width: 12

    // isRequired: true
  }
]
export const fieldsFather: FieldConfig[] = [
  {
    name: 'nombrePadre',
    label: 'Nombre',
    isRequired: true,
    width: 9
  },
  {
    name: 'fechaNacimientoPadre',
    label: 'Fecha Nacimiento',
    width: 3,

    // isRequired: true,
    type: 'datepicker'
  },
  {
    name: 'ocupacionPadre',
    label: 'Ocupación',
    width: 6

    // isRequired: true
  },
  {
    name: 'condicionPadre',
    label: 'Condición / Estado',
    width: 6

    // isRequired: true
  },
  {
    name: 'direccionPadre',
    label: 'Dirección',
    type: 'autocomplete',
    width: 12

    // isRequired: true
  }
]
