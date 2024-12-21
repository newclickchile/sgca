// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@views/Login'

export const metadata: Metadata = {
  title: 'Inicia sesión',
  description: 'Inicia sesión a tu cuenta'
}

const LoginPage = () => {
  return <Login />
}

export default LoginPage
