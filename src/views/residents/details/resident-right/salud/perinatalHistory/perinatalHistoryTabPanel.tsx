'use client'

import Grid from '@mui/material/Grid'

import { TextField } from '@mui/material'

import type { IMedicalFaq } from '@/types/residents/health/medicalFAQ'
import type { IMedicalHistory } from '@/types/residents/health/medicalHistory'

const PerinatalHistoryTabPanel: React.FC<{
  medicalHistoryData: IMedicalHistory[]
  medicalPerinatalData: IMedicalFaq[]
}> = ({ medicalHistoryData, medicalPerinatalData }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    console.log(id, event.target.value)
  }

  return (
    <Grid container spacing={6} mt={2}>
      {medicalPerinatalData
        .filter(question => question.tipo === 1)
        .map(question => {
          return (
            <Grid key={question.id} item xs={6}>
              <TextField
                fullWidth
                multiline
                rows={2.5}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, question.id)}
                id={question.id.toString()}
                label={question.casa}
                defaultValue={medicalHistoryData.find(a => a.idFaq === question.id)?.comentario}
              />
            </Grid>
          )
        })}
    </Grid>
  )
}

export default PerinatalHistoryTabPanel
