import React from 'react'

import { TabPanel } from '@mui/lab'

import { toast } from 'react-toastify'

import { useSession } from 'next-auth/react'

import CustomForm from '@/components/forms/CustomForm'
import CardActionCollapse from '@/components/residents/CardActionCollapse'
import { fetchClientData } from '@/utils/fetch'
import { fieldsFather, fieldsMother } from './form'
import type { IResident } from '@/types/residents/service'
import type { IAffiliationForm } from '@/types/residents/familyGroup/affiliationTab'

const URL_RESIDENTS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente`

const AffiliationTabPanel: React.FC<{ residentData: IResident }> = ({ residentData }) => {
  console.log('residentData :', residentData)
  const { data: session } = useSession()

  const affiliationData = {
    nombreMadre: residentData.nombreMadre,
    ocupacionMadre: residentData.ocupacionMadre,
    fechaNacimientoMadre: residentData.fechaNacimientoMadre,
    direccionMadre: residentData.direccionMadre,
    condicionMadre: residentData.condicionMadre,
    nombrePadre: residentData.nombrePadre,
    ocupacionPadre: residentData.ocupacionPadre,
    fechaNacimientoPadre: residentData.fechaNacimientoPadre,
    direccionPadre: residentData.direccionPadre,
    condicionPadre: residentData.condicionPadre
  }

  const onSubmit = async (data: IAffiliationForm) => {
    try {
      const queryParams = new URLSearchParams({ ...affiliationData, ...data } as unknown as Record<
        string,
        string
      >).toString()

      console.log('queryParams :', queryParams)

      const response = await fetchClientData({
        endpoint: `${URL_RESIDENTS}/padres/actualizar?idResidente=${residentData.id}&${queryParams}`,
        session,
        method: 'POST'
      })

      console.log('response :', response)

      toast.success('Datos actualizados correctamente')
    } catch (error) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <TabPanel value='1'>
      <CardActionCollapse title='Filiación Madre'>
        <CustomForm<IAffiliationForm>
          fields={fieldsMother}
          defaultValues={{
            nombreMadre: affiliationData.nombreMadre,
            fechaNacMadre: affiliationData.fechaNacimientoMadre,
            ocupacionMadre: affiliationData.ocupacionMadre,
            condicionMadre: affiliationData.condicionMadre,
            direccionMadre: affiliationData.direccionMadre
          }}
          onSubmit={data => onSubmit(data)}
        />
      </CardActionCollapse>
      <CardActionCollapse title='Filiación Padre'>
        <CustomForm<IAffiliationForm>
          fields={fieldsFather}
          defaultValues={{
            nombrePadre: affiliationData.nombrePadre,
            fechaNacPadre: affiliationData.fechaNacimientoPadre,
            ocupacionPadre: affiliationData.ocupacionPadre,
            condicionPadre: affiliationData.condicionPadre,
            direccionPadre: affiliationData.direccionPadre
          }}
          onSubmit={data => onSubmit(data)}
        />
      </CardActionCollapse>
    </TabPanel>
  )
}

export default AffiliationTabPanel
