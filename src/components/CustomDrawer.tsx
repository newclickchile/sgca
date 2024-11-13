import React from 'react'

import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

type Props = {
  open: boolean
  handleClose: () => void
  title: string
  width?: { xs: number; sm: number }
  children: React.ReactNode
}

const CustomDrawer: React.FC<Props> = ({ open, handleClose, title, width = { xs: 300, sm: 400 }, children }) => {
  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width } }}
    >
      <div className='flex items-center justify-between pli-5 plb-4'>
        <Typography variant='h5'>{title}</Typography>
        <IconButton size='small' onClick={handleClose}>
          <i className='ri-close-line text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>{children}</div>
    </Drawer>
  )
}

export default CustomDrawer
