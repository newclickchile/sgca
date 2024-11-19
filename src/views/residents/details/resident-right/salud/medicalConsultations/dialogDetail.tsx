'use client'
import type { MouseEvent, SyntheticEvent } from 'react'
import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Tab, Typography } from '@mui/material'

import CustomForm from '@/components/forms/CustomForm'
import { updateMedicalConsultation } from '@/server-actions/residentTabs/health/medicalConsultation'
import type { IMedicalConsultation, IMedicalConsultationDocuments } from '@/types/residents/health/medicalConsultations'
import { formatDate } from '@/utils/date'
import { formFields } from './form'

const DialogConsultationDetail = ({
  consultationsDetail,
  documentsInfo,
  showDialog,
  setShowDialog,
  residentId
}: {
  consultationsDetail?: IMedicalConsultation
  showDialog: boolean
  setShowDialog: (show: boolean) => void
  residentId: number
  documentsInfo: IMedicalConsultationDocuments[]
}) => {
  const [value, setValue] = useState<string>('1')

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const onSubmit = async (data: IMedicalConsultation) => {
    try {
      await updateMedicalConsultation(data)

      // if (response.status === 200) {
      //   setShowDialog(false)
      //   toast.success(`Consulta médica ${consultationsDetail ? 'actualizada' : 'creada'} correctamente`)
      // }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog maxWidth='md' fullWidth open={showDialog} onClose={() => setShowDialog(false)}>
      <DialogTitle sx={{ textAlign: 'center' }}>Consulta médica</DialogTitle>
      <DialogContent>
        <IconButton
          size='small'
          onClick={() => setShowDialog(false)}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <i className='ri-close-line text-2xl' />
        </IconButton>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='nav tabs example'>
            <Tab
              value='1'
              component='a'
              label='Información consulta'
              href='/drafts'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='2'
              component='a'
              label='Documentos'
              href='/trash'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
          </TabList>
          <TabPanel value='1'>
            <Grid my={5}>
              <CustomForm<IMedicalConsultation>
                fields={formFields}
                defaultValues={{
                  centroAsistencial: consultationsDetail?.centroAsistencial,
                  fechaConsulta: consultationsDetail?.fechaConsulta,
                  medico: consultationsDetail?.medico,
                  especialidad: consultationsDetail?.especialidad,
                  motivo: consultationsDetail?.motivo,
                  responsable: consultationsDetail?.responsable,
                  diagnostico: consultationsDetail?.diagnostico,
                  id: consultationsDetail?.id,
                  idResidente: residentId
                }}
                onSubmit={onSubmit}
                submitButtonName={'Guardar'}
              />
            </Grid>
          </TabPanel>
          <TabPanel value='2'>
            <Grid container justifyContent={'flex-end'}>
              <Button startIcon={<i className='ri-add-line' />} variant='outlined' onClick={() => {}} size='small'>
                Agregar documento
              </Button>
            </Grid>
            {documentsInfo.map(item => {
              return (
                <Grid container key={item.id} my={8} justifyContent={'space-between'}>
                  <Grid item>
                    <Grid container item gap={2}>
                      <i className='ri-calendar-line text-[1.2em]' />
                      <Typography variant='body2'>{formatDate(item.fechaDocumento)}</Typography>
                      <Divider flexItem orientation='vertical' />
                      <i className='ri-user-3-line text-[1.2em]' />
                      <Typography variant='body2'>{item.responsable}</Typography>
                    </Grid>
                    <Grid container item my={1}>
                      <Typography
                        variant='subtitle2'
                        sx={{
                          color: 'text.primary',
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.nombreDocumento}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button variant='text' onClick={() => {}}>
                    <i className='ri-download-2-line text-[1.5em]' />
                  </Button>
                </Grid>
              )
            })}
          </TabPanel>
        </TabContext>
      </DialogContent>
    </Dialog>
  )
}

export default DialogConsultationDetail
