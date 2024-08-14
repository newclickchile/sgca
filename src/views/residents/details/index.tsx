import type { ReactElement } from 'react'

import Link from 'next/link'

import dynamic from 'next/dynamic'

import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

import type { ResidentType } from '@/types/resident'
import ResidentLeftOverview from './resident-left-overview'
import ResidentRight from './resident-right'

const PersonalTab = dynamic(() => import('@/views/residents/details/resident-right/personal'))

// const SecurityTab = dynamic(() => import('@views/apps/ecommerce/customers/details/customer-right/security'))
// const NotificationsTab = dynamic(() => import('@views/apps/ecommerce/customers/details/customer-right/notification'))

// const AddressBillingTab = dynamic(
//   () => import('@views/apps/ecommerce/customers/details/customer-right/address-billing')
// )

// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
  personal: <PersonalTab />

  // security: <SecurityTab />,
  // addressBilling: <AddressBillingTab />,
  // notifications: <NotificationsTab />
})

const ResidentDetails = ({ residentData }: { residentData: ResidentType }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='flex flex-wrap justify-start items-center gap-x-6 gap-y-4'>
          <Typography className='flex justify-center items-center' color='primary'>
            <Link href='/residentes' className='flex items-center'>
              <i className='ri-arrow-left-s-line' />
              <span>Volver</span>
            </Link>
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <ResidentLeftOverview residentData={residentData} />
      </Grid>
      <Grid item xs={12} md={8}>
        <ResidentRight tabContentList={tabContentList()} />
      </Grid>
    </Grid>
  )
}

export default ResidentDetails
