// Next Imports
import type { Metadata } from 'next'

// Component Imports
import ForgotPassword from '@views/ForgotPassword'

// Server Action Imports

export const metadata: Metadata = {
  title: '¿Olvidaste tu contraseña?',
  description: 'Olvidaste la contraseña de tu cuenta'
}

const ForgotPasswordPage = () => {
  // Vars

  return <ForgotPassword />
}

export default ForgotPasswordPage
