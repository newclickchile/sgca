import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { debounce } from '@mui/material/utils'
import parse from 'autosuggest-highlight/parse'

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) return

  const script = document.createElement('script')

  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}

interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
}

export interface PlaceType {
  description: string
  structured_formatting: StructuredFormatting
}

interface LocationAutoCompleteProps {
  handleAddressSelect: (value: PlaceType | null) => void
  initValue: PlaceType | null
}

const filter = createFilterOptions<PlaceType>()

const LocationAutoComplete: FC<LocationAutoCompleteProps> = ({ handleAddressSelect, initValue }) => {
  const [value, setValue] = useState<PlaceType | null>(initValue)
  const [inputValue, setInputValue] = useState(initValue?.description || '')
  const [options, setOptions] = useState<readonly PlaceType[]>([])
  const loaded = useRef(false)
  const textFieldRef = useRef<HTMLInputElement>(null)

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      )
    }

    loaded.current = true
  }

  const fetch = useMemo(
    () =>
      debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
        ;(autocompleteService.current as any).getPlacePredictions(
          {
            ...request,
            componentRestrictions: {
              country: 'CL'
            }
          },
          callback
        )
      }, 400),
    []
  )

  useEffect(() => {
    let active = true

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService()
    }

    if (!autocompleteService.current) return

    if (inputValue === '') {
      setOptions(value ? [value] : [])

      return
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  return (
    <>
      <Autocomplete
        id='autocomplete'
        freeSolo
        getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          const { inputValue } = params

          const isExisting = options.some(option => inputValue === option.description)

          if (inputValue !== '' && !isExisting) {
            filtered.push({
              structured_formatting: { main_text: inputValue, secondary_text: '' },
              description: inputValue
            })
          }

          return filtered
        }}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        clearOnBlur
        value={value}
        noOptionsText='Sin direcciones encontradas'
        onChange={(_, newValue) => {
          const newStringValue = typeof newValue === 'string' ? newValue : newValue?.description || ''

          const placeValue: PlaceType = {
            description: newStringValue,
            structured_formatting: { main_text: newStringValue, secondary_text: '' }
          }

          const formatValue = typeof newValue === 'string' ? placeValue : newValue

          setValue(formatValue)

          setOptions(formatValue ? [formatValue, ...options] : options)
          handleAddressSelect(formatValue)
          textFieldRef?.current?.blur()
        }}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }}
        renderInput={params => (
          <TextField {...params} inputRef={textFieldRef} label='Dirección' fullWidth value={inputValue} />
        )}
        renderOption={(props, option) => {
          const { id, ...optionProps } = props
          const matches = option.structured_formatting.main_text_matched_substrings || []

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [match.offset, match.offset + match.length])
          )

          // TODO: si le usuario escribe una direccion que no existe y no la selecciona,
          // hay que indicarle que debe seleccionarla, en caso congtrario pensraá que soloal escribirla quedará actualizada
          return (
            <li {...optionProps} key={id}>
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid item sx={{ display: 'flex', width: 44 }}>
                  <i className='ri-road-map-line text-actionActive' />
                </Grid>

                <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                  {parts.map((part, index) => (
                    <Box key={index} component='span' sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant='body2' color='text.secondary'>
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          )
        }}
      />
    </>
  )
}

export default LocationAutoComplete
