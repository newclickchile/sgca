import { getServerSession } from 'next-auth'

import { fetchData } from '@/utils/fetch'
import { authOptions } from '@/libs/auth'
import PersonalTab from './personalTab'

const URL_RESIDENT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/obtener?idResidente`
const URL_HOUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/casas/obtener?idInstitucion`
const URL_PROGRAMS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/programa`

const PersonalTabServer = async ({ residentId }: { residentId: string }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('User is not authenticated')
  }

  const [{ data: resident }, { data: houses }, { data: programs }] = await Promise.all([
    fetchData({ session, endpoint: `${URL_RESIDENT}=${residentId}` }),
    fetchData({ session, endpoint: URL_PROGRAMS }),
    fetchData({ session, endpoint: `${URL_HOUSES}=${session?.user.institutionId}` })
  ])

  return <PersonalTab residentData={resident} houses={houses} programs={programs} />
}

export default PersonalTabServer
