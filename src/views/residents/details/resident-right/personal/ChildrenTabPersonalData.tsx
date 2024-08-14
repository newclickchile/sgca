// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'

// ** Styles Import
import { Checkbox, FormControlLabel } from '@mui/material'

const ChildrenTabPersonalData = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty }
  } = useForm({
    defaultValues: {
      name: data?.datosPersonales.nombre,
      discapacity: ''
    }
  })

  const onSubmit = () => {
    return
  }

  return (
    <Card>
      <CardHeader title='Datos Personales' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField value={value} label='Nombre' onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <TextField value={data?.datosPersonales.rut} label='Rut' />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <TextField fullWidth label='Fecha Nacimiento' defaultValue={data?.datosPersonales.fecNac} />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <TextField fullWidth label='Código SIS' value={data?.datosPersonales.codigoSIS} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Género</InputLabel>
                <Select label='Género' value={data?.datosPersonales.genero}>
                  <MenuItem value='masculino'>Masculino</MenuItem>
                  <MenuItem value='femenino'>Femenino</MenuItem>
                  <MenuItem value='otro'>Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                label='Registro Social de Hogares'
                control={<Checkbox name='Registro Social de Hogares' />}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField fullWidth label='Dirección' value={data?.datosPersonales.direccion} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Casa/Residencia</InputLabel>
                <Select label='Casa/Residencia' value={data?.datosPersonales.fundacion}>
                  <MenuItem value='Casa XYZ'>Casa XYZ</MenuItem>
                  <MenuItem value='Casa ABC'>Casa ABC</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Programa</InputLabel>
                <Select label='Programa' value={data?.datosPersonales.programa}>
                  <MenuItem value='FAE - Programa de Apoyo a Familias'>FAE - Programa de Apoyo a Familias</MenuItem>
                  <MenuItem value='FAE - Programa Familia de Acogida'>FAE - Programa Familia de Acogida</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={7}>
              <FormControl fullWidth>
                <Controller
                  name='discapacity'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      multiline
                      value={value}
                      rows={2}
                      maxRows={4}
                      fullWidth
                      label='Discapacidad'
                      onChange={onChange}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {getValues('discapacity') && (
              <Grid item xs={12} sm={5}>
                <FormControlLabel
                  label='Registro de Discapacidad'
                  control={<Checkbox name='Registro de Discapacidad' />}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={7}>
              <TextField multiline rows={2} maxRows={4} fullWidth label='Hobbie/Intereses' />
            </Grid>

            <Grid item xs={12}>
              <Button disabled={!isDirty} type='submit' variant='contained' sx={{ mr: 4 }}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChildrenTabPersonalData
