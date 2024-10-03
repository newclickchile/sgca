import React from 'react'

import { TabPanel } from '@mui/lab'

import { toast } from 'react-toastify'

import { useSession } from 'next-auth/react'

import CustomForm from '@/components/forms/CustomForm'
import CardActionCollapse from '@/components/residents/CardActionCollapse'
import type { AffiliationFormData } from '@/types/residents/affiliationFormData'
import type { ResidentType } from '@/types/residents/service'
import { fetchClientData } from '@/utils/fetch'
import { fieldsFather, fieldsMother } from './form'

const URL_RESIDENTS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente`

const AffiliationTabPanel: React.FC<{ residentData: ResidentType }> = ({ residentData }) => {
  const { data: session } = useSession()

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
  } = residentData

  const onSubmit = async (data: AffiliationFormData, formType: 'mother' | 'father') => {
    console.log('data :', data, formType)

    // const queryParams = new URLSearchParams(data as unknown as Record<string, string>).toString()

    // console.log('queryParams :', queryParams)

    //nombreMadre=xxxx&fechaNacMadre=2024-08-10&ocupacionMadre=aaa&condicionMadre=aaaa&direccionMadre=aaaa

    const response = await fetchClientData({
      endpoint: `${URL_RESIDENTS}/padres/actualizar?idResidente=${residentData.id}`,
      session,
      method: 'POST',
      data
    })

    console.log('response :', response)

    toast.success('Datos actualizados correctamente')
  }

  return (
    <TabPanel value='1'>
      <CardActionCollapse title='Filiación Madre'>
        <CustomForm<AffiliationFormData>
          fields={fieldsMother}
          defaultValues={{
            nombreMadre,
            fechaNacMadre: fechaNacimientoMadre,
            ocupacionMadre,
            condicionMadre,
            direccionMadre
          }}
          onSubmit={data => onSubmit(data, 'mother')}
        />
      </CardActionCollapse>
      <CardActionCollapse title='Filiación Padre'>
        <CustomForm<AffiliationFormData>
          fields={fieldsFather}
          defaultValues={{
            nombrePadre,
            fechaNacPadre: fechaNacimientoPadre,
            ocupacionPadre,
            condicionPadre,
            direccionPadre
          }}
          onSubmit={data => onSubmit(data, 'father')}
        />
      </CardActionCollapse>
    </TabPanel>
  )
}

export default AffiliationTabPanel
