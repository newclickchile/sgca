'use client'

// Next Imports
import { useState } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'

// Third-party Imports
import { signIn } from 'next-auth/react'
import type { SubmitHandler } from 'react-hook-form'

// Hook Imports
import { toast } from 'react-toastify'

import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

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
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    isRequired: true,
    width: 12
  }
]

const Login = () => {
  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState('')
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false)
  const [resetForm, setResetForm] = useState<boolean | undefined>(undefined)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      setResetForm(undefined)

      if (!token) {
        toast.error('¡Debe completar el reCAPTCHA!')

        return
      }

      const res = await signIn('credentials', {
        username: data.username,
        password: data.password,
        captchaToken: token,
        redirect: false
      })

      if (res && res.ok && res.error === null) {
        const redirectURL = searchParams.get('redirectTo') ?? '/'

        router.replace(redirectURL)
      } else throw new Error()
    } catch (error) {
      setRefreshReCaptcha(!refreshReCaptcha)
      setResetForm(true)
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <AuthWrapper title={<>¡Bienvenido! 👋🏻</>} subtitle={<>Inicia sesión con tus credenciales</>}>
      <CustomForm<FormData> resetForm={resetForm} useDirty={false} fields={fields} onSubmit={onSubmit} />
      <div className='flex justify-end '>
        <Typography color='primary' component={Link} href={'/forgot-password'}>
          ¿Olvidaste tu contraseña?
        </Typography>
      </div>
      {process.env.NEXT_PUBLIC_CAPTCHA_KEY && (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}>
          <GoogleReCaptcha action='HOMECARESYSTEM' onVerify={setToken} refreshReCaptcha={refreshReCaptcha} />
        </GoogleReCaptchaProvider>
      )}
    </AuthWrapper>
  )
}

export default Login
