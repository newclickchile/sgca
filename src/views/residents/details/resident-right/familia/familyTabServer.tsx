import { fetchData } from '@/utils/fetch'
import AffiliationTabPanel from './affiliation/affiliationTabPanel'
import BrothersTabPanel from './brothers'
import FamilyTab from './familyTab'
import { IResident } from '@/types/residents/service'
import ExtendedFamilyTabPanel from './extendedFamilyTabPanel'
import SignificantAdultTabPanel from './significantAdult'

const URL_SIGNIFICANT_ADULT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/adulto?idResidente`
const URL_BROTHERS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/hermano?idResidente`
const URL_EXTENDED_FAMILY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/familia?idResidente`
const URL_PARENTS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/parentesco`

const FamilyTabServer = async ({ residentId, resident }: { residentId: number; resident: IResident }) => {
  const [{ data: significantAdult }, { data: brothers }, { data: extendedFamily }, { data: parents }] =
    await Promise.all([
      fetchData({ endpoint: `${URL_SIGNIFICANT_ADULT}=${residentId}` }),
      fetchData({ endpoint: `${URL_BROTHERS}=${residentId}` }),
      fetchData({ endpoint: `${URL_EXTENDED_FAMILY}=${residentId}` }),
      fetchData({ endpoint: URL_PARENTS })
    ])

  return (
    <FamilyTab
      tabContentComponents={{
        affiliation: <AffiliationTabPanel resident={resident} />,
        brothers: <BrothersTabPanel brothers={brothers} residentId={residentId} />,
        extendedFamily: <ExtendedFamilyTabPanel extendedFamily={extendedFamily[0]} parents={parents} />,
        significantAdult: <SignificantAdultTabPanel significantAdultData={significantAdult[0]} />
      }}
    />
  )
}

export default FamilyTabServer
