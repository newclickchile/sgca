'use client'

import { Box, Divider } from '@mui/material'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'
import CardActionCollapse from '@/components/residents/CardActionCollapse'
import {
  updateCurator,
  updateJudicialInformation,
  updateResponsibleAdult
} from '@/server-actions/residentTabs/judicial/updateJudicialInformation'
import type { AuxCausesAdmissionType } from '@/types/aux'
import type {
  IJudicialCurator,
  IJudicialInformation,
  IJudicialResponsibleAdult
} from '@/types/residents/judicial/judicialInformation'
import { fields } from './form'
import { fieldsCurator, fieldsResponsibleAdult } from '../../familia/extendedFamilyTabPanel/form'

const JudicialInformationTabPanel = ({
  residentId,
  judicialData,
  admissionCauses
}: {
  residentId: number
  judicialData: IJudicialInformation
  admissionCauses: AuxCausesAdmissionType[]
}) => {
  const onSubmit: SubmitHandler<IJudicialInformation> = async updateData => {
    try {
      console.log('updateData :', updateData)

      await updateJudicialInformation(residentId, updateData)
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  const onSubmitCurator: SubmitHandler<IJudicialCurator> = async updateData => {
    try {
      console.log('updateData :', updateData)

      await updateCurator(residentId, updateData)
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  const onSubmitResponsibleAdult: SubmitHandler<IJudicialResponsibleAdult> = async updateData => {
    try {
      console.log('updateData :', updateData)

      await updateResponsibleAdult(residentId, updateData)
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <>
      <CustomForm<IJudicialInformation>
        fields={fields(admissionCauses)}
        defaultValues={{
          rit: judicialData?.rit,
          calidadJuridica: judicialData?.calidadJuridica,
          causalIngreso: judicialData?.causalIngreso,
          tribunal: judicialData?.tribunal,
          ruc: judicialData?.ruc,
          idResidente: residentId
        }}
        onSubmit={onSubmit}
      />
      <Divider sx={{ my: 4, mt: 10 }} />
      <Box my={4}>
        <CardActionCollapse title='Curador'>
          <Box my={2}>
            <CustomForm<IJudicialCurator>
              submitButtonProps={{ fullWidth: false }}
              fields={fieldsCurator}
              defaultValues={{
                comentario: judicialData?.comentario,
                fechaEntrevista: judicialData?.fechaEntrevista,
                idResidente: residentId,
                institucion: judicialData?.institucion,
                nombreCurador: judicialData?.nombreCurador
              }}
              onSubmit={onSubmitCurator}
            />
          </Box>
        </CardActionCollapse>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box my={2}>
        <CardActionCollapse title='Adulto responsable'>
          <Box my={4}>
            <CustomForm<IJudicialResponsibleAdult>
              submitButtonProps={{ fullWidth: false }}
              fields={fieldsResponsibleAdult}
              defaultValues={{
                domicilio: judicialData?.domicilio,
                email: judicialData?.email,
                idResidente: residentId,
                nombreAdulto: judicialData?.nombreAdultoResponsable,
                rut: judicialData?.rut,
                telefono: judicialData?.telefono
              }}
              onSubmit={onSubmitResponsibleAdult}
            />
          </Box>
        </CardActionCollapse>
      </Box>
    </>
  )
}

export default JudicialInformationTabPanel
