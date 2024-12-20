import { Divider } from '@mui/material'

import type { FieldConfig } from '@/components/forms/CustomForm'

export const fields: FieldConfig[] = [
  {
    name: 'currentPassword',
    label: 'Actual contraseña',
    type: 'password',
    isRequired: true,
    width: 12
  },
  {
    type: 'custom',
    name: 'divider',
    label: '',
    custom: <Divider sx={{ margin: '20px 0' }} />,
    width: 12
  },
  {
    name: 'newPassword',
    label: 'Nueva contraseña',
    type: 'password',
    isRequired: true,
    width: 12
  },
  {
    name: 'confirmPassword',
    label: 'Confirma tu nueva contraseña',
    isRequired: true,
    type: 'password',
    compareWith: 'newPassword',
    width: 12
  }
]
