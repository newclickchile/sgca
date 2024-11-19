import { getServerSession } from 'next-auth'

import AlertError from '@/components/AlertError'
import { authOptions } from '@/libs/auth'
import { fetchData } from '@/utils/fetch'
import ResidentList from '@/views/residents/list/ResidentList'

const URL_HOUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/casas/obtener?idInstitucion`
const URL_PROGRAMS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/programa`

const ResidentPage = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error('User is not authenticated')
    }

    const [{ data: houses }, { data: programs }] = await Promise.all([
      fetchData({ endpoint: `${URL_HOUSES}=${session?.user.institutionId}` }),
      fetchData({ endpoint: URL_PROGRAMS })
    ])

    return <ResidentList houses={houses} programs={programs} />
  } catch (error) {
    console.error('Error loading ResidentPage:', error)

    return <AlertError />
  }
}

export default ResidentPage
