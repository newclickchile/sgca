import { useRef } from 'react'

import { TextField } from '@mui/material'

interface DigitInputProps {
  isSubmitted: boolean
  onChange: (value: string) => void
  digitIndex: number
  value: string
}

export const DigitInput = ({ onChange, digitIndex, value, isSubmitted }: DigitInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    onChange(value)

    if (value && inputRef.current) {
      const nextInput = document.getElementById(`input-id-${digitIndex + 1}`) as HTMLInputElement

      if (nextInput) nextInput.focus()
    }
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = event
    const value = (target as HTMLInputElement).value

    const regExpIsOk = /^\d$|Backspace|Delete|Tab|ArrowLeft|ArrowRight/g.test(key)

    if (!regExpIsOk) {
      event.preventDefault()
    }

    if (key === 'Backspace' && !value && inputRef.current) {
      const prevInput = document.getElementById(`input-id-${digitIndex - 1}`) as HTMLInputElement

      if (prevInput) prevInput.focus()
    }
  }

  return (
    <TextField
      ref={inputRef}
      id={`input-id-${digitIndex}`}
      value={value}
      error={isSubmitted && value === ''}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      inputProps={{
        maxLength: 1,
        inputMode: 'numeric',
        pattern: '[0-9]*',
        style: { fontSize: 18 }
      }}
    />
  )
}
