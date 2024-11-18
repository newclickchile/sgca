import { fetchData } from '@/utils/fetch'
import FamilyHistoryTabPanel from './familyHistory'
import HealthTab from './healthTabClient'
import MedicalHistoryTabPanel from './medicalHistory/medicalHistoryTabPanel'
import PerinatalHistoryTabPanel from './perinatalHistory/perinatalHistoryTabPanel'

const URL_MEDICAL_FAQ = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/preguntas?tipoPregunta=0`
const URL_PERINATAL_FAQ = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/preguntas?tipoPregunta=1`
const URL_MEDICAL_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/historial?idResidente`
const URL_FAMILY_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/familia/historial?idResidente`
const URL_PARENTS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/parentesco`

const HealthTabServer = async ({ residentId }: { residentId: number }) => {
  const [
    { data: medicalHistoryData },
    { data: medicalFaq },
    { data: medicalPerinatalData },
    { data: familyHistory },
    { data: parents }
  ] = await Promise.all([
    fetchData({ endpoint: `${URL_MEDICAL_HISTORY}=${residentId}` }),
    fetchData({ endpoint: `${URL_MEDICAL_FAQ}` }),
    fetchData({ endpoint: `${URL_PERINATAL_FAQ}` }),
    fetchData({ endpoint: `${URL_FAMILY_HISTORY}=${residentId}` }),
    fetchData({ endpoint: URL_PARENTS })
  ])

  return (
    <HealthTab
      tabContentComponents={{
        medicalHistory: <MedicalHistoryTabPanel residentMedicalHistory={medicalHistoryData} medicalFaq={medicalFaq} />,
        familyHistory: (
          <FamilyHistoryTabPanel residentId={residentId} familyHistory={familyHistory} parents={parents} />
        ),
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
