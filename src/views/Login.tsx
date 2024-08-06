'use client'

// Next Imports
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'

// Third-party Imports
import { signIn } from 'next-auth/react'
import type { SubmitHandler } from 'react-hook-form'

// Hook Imports
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
    rules: { required: 'Usuario es requerido' }
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    rules: { required: 'Contraseña es requerida' }
  }
]

const Login = () => {
  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
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
  }

  return (
    <AuthWrapper title={<>¡Bienvenido! 👋🏻</>} subtitle={<>Inicia sesión con tus credenciales</>}>
      <CustomForm<FormData>
        fields={fields}
        defaultValues={{ username: 'admin@sgca.cl', password: 'Stiplus.2023' }}
        onSubmit={onSubmit}
      />
      <div className='flex justify-end '>
        <Typography color='primary' component={Link} href={'/forgot-password'}>
          ¿Olvidaste tu contraseña?
        </Typography>
      </div>
    </AuthWrapper>
  )
}

export default Login
