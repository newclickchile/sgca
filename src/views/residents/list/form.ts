import type { FieldConfig } from '@/components/forms/CustomForm'
import { genderOptions } from '@/constants/genderOptions'
import type { AuxHousesType, AuxProgramType } from '@/types/aux'

export const fields = (houses: AuxHousesType[], programs: AuxProgramType[]): FieldConfig[] => {
  const houseOptions = houses?.map(house => ({
    id: house.id.toString(),
    nombre: house.casa
  }))

  const programOptions = programs?.map(program => ({
    id: program.id,
    nombre: program.programa
  }))

  return [
    {
      name: 'idCasa',
      label: 'Casa/Residencia',
      type: 'select',
      width: 12,
      listValues: houseOptions,
      isRequired: true
    },
    {
      name: 'nombre',
      label: 'Nombre',
      isRequired: true,
      width: 12
    },
    {
      name: 'fechaNacimiento',
      label: 'Fecha Nacimiento',
      placeholder: '01-12-1999',
      width: 12,
      isRequired: true,
      type: 'datepicker'
    },
    {
      name: 'rut',
      label: 'Rut',
      width: 12
    },
    {
      name: 'idGenero',
      label: 'Género',
      type: 'select',
      listValues: genderOptions,
      width: 12,
      isRequired: true
    },
    {
      name: 'idPrograma',
      label: 'Programa',
      type: 'select',
      width: 12,
      listValues: programOptions,
      isRequired: true
    },
    {
      name: 'codsis',
      label: 'Código SIS',
      width: 12,
      isRequired: true
    },
    {
      name: 'flagRsh',
      label: 'Registro Social de Hogares',
      width: 12,
      type: 'checkbox'
    }
  ]
}
