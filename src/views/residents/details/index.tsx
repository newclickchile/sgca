import Link from 'next/link'

import dynamic from 'next/dynamic'

import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

import type { IResident } from '@/types/residents/service'
import ResidentLeft from './resident-left'
import ResidentRight from './resident-right'

const PersonalTab = dynamic(() => import('@/views/residents/details/resident-right/personal/personalTabServer'))
const HealthTab = dynamic(() => import('@/views/residents/details/resident-right/salud/healthTabServer'))

const generateTabContentComponents = (residentData: IResident) => ({
  personal: <PersonalTab resident={residentData} />,
  health: <HealthTab residentId={residentData.id} />
})

const ResidentDetails = async ({ residentData }: { residentData: IResident }) => {
  const tabContentComponents = generateTabContentComponents(residentData)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='flex flex-wrap justify-start items-center gap-x-6 gap-y-4'>
          <Typography className='flex justify-center items-center' color='primary'>
            <Link href='/residentes' className='flex items-center'>
              <i className='ri-arrow-left-s-line' />
              <span>Volver</span>
            </Link>
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <ResidentLeft residentData={residentData} />
      </Grid>
      <Grid item xs={12} md={8}>
        <ResidentRight tabContentComponents={tabContentComponents} />
      </Grid>
    </Grid>
  )
}

export default ResidentDetails
