import HealthTab from './healthTabClient'
import MedicalHistoryTabPanelServer from './medicalHistory/medicalHistoryTabPanelServer'

const HealthTabServer = async ({ residentId }: { residentId: number }) => {
  return (
    <HealthTab
      tabContentComponents={{
        medicalHistory: <MedicalHistoryTabPanelServer residentId={residentId} />
      }}
    />
  )
}

export default HealthTabServer
