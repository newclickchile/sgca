import { authOptions } from '@/libs/auth'
import { fetchData } from '@/utils/fetch'
import Residents from '@/views/residents/Residents'
import { getServerSession } from 'next-auth'

const URL_HOUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/casas/obtener?idInstitucion`
const URL_PROGRAMS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/programa`

const getReportData = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('User is not authenticated')
  }

  const { data: housesData } = await fetchData(session, `${URL_HOUSES}=${session?.user.institutionId}`)
  const { data: programsData } = await fetchData(session, URL_PROGRAMS)

  return { housesData, programsData }
}

const ResidentPage = async () => {
  const { housesData, programsData } = await getReportData()

  return <Residents houses={housesData} programs={programsData} />
}

export default ResidentPage
