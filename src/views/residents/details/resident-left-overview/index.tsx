import Grid from '@mui/material/Grid'

import type { ResidentType } from '@/types/resident'
import ResidentDetails from './ResidentDetails'

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
