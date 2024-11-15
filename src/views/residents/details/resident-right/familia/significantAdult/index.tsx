'use client'

import CustomForm from '@/components/forms/CustomForm'
import { updateSignificantAdult } from '@/server-actions/residentTabs/familyGroup/updateSignificantAdult'
import { ISignificantAdult } from '@/types/residents/familyGroup/significantAdultTab'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { fields } from './form'

const SignificantAdultTabPanel = ({ significantAdultData }: { significantAdultData: ISignificantAdult }) => {
  const onSubmit: SubmitHandler<ISignificantAdult> = async updateSignificantAdultData => {
    try {
      await updateSignificantAdult(updateSignificantAdultData)
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <>
      <CustomForm<ISignificantAdult>
        fields={fields}
        defaultValues={{
          nombre: significantAdultData?.nombre,
          relacion: significantAdultData?.relacion,
          direccion: significantAdultData?.direccion,
          email: significantAdultData?.email,
          telefono: significantAdultData?.telefono,
          id: significantAdultData.id,
          idResidente: significantAdultData.idResidente
        }}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default SignificantAdultTabPanel
