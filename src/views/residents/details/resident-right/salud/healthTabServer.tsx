import HealthTab from './healthTabClient'
import MedicalHistoryTabPanelServer from './medicalHistory/medicalHistoryTabPanelServer'

const HealthTabServer = async ({ residentId }: { residentId: string }) => {
  return (
    <HealthTab
      tabContentComponents={{
        medicalHistory: <MedicalHistoryTabPanelServer residentId={residentId} />
      }}
    />
  )
}

export default HealthTabServer
