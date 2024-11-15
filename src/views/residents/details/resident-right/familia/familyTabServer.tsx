import { fetchData } from '@/utils/fetch'
import AffiliationTabPanel from './affiliation/affiliationTabPanel'
import BrothersTabPanel from './brothers'
import FamilyTab from './familyTab'
import { IResident } from '@/types/residents/service'
import ExtendedFamilyTabPanel from './extendedFamilyTabPanel'
import SignificantAdultTabPanel from './significantAdult'

const URL_MEDICAL_FAQ = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/preguntas?tipoPregunta=0`
const URL_PERINATAL_FAQ = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/preguntas?tipoPregunta=1`
const URL_MEDICAL_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/historial?idResidente`
const URL_SIGNIFICANT_ADULT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/adulto?idResidente`
const URL_BROTHERS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/hermano?idResidente`

const FamilyTabServer = async ({ residentId, resident }: { residentId: number; resident: IResident }) => {
  const [
    { data: medicalHistoryData },
    { data: medicalFaq },
    { data: medicalPerinatalData },
    { data: significantAdult },
    { data: brothers }
  ] = await Promise.all([
    fetchData({ endpoint: `${URL_MEDICAL_HISTORY}=${residentId}` }),
    fetchData({ endpoint: `${URL_MEDICAL_FAQ}` }),
    fetchData({ endpoint: `${URL_PERINATAL_FAQ}` }),
    fetchData({ endpoint: `${URL_SIGNIFICANT_ADULT}=${residentId}` }),
    fetchData({ endpoint: `${URL_BROTHERS}=${residentId}` })
  ])

  return (
    <FamilyTab
      tabContentComponents={{
        affiliation: <AffiliationTabPanel resident={resident} />,
        brothers: <BrothersTabPanel brothers={brothers} />,
        // extendedFamily: <ExtendedFamilyTabPanel />,
        significantAdult: <SignificantAdultTabPanel significantAdultData={significantAdult[0]} />
      }}
    />
  )
}

export default FamilyTabServer
