import type { FieldConfig } from '@/components/forms/CustomForm'
import type { AuxParentsType } from '@/types/aux'

export const fields = (parents: AuxParentsType[], isDrawer: boolean = true): FieldConfig[] => {
  const parentsOptions = parents?.map(parent => ({
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

export const fieldsCurator: FieldConfig[] = [
  {
    name: 'nombreCurador',
    label: 'Nombre',
    isRequired: true,
    width: 4.5
  },
  {
    name: 'institucion',
    label: 'Institución',
    width: 5
  },
  {
    name: 'fechaEntrevista',
    label: 'Fecha entrevista',
    isRequired: true,
    type: 'datepicker',
    width: 2.5
  },

  {
    name: 'comentario',
    label: 'Comentario',
    type: 'multiline',
    rows: 3,
    width: 12
  }
]

export const fieldsResponsibleAdult: FieldConfig[] = [
  {
    name: 'rut',
    label: 'Rut',
    isRequired: true,
    width: 2.5
  },
  {
    name: 'nombreAdulto',
    label: 'Nombre',
    isRequired: true,
    width: 6.5
  },
  {
    name: 'telefono',
    label: 'Teléfono',
    width: 3
  },
  {
    name: 'domicilio',
    label: 'Dirección',
    isRequired: true,
    type: 'autocomplete'
  },

  {
    name: 'email',
    label: 'Email'
  }
]
