import React, { useState } from 'react'

import { ErrorMessage } from '@hookform/error-message'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import type { Control, DeepMap, FieldError, RegisterOptions } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { formatDateForBackend, toZonedDate } from '@/utils/date'
import type { PlaceType } from '../LocationAutoComplete'
import LocationAutoComplete from '../LocationAutoComplete'

export const PASSWORD_RULES = [
  { re: /^.{8,16}$/, label: 'Debe ingresar entre 8 y 16 caracteres' },
  { re: /[0-9]/, label: 'Debe incluir un número' },
  { re: /[a-z]/, label: 'Debe incluir letra minúscula' },
  { re: /[A-Z]/, label: 'Debe incluir letra mayúscula' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Debe incluir un caracter especial' }
]
export interface IKeyValueData {
  id: string | number
  nombre: string
  descripcion?: string
}

export const FormInput: React.FC<{
  control?: Control<any>
  listValues: IKeyValueData[]
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
  isRequired?: boolean
  extraPasswordRules?: { re: RegExp; label: string }[]
  usePasswordPopover?: boolean
  type?: string
  defaultValue?: string
  multiline?: boolean
  rows?: number
}> = props => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const numberValidation = {
    validate: {
      isNumber: (value: string) => !isNaN(Number(value)) || 'Debe ingresar solo números'
    }
  }

  return (
    <>
      <Controller
        render={({ field: { value = '', onChange } }) => {
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
              return <input type='hidden' id={props.name} value={value} onChange={onChange} />
            case 'autocomplete':
              return (
                <LocationAutoComplete
                  error={Boolean(props.errors[props.name])}
                  initValue={
                    value
                      ? { description: value, structured_formatting: { main_text: value, secondary_text: '' } }
                      : null
                  }
                  handleAddressSelect={(selectedValue: PlaceType | null) => onChange(selectedValue?.description || '')}
                />
              )
            case 'checkbox':
              return (
                <FormControlLabel
                  label={props.label}
                  control={<Checkbox size='large' name={props.name} onChange={onChange} checked={value} />}
                />
              )
            case 'select':
              return (
                <FormControl error={Boolean(props.errors[props.name])} fullWidth>
                  <InputLabel id='select-outlined-label'>{props.label}</InputLabel>
                  <Select
                    value={value}
                    onChange={onChange}
                    label={props.label}
                    defaultValue={props.defaultValue}
                    id='select-outlined'
                    labelId='select-outlined-label'
                  >
                    {props.listValues.map((data: IKeyValueData) => {
                      return (
                        <MenuItem key={data.id} value={data.id}>
                          {data.nombre}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              )
            case 'datepicker':
              return (
                <>
                  <AppReactDatepicker
                    selected={value ? toZonedDate(value) : null}
                    id='basic-input'
                    showYearDropdown
                    dateFormat='dd-MM-yyyy'
                    onChange={(date: Date) => {
                      return date && onChange(formatDateForBackend(date))
                    }}
                    placeholderText={props.placeholder}
                    customInput={
                      <TextField sx={{ width: '100%' }} error={Boolean(props.errors[props.name])} label={props.label} />
                    }
                  />
                </>
              )
            default:
              return (
                <TextField
                  multiline={props.type === 'multiline'}
                  rows={props.rows}
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
        defaultValue={props.defaultValue || ''}
        control={props.control}
        name={props.name}
        rules={{
          ...props.rules,
          ...(props.type === 'number' ? numberValidation : {}),
          ...(props.isRequired && { required: `Debe ingresar "${props.label}"` })
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
