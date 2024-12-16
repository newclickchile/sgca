import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

// Define the type for the options
interface SelectOption {
  id: string
  label: string
}

// Define the props for the GenericSelect component
interface GenericSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  label: string
  placeholder?: string
}

const FilterSelect: React.FC<GenericSelectProps> = ({ options, value, onChange, label, placeholder = 'Select' }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${label}-select`}>{label}</InputLabel>
      <Select
        fullWidth
        id={`${label}-select`}
        value={value}
        onChange={e => onChange(e.target.value as string)}
        label={label}
        inputProps={{ placeholder }}
      >
        <MenuItem value=''>{placeholder}</MenuItem>
        {options?.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FilterSelect
