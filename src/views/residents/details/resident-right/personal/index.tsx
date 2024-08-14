'use client'

import Grid from '@mui/material/Grid'

import { Card, CardContent, CardHeader } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'

type FormData = {
  rut: string
  name: string
  birthDate: string
}

const fields = [
  {
    name: 'rut',
    label: 'Rut',
    width: 3,
    rules: { required: 'Rut es requerido' }
  },
  {
    name: 'name',
    label: 'Nombre',
    rules: { required: 'Nombre es requerido' }
  },
  {
    name: 'birthDate',
    label: 'Fecha Nacimiento',
    width: 3,
    rules: { required: 'Fecha Nacimiento es requerida' }
  }
]

const PersonalTab = () => {
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
          <CardHeader title='Datos Personales' />
          <CardContent className='flex flex-col gap-4'>
            <CustomForm<FormData>
              fields={fields}
              defaultValues={{ name: '', birthDate: '', rut: '' }}
              onSubmit={onSubmit}
            />
          </CardContent>
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <OrderListTable orderData={[]} />
      </Grid> */}
    </Grid>
  )
}

export default PersonalTab
