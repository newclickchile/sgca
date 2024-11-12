import type { FieldConfig } from '@/components/forms/CustomForm'

export const fieldsParents: FieldConfig[] = [
  {
    name: 'idParentesco',
    label: 'Parentesco',
    type: 'select',
    listValues: [],
    isRequired: true,
    width: 5
  },
  {
    name: 'antecedentes',
    label: 'Enfermedad relevante',
    width: 7
  }
]
