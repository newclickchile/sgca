'use client'

import type { MouseEvent, SyntheticEvent } from 'react'
import React from 'react'

import { TabList } from '@mui/lab'
import { Tab } from '@mui/material'

interface TabItem {
  value: string
  label: string
}

interface CustomTabListProps {
  tabs: TabItem[]
  onTabChange: (event: SyntheticEvent, newValue: string) => void
}

const CustomTabList: React.FC<CustomTabListProps> = ({ tabs, onTabChange }) => {
  return (
    <TabList onChange={onTabChange} aria-label='dynamic tabs' variant='scrollable'>
      {tabs.map(tab => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()} // Prevenir el comportamiento por defecto
        />
      ))}
    </TabList>
  )
}

export default CustomTabList
