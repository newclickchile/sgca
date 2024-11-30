'use client'

import { Grid } from '@mui/material'
import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'
import type { IMedicalFaq } from '@/types/residents/health/medicalFAQ'
import type { IResidentMedicalHistory } from '@/types/residents/health/residentMedicalHistory'
import { updateMedicalHistory } from '@/server-actions/residentTabs/health/updateMedicalHistory'

const MedicalHistoryTabPanel: React.FC<{
  residentMedicalHistory: IResidentMedicalHistory[]
  medicalFaq: IMedicalFaq[]
  residentId: number
}> = ({ residentMedicalHistory, medicalFaq, residentId }) => {
  const medicalHistoryObj: { [key: number]: string } = residentMedicalHistory.reduce<{ [key: number]: string }>(
    (acc, item) => {
      acc[item.idFaq] = item.comentario

      return acc
    },
    {}
  )

  const onSubmit: SubmitHandler<IResidentMedicalHistory> = async updateData => {
    try {
      await updateMedicalHistory(updateData)
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <Grid container columnSpacing={6} mt={2}>
      {medicalFaq?.map(question => {
        const comentario = medicalHistoryObj[question.id] ?? ''

        return (
          <Grid key={question.id} item xs={6} mb={10}>
            <CustomForm<IResidentMedicalHistory>
              fields={[{ label: question.faqClinica, name: 'comentario', type: 'multiline', rows: 2, width: 12 }]}
              defaultValues={{
                comentario,
                idResidente: residentId,
                idFaq: question.id
              }}
              submitButtonProps={{ fullWidth: false, size: 'small' }}
              onSubmit={onSubmit}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default MedicalHistoryTabPanel
