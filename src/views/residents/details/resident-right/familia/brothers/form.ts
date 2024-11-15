import type { FieldConfig } from '@/components/forms/CustomForm'

export const fields: FieldConfig[] = [
  {
    name: 'nombre',
    label: 'Nombre',
    isRequired: true,
    width: 9
  },
  {
    name: 'fechaNacimiento',
    label: 'Fecha Nacimiento',
    width: 3,
    type: 'datepicker'
  },
  {
    name: 'comentario',
    label: 'Comentario',
    type: 'multiline',
    width: 9,
    rows: 3
  },
  {
    name: 'ingresadoAlaRed',
    label: 'Ingresado en la red',
    width: 3,
    type: 'checkbox'
  }
]
