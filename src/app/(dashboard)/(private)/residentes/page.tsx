import { getServerSession } from 'next-auth'
import { Alert } from '@mui/material'

import { authOptions } from '@/libs/auth'
import { fetchData } from '@/utils/fetch'
import Residents from '@/views/residents/Residents'

const URL_HOUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/casas/obtener?idInstitucion`
const URL_PROGRAMS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/programa`

const getAuxData = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error('User is not authenticated')
    }

    const { data: housesData } = await fetchData({
      session,
      endpoint: `${URL_HOUSES}=${session?.user.institutionId}`
    })

    const { data: programsData } = await fetchData({
      session,
      endpoint: URL_PROGRAMS
    })

    return { housesData, programsData }
  } catch (error) {
    console.error('Error in getReportData:', error)
    throw error
  }
}

const ResidentPage = async () => {
  try {
    const { housesData, programsData } = await getAuxData()

    return <Residents houses={housesData} programs={programsData} />
  } catch (error) {
    console.error('Error loading ResidentPage:', error)

    return <Alert severity='error'>Ha ocurrido un error, por favor intenta mas tarde</Alert>
  }
}

export default ResidentPage
