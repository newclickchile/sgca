import { useState } from 'react'

import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'
import CardActionCollapse from '@/components/residents/CardActionCollapse'
import { useResident } from '@/contexts/residentContext'
import type { IAffiliationForm } from '@/types/residents/familyGroup/affiliationTab'
import { fetchData } from '@/utils/fetch'
import { fieldsFather, fieldsMother } from './form'

const URL_RESIDENTS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente`

const AffiliationTabPanel = () => {
  const { data: session } = useSession()
  const { resident, updateResident } = useResident()
  const [resetMotherForm, setResetMotherForm] = useState<boolean>(false)
  const [resetFatherForm, setResetFatherForm] = useState<boolean>(false)

  const {
    nombreMadre,
    ocupacionMadre,
    fechaNacimientoMadre,
    direccionMadre,
    condicionMadre,
    nombrePadre,
    ocupacionPadre,
    fechaNacimientoPadre,
    direccionPadre,
    condicionPadre
  } = resident

  const onSubmit = async (data: IAffiliationForm, type: 'madre' | 'padre') => {
    try {
      const updatedData: Partial<IAffiliationForm> =
        type === 'madre'
          ? {
              ...resident,
              nombreMadre: data.nombreMadre,
              ocupacionMadre: data.ocupacionMadre,
              fechaNacimientoMadre: data.fechaNacimientoMadre,
              direccionMadre: data.direccionMadre ? data.direccionMadre.toString() : '',
              condicionMadre: data.condicionMadre
            }
          : {
              ...resident,
              nombrePadre: data.nombrePadre,
              ocupacionPadre: data.ocupacionPadre,
              fechaNacimientoPadre: data.fechaNacimientoPadre,
              direccionPadre: data.direccionPadre ? data.direccionPadre.toString() : '',
              condicionPadre: data.condicionPadre
            }

      const queryParams = new URLSearchParams(updatedData as Record<string, string>).toString()

      const response = await fetchData({
        endpoint: `${URL_RESIDENTS}/padres/actualizar?idResidente=${resident.id}&${queryParams}`,
        session,
        method: 'POST'
      })

      console.log('response :', response)

      if (response.status === 200) {
        toast.success('Datos actualizados correctamente')
        updateResident({ ...resident, ...updatedData })
        type === 'madre' ? setResetMotherForm(true) : setResetFatherForm(true)
      }
    } catch (error) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <>
      <CardActionCollapse title='Filiación Madre'>
        <CustomForm<IAffiliationForm>
          fields={fieldsMother}
          defaultValues={{
            nombreMadre,
            ocupacionMadre,
            fechaNacimientoMadre,
            direccionMadre,
            condicionMadre
          }}
          onSubmit={data => onSubmit(data, 'madre')}
          resetForm={resetMotherForm}
        />
      </CardActionCollapse>
      <CardActionCollapse title='Filiación Padre'>
        <CustomForm<IAffiliationForm>
          fields={fieldsFather}
          resetForm={resetFatherForm}
          defaultValues={{
            nombrePadre,
            ocupacionPadre,
            fechaNacimientoPadre,
            direccionPadre,
            condicionPadre
          }}
          onSubmit={data => onSubmit(data, 'padre')}
        />
      </CardActionCollapse>
    </>
  )
}

export default AffiliationTabPanel
