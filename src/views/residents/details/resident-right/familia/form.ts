import type { FieldConfig } from '@/components/forms/CustomForm'

export const fields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Nombre',
    isRequired: true,
    width: 9
  },
  {
    name: 'birthDate',
    label: 'Fecha Nacimiento',
    width: 3,

    // isRequired: true,
    type: 'datepicker'
  },
  {
    name: 'ocupation',
    label: 'Ocupación',
    width: 6

    // isRequired: true
  },
  {
    name: 'condition',
    label: 'Condición / Estado',
    width: 6

    // isRequired: true
  },
  {
    name: 'direction',
    label: 'Dirección',
    type: 'autocomplete',
    width: 12

    // isRequired: true
  }
]
