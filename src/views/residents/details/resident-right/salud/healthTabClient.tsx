'use client'

import type { MouseEvent, ReactElement, SyntheticEvent } from 'react'
import { useState } from 'react'

import dynamic from 'next/dynamic'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'

import FamilyHistoryServerComponent from '@/app/server-components/residents/details/resident-right/salud/FamilyHistoryData'
import { useResident } from '@/contexts/residentContext'
import type { AuxParentsType } from '@/types/aux'
import type { IMedicalConsultations } from '@/types/residents/health/medicalConsultations'
import type { IMedicalFaq } from '@/types/residents/health/medicalFAQ'
import type { IMedicalHistory } from '@/types/residents/health/medicalHistory'
import FamilyHistoryTabPanel from './familyHistory/familyHistoryTabPanel'
import MedicalConsultationsTabPanel from './medicalConsultations/medicalConsultationsTabPanel'
import MedicalHistoryTabPanel from './medicalHistory/medicalHistoryTabPanel'
import PerinatalHistoryTabPanel from './perinatalHistory/perinatalHistoryTabPanel'
import MedicalHistoryTabPanelServer from './medicalHistory/medicalHistoryTabPanelServer'

interface HealthTabProps {
  medicalHistoryData: IMedicalHistory[]

  //familyHistoryData: IFamilyHistory[]
  parents: AuxParentsType[]
  medicalConsultationsData: IMedicalConsultations[]
  medicalFaqData: IMedicalFaq[]
  medicalPerinatalData: IMedicalFaq[]
}

const HealthTab = ({ tabContentComponents }: { tabContentComponents: { [key: string]: ReactElement } }) => {
  const [value, setValue] = useState<string>('medicalHistory')

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card sx={{ minHeight: 400 }}>
      <CardContent>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='nav tabs example'>
            <Tab
              value='medicalHistory'
              component='a'
              label='Historial clínico'
              href='/drafts'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            {/* <Tab
              value='2'
              component='a'
              label='Historial perinatal'
              href='/trash'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='3'
              component='a'
              label='Historial familiar'
              href='/spam'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='4'
              component='a'
              label='Consultas médicas'
              href='/spam'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            /> */}
          </TabList>
          <TabPanel value={value}>{tabContentComponents[value]}</TabPanel>
          {/* <TabPanel value='2'>
            <PerinatalHistoryTabPanel
              medicalHistoryData={medicalHistoryData}
              medicalPerinatalData={medicalPerinatalData}
            />
          </TabPanel>
          <TabPanel value='3'>
            <FamilyHistoryTabPanel familyHistoryData={[]} parents={parents}>
              <FamilyHistoryServerComponent residentId={resident.id} parents={parents} />
            </FamilyHistoryTabPanel>
          </TabPanel>
          <TabPanel value='4'>
            <MedicalConsultationsTabPanel medicalConsultationsData={medicalConsultationsData} />
          </TabPanel> */}
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default HealthTab
