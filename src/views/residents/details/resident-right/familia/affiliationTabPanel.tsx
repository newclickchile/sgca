import React from 'react'

import { TabPanel } from '@mui/lab'
import type { SubmitHandler } from 'react-hook-form'

import CardActionCollapse from '@/components/residents/CardActionCollapse'
import type { ResidentType } from '@/types/residents/service'
import CustomForm from '@/components/forms/CustomForm'
import type { AffiliationFormData } from '@/types/residents/affiliationFormData'
import { fields } from './form'

const AffiliationTabPanel: React.FC<{ residentData: ResidentType }> = ({ residentData }) => {
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

  const onSubmitMother: SubmitHandler<AffiliationFormData> = async data => {
    await onSubmit(data, 'mother')
  }

  const onSubmitFather: SubmitHandler<AffiliationFormData> = async data => {
    await onSubmit(data, 'father')
  }

  const onSubmit = async (data: AffiliationFormData, formType: 'mother' | 'father') => {
    console.log('data :', data, formType)
  }

  return (
    <TabPanel value='1'>
      <CardActionCollapse title='Filiación Madre' collapse={false}>
        <CustomForm<AffiliationFormData>
          fields={fields}
          defaultValues={{
            name: nombreMadre,
            birthDate: fechaNacimientoMadre,
            occupation: ocupacionMadre,
            condition: condicionMadre,
            direction: direccionMadre
          }}
          onSubmit={onSubmitMother}
        />
      </CardActionCollapse>
      <CardActionCollapse title='Filiación Padre'>
        <CustomForm<AffiliationFormData>
          fields={fields}
          defaultValues={{
            name: nombrePadre,
            birthDate: fechaNacimientoPadre,
            occupation: ocupacionPadre,
            condition: condicionPadre,
            direction: direccionPadre
          }}
          onSubmit={onSubmitFather}
        />
      </CardActionCollapse>
    </TabPanel>
  )
}

export default AffiliationTabPanel
