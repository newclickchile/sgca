// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import CustomAvatar from '@core/components/mui/Avatar'
import type { ResidentType } from '@/types/resident'
import { getInitials } from '@/utils/getInitials'

const InfoText = (props: { label: string; value: string | undefined }) => {
  const { label, value } = props

  return (
    <div className='flex items-center gap-1'>
      <Typography color='text.primary' className='font-medium'>
        {label}:
      </Typography>
      <Typography>{value}</Typography>
    </div>
  )
}

const ResidentDetails = ({ residentData }: { residentData?: ResidentType }) => {
  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        <div className='flex flex-col justify-self-center items-center gap-6'>
          <div className='flex flex-col items-center gap-4'>
            <CustomAvatar
              size={120}
              variant='rounded'
              sx={{
                fontWeight: 600,
                mb: 4,
                fontSize: '3rem'
              }}
            >
              {getInitials(residentData!.nombre)}
            </CustomAvatar>
            <div className='flex flex-col items-center'>
              <Typography variant='h5'>{residentData?.nombre}</Typography>
              <Typography>{residentData?.rut}</Typography>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Typography variant='h5'>Información</Typography>
          <Divider />
          <div className='flex flex-col gap-2'>
            <InfoText label='Nombre' value={residentData?.nombre} />
            <InfoText label='Fecha Nacimiento' value={residentData?.fechaNacimiento} />
            <InfoText label='Género' value={residentData?.idGenero === 1 ? 'MAsculino' : 'Femenino'} />
            <InfoText label='Estado' value={residentData?.habilitado ? 'Activo' : 'Inactivo'} />
            <InfoText label='Fecha ingreso' value={residentData?.fechaIngreso} />
            <InfoText label='Fecha egreso' value={residentData?.fechaIngreso} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResidentDetails
