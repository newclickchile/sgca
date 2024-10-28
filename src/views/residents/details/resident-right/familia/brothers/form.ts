import type { FieldConfig } from '@/components/forms/CustomForm'

export const fields: FieldConfig[] = [
  {
    name: 'brotherName',
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
    name: 'comment',
    label: 'Comentario',
    type: 'multiline',
    rows: 3
  }
]
