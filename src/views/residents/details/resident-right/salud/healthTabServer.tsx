import { fetchData } from '@/utils/fetch'
import FamilyHistoryTabPanel from './familyHistory'
import HealthTab from './healthTabClient'
import MedicalConsultationsTabPanel from './medicalConsultations/medicalConsultationsTabPanel'
import MedicalHistoryTabPanel from './medicalHistory/medicalHistoryTabPanel'
import AlertError from '@/components/AlertError'

const URL_MEDICAL_FAQ = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/preguntas?tipoPregunta=0`
const URL_PERINATAL_FAQ = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/preguntas?tipoPregunta=1`
const URL_MEDICAL_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/historial?idResidente`
const URL_FAMILY_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/familia/historial?idResidente`
const URL_PARENTS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/parentesco`
const URL_MEDICAL_CONSULTATIONS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/consulta-medica?idResidente`

const HealthTabServer = async ({ residentId }: { residentId: number }) => {
  const [medicalHistoryFaq, medicalPerinatalFaq, medicalHistoryData, familyHistory, parents, medicalConsultationsData] =
    await Promise.all([
      fetchData({ endpoint: `${URL_MEDICAL_FAQ}` }),
      fetchData({ endpoint: `${URL_PERINATAL_FAQ}` }),
      fetchData({ endpoint: `${URL_MEDICAL_HISTORY}=${residentId}` }),
      fetchData({ endpoint: `${URL_FAMILY_HISTORY}=${residentId}` }),
      fetchData({ endpoint: URL_PARENTS }),
      fetchData({ endpoint: `${URL_MEDICAL_CONSULTATIONS}=${residentId}` })
    ])

  return (
    <HealthTab
      tabContentComponents={{
        medicalHistory: medicalHistoryData ? (
          <MedicalHistoryTabPanel
            residentId={residentId}
            residentMedicalHistory={medicalHistoryData}
            medicalFaq={medicalHistoryFaq}
          />
        ) : (
          <AlertError />
        ),
        perinatalHistory: medicalHistoryData ? (
          <MedicalHistoryTabPanel
            residentId={residentId}
            residentMedicalHistory={medicalHistoryData}
            medicalFaq={medicalPerinatalFaq}
          />
        ) : (
          <AlertError />
        ),
        familyHistory: familyHistory ? (
          <FamilyHistoryTabPanel residentId={residentId} familyHistory={familyHistory} parents={parents} />
        ) : (
          <AlertError />
        ),
        medicalConsultation: medicalConsultationsData ? (
          <MedicalConsultationsTabPanel residentId={residentId} medicalConsultationsData={medicalConsultationsData} />
        ) : (
          <AlertError />
        )
      }}
    />
  )
}

export default HealthTabServer
