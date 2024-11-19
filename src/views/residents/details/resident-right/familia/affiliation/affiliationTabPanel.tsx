'use client'

import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'
import CardActionCollapse from '@/components/residents/CardActionCollapse'

import { updateAffiliationData } from '@/server-actions/residentTabs/personal/updateAffiliationData'
import type { IAffiliation } from '@/types/residents/familyGroup/affiliationTab'
import { fieldsFather, fieldsMother } from './form'
import type { IResident } from '@/types/residents/service'

const AffiliationTabPanel = ({ residentId, resident }: { residentId: number; resident: IResident }) => {
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

  const onSubmit = async (data: IAffiliation, type: 'madre' | 'padre') => {
    try {
      const affiliationData: IAffiliation = {
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
      }

      const updatedData: Partial<IAffiliation> =
        type === 'madre'
          ? {
              ...affiliationData,
              nombreMadre: data.nombreMadre,
              ocupacionMadre: data.ocupacionMadre,
              fechaNacimientoMadre: data.fechaNacimientoMadre,
              direccionMadre: data.direccionMadre ? data.direccionMadre.toString() : '',
              condicionMadre: data.condicionMadre
            }
          : {
              ...affiliationData,
              nombrePadre: data.nombrePadre,
              ocupacionPadre: data.ocupacionPadre,
              fechaNacimientoPadre: data.fechaNacimientoPadre,
              direccionPadre: data.direccionPadre ? data.direccionPadre.toString() : '',
              condicionPadre: data.condicionPadre
            }

      await updateAffiliationData(residentId, updatedData)

      toast.success('Datos actualizados correctamente')
    } catch (error) {
      console.log('error :', error)
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <>
      <CardActionCollapse title='Filiación Madre'>
        <CustomForm<IAffiliation>
          fields={fieldsMother}
          defaultValues={{
            nombreMadre,
            ocupacionMadre,
            fechaNacimientoMadre,
            direccionMadre,
            condicionMadre
          }}
          onSubmit={data => onSubmit(data, 'madre')}
        />
      </CardActionCollapse>
      <CardActionCollapse title='Filiación Padre'>
        <CustomForm<IAffiliation>
          fields={fieldsFather}
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
