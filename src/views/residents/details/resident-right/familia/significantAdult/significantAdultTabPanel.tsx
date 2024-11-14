import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

import CustomForm from '@/components/forms/CustomForm'
import type { ISignificantAdult, ISignificantAdultForm } from '@/types/residents/familyGroup/significantAdultTab'
import { fields } from './form'
import { fetchData } from '@/utils/fetch'
import { useResident } from '@/contexts/residentContext'

const URL_SIGNIFICANT_ADULT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/adulto/`

const SignificantAdultTabPanel = ({ significantAdultData }: { significantAdultData: ISignificantAdult }) => {
  const { resident } = useResident()
  const { data: session } = useSession()

  const onSubmit = async (data: ISignificantAdultForm, significantAdultId?: number) => {
    try {
      const queryParams = new URLSearchParams(data as unknown as Record<string, string>).toString()
      const endpointAction = significantAdultData ? '/editar' : '/crear'
      const endpointBase = `${URL_SIGNIFICANT_ADULT}${endpointAction}?idResidente=${resident.id}&${queryParams}`
      const endpoint = significantAdultId ? `${endpointBase}&idAdulto=${significantAdultId}` : endpointBase

      const response = await fetchData({
        endpoint,
        method: 'POST'
      })

      console.log('response :', response)

      if (response.status === 200) {
        toast.success(`Adulto significativo ${significantAdultData ? 'actualizado' : 'creado'} correctamente`)
      }
    } catch (error) {
      console.log(error)
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <>
      <CustomForm<ISignificantAdultForm>
        fields={fields}
        defaultValues={{
          nombre: significantAdultData?.nombre,
          relacion: significantAdultData?.relacion,
          direccion: significantAdultData?.direccion,
          email: significantAdultData?.email,
          telefono: significantAdultData?.telefono
        }}
        onSubmit={data => onSubmit(data, significantAdultData?.id)}
      />
    </>
  )
}

export default SignificantAdultTabPanel
