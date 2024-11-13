'use client'
import type { MouseEvent, SyntheticEvent } from 'react'
import { useState } from 'react'

import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'
import type { IMedicalConsultations, IMedicalConsultationsForm } from '@/types/residents/health/medicalConsultations'
import { formFields } from './form'
import { fetchData } from '@/utils/fetch'
import { useResident } from '@/contexts/residentContext'

const URL_MEDICAL_CONSULTATION = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/consulta-medica/crear`

const DialogConsultationDetail: React.FC<{
  consultationsDetail?: IMedicalConsultations
  showDialog: boolean
  setShowDialog: (show: boolean) => void
}> = ({ consultationsDetail, showDialog, setShowDialog }) => {
  const { resident } = useResident()
  const { data: session } = useSession()
  const [value, setValue] = useState<string>('1')

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const onSubmit = async (data: IMedicalConsultationsForm) => {
    try {
      const queryParams = new URLSearchParams(data as unknown as Record<string, string>).toString()

      console.log('queryParams :', queryParams)

      const response = await fetchData({
        endpoint: `${URL_MEDICAL_CONSULTATION}?idResidente=${resident.id}&${queryParams}`,
        session,
        method: 'POST'
      })

      console.log('response :', response)

      if (response.status === 200) {
        setShowDialog(false)
        toast.success(`Consulta médica ${consultationsDetail ? 'actualizada' : 'creada'} correctamente`)
      }
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
              <CustomForm<IMedicalConsultationsForm>
                fields={formFields}
                defaultValues={{
                  centroAsistencial: consultationsDetail?.centroAsistencial,
                  fechaConsulta: consultationsDetail?.fechaConsulta,
                  medico: consultationsDetail?.medico,
                  especialidad: consultationsDetail?.especialidad,
                  motivo: consultationsDetail?.motivo,
                  responsable: consultationsDetail?.responsable,
                  diagnostico: consultationsDetail?.diagnostico
                }}
                onSubmit={onSubmit}
                submitButtonName={'Guardar'}
                submitButtonFullWidth={false}
              />
            </Grid>
          </TabPanel>
          <TabPanel value='2'>
            <br />
            {/* <DocumentList type='medical' /> */}
          </TabPanel>
        </TabContext>
      </DialogContent>
    </Dialog>
  )
}

export default DialogConsultationDetail
