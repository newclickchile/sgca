import Grid from '@mui/material/Grid'

import ResidentDetails from './ResidentDetails'

const ResidentLeftOverview = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ResidentDetails />
      </Grid>
    </Grid>
  )
}

export default ResidentLeftOverview
