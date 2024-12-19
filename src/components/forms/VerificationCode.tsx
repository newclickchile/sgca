import { useEffect, useState } from 'react'

import type { Control, DeepMap, FieldError, UseFormSetValue } from 'react-hook-form'

import { DigitInput } from './DigitInput'
import { FormInput } from './FormInput'

const VerificationCode: React.FC<{
  isSubmitted: boolean
  control?: Control<{ code: string[] }>
  errors: DeepMap<Record<string, any>, FieldError>
  setValue: UseFormSetValue<{ code: string[] }>
}> = props => {
  const { control, errors, setValue, isSubmitted } = props
  const [digits, setDigits] = useState(['', '', '', '', '', ''])

  const handleDigitChange = (index: number, value: string) => {
    const newDigits = [...digits]

    newDigits[index] = value
    setDigits(newDigits)
  }

  useEffect(() => {
    setValue('code', digits, { shouldValidate: isSubmitted })
  }, [digits, setValue, isSubmitted])

  return (
    <>
      <div style={{ display: 'flex', paddingTop: '8px', justifyContent: 'center', gap: 10 }}>
        {digits.map((digit, index) => (
          <DigitInput
            key={index}
            isSubmitted={isSubmitted}
            value={digit}
            digitIndex={index}
            onChange={(value: string) => handleDigitChange(index, value)}
          />
        ))}
      </div>
      <FormInput
        listValues={[]}
        size={12}
        errors={errors}
        control={control}
        name='code'
        message='Código es requerido'
        type='hidden'
        rules={{
          validate: {
            f1: value => /^\d{6}$/.test(value.join('')) || 'Debe ingresar el código correctamente'
          }
        }}
      />
    </>
  )
}

export default VerificationCode
