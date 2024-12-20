'use client'

// Next Imports
import type { ReactNode } from 'react'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'

// Third-party Imports
import { useForm, type SubmitHandler } from 'react-hook-form'

// Hook Imports
import { Box, Button } from '@mui/material'
import { toast } from 'react-toastify'

import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import CustomForm from '@/components/forms/CustomForm'
import VerificationCode from '@/components/forms/VerificationCode'
import Link from '@components/Link'
import AuthWrapper from './AuthWrapper'

const usernameField = [
  {
    name: 'username',
    label: 'Usuario',
    isRequired: true,
    width: 12
  }
]

const passwordFields = [
  {
    name: 'password',
    label: 'Nueva contraseña',
    type: 'password',
    isRequired: true,
    width: 12
  },
  {
    name: 'confirmPassword',
    label: 'Confirma tu contraseña',
    isRequired: true,
    type: 'password',
    compareWith: 'password',
    width: 12
  }
]

const getAuthWrapperComponent = ({ child, subtitle }: { child: ReactNode; subtitle: ReactNode }) => {
  return (
    <AuthWrapper
      title={
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, mb: 1.5 }}>
            ¿Olvidaste tu contraseña? 🔒
          </Typography>
        </Box>
      }
      subtitle={<Typography sx={{ maxWidth: 400 }}>{subtitle}</Typography>}
    >
      {child}
    </AuthWrapper>
  )
}

const ForgotPassword = () => {
  // Hooks
  const router = useRouter()
  const [emailValidated, setEmailValidated] = useState<string>()
  const [codeValidated, setCodeValidated] = useState<number>()
  const [userName, setUserName] = useState<string>('')
  const [token, setToken] = useState('')
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false)

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    control,
    setValue
  } = useForm<{ code: string[] }>({
    defaultValues: {
      code: []
    }
  })

  const handleBack = () => router.replace('/login')

  const validateUserCode: SubmitHandler<{ code: string[] }> = async ({ code }) => {
    const fullCode = code.join('')

    const validateUserAndCode = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL_USUARIO}/usuario/correo/olvido/codigo/validar?pus3rN4m3=${userName}&CSRFTokenMail=${fullCode}`

        const response = await fetch(url, { method: 'POST' })

        if (!response.ok) {
          throw new Error('Error en la validación')
        }

        setCodeValidated(+fullCode)
      } catch (error) {
        throw new Error('Error en la validación')
      }
    }

    await toast.promise(validateUserAndCode(), {
      pending: 'Validando información...',
      success: 'El código ha sido validado',
      error: 'Ha ocurrido un error, favor intentar nuevamente'
    })
  }

  const updatePassword: SubmitHandler<{ password: string }> = async ({ password }) => {
    const validateUserAndCode = async () => {
      try {
        const url = `/api/auth/reset-password`

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            password,
            username: userName,
            code: codeValidated
          })
        })

        if (!response.ok) {
          throw new Error('Error en la validación')
        }

        setEmailValidated(undefined)
        setCodeValidated(undefined)
        handleBack()
      } catch (error) {
        throw new Error('Error en la validación')
      }
    }

    await toast.promise(validateUserAndCode(), {
      pending: 'Validando información...',
      success: 'La contraseña se ha actualizado correctamente, ya puedes iniciar sesión',
      error: 'Ha ocurrido un error, favor intentar nuevamente'
    })
  }

  const validateUsername: SubmitHandler<{ username: string }> = async ({ username }) => {
    try {
      if (!token) {
        toast.error('Debe completar el reCAPTCHA')

        return
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL_USUARIO}/usuario/correo/olvido/clave?pus3rN4m3=${username}`

      const response = await fetch(url, { method: 'POST' })

      if (!response.ok) {
        throw new Error('Error send email')
      }

      setEmailValidated(username)
      setUserName(username)
      toast.success('Se ha enviado un código a tu email, ingrésalo para continuar')
    } catch (error) {
      setRefreshReCaptcha(!refreshReCaptcha)
      toast.error('Ha ocurrido un error, favor intenta nuevamente')
    }
  }

  return (
    <>
      {!emailValidated
        ? getAuthWrapperComponent({
            subtitle: <>Ingresa tu usuario y sigue las instrucciones para continuar</>,
            child: (
              <>
                <CustomForm<{ username: string }>
                  useDirty={false}
                  fields={usernameField}
                  onSubmit={validateUsername}
                  submitButtonName='Verificar mi cuenta'
                />

                <Button onClick={handleBack} fullWidth variant='outlined'>
                  Volver
                </Button>
                {process.env.NEXT_PUBLIC_CAPTCHA_KEY && (
                  <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}>
                    <GoogleReCaptcha action='HOMECARESYSTEM' onVerify={setToken} refreshReCaptcha={refreshReCaptcha} />
                  </GoogleReCaptchaProvider>
                )}
              </>
            )
          })
        : !codeValidated
          ? getAuthWrapperComponent({
              child: (
                <>
                  <form onSubmit={handleSubmit(validateUserCode)}>
                    <VerificationCode isSubmitted={isSubmitted} setValue={setValue} errors={errors} control={control} />

                    <Button sx={{ my: 3 }} fullWidth variant='contained' type='submit' disabled={isSubmitting}>
                      Verificar mi cuenta
                    </Button>
                  </form>
                  <div className='flex justify-center items-center flex-wrap gap-2'>
                    <Typography>¿No recibiste el código?</Typography>
                    <Typography color='primary' component={Link}>
                      Reenviar
                    </Typography>
                  </div>
                  <Button onClick={handleBack} fullWidth variant='outlined'>
                    Volver
                  </Button>
                </>
              ),
              subtitle: <>Ingresa el código que hemos enviado a tu email</>
            })
          : getAuthWrapperComponent({
              child: (
                <>
                  <CustomForm<{ password: string; confirmPassword: string }>
                    useDirty={false}
                    fields={passwordFields}
                    onSubmit={updatePassword}
                    submitButtonName='Actualizar mi contraseña'
                  />
                  <Button onClick={handleBack} fullWidth variant='outlined'>
                    Volver
                  </Button>
                </>
              ),
              subtitle: <>Ingresa y confirma tu nueva contraseña.</>
            })}
    </>
  )
}

export default ForgotPassword
