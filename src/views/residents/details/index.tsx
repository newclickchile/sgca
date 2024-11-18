import Link from 'next/link'

import dynamic from 'next/dynamic'

import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

import type { IResident } from '@/types/residents/service'
import ResidentLeft from './resident-left'
import ResidentRight from './resident-right'
import { fetchData } from '@/utils/fetch'
import AlertError from '@/components/AlertError'

const URL_RESIDENT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/obtener?idResidente`

const PersonalTab = dynamic(() => import('@/views/residents/details/resident-right/personal/personalTabServer'))
const HealthTab = dynamic(() => import('@/views/residents/details/resident-right/salud/healthTabServer'))
const FamilyTab = dynamic(() => import('@/views/residents/details/resident-right/familia/familyTabServer'))

const generateTabContentComponents = (residentData: IResident) => ({
  personal: <PersonalTab resident={residentData} />,
  family: <FamilyTab residentId={residentData.id} resident={residentData} />,
  health: <HealthTab residentId={6} />
})

const ResidentDetails = async ({ residentId }: { residentId: string }) => {
  try {
    const { data: residentData } = await fetchData({ endpoint: `${URL_RESIDENT}=${residentId}` })

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
  } catch (_) {
    return <AlertError />
  }
}

export default ResidentDetails
