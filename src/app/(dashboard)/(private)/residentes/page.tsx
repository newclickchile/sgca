import { getServerSession } from 'next-auth'
import { Alert } from '@mui/material'

import { authOptions } from '@/libs/auth'
import { fetchData } from '@/utils/fetch'
import ResidentList from '@/views/residents/ResidentList'
import AlertError from '@/components/AlertError'

const URL_HOUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/casas/obtener?idInstitucion`
const URL_PROGRAMS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/programa`

const getAuxData = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error('User is not authenticated')
    }

    const { data: housesData } = await fetchData({
      endpoint: `${URL_HOUSES}=${session?.user.institutionId}`
    })

    const { data: programsData } = await fetchData({
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

    return <ResidentList houses={housesData} programs={programsData} />
  } catch (error) {
    console.error('Error loading ResidentPage:', error)

    return <AlertError />
  }
}

export default ResidentPage
