import type { FieldConfig } from '@/components/forms/CustomForm'
import { genderOptions } from '@/constants/genderOptions'

export const fields: FieldConfig[] = [
  {
    name: 'rut',
    label: 'Rut',
    width: 3,
    isRequired: true
  },
  {
    name: 'nombre',
    label: 'Nombre',
    isRequired: true,
    width: 6

    // rules: {
    //   pattern: { value: /^.{8,16}$/, message: 'Debe ingresar entre 8 y 16 caracteres' }
    // }
  },
  {
    name: 'fechaNacimiento',
    label: 'Fecha Nacimiento',
    placeholder: '01-01-2000',
    width: 3,
    isRequired: true,
    type: 'datepicker'
  },
  {
    name: 'codsis',
    label: 'Código SIS',
    width: 4,
    type: 'number',
    isRequired: true
  },
  {
    name: 'idGenero',
    label: 'Género',
    type: 'select',
    listValues: genderOptions,
    width: 4,
    isRequired: true
  },
  {
    name: 'flagRsh',
    label: 'Registro Social de Hogares',
    width: 4,
    type: 'checkbox'
  },
  {
    name: 'idCasa',
    label: 'Casa/Residencia',
    type: 'select',
    width: 6,
    listValues: [],
    isRequired: true
  },
  {
    name: 'idPrograma',
    label: 'Programa',
    type: 'select',
    width: 6,
    listValues: [],
    isRequired: true
  },
  {
    name: 'direccion',
    label: 'Dirección',
    type: 'autocomplete',
    width: 12,
    isRequired: true
  },
  {
    name: 'discapacidad',
    label: 'Discapacidad',
    type: 'multiline',
    rows: 3
  },
  {
    name: 'hobbie',
    label: 'Hobbie/Intereses',
    type: 'multiline',
    rows: 3
  }
]
