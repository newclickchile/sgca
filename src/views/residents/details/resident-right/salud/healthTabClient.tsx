'use client'
import type { MouseEvent, ReactElement, SyntheticEvent } from 'react'
import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

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
            <Tab
              value='perinatalHistory'
              component='a'
              label='Historial perinatal'
              href='/trash'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='familyHistory'
              component='a'
              label='Historial familiar'
              href='/spam'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='medicalConsultation'
              component='a'
              label='Consultas médicas'
              href='/spam'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
          </TabList>
          <TabPanel value={value}>{tabContentComponents[value]}</TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default HealthTab
