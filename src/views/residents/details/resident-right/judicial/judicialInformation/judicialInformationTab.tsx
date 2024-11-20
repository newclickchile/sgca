'use client'

import { Box, Card, CardContent, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'
import { updateJudicialInformation } from '@/server-actions/residentTabs/judicial/updateJudicialInformation'
import type { AuxCausesAdmissionType } from '@/types/aux'
import type { IJudicialInformation } from '@/types/residents/judicial/judicialInformation'
import { fields } from './form'
import CardActionCollapse from '@/components/residents/CardActionCollapse'

const JudicialInformationTabPanel = ({
  residentId,
  judicialData,
  admissionCauses
}: {
  residentId: number
  judicialData: IJudicialInformation
  admissionCauses: AuxCausesAdmissionType[]
}) => {
  // residente/judicial/actualizar?&rit=rit&calidadJuridica=calidad&causalIngreso=causal&tribunal=tribunal&ruc=ruc&idResidente=2

  const onSubmit: SubmitHandler<IJudicialInformation> = async updateData => {
    try {
      console.log('updateData :', updateData)

      await updateJudicialInformation(residentId, updateData)
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
            <CustomForm<IJudicialInformation>
              buttonProps={{ fullWidth: false }}
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
            {/* <CustomForm<IAffiliation>
          fields={fieldsMother}
          defaultValues={{
            nombreMadre,
            ocupacionMadre,
            fechaNacimientoMadre,
            direccionMadre,
            condicionMadre
          }}
          onSubmit={data => onSubmit(data, 'madre')}
        /> */}
          </Box>
        </CardActionCollapse>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box my={2}>
        <CardActionCollapse title='Adulto responsable'>
          <Box my={4}>
            <CustomForm<IJudicialInformation>
              buttonProps={{ fullWidth: false }}
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
            {/* <CustomForm<IAffiliation>
          fields={fieldsFather}
          defaultValues={{
            nombrePadre,
            ocupacionPadre,
            fechaNacimientoPadre,
            direccionPadre,
            condicionPadre
          }}
          onSubmit={data => onSubmit(data, 'padre')}
        /> */}
          </Box>
        </CardActionCollapse>
      </Box>
    </>
  )
}

export default JudicialInformationTabPanel
