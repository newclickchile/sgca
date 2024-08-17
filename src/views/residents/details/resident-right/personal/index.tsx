'use client'

import Grid from '@mui/material/Grid'

import { Card, CardContent, CardHeader } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import { format } from 'date-fns'

import type { FieldConfig } from '@/components/forms/CustomForm'
import CustomForm from '@/components/forms/CustomForm'
import type { PlaceType } from '@/components/LocationAutoComplete'
import type { ResidentType } from '@/types/resident'
import type { AuxHousesType } from '@/types/aux'

type FormData = {
  rut: string
  name: string
  birthDate: string
  flagRsh: boolean
  direction?: PlaceType | null | string
  sisCode?: number
  houseId: number
  disability: string
  hobbie: string
}

const fields: FieldConfig[] = [
  {
    name: 'rut',
    label: 'Rut',
    width: 3,
    isRequired: true
  },
  {
    name: 'name',
    label: 'Nombre',
    isRequired: true,
    width: 6.5

    // rules: {
    //   pattern: { value: /^.{8,16}$/, message: 'Debe ingresar entre 8 y 16 caracteres' }
    // }
  },
  {
    name: 'birthDate',
    label: 'Fecha Nacimiento',
    width: 2.5,
    isRequired: true,
    type: 'datepicker'
  },
  {
    name: 'sisCode',
    label: 'Código SIS',
    width: 3,
    isRequired: true
  },

  {
    name: 'houseId',
    label: 'Casa/Residencia',
    type: 'select',
    width: 5,

    listValues: [],
    isRequired: true
  },
  {
    name: 'flagRsh',
    label: 'Registro Social de Hogares',
    width: 4,
    type: 'checkbox'
  },
  {
    name: 'direction',
    label: 'Dirección',
    type: 'autocomplete',
    width: 12,
    isRequired: true
  },
  {
    name: 'disability',
    label: 'Discapacidad',
    type: 'multiline',
    rows: 3,
    isRequired: true
  },
  {
    name: 'hobbie',
    label: 'Hobbie/Intereses',
    type: 'multiline',
    rows: 3,
    isRequired: true
  }
]

const PersonalTab: React.FC<{ residentData: ResidentType; housesData: AuxHousesType[] }> = ({
  residentData,
  housesData = []
}) => {
  const { nombre, fechaNacimiento, rut, flagRsh = true, direccion, codsis, idCasa, hobbie } = residentData

  const houseOptions = housesData.map(house => ({
    id: house.id.toString(),
    nombre: house.casa
  }))

  const updatedFields: FieldConfig[] = fields.map(field => {
    if (field.name === 'houseId') {
      return {
        ...field,
        listValues: houseOptions
      }
    }

    return field
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const birthDate = format(data.birthDate, 'yyyy/MM/dd')

      console.log('data :', { ...data, birthDate })
    } catch (error) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Datos Personales' />
          <CardContent className='flex flex-col gap-4'>
            <CustomForm<FormData>
              fields={updatedFields}
              defaultValues={{
                name: nombre,
                birthDate: fechaNacimiento,
                rut,
                flagRsh,
                direction: direccion,
                sisCode: codsis,
                houseId: idCasa,
                hobbie
              }}
              onSubmit={onSubmit}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PersonalTab
