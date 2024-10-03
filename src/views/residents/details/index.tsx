import type { ReactElement } from 'react'

import Link from 'next/link'

import dynamic from 'next/dynamic'

import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

import type { AuxProgramType } from '@/types/aux'
import type { ResidentType } from '@/types/residents/service'
import { fetchData } from '@/utils/fetch'
import ResidentLeftOverview from './resident-left-overview'
import ResidentRight from './resident-right'

const PersonalTab = dynamic(() => import('@/views/residents/details/resident-right/personal'))
const FamilyTab = dynamic(() => import('@/views/residents/details/resident-right/familia'))
const HealthTab = dynamic(() => import('@/views/residents/details/resident-right/salud'))

// const SecurityTab = dynamic(() => import('@views/apps/ecommerce/customers/details/customer-right/security'))
// const NotificationsTab = dynamic(() => import('@views/apps/ecommerce/customers/details/customer-right/notification'))

// const AddressBillingTab = dynamic(
//   () => import('@views/apps/ecommerce/customers/details/customer-right/address-billing')
// )

interface AuxDataType {
  programsData: AuxProgramType[]
}

const generateTabContentComponents = (
  residentData: ResidentType,
  auxData: AuxDataType
): { [key: string]: ReactElement } => ({
  personal: <PersonalTab residentData={residentData} programsData={auxData.programsData} />,
  family: <FamilyTab residentData={residentData} />,
  health: <HealthTab />
})

// const URL_HOUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/casas/obtener?idInstitucion`
const URL_PROGRAMS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/programa`

const ResidentDetails = async ({ residentData }: { residentData: ResidentType }) => {
  // const session = await useSession()
  // const { data: housesData } = await fetchData(`${URL_HOUSES}=${session?.user.institutionId}`)
  const { data: programsData } = await fetchData(URL_PROGRAMS)

  const tabContentComponents = generateTabContentComponents(residentData, { programsData })

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
        <ResidentLeftOverview residentData={residentData} />
      </Grid>
      <Grid item xs={12} md={8}>
        <ResidentRight tabContentComponents={tabContentComponents} />
      </Grid>
    </Grid>
  )
}

export default ResidentDetails
