import type { FieldConfig } from '@/components/forms/CustomForm'
import type { AuxParentsType } from '@/types/aux'

export const fields = (parents: AuxParentsType[], isDrawer: boolean = true): FieldConfig[] => {
  const parentsOptions = parents.map(parent => ({
    id: parent.id.toString(),
    nombre: parent.parentesco
  }))

  return [
    {
      name: 'idPariente',
      label: 'Parentesco',
      isRequired: true,
      listValues: parentsOptions,
      type: 'select',
      width: isDrawer ? 12 : 3
    },
    {
      name: 'nombre',
      label: 'Nombre',
      width: isDrawer ? 12 : 9,
      isRequired: true
    },
    {
      name: 'direccion',
      label: 'Dirección',
      type: 'autocomplete',
      width: isDrawer ? 12 : 9
    },
    {
      name: 'telefono',
      label: 'Teléfono',
      width: isDrawer ? 12 : 3
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      width: isDrawer ? 12 : 6
    },
    {
      name: 'comentario',
      label: 'Comentario',
      type: 'multiline',
      rows: 3,
      width: isDrawer ? 12 : 6
    }
  ]
}
