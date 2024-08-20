import { genderOptions } from '@/constants/genderOptions'
import type { NewResidentType } from '@/types/resident'
import CustomDrawer from '../CustomDrawer'
import type { FieldConfig } from '../forms/CustomForm'
import CustomForm from '../forms/CustomForm'

type Props = {
  open: boolean
  handleClose: () => void
  onSubmit: (data: NewResidentType) => void
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
    name: 'name',
    label: 'Nombre',
    isRequired: true,
    width: 12
  },
  {
    name: 'birthDate',
    label: 'Fecha Nacimiento',
    width: 12,
    isRequired: true,
    type: 'datepicker'
  },
  {
    name: 'sisCode',
    label: 'Código SIS',
    width: 12,
    isRequired: true
  },
  {
    name: 'genderId',
    label: 'Género',
    type: 'select',
    listValues: genderOptions,
    width: 12,
    isRequired: true
  }
]

const ResidentDrawer = (props: Props) => {
  const { open, handleClose, onSubmit, handleCancel, resetForm } = props

  return (
    <CustomDrawer open={open} handleClose={handleClose} title='Agregar nuevo Residente'>
      <CustomForm<NewResidentType> fields={fields} onSubmit={onSubmit} onCancel={handleCancel} resetForm={resetForm} />
    </CustomDrawer>
  )
}

export default ResidentDrawer
