// ** React Imports
import type { ReactNode } from 'react'
import { useState } from 'react'

// ** MUI Imports
import { Checkbox } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'

const CardActionCollapse = (props: { children: ReactNode; title: string; collapse?: boolean }) => {
  const { children, title, collapse = true } = props

  // ** State
  const [collapsed, setCollapsed] = useState<boolean>(collapse)

  return (
    <>
      <CardHeader
        sx={{ padding: 2 }}
        title={title}
        action={
          <IconButton
            size='small'
            aria-label='collapse'
            sx={{ color: 'text.secondary' }}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Checkbox checked={collapsed} />
          </IconButton>
        }
      />
      <Collapse in={collapsed}>
        <CardContent>{children}</CardContent>
      </Collapse>
    </>
  )
}

export default CardActionCollapse
