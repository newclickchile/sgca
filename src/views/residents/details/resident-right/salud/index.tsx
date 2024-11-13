'use client'

// ** MUI Imports
import type { MouseEvent, SyntheticEvent } from 'react'
import { useState } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'

// ** Styles Import
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  TextField,
  Typography
} from '@mui/material'

function capitalizeFirstLetter(sentence: string) {
  const [firstLetter, ...rest] = sentence

  return firstLetter.toUpperCase() + rest.join('')
}

const jsonQuestions = [
  {
    question: 'enfermedades crónicas',
    extraForm: false,
    id: '1',
    isForm: true
  },
  {
    question: 'medicamentos de uso permanente',
    extraForm: false,
    id: '2',
    isForm: true
  },
  {
    question: 'cumple tratamiento farmacológico',
    extraForm: true,
    id: '3',
    isForm: false
  },
  {
    question: 'control en especialidad',
    extraForm: true,
    id: '4',
    isForm: true
  },
  {
    question: 'asiste a controles',
    extraForm: true,
    id: '5',
    isForm: false
  },
  {
    question: 'alergias',
    extraForm: true,
    id: '6',
    isForm: true
  },
  {
    question: 'vacunas completas',
    extraForm: true,
    id: '7',
    isForm: true
  },
  {
    question: 'discapacidad',
    extraForm: true,
    id: '8',
    isForm: true
  },
  {
    question: 'accidente relevante',
    extraForm: true,
    id: '9',
    isForm: true
  },
  {
    question: 'hospitalizaciones anteriores',
    extraForm: true,
    id: '10',
    isForm: true
  },
  {
    question: 'intervenciones quirurgicas',
    extraForm: true,
    id: '11',
    isForm: true
  },
  {
    question: 'grupo sanguineo',
    extraForm: true,
    id: '12',
    isForm: true
  },
  {
    question: 'transfusiones previas',
    extraForm: true,
    id: '13',
    isForm: true
  },
  {
    question: 'obesidad',
    extraForm: true,
    id: '14',
    isForm: true
  },
  {
    question: 'problema de salud mental',
    extraForm: true,
    id: '15',
    isForm: true
  },
  {
    question: 'violencia intrafamiliar',
    extraForm: true,
    id: '16',
    isForm: true
  },
  {
    question: 'alcohol y otras drogas',
    extraForm: true,
    id: '17',
    isForm: true
  },
  {
    question: 'otros antecedentes',
    extraForm: false,
    id: '18',
    isForm: true
  }
]

