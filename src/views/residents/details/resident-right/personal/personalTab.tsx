'use client'

import { Card, CardContent, CardHeader } from '@mui/material'
import Grid from '@mui/material/Grid'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'
import { updatePersonalData } from '@/server-actions/residentTabs/personal/updatePersonalData'
import type { AuxHousesType, AuxProgramType } from '@/types/aux'
import type { IResident, IUpdateResident } from '@/types/residents/service'
import { fields } from './form'

const PersonalTab: React.FC<{
  residentData: IResident
  houses: AuxHousesType[]
  programs: AuxProgramType[]
}> = ({ residentData: resident, programs, houses }) => {
  const houseOptions = houses.map(house => ({
    id: house.id.toString(),
    nombre: house.casa
  }))

  const programOptions = programs.map(program => ({
    id: program.id,
    nombre: program.programa
  }))

  const onSubmit: SubmitHandler<IUpdateResident> = async (updateResidentData: IUpdateResident) => {
    try {
      await updatePersonalData(resident.id, updateResidentData)
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Datos Personales' />
          <CardContent className='flex flex-col gap-4'>
            <CustomForm<IUpdateResident>
              fields={[
                ...fields.map(field => {
                  if (field.name === 'idCasa') {
                    return {
                      ...field,
                      listValues: houseOptions
                    }
                  }

                  if (field.name === 'idPrograma') {
                    return {
                      ...field,
                      listValues: programOptions
                    }
                  }

                  return field
                })
              ]}
              defaultValues={{
                nombre: resident.nombre,
                fechaNacimiento: resident.fechaNacimiento,
                rut: resident.rut,
                idGenero: resident.idGenero,
                flagRsh: resident.flagRsh,
                direccion: resident.direccion,
                codsis: resident.codsis,
                idCasa: resident.idCasa,
                hobbie: resident.hobbie,
                idPrograma: resident.idPrograma,
                discapacidad: resident.discapacidad
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
