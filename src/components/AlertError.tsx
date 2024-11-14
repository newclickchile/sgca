import { Alert } from '@mui/material'

const AlertError = ({ message }: { message?: React.ReactNode | string }) => {
  return <Alert severity='error'>{message || 'Ha ocurrido un error, por favor intenta nuevamente'}</Alert>
}

export default AlertError
