'use client'

// ** MUI Imports
import type { MouseEvent, SyntheticEvent } from 'react'
import { useState } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'

// ** Styles Import
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Checkbox, FormControlLabel, Tab, Typography } from '@mui/material'

import AffiliationTabPanel from './affiliationTabPanel'
import type { ResidentType } from '@/types/residents/service'

// import type { ChildrensType } from 'src/types/apps/userTypes'

const ChildrenTabFamilyData: React.FC<{ residentData: ResidentType }> = ({ residentData }) => {
  // const IsUserData = Boolean(window.localStorage.getItem('userSelectedData'))

  // const data: ChildrensType | null = IsUserData ? JSON.parse(window.localStorage.getItem('userSelectedData')!) : null

  const [brothersCount, setBrothersCount] = useState(1)
  const [value, setValue] = useState<string>('1')

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleAddBrother = () => {
    if (brothersCount >= 4) return
    setBrothersCount(brothersCount + 1)
  }

  const handleRemoveBrother = () => {
    if (brothersCount <= 1) return

    if (brothersCount > 0) {
      setBrothersCount(brothersCount - 1)
    }
  }

  const brothersArray = Array.from({ length: brothersCount })

  // ** Hooks
  const { control, handleSubmit } = useForm()

  const onSubmit = () => {
    return
  }

  return (
    <Card sx={{ minHeight: 400 }}>
      <CardContent>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='nav tabs example'>
            <Tab
              value='1'
              component='a'
              label='Madre / Padre'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='2'
              component='a'
              label='Hermanos'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='3'
              component='a'
              label='Familia extensa'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='4'
              component='a'
              label='Adulto significativo'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
          </TabList>
          <AffiliationTabPanel residentData={residentData} />
          {/* <TabPanel value='1'>
            <CardActionCollapse title='Filiación Madre' collapse={false}>
              Filiación Madre
            </CardActionCollapse>
            <CardActionCollapse title='Filiación Padre'>Filiación Padre</CardActionCollapse>
          </TabPanel> */}
          <TabPanel value='2'>
            <Box mt={5}>
              {brothersArray.map((_, index) => (
                <Box key={`brother${index}`}>
                  <Grid item xs={12} sx={{ my: 3 }}>
                    <Typography variant='button' sx={{ color: 'primary.main' }}>
                      Hermano {index + 1}
                    </Typography>
                  </Grid>

                  <Grid container alignItems={'center'} gap={5}>
                    <Grid item xs={7}>
                      <FormControl fullWidth>
                        <Controller
                          name={`brotherName${index}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <TextField value={value} label='Nombre' onChange={onChange} />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <Controller
                          name={`brotherBirthDate${index}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <TextField value={value} label='Fecha Nacimiento' onChange={onChange} />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={7}>
                      <FormControl fullWidth>
                        <TextField multiline rows={4} maxRows={4} fullWidth label='Comentario' />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControlLabel label='Ingresado en la red' control={<Checkbox size='small' />} />
                    </Grid>
                    <Grid item xs={12} container justifyContent={'flex-end'} gap={2}>
                      {index <= 2 && brothersCount === index + 1 && (
                        <Button onClick={handleAddBrother} size='small' variant='contained'>
                          Agregar hermano
                        </Button>
                      )}
                      {index >= 1 && brothersCount === index + 1 && (
                        <Button onClick={handleRemoveBrother} size='small' variant='contained'>
                          Quitar hermano
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Grid item xs={12} pt={4}>
                <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                  Guardar
                </Button>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value='3'>
            <Box mt={5}>
              {brothersArray.map((_, index) => (
                <Box key={`parientr${index}`}>
                  <Grid item xs={12} sx={{ my: 3 }}>
                    <Typography variant='button' sx={{ color: 'primary.main' }}>
                      Pariente {index + 1}
                    </Typography>
                  </Grid>

                  <Grid container alignItems={'center'} gap={5}>
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel>Parentesco</InputLabel>
                        <Select label='Parentesco'>
                          <MenuItem value='Padre'>Tío(a)</MenuItem>
                          <MenuItem value='Hermano(a)'>Hermano(a)</MenuItem>
                          <MenuItem value='Abuelo(a)'>Abuelo(a)</MenuItem>
                          <MenuItem value='Primo(a)'>Primo(a)</MenuItem>
                          <MenuItem value='Otro'>Otro</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                      <FormControl fullWidth>
                        <Controller
                          name={`parentName${index}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <TextField value={value} label='Nombre' onChange={onChange} />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={7}>
                      <FormControl fullWidth>
                        <Controller
                          name={`parentAddress${index}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <TextField value={value} label='Dirección' onChange={onChange} />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <Controller
                          name={`parentAddressNumber${index}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <TextField value={value} label='Número' onChange={onChange} />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <Controller
                          name={`parentPhone${index}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <TextField value={value} label='Teléfono' onChange={onChange} />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={7}>
                      <FormControl fullWidth>
                        <Controller
                          name={`parentEmail${index}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <TextField value={value} label='Email' onChange={onChange} />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <TextField multiline rows={3} maxRows={4} fullWidth label='Comentario' />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} container justifyContent={'flex-end'} gap={2}>
                      {index <= 2 && brothersCount === index + 1 && (
                        <Button onClick={handleAddBrother} size='small' variant='contained'>
                          Agregar pariente
                        </Button>
                      )}
                      {index >= 1 && brothersCount === index + 1 && (
                        <Button onClick={handleRemoveBrother} size='small' variant='contained'>
                          Quitar pariente
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Grid item xs={12} pt={4}>
                <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                  Guardar
                </Button>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value='4'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mt={5}>
                <Grid container alignItems={'center'} gap={5}>
                  <Grid item xs={7}>
                    <FormControl sx={{ display: 'flex' }}>
                      <Controller
                        name='responsabilityName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <TextField value={value} label='Nombre' onChange={onChange} />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={7}>
                    <FormControl fullWidth>
                      <Controller
                        name='responsabilityAddress'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <TextField value={value} label='Dirección' onChange={onChange} />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <Controller
                        name='responsabilityNumber'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <TextField value={value} label='Número' onChange={onChange} />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={7}>
                    <FormControl fullWidth>
                      <Controller
                        name='responsabilityEmail'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <TextField label='Email' value={value} onChange={onChange} />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <Controller
                        name='responsabilityPhone'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <TextField value={value} label='Teléfono' onChange={onChange} />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <Controller
                        name='responsabilityParent'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <TextField label='Relación' value={value} onChange={onChange} />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' sx={{ my: 4 }}>
                  Guardar
                </Button>
              </Grid>
            </form>
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default ChildrenTabFamilyData
