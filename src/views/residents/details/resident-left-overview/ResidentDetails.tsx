'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { useResident } from '@/contexts/residentContext'

import { formatDate } from '@/utils/date'
import { getInitials } from '@/utils/getInitials'
import CustomAvatar from '@core/components/mui/Avatar'

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

const ResidentDetails = () => {
  const { resident } = useResident()

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
              {getInitials(resident.nombre)}
            </CustomAvatar>
            <div className='flex flex-col items-center'>
              <Typography variant='h5'>{resident.nombre}</Typography>
              <Typography>{resident.rut}</Typography>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Typography variant='h5'>Información</Typography>
          <Divider />
          <div className='flex flex-col gap-2'>
            <InfoText label='Nombre' value={resident.nombre} />
            <InfoText label='Fecha Nacimiento' value={formatDate(resident.fechaNacimiento)} />
            <InfoText label='Género' value={resident.idGenero === 1 ? 'Masculino' : 'Femenino'} />
            <InfoText label='Estado' value={resident.habilitado ? 'Activo' : 'Inactivo'} />
            <InfoText label='Fecha ingreso' value={formatDate(resident.fechaIngreso)} />
            <InfoText label='Fecha egreso' value={formatDate(resident.fechaIngreso)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResidentDetails
