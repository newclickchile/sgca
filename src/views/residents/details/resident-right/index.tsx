'use client'

// React Imports
import type { ReactElement, SyntheticEvent } from 'react'
import { useState } from 'react'

// MUI Imports
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'

// Component Imports
import { styled } from '@mui/material'

import CustomTabList from '@core/components/mui/TabList'

const CustomTab = styled(Tab)(({}) => ({
  color: 'GrayText',
  textTransform: 'uppercase',
  '& .MuiTab-wrapper': {
    color: 'GrayText'
  }
}))

const ResidentRight = ({ tabContentComponents }: { tabContentComponents: { [key: string]: ReactElement } }) => {
  const [activeTab, setActiveTab] = useState('personal')

  const handleChange = (_: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              <CustomTab
                icon={<i className='ri-user-3-line text-2xl' />}
                value='personal'
                label='Personal'
                iconPosition='start'
              />
              <CustomTab
                icon={<i className='fluent-mdl2-family text-2xl' />}
                value='family'
                label='Grupo Familiar'
                iconPosition='start'
              />
              <CustomTab
                icon={<i className='mage-heart-health text-2xl' />}
                value='health'
                label='Salud'
                iconPosition='start'
              />
              <CustomTab
                icon={<i className='octicon-law-24 text-2xl' />}
                value='judicial'
                label='Judicial'
                iconPosition='start'
              />
            </CustomTabList>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={activeTab} className='p-0'>
              {tabContentComponents[activeTab]}
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

export default ResidentRight
