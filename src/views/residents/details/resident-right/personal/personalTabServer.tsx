import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import type { IResident } from '@/types/residents/service'
import { fetchData } from '@/utils/fetch'
import PersonalTab from './personalTab'
import AlertError from '@/components/AlertError'

const URL_HOUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/casas/obtener?idInstitucion`
const URL_PROGRAMS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/programa`

const PersonalTabServer = async ({ resident }: { resident: IResident }) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error('User is not authenticated')
    }

    const [houses, programs] = await Promise.all([
      fetchData({ endpoint: `${URL_HOUSES}=${session?.user.institutionId}` }),
      fetchData({ endpoint: URL_PROGRAMS })
    ])

    return <PersonalTab residentData={resident} houses={houses} programs={programs} />
  } catch (error) {
    console.log('error on PersonalTabServer:', error)

    return <AlertError />
  }
}

export default PersonalTabServer
