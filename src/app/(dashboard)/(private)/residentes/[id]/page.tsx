import { fetchData } from '@/utils/fetch'
import ResidentDetails from '@/views/residents/details'

const URL_RESIDENT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/obtener?idResidente`

const ResidentsDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { data: residentData } = await fetchData({ endpoint: `${URL_RESIDENT}=${params.id}` })

  return <ResidentDetails residentData={residentData} />
}

export default ResidentsDetailsPage
