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
  submitButtonName?: string
}

const CustomForm = <T extends FieldValues>({
  fields,
  defaultValues,
  onSubmit,
  submitButtonName = 'Enviar'
}: CustomFormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<T>({ defaultValues })

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <Grid container spacing={5}>
        {fields.map((field, index) => {
          const { name, isRequired, type, placeholder, rules, label, rows, listValues = [], width = 6 } = field

          return (
            <Grid key={`${label}${index}`} item xs={12} sm={width}>
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
      <Button fullWidth variant='contained' type='submit'>
        {submitButtonName}
      </Button>
    </form>
  )
}

export default CustomForm
