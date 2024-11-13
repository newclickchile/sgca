'use client'
import type { MouseEvent, SyntheticEvent } from 'react'
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'

import type { AuxParentsType } from '@/types/aux'
import AffiliationTabPanel from './affiliation/affiliationTabPanel'
import BrothersTabPanel from './brothers/brothersTabPanel'

const FamilyTab: React.FC<{ parents: AuxParentsType[] }> = ({}) => {
  const [value, setValue] = useState<string>('1')

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card sx={{ minHeight: 400 }}>
      <CardContent>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='nav tabs example'>
            <Tab
              value='1'
              component='a'
              label='Madre / Padre'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='2'
              component='a'
              label='Hermanos'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='3'
              component='a'
              label='Familia extensa'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='4'
              component='a'
              label='Adulto significativo'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
          </TabList>
          <TabPanel value='1'>
            <AffiliationTabPanel />
          </TabPanel>
          <TabPanel value='2'>
            <BrothersTabPanel />
          </TabPanel>
          <TabPanel value='3'></TabPanel>
          <TabPanel value='4'></TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default FamilyTab
