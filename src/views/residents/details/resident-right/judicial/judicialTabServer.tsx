import { fetchData } from '@/utils/fetch'
import JudicialInformationTabPanel from './judicialInformation/judicialInformationTab'
import JudicialTab from './judicialTabClient'

const URL_JUDICIAL_INFORMATION = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/judicial?idResidente`
const URL_ADMISSION_CAUSES = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/parentesco`

const JudicialTabServer = async ({ residentId }: { residentId: number }) => {
  const [{ data: judicialData }, { data: admissionCauses }] = await Promise.all([
    fetchData({ endpoint: `${URL_JUDICIAL_INFORMATION}=${residentId}` }),
    fetchData({ endpoint: URL_ADMISSION_CAUSES })
  ])

  return (
    <JudicialTab
      tabContentComponents={{
        judicialInformation: (
          <JudicialInformationTabPanel
            residentId={residentId}
            judicialData={judicialData}
            admissionCauses={admissionCauses}
          />
        )
      }}
    />
  )
}

export default JudicialTabServer
