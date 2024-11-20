'use client'
import type { ReactElement, SyntheticEvent } from 'react'
import { useState } from 'react'

import { TabContext, TabPanel } from '@mui/lab'
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import CustomTabList from '@/components/forms/CustomTabList'

const tabs = [
  { value: 'affiliation', label: 'Madre / Padre' },
  { value: 'brothers', label: 'Hermanos' },
  { value: 'extendedFamily', label: 'Familia extensa' },
  { value: 'significantAdult', label: 'Adulto significativo' }
]

const FamilyTab = ({ tabContentComponents }: { tabContentComponents: { [key: string]: ReactElement } }) => {
  const [value, setValue] = useState<string>('affiliation')

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

export default FamilyTab
