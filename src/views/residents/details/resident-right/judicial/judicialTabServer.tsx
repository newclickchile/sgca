import { fetchData } from '@/utils/fetch'
import JudicialInformationTabPanel from './judicialInformation/judicialInformationTab'
import JudicialTab from './judicialTabClient'
import PreviousCausesTabPanel from './previousCauses'
import CriminalCausesTabPanel from './criminalCauses'

const URL_JUDICIAL_INFORMATION = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/judicial?idResidente`
const URL_ADMISSION_CAUSES = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/parentesco`

const URL_JUDICIAL_PREVIOUS_CAUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/causa/anterior?idResidente`
const URL_JUDICIAL_CRIMINAL_CAUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/causa/penal?idResidente`

const URL_PROSECUTORS = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/fiscalia`

// const URL_JUDICIAL_CURATOR = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/judicial?idResidente`
// const URL_JUDICIAL_RESPONSIBLE_ADULT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/judicial?idResidente`

const JudicialTabServer = async ({ residentId }: { residentId: number }) => {
  const [
    { data: judicialData },
    { data: admissionCauses },
    { data: previousCauses },
    { data: criminalCauses },
    { data: prosecutors }
  ] = await Promise.all([
    fetchData({ endpoint: `${URL_JUDICIAL_INFORMATION}=${residentId}` }),
    fetchData({ endpoint: URL_ADMISSION_CAUSES }),
    fetchData({ endpoint: `${URL_JUDICIAL_PREVIOUS_CAUSES}=${residentId}` }),
    fetchData({ endpoint: `${URL_JUDICIAL_CRIMINAL_CAUSES}=${residentId}` }),
    fetchData({ endpoint: URL_PROSECUTORS })
  ])

  return (
    <JudicialTab
      tabContentComponents={{
        judicialInformation: (
          <JudicialInformationTabPanel
            curatorData={undefined}
            responsibleAdultData={undefined}
            residentId={residentId}
            judicialData={judicialData}
            admissionCauses={admissionCauses}
          />
        ),
        previousCauses: <PreviousCausesTabPanel previousCauses={previousCauses} residentId={residentId} />,
        criminalCauses: (
          <CriminalCausesTabPanel prosecutors={prosecutors} criminalCauses={criminalCauses} residentId={residentId} />
        )
      }}
    />
  )
}

export default JudicialTabServer
