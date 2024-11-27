'use client'

// ** MUI Imports

// ** Third Party Imports

// ** Styles Import
import { Box } from '@mui/material'

import type { IMedicalFaq } from '@/types/residents/health/medicalFAQ'
import type { IMedicalHistory } from '@/types/residents/health/medicalHistory'

const MedicalHistoryTabPanel: React.FC<{
  residentMedicalHistory: IMedicalHistory[]
  medicalFaq: IMedicalFaq[]
}> = ({ residentMedicalHistory, medicalFaq }) => {
  // const [expanded, setExpanded] = useState<string | false>(false)

  // const handleChange = (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
  //   setExpanded(isExpanded ? panel.toUpperCase() : false)
  // }

  // const handleClick = (panel: string) => {
  //   const value = getValues(panel)

  //   setExpanded(value ? panel.toUpperCase() : false)
  // }

  // const { handleSubmit, control, getValues } = useForm()

  // const onSubmit = (values: any) => {
  //   console.log('values :', values)

  //   // console.log("values :", values);
  //   return

  //   // setExpanded(values[] ? panel : false);
  // }

  return (
    <>
      {medicalFaq.map(question => {
        return (
          <Box key={question.id} sx={{ m: 2 }}>
            {JSON.stringify(residentMedicalHistory)}
            {JSON.stringify(medicalFaq)}
            {/* <form onSubmit={handleSubmit(onSubmit)}>
              {question.isForm ? (
                <Accordion
                  expanded={
                    expanded === residentMedicalHistory[0].faq.casa.toUpperCase() &&
                    residentMedicalHistory[0].faq.id.toString() === question.id
                  }
                  onChange={handleChange(question.question)}
                >
                  <AccordionSummary
                    id='actions-panel-header-1'
                    aria-controls='actions-panel-content-1'
                    expandIcon={<i className='ri-arrow-down-s-line' />}
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
                            <InputLabel id={question.question}>{capitalizeFirstLetter(question.question)}</InputLabel>
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
                              <TextField multiline onChange={onChange} maxRows={4} label={'Comentario'} value={value} />
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
                  <AccordionSummary expandIcon={false}>
                    <FormControlLabel
                      value='default'
                      label={capitalizeFirstLetter(question.question)}
                      control={<Checkbox />}
                    />
                  </AccordionSummary>
                </Accordion>
              )}
            </form> */}
          </Box>
        )
      })}
    </>
  )
}

export default MedicalHistoryTabPanel
