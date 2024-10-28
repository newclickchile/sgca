import type { ReactElement } from 'react'

import Link from 'next/link'

import dynamic from 'next/dynamic'

import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import type { AuxHousesType, AuxParentsType, AuxProgramType } from '@/types/aux'
import { fetchData } from '@/utils/fetch'
import ResidentLeftOverview from './resident-left-overview'
import ResidentRight from './resident-right'
import type { IResident } from '@/types/residents/service'
import { ResidentProvider } from '@/contexts/residentContext'

const PersonalTab = dynamic(() => import('@/views/residents/details/resident-right/personal'))
const FamilyTab = dynamic(() => import('@/views/residents/details/resident-right/familia'))
const HealthTab = dynamic(() => import('@/views/residents/details/resident-right/salud'))

interface AuxDataType {
  programsData: AuxProgramType[]
  housesData: AuxHousesType[]
  parentsData: AuxParentsType[]
}

const generateTabContentComponents = (auxData: AuxDataType): { [key: string]: ReactElement } => ({
  personal: <PersonalTab housesData={auxData.housesData} programsData={auxData.programsData} />,
  family: <FamilyTab parents={auxData.parentsData} />,
  health: <HealthTab />
})

const URL_HOUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/casas/obtener?idInstitucion`
const URL_PROGRAMS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/programa`
const URL_PARENTS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/parentesco`

const ResidentDetails = async ({ residentData }: { residentData: IResident }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('User is not authenticated')
  }

  const { data: programsData } = await fetchData({ session, endpoint: URL_PROGRAMS })
  const { data: housesData } = await fetchData({ session, endpoint: `${URL_HOUSES}=${session?.user.institutionId}` })
  const { data: parentsData } = await fetchData({ session, endpoint: URL_PARENTS })

  const tabContentComponents = generateTabContentComponents({ programsData, housesData, parentsData })

  return (
    <ResidentProvider initialResidentData={residentData}>
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
          <ResidentLeftOverview />
        </Grid>
        <Grid item xs={12} md={8}>
          <ResidentRight tabContentComponents={tabContentComponents} />
        </Grid>
      </Grid>
    </ResidentProvider>
  )
}

export default ResidentDetails
