'use client'
import type { ReactElement, SyntheticEvent } from 'react'
import { useState } from 'react'

import { TabContext, TabPanel } from '@mui/lab'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import CustomTabList from '@/components/forms/CustomTabList'

const tabs = [
  { value: 'medicalHistory', label: 'Historial clínico' },
  { value: 'perinatalHistory', label: 'Historial perinatal' },
  { value: 'familyHistory', label: 'Historial familiar' },
  { value: 'medicalConsultation', label: 'Consultas médicas' }
]

const HealthTab = ({ tabContentComponents }: { tabContentComponents: { [key: string]: ReactElement } }) => {
  const [value, setValue] = useState<string>('medicalHistory')

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card sx={{ minHeight: 400 }}>
      <CardContent>
        <TabContext value={value}>
          <CustomTabList tabs={tabs} onTabChange={handleChange} />
          <TabPanel value={value}>{tabContentComponents[value]}</TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default HealthTab
