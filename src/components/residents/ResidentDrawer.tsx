import { genderOptions } from '@/constants/genderOptions'
import CustomDrawer from '../CustomDrawer'
import type { FieldConfig } from '../forms/CustomForm'
import CustomForm from '../forms/CustomForm'
import type { INewResident } from '@/types/residents/service'

type Props = {
  open: boolean
  handleClose: () => void
  onSubmit: (data: INewResident) => void
  resetForm?: boolean
  handleCancel: () => void
}

const fields: FieldConfig[] = [
  {
    name: 'rut',
    label: 'Rut',
    width: 12,
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
    type: 'checkbox',
    isRequired: true
  }
]

const ResidentDrawer = (props: Props) => {
  const { open, handleClose, onSubmit, handleCancel, resetForm } = props

  return (
    <CustomDrawer open={open} handleClose={handleClose} title='Agregar nuevo Residente'>
      <CustomForm<INewResident> fields={fields} onSubmit={onSubmit} onCancel={handleCancel} resetForm={resetForm} />
    </CustomDrawer>
  )
}

export default ResidentDrawer
