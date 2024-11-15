import type { FieldConfig } from '@/components/forms/CustomForm'

export const fields: FieldConfig[] = [
  {
    name: 'nombre',
    label: 'Nombre',
    isRequired: true,
    width: 9
  },
  {
    name: 'relacion',
    label: 'Relación',
    width: 3
  },
  {
    name: 'direccion',
    type: 'autocomplete',
    label: 'Dirección',
    width: 9
  },
  {
    name: 'email',
    label: 'Email',
    width: 9
  },
  {
    name: 'telefono',
    label: 'Teléfono',
    width: 3,
    type: 'number'
  }
]
