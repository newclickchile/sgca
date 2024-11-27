'use client'

import { Box } from '@mui/material'

import useVerticalNav from '@/@menu/hooks/useVerticalNav'

const Logo = () => {
  const verticalNavOptions = useVerticalNav()
  const { isCollapsed, isHovered } = verticalNavOptions

  const logoSrc = isHovered ? '/images/app/logo.jpg' : isCollapsed ? '/images/app/logo2.jpg' : '/images/app/logo.jpg'

  return (
    <Box
      sx={{
        width: isHovered ? '100%' : isCollapsed ? '40px' : '100%',
        height: isHovered ? '80px' : isCollapsed ? '40px' : '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <img
        alt='logo'
        src={logoSrc}
        style={{
          width: 'auto',
          height: '100%',
          maxWidth: '100%'
        }}
      />
    </Box>
  )
}

export default Logo
