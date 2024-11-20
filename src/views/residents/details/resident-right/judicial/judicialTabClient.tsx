'use client'
import type { ReactElement, SyntheticEvent } from 'react'
import { useState } from 'react'

import { TabContext, TabPanel } from '@mui/lab'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { Box } from '@mui/material'

import CustomTabList from '@/components/forms/CustomTabList'

const tabs = [
  { value: 'judicialInformation', label: 'Información Judicial' },
  { value: 'previousCauses', label: 'Causas anteriores' },
  { value: 'criminalCauses', label: 'Causas penales asociadas' }
]

const JudicialTab = ({ tabContentComponents }: { tabContentComponents: { [key: string]: ReactElement } }) => {
  const [value, setValue] = useState<string>(tabs[0].value)

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card sx={{ minHeight: 400 }}>
      <CardContent>
        <TabContext value={value}>
          <CustomTabList tabs={tabs} onTabChange={handleChange} />
          <TabPanel value={value}>
            <Box my={4}>{tabContentComponents[value]}</Box>
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default JudicialTab
