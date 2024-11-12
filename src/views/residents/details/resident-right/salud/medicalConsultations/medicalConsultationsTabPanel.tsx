'use client'

import { useState } from 'react'

import { Button, Divider, Grid, Typography } from '@mui/material'

import type { IMedicalConsultations } from '@/types/residents/health/medicalConsultations'
import DialogConsultationDetail from './dialogDetail'
import { formatDate } from '@/utils/date'

const MedicalConsultationsTabPanel: React.FC<{ medicalConsultationsData: IMedicalConsultations[] }> = ({
  medicalConsultationsData
}) => {
  const [showDialog, setShowDialog] = useState(false)

  const [selectedItem, setSelectedItem] = useState<IMedicalConsultations | undefined>(undefined)

  const handleAdd = () => {
    setSelectedItem(undefined)
    setShowDialog(true)
  }

  const handleShowDetail = (item: IMedicalConsultations) => {
    setSelectedItem(item)
    setShowDialog(true)
  }

  return (
    <>
      <DialogConsultationDetail
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        consultationsDetail={selectedItem}
      />

      <Grid container justifyContent={'flex-end'}>
        <Button startIcon={<i className='ri-add-line' />} variant='outlined' onClick={handleAdd} size='small'>
          Agregar registro
        </Button>
      </Grid>
      {medicalConsultationsData.map((item: IMedicalConsultations) => {
        return (
          <Grid container key={item.id} gap={1} mb={10}>
            <Grid container item gap={2}>
              <i className='ri-calendar-line text-[1.2em]' />
              <Typography variant='caption'>{formatDate(item.fechaRegistro)}</Typography>
              <Divider flexItem orientation='vertical' />
              <i className='ri-user-3-line text-[1.2em]' />
              <Typography variant='caption'>{item.responsable}</Typography>
            </Grid>
            <Typography
              variant='body2'
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                textTransform: 'uppercase'
              }}
            >
              {item.centroAsistencial}
            </Typography>

            <Grid container item>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {item.diagnostico.slice(0, 100)}
              </Typography>
            </Grid>

            <Grid container item gap={1}>
              <i className='healthicons-doctor-male-outline text-[1.2rem]' />
              <Typography variant='caption'>{item.medico}</Typography>
              <Divider flexItem orientation='vertical' />
              <Typography variant='caption'>{item.especialidad}</Typography>
            </Grid>

            <Button
              variant='outlined'
              sx={{ my: 1, p: 0.5, px: 2 }}
              onClick={() => handleShowDetail(item)}
              size='small'
            >
              Ver detalle
            </Button>
          </Grid>
        )
      })}
    </>
  )
}

export default MedicalConsultationsTabPanel
