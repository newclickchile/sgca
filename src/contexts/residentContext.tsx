'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

import type { IResident, IUpdateResident } from '@/types/residents/service'

interface ResidentContextProps {
  resident: IResident
  updateResident: (updatedData: Partial<IUpdateResident>) => void
}

const ResidentContext = createContext<ResidentContextProps | undefined>(undefined)

export const useResident = () => {
  const context = useContext(ResidentContext)

  if (!context) {
    throw new Error('useResident must be used within a ResidentProvider')
  }

  return context
}

export const ResidentProvider = ({
  children,
  initialResidentData
}: {
  children: ReactNode
  initialResidentData: IResident
}) => {
  const [resident, setResident] = useState<IResident>(initialResidentData)

  const updateResident = (updatedData: Partial<IUpdateResident>) => {
    setResident(prev => ({ ...prev, ...updatedData }))
  }

  return <ResidentContext.Provider value={{ resident, updateResident }}>{children}</ResidentContext.Provider>
}