const HealthTab = () => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [value, setValue] = useState<string>('1')
  const [brothersCount, setBrothersCount] = useState(1)
  const brothersArray = Array.from({ length: brothersCount })

  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
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

  const handleChange = (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleClick = (panel: string) => {
    const value = getValues(panel)

    setExpanded(value ? panel : false)
  }

  const { handleSubmit, control, getValues } = useForm()

  const onSubmit = (values: any) => {
    console.log('values :', values)

    // console.log("values :", values);
    return

    // setExpanded(values[] ? panel : false);
  }

  return (
    <Card>
      <CardHeader title='Información de Salud' />
      <CardContent>
        <TabContext value={value}>
          <TabList onChange={handleChangeTab} aria-label='nav tabs example'>
            <Tab
              value='1'
              component='a'
              label='Historial clínico'
              href='/drafts'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='2'
              component='a'
              label='Historial perinatal'
              href='/trash'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='3'
              component='a'
              label='Historial familiar'
              href='/spam'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
            <Tab
              value='4'
              component='a'
              label='Consultas médicas'
              href='/spam'
              onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
            />
          </TabList>
          <TabPanel value='1'>
            {jsonQuestions.map(question => {
              return (
                <Box key={question.id} sx={{ m: 2 }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {question.isForm ? (
                      <Accordion expanded={expanded === question.question} onChange={handleChange(question.question)}>
                        <AccordionSummary
                          id='actions-panel-header-1'
                          aria-controls='actions-panel-content-1'
                          expandIcon={<i className='mdi:chevron-down' />}
                        >
                          <FormControlLabel
                            label={capitalizeFirstLetter(question.question)}
                            aria-label='Acknowledge'
                            control={
                              <Checkbox
                                sx={{
                                  cursor: 'default'
                                }}
                                disableRipple
                                color={Boolean(getValues(question.id)) ? 'primary' : 'secondary'}
                                checked={Boolean(getValues(question.id))}
                                indeterminate={!Boolean(getValues(question.id))}
                              />
                            }
                            onClick={event => event.stopPropagation()}
                            onFocus={event => event.stopPropagation()}
                          />
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={5}>
                            {question.extraForm && (
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <InputLabel id={question.question}>
                                    {capitalizeFirstLetter(question.question)}
                                  </InputLabel>
                                  <Controller
                                    name={`${question.id}select`}
                                    control={control}
                                    render={({ field: { value, onChange } }) =>
                                      question.question !== 'grupo sanguineo' ? (
                                        <Select
                                          labelId={question.question}
                                          value={value}
                                          onChange={onChange}
                                          label={capitalizeFirstLetter(question.question)}
                                        >
                                          <MenuItem value='Si'>Si</MenuItem>
                                          <MenuItem value='No'>No</MenuItem>
                                          <MenuItem value='No sé'>No sé</MenuItem>
                                        </Select>
                                      ) : (
                                        <Select
                                          labelId={question.question}
                                          value={value}
                                          onChange={onChange}
                                          label={capitalizeFirstLetter(question.question)}
                                        >
                                          <MenuItem value='A+'>A+</MenuItem>
                                          <MenuItem value='A-'>A-</MenuItem>
                                          <MenuItem value='B+'>B+</MenuItem>
                                          <MenuItem value='B-'>B-</MenuItem>
                                          <MenuItem value='AB+'>AB+</MenuItem>
                                          <MenuItem value='AB-'>AB-</MenuItem>
                                          <MenuItem value='O+'>O+</MenuItem>
                                          <MenuItem value='O-'>O-</MenuItem>
                                        </Select>
                                      )
                                    }
                                  />
                                </FormControl>
                              </Grid>
                            )}
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Controller
                                  name={question.id}
                                  control={control}
                                  render={({ field: { onChange, value } }) => (
                                    <TextField
                                      multiline
                                      rows={2}
                                      onChange={onChange}
                                      maxRows={4}
                                      label={'Comentario'}
                                      value={value}
                                    />
                                  )}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                        <Button
                          onClick={() => handleClick(question.id)}
                          size='small'
                          variant='contained'
                          sx={{ mb: 2, mx: 4 }}
                        >
                          Guardar
                        </Button>
                      </Accordion>
                    ) : (
                      <Accordion expanded={false}>
                        <AccordionSummary>
                          <FormControlLabel
                            value='default'
                            label={capitalizeFirstLetter(question.question)}
                            control={<Checkbox />}
                          />
                        </AccordionSummary>
                      </Accordion>
                    )}
                    {/* <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField multiline rows={2} maxRows={4} fullWidth label='Antecedentes Médicos' value={data?.salud.antecedentesMedicos} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField multiline rows={2} maxRows={4} fullWidth label='Alergias' value={data?.salud.alergias} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField multiline rows={2} maxRows={4} fullWidth label='Medicamentos' value={data?.salud.medicamentos} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField multiline rows={2} maxRows={4} fullWidth label='Enfermedades Previas' value={data?.salud.enfermedadesPrevias} />
              </FormControl> */}
                    {/* <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ m: 4 }}>
              Guardar
            </Button>
          </Grid> */}
                  </form>
                </Box>
              )
            })}
            <Box sx={{ m: 2 }}>
              <Grid item xs={12} pt={2}>
                <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                  Guardar
                </Button>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value='2'>
            <Grid container alignItems={'center'} gap={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='embarazo'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField onChange={onChange} label='Embarazo' value={value} />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='parto'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField onChange={onChange} label='Parto' value={value} />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='perinatal'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField onChange={onChange} label='Patología Perinatal' value={value} />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='lactancia'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField onChange={onChange} label='Lactancia' value={value} />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' sx={{ m: 4 }}>
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value='3'>
            <Box mt={5}>
              {brothersArray.map((_, index) => (
                <Box key={`parientr${index}`}>
                  <Grid item xs={12} sx={{ my: 3 }}>
                    <Typography variant='button' sx={{ color: 'primary.main' }}>
                      Familiar {index + 1}
                    </Typography>
                  </Grid>
                  <Grid container alignItems={'center'} gap={5}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <InputLabel id='invoice-country'>Parentesco</InputLabel>
                        <Controller
                          name={`parentesco${index}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <Select label='Parentesco' value={value} onChange={onChange} labelId='invoice-country'>
                              <MenuItem value='Padre'>Padre</MenuItem>
                              <MenuItem value='Madre'>Madre</MenuItem>
                              <MenuItem value='Hermano(a)'>Hermano(a)</MenuItem>
                              <MenuItem value='Abuelo(a)'>Abuelo(a)</MenuItem>
                              <MenuItem value='Primo(a)'>Primo(a)</MenuItem>
                              <MenuItem value='Otro'>Otro</MenuItem>
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <Controller
                          name={`enfermedad${index}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <TextField value={value} label='Enfermedad relevante' onChange={onChange} />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} container justifyContent={'flex-end'} gap={2}>
                      {index <= 2 && brothersCount === index + 1 && (
                        <Button onClick={handleAddBrother} size='small' variant='contained'>
                          Agregar familiar
                        </Button>
                      )}
                      {index >= 1 && brothersCount === index + 1 && (
                        <Button onClick={handleRemoveBrother} size='small' variant='contained'>
                          Quitar familiar
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
            <br />
            {/* <MedicalList /> */}
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default HealthTab
