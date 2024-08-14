import { useSession } from '@/hooks/useSession'
import { fetchData } from '@/utils/fetch'
import Residents from '@/views/residents/Residents'

const URL_HOUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/casas/obtener?idInstitucion`

const ResidentsPage: React.FC = async () => {
  const session = await useSession()
  const { data: housesData } = await fetchData(`${URL_HOUSES}=${session?.user.institutionId}`)

  return <Residents houses={housesData} />
}

export default ResidentsPage
