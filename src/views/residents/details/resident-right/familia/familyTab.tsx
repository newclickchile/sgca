'use client'
import type { MouseEvent, SyntheticEvent, ReactElement } from 'react'
import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const FamilyTab = ({ tabContentComponents }: { tabContentComponents: { [key: string]: ReactElement } }) => {
  const [value, setValue] = useState<string>('affiliation')

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card sx={{ minHeight: 400 }}>
      <CardContent>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='nav tabs example'>
            <Tab
              value='affiliation'
              component='a'
              label='Madre / Padre'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='brothers'
              component='a'
              label='Hermanos'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='extendedFamily'
              component='a'
              label='Familia extensa'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='significantAdult'
              component='a'
              label='Adulto significativo'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
          </TabList>
          <TabPanel value={value}>
            <Box my={4}>{tabContentComponents[value]}</Box>
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default FamilyTab
