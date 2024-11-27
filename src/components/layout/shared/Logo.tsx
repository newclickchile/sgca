'use client'

import { Box } from '@mui/material'

import { useSettings } from '@core/hooks/useSettings'

const Logo = () => {
  const { settings } = useSettings()

  const { layout } = settings

  return (
    <Box>
      {layout === 'collapsed' ? (
        <img alt={'logo'} width='100%' src={`/images/app/logo2.jpg`} />
      ) : (
        <img alt={'logo'} width='90%' src={`/images/app/logo.jpg`} />
      )}
    </Box>
  )
}

export default Logo
