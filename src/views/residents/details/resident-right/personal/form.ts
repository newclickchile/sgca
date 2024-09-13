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
    name: 'name',
    label: 'Nombre',
    isRequired: true,
    width: 9

    // rules: {
    //   pattern: { value: /^.{8,16}$/, message: 'Debe ingresar entre 8 y 16 caracteres' }
    // }
  },
  {
    name: 'birthDate',
    label: 'Fecha Nacimiento',
    width: 3,
    isRequired: true,
    type: 'datepicker'
  },
  {
    name: 'sisCode',
    label: 'Código SIS',
    width: 4.5,
    isRequired: true
  },
  {
    name: 'genderId',
    label: 'Género',
    type: 'select',
    listValues: genderOptions,
    width: 4.5,
    isRequired: true
  },
  {
    name: 'houseId',
    label: 'Casa/Residencia',
    type: 'select',
    width: 6,

    listValues: [],
    isRequired: true
  },
  {
    name: 'flagRsh',
    label: 'Registro Social de Hogares',
    width: 6,
    type: 'checkbox'
  },
  {
    name: 'direction',
    label: 'Dirección',
    type: 'autocomplete',
    width: 12,
    isRequired: true
  },
  {
    name: 'disability',
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
