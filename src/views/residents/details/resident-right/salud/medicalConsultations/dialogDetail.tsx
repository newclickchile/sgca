'use client'

import type { MouseEvent, SyntheticEvent } from 'react'
import { useEffect, useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tab,
  Typography
} from '@mui/material'

import { toast } from 'react-toastify'

import { useSession } from 'next-auth/react'

import CustomForm from '@/components/forms/CustomForm'

import FileUploader from '@/components/forms/FileUploader'
import { updateMedicalConsultation } from '@/server-actions/residentTabs/health/updateMedicalConsultation'
import type { IMedicalConsultation, IMedicalConsultationDocuments } from '@/types/residents/health/medicalConsultations'
import { formatDate } from '@/utils/date'
import { formFields } from './form'
import useFetchData from '@/hooks/useFetchData'
import AppReactDropzone from '@/libs/styles/AppReactDropzone'

const URL_MEDICAL_CONSULTATION_FILES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/consulta-medica`

const DialogConsultationDetail = ({
  consultationsDetail,
  showDialog,
  setShowDialog,
  residentId
}: {
  consultationsDetail?: IMedicalConsultation
  showDialog: boolean
  setShowDialog: (show: boolean) => void
  residentId: number
}) => {
  const [value, setValue] = useState<string>('1')
  const { data: session } = useSession()
  const [documents, setDocuments] = useState<IMedicalConsultationDocuments[]>([])
  const [shouldFetch, setShouldFetch] = useState<boolean>(consultationsDetail?.id !== undefined)
  const [removeFiles, setRemoveFiles] = useState<boolean>(false)

  const { data: fetchedDocuments } = useFetchData<IMedicalConsultationDocuments[]>({
    endpoint: `${URL_MEDICAL_CONSULTATION_FILES}/documentos?idConsulta=${consultationsDetail?.id}`,
    shouldFetch
  })

  useEffect(() => {
    if (!consultationsDetail) {
      setValue('1')
    }
  }, [consultationsDetail])

  useEffect(() => {
    if (fetchedDocuments) {
      setDocuments(fetchedDocuments)
      setRemoveFiles(false)
    }
  }, [fetchedDocuments])

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const onSubmit = async (data: IMedicalConsultation) => {
    try {
      await updateMedicalConsultation(data)

      setShowDialog(false)
      toast.success(`Consulta médica ${consultationsDetail ? 'actualizada' : 'creada'} correctamente`)
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  const handleUploadProcess = async (file: File) => {
    try {
      setShouldFetch(false)

      const uploadFile = async () => {
        if (!session?.user || !session.user.token) return

        const headers = {
          pus3rN4m3: session.user.userName,
          CSRFC0d160j2vt: session.user.token
        }

        const formdata = new FormData()

        formdata.append('file', file, file.name)

        const requestOptions = {
          method: 'POST',
          headers,
          body: formdata
        }

        const response = await fetch(
          `${URL_MEDICAL_CONSULTATION_FILES}/documento/crear?idConsulta=${consultationsDetail!.id}&nombreDocumento=${file.name}&responsable=${consultationsDetail?.responsable}`,
          requestOptions
        )

        if (!response.ok) {
          throw new Error('Error uploading the file')
        }

        setShouldFetch(true)
        setRemoveFiles(true)
      }

      await toast.promise(uploadFile, {
        pending: 'Cargando archivo...',
        success: 'Archivo se ha cargado correctamente',
        error: 'Ha ocurrido un error, favor intentar nuevamente'
      })
    } catch (error) {
      console.log('errorhandleProcess :', error)
    }
  }

  const handleDownloadFile = (fileUrl: string) => {
    if (!fileUrl) {
      toast.error('No se pudo encontrar el enlace del archivo.')

      return
    }

    // Abrir el archivo en una nueva ventana
    window.open(fileUrl, '_blank') // Esto abrirá el archivo en una nueva pestaña
  }

  // const handleDownloadFileNew = async (fileUrl: string) => {
  //   if (!fileUrl) {
  //     toast.error('No se pudo encontrar el enlace del archivo.')

  //     return
  //   }

  //   try {
  //     const response = await fetch(fileUrl)

  //     // Verificar si la respuesta es correcta
  //     if (!response.ok) {
  //       throw new Error('No se pudo descargar el archivo')
  //     }

  //     // Obtener el nombre del archivo desde la URL (o un nombre fijo)
  //     const filename = fileUrl.split('/').pop()

  //     // Crear un Blob para el archivo descargado
  //     const blob = await response.blob()

  //     // Crear un enlace y forzar la descarga
  //     const link = document.createElement('a')

  //     link.href = URL.createObjectURL(blob)
  //     link.download = filename || 'archivo'
  //     link.click()
  //   } catch (error) {
  //     toast.error('Error al descargar el archivo.')
  //   }
  // }

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
              disabled={!consultationsDetail?.id}
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
            {consultationsDetail?.id && (
              <AppReactDropzone>
                <FileUploader handleUpload={handleUploadProcess} removeFiles={removeFiles} />
              </AppReactDropzone>
            )}
            {documents.map(item => {
              return (
                <Box key={item.id}>
                  <Grid container my={4} justifyContent={'space-between'}>
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
                            color: 'text.primary'
                          }}
                        >
                          {item.nombreDocumento}
                        </Typography>
                      </Grid>
                    </Grid>
                    {item.linkDocumento ? (
                      <Button variant='text' onClick={() => handleDownloadFile(item.linkDocumento!)}>
                        <i className='ri-download-2-line text-[1.5em]' />
                      </Button>
                    ) : (
                      'No existe link'
                    )}
                  </Grid>
                  <Divider flexItem />
                </Box>
              )
            })}
          </TabPanel>
        </TabContext>
      </DialogContent>
    </Dialog>
  )
}

export default DialogConsultationDetail
