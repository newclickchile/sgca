import CustomDrawer from '@/components/CustomDrawer'
import CustomForm from '@/components/forms/CustomForm'
import { IBrother } from '@/types/residents/familyGroup/brothersTab'
import { fields } from './formDrawer'

type Props = {
  residentId: number
  open: boolean
  handleClose: () => void
  onSubmit: (data: IBrother) => void
  resetForm?: boolean
  handleCancel: () => void
}

const NewBrotherDrawer = (props: Props) => {
  const { residentId, open, handleClose, onSubmit, handleCancel, resetForm } = props

  return (
    <CustomDrawer open={open} handleClose={handleClose} title='Agregar nuevo Hermano'>
      <CustomForm<IBrother>
        fields={fields}
        defaultValues={{
          fechaNacimiento: '',
          nombre: '',
          comentario: '',
          idResidente: residentId,
          ingresadoAlaRed: false
        }}
        onSubmit={onSubmit}
      />
    </CustomDrawer>
  )
}

export default NewBrotherDrawer
