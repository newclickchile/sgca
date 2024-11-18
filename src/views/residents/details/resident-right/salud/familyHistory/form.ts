import { FieldConfig } from '@/components/forms/CustomForm'
import { AuxParentsType } from '@/types/aux'

export const fields = (parents: AuxParentsType[], isDrawer: boolean = true): FieldConfig[] => {
  const parentsOptions = parents.map(parent => ({
    id: parent.id.toString(),
    nombre: parent.parentesco
  }))

  return [
    {
      name: 'idParentesco',
      label: 'Parentesco',
      isRequired: true,
      type: 'select',
      listValues: parentsOptions,
      width: isDrawer ? 12 : 9
    },
    {
      name: 'antecedentes',
      label: 'Enfermedad relevante',
      type: 'multiline',
      width: isDrawer ? 12 : 3,
      rows: 3
    }
  ]
}
