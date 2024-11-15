import type { FieldConfig } from '@/components/forms/CustomForm'

export const fields: FieldConfig[] = [
  {
    name: 'nombre',
    label: 'Nombre',
    isRequired: true,
    width: 12
  },
  {
    name: 'fechaNacimiento',
    label: 'Fecha Nacimiento',
    width: 12,
    type: 'datepicker'
  },
  {
    name: 'comentario',
    label: 'Comentario',
    type: 'multiline',
    width: 12,
    rows: 3
  },
  {
    name: 'ingresadoAlaRed',
    label: 'Ingresado en la red',
    width: 12,
    type: 'checkbox'
  }
]
