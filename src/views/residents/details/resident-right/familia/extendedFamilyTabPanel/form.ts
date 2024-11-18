import type { FieldConfig } from '@/components/forms/CustomForm'

export const fields: FieldConfig[] = [
  {
    name: 'idPariente',
    label: 'Parentesco',
    isRequired: true,
    type: 'select',
    width: 3
  },
  {
    name: 'nombre',
    label: 'Nombre',
    width: 9,
    isRequired: true
  },
  {
    name: 'direccion',
    label: 'Dirección',
    type: 'autocomplete',
    width: 9
  },
  {
    name: 'telefono',
    label: 'Teléfono',
    width: 3
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email'
  },
  {
    name: 'comentario',
    label: 'Comentario',
    type: 'multiline',
    rows: 3
  }
]
