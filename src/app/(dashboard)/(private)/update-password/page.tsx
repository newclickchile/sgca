'use client'

import { useState } from 'react'

import { Card, CardContent, CardHeader, Grid } from '@mui/material'

import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'
import { fields } from './form'

const UpdatePasswordPage = () => {
  const [resetForm, setResetForm] = useState<boolean | undefined>(undefined)

  const handleUpdatePassword = async ({
    currentPassword,
    newPassword
  }: {
    currentPassword: string
    newPassword: string
  }) => {
    const updatePassword = async () => {
      try {
        const url = `/api/auth/update-password`

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            currentPassword,
            newPassword
          })
        })

        if (!response.ok) {
          throw new Error('Error en la validación')
        }

        setResetForm(true)
      } catch (error) {
        throw new Error('Error en la validación')
      }
    }

    await toast.promise(updatePassword(), {
      pending: 'Validando información...',
      success: 'La contraseña se ha actualizado correctamente',
      error: 'Ha ocurrido un error, favor intentar nuevamente'
    })
  }

  return (
    <Card variant='elevation'>
      <CardHeader title='Cambiar contraseña' />
      <CardContent>
        <Grid container p={3}>
          <Grid item xs={4}>
            <CustomForm<{ currentPassword: string; newPassword: string }>
              fields={fields}
              onSubmit={handleUpdatePassword}
              resetForm={resetForm}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UpdatePasswordPage
