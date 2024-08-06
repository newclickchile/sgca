import { Button, Box } from '@mui/material'
import type { FieldValues, SubmitHandler, DefaultValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { FormInput } from './FormInput'

interface FieldConfig {
  name: string
  label: string
  type?: string | undefined
  placeholder?: string
  rules?: any
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
      {fields.map((field, index) => {
        const { name, type, placeholder, rules, label } = field

        return (
          <Box key={`${label}${index}`}>
            <FormInput
              control={control}
              errors={errors}
              rules={rules}
              placeholder={placeholder ?? label}
              name={name}
              type={type}
            />
          </Box>
        )
      })}
      <Button fullWidth variant='contained' type='submit'>
        {submitButtonName}
      </Button>
    </form>
  )
}

export default CustomForm
