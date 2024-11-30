'use client'

// Next Imports
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'

// Third-party Imports
import { signIn } from 'next-auth/react'
import type { SubmitHandler } from 'react-hook-form'

// Hook Imports
import { toast } from 'react-toastify'
import { Box, Button } from '@mui/material'

import CustomForm from '@/components/forms/CustomForm'
import AuthWrapper from './AuthWrapper'

type FormData = {
  username: string
  password: string
}

const fields = [
  {
    name: 'username',
    label: 'Usuario',
    isRequired: true,
    width: 12
  }
]

const ForgotPassword = () => {
  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleBack = () => {
    router.replace('/login')
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const res = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false
      })

      if (res && res.ok && res.error === null) {
        const redirectURL = searchParams.get('redirectTo') ?? '/'

        router.replace(redirectURL)
      } else {
        if (res?.error) {
          const error = JSON.parse(res.error)

          console.log('error :', error)
        }
      }
    } catch (error) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <AuthWrapper
      title={
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, mb: 1.5 }}>
            ¿Olvidaste tu contraseña? 🔒
          </Typography>
        </Box>
      }
      subtitle={
        <Typography variant='body2' sx={{ maxWidth: 400 }}>
          Ingresa tu nombre de usuario y te enviaremos un enlace con las instrucciones para restablecer la contraseña.
        </Typography>
      }
    >
      <CustomForm<FormData>
        useDirty={false}
        fields={fields}
        defaultValues={{ username: 'admin@sgca.cl', password: 'Stiplus.2023' }}
        onSubmit={onSubmit}
        submitButtonName='Verificar mi cuenta'
      />
      <Button onClick={handleBack} fullWidth>
        Volver
      </Button>
    </AuthWrapper>
  )
}

export default ForgotPassword
