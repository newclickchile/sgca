import React, { useState } from 'react'

import { ErrorMessage } from '@hookform/error-message'
import { TextField, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import type { Control, DeepMap, FieldError, RegisterOptions } from 'react-hook-form'
import { Controller } from 'react-hook-form'

export const PASSWORD_RULES = [
  { re: /^.{8,16}$/, label: 'Debe ingresar entre 8 y 16 caracteres' },
  { re: /[0-9]/, label: 'Debe incluir un número' },
  { re: /[a-z]/, label: 'Debe incluir letra minúscula' },
  { re: /[A-Z]/, label: 'Debe incluir letra mayúscula' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Debe incluir un caracter especial' }
]

export interface IKeyValueData {
  id: string
  nombre: string
  descripcion?: string
}

export const FormInput: React.FC<{
  control?: Control<any>
  listValues?: IKeyValueData[]
  label?: string
  placeholder?: string
  searchable?: boolean
  required?: boolean
  autoFocus?: boolean
  message?: string
  maxLength?: number
  size?: number
  name: string
  errors: DeepMap<Record<string, any>, FieldError>
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
  extraPasswordRules?: { re: RegExp; label: string }[]
  usePasswordPopover?: boolean
  type?: string
}> = props => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <>
      <Controller
        render={({ field: { value, onChange } }) => {
          switch (props.type) {
            case 'password':
              return (
                <TextField
                  fullWidth
                  value={value}
                  placeholder={props.placeholder}
                  label={props.label}
                  error={Boolean(props.errors[props.name])}
                  type={!showPassword ? 'text' : 'password'}
                  onChange={onChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='toggle password visibility'
                        >
                          <i className={!showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )
            case 'hidden':
              return <input type={'hidden'} id={props.name} value={value} onChange={onChange} />
            default:
              return (
                <TextField
                  fullWidth
                  value={value}
                  label={props.label}
                  type={!props.type || props.type === 'number' ? 'text' : props.type}
                  onChange={onChange}
                  autoFocus={props.autoFocus}
                  placeholder={props.placeholder}
                  error={Boolean(props.errors[props.name])}
                />
              )
          }
        }}
        control={props.control}
        name={props.name}
        rules={{
          ...props.rules
        }}
      />

      <ErrorMessage
        errors={props.errors}
        name={props.name}
        render={({ message }) => (
          <Typography
            sx={{
              maxWidth: '80%',
              fontSize: '12px !important',
              color: 'red'
            }}
          >
            {message}
          </Typography>
        )}
      />
    </>
  )
}
