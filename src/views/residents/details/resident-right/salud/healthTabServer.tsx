import { fetchData } from '@/utils/fetch'
import HealthTab from './healthTabClient'
import MedicalHistoryTabPanel from './medicalHistory/medicalHistoryTabPanel'
import PerinatalHistoryTabPanel from './perinatalHistory/perinatalHistoryTabPanel'

const URL_MEDICAL_FAQ = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/preguntas?tipoPregunta=0`
const URL_PERINATAL_FAQ = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/preguntas?tipoPregunta=1`
const URL_MEDICAL_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/historial?idResidente`

const HealthTabServer = async ({ residentId }: { residentId: number }) => {
  const [{ data: medicalHistoryData }, { data: medicalFaq }, { data: medicalPerinatalData }] = await Promise.all([
    fetchData({ endpoint: `${URL_MEDICAL_HISTORY}=${residentId}` }),
    fetchData({ endpoint: `${URL_MEDICAL_FAQ}` }),
    fetchData({ endpoint: `${URL_PERINATAL_FAQ}` })
  ])

  return (
    <HealthTab
      tabContentComponents={{
        medicalHistory: <MedicalHistoryTabPanel residentMedicalHistory={medicalHistoryData} medicalFaq={medicalFaq} />,
        perinatalHistory: (
          <PerinatalHistoryTabPanel
            medicalHistoryData={medicalHistoryData}
            medicalPerinatalData={medicalPerinatalData}
          />
        )
      }}
    />
  )
}

export default HealthTabServer
