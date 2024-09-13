import Grid from '@mui/material/Grid'

import ResidentDetails from './ResidentDetails'
import type { ResidentType } from '@/types/residents/service'

const ResidentLeftOverview = ({ residentData }: { residentData?: ResidentType }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ResidentDetails residentData={residentData} />
      </Grid>
    </Grid>
  )
}

export default ResidentLeftOverview
