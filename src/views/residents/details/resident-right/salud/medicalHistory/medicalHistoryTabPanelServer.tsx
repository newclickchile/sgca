import { getServerSession } from 'next-auth'

import { fetchData } from '@/utils/fetch'
import { authOptions } from '@/libs/auth'
import MedicalHistoryTabPanel from './medicalHistoryTabPanel'

const URL_MEDICAL_FAQ = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/preguntas?tipoPregunta=0`
const URL_MEDICAL_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/historial?idResidente`

const MedicalHistoryTabPanelServer = async ({ residentId }: { residentId: string }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('User is not authenticated')
  }

  const [{ data: medicalHistoryData }, { data: medicalFaq }] = await Promise.all([
    fetchData({ session, endpoint: `${URL_MEDICAL_HISTORY}=${residentId}` }),
    fetchData({ session, endpoint: `${URL_MEDICAL_FAQ}` })
  ])

  return <MedicalHistoryTabPanel residentMedicalHistory={medicalHistoryData} medicalFaq={medicalFaq} />
}

export default MedicalHistoryTabPanelServer
