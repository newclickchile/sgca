'use client'

import Grid from '@mui/material/Grid'

import { Card, CardContent, CardHeader } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'
import type { ResidentType } from '@/types/resident'

type FormData = {
  rut: string
}

const fields = [
  {
    name: 'rut',
    label: 'Rut',
    width: 3,
    rules: { required: 'Rut es requerido' }
  }
]

const FamilyTab: React.FC<{ residentData: ResidentType }> = ({ residentData }) => {
  const { rut } = residentData

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      console.log('data :', data)
    } catch (error) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Grupo Familiar' />
          <CardContent className='flex flex-col gap-4'>
            <CustomForm<FormData> fields={fields} defaultValues={{ rut }} onSubmit={onSubmit} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default FamilyTab
