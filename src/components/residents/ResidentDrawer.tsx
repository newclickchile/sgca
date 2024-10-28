import { useMemo } from 'react'

import { genderOptions } from '@/constants/genderOptions'
import CustomDrawer from '../CustomDrawer'
import type { FieldConfig } from '../forms/CustomForm'
import CustomForm from '../forms/CustomForm'
import type { INewResident } from '@/types/residents/service'
import type { AuxHousesType, AuxProgramType } from '@/types/aux'

type Props = {
  open: boolean
  houses: AuxHousesType[]
  programs: AuxProgramType[]
  handleClose: () => void
  onSubmit: (data: INewResident) => void
  resetForm?: boolean
  handleCancel: () => void
}

const fields: FieldConfig[] = [
  {
    name: 'rut',
    label: 'Rut',
    width: 12
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
    name: 'genero',
    label: 'Género',
    type: 'select',
    listValues: genderOptions,
    width: 12,
    isRequired: true
  },
  {
    name: 'casa',
    label: 'Casa/Residencia',
    type: 'select',
    width: 12,
    listValues: [],
    isRequired: true
  },
  {
    name: 'programa',
    label: 'Programa',
    type: 'select',
    width: 12,
    listValues: [],
    isRequired: true
  },
  {
    name: 'flagRsh',
    label: 'Registro Social de Hogares',
    width: 12,
    type: 'checkbox'
  }
]

const ResidentDrawer = (props: Props) => {
  const { open, handleClose, onSubmit, handleCancel, resetForm, houses, programs } = props

  const houseOptions = houses.map(house => ({
    id: house.id.toString(),
    nombre: house.casa
  }))

  const programOptions = programs.map(program => ({
    id: program.id,
    nombre: program.programa
  }))

  const updatedFields: FieldConfig[] = useMemo(() => {
    return fields.map(field => {
      if (field.name === 'casa') {
        return {
          ...field,
          listValues: houseOptions
        }
      }

      if (field.name === 'programa') {
        return {
          ...field,
          listValues: programOptions
        }
      }

      return field
    })
  }, [houseOptions, programOptions])

  return (
    <CustomDrawer open={open} handleClose={handleClose} title='Agregar nuevo Residente'>
      <CustomForm<INewResident>
        fields={updatedFields}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        resetForm={resetForm}
      />
    </CustomDrawer>
  )
}

export default ResidentDrawer
