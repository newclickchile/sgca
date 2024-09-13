'use client'

import { useMemo } from 'react'

import Grid from '@mui/material/Grid'

import { Card, CardContent, CardHeader } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import { format } from 'date-fns'

import type { FieldConfig } from '@/components/forms/CustomForm'
import CustomForm from '@/components/forms/CustomForm'
import type { AuxHousesType } from '@/types/aux'
import { fields } from './form'
import type { PersonalFormData } from '@/types/residents/personalFormData'
import type { ResidentType } from '@/types/residents/service'

const onSubmit: SubmitHandler<PersonalFormData> = async (data: PersonalFormData) => {
  try {
    const birthDate = format(data.birthDate, 'yyyy/MM/dd')

    console.log('data :', { ...data, birthDate })
  } catch (error) {
    toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
  }
}

const PersonalTab: React.FC<{ residentData: ResidentType; housesData: AuxHousesType[] }> = ({
  residentData,
  housesData = []
}) => {
  const { nombre, fechaNacimiento, rut, flagRsh = true, direccion, codsis, idCasa, hobbie } = residentData

  const houseOptions = housesData.map(house => ({
    id: house.id.toString(),
    nombre: house.casa
  }))

  const updatedFields: FieldConfig[] = useMemo(() => {
    return fields.map(field => {
      if (field.name === 'houseId') {
        return {
          ...field,
          listValues: houseOptions
        }
      }

      return field
    })
  }, [houseOptions])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Datos Personales' />
          <CardContent className='flex flex-col gap-4'>
            <CustomForm<PersonalFormData>
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
