'use client'

import { useEffect } from 'react'

import type { ButtonProps } from '@mui/material'
import { Button, Grid } from '@mui/material'
import type { DefaultValues, FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import type { IKeyValueData } from './FormInput'
import { FormInput } from './FormInput'

export interface FieldConfig {
  name: string
  label: string
  type?: string | undefined
  placeholder?: string
  rules?: any
  width?: number
  isRequired?: boolean
  listValues?: IKeyValueData[]
  rows?: number
}
interface CustomFormProps<T extends FieldValues> {
  fields: FieldConfig[]
  defaultValues?: DefaultValues<T>
  onSubmit: SubmitHandler<T>
  onCancel?: () => void
  submitButtonName?: string
  cancelButtonName?: string
  submitSize?: number
  useDirty?: boolean
  resetForm?: boolean
  submitButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  isLoadingCancelAction?: boolean
}

const CustomForm = <T extends FieldValues>({
  fields,
  defaultValues,
  onSubmit,
  onCancel,
  resetForm = undefined,
  submitButtonName = 'Enviar',
  cancelButtonName = 'Cancelar',
  isLoadingCancelAction = false,
  useDirty = true,
  submitButtonProps,
  cancelButtonProps
}: CustomFormProps<T>) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<T>({ defaultValues })

  const handleCancel = () => {
    reset()

    if (onCancel) {
      onCancel()
    }
  }

  useEffect(() => {
    if (resetForm) {
      reset()
    }
  }, [reset, resetForm])

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <Grid container spacing={5}>
        {fields.map((field, index) => {
          const { name, isRequired = false, type, placeholder, rules, label, rows, listValues = [], width = 6 } = field

          return (
            <Grid key={`${label}${index}`} item xs={12} sm={width} alignItems={'center'}>
              <FormInput
                control={control}
                errors={errors}
                rules={rules}
                placeholder={placeholder ?? label}
                name={name}
                type={type}
                label={label}
                isRequired={isRequired}
                listValues={listValues}
                rows={rows}
              />
            </Grid>
          )
        })}
      </Grid>
      <Grid container gap={2}>
        <Button
          variant='contained'
          type='submit'
          disabled={useDirty && !isDirty}
          {...{
            fullWidth: true,
            ...submitButtonProps
          }}
        >
          {submitButtonName}
        </Button>
        {onCancel && (
          <Button
            type='reset'
            variant='outlined'
            disabled={isLoadingCancelAction}
            onClick={handleCancel}
            {...{
              fullWidth: true,
              ...cancelButtonProps
            }}
          >
            {isLoadingCancelAction ? 'Procesando ...' : cancelButtonName || 'Cancelar'}
          </Button>
        )}
      </Grid>
    </form>
  )
}

export default CustomForm
