'use client'

import { useMemo } from 'react'

import Grid from '@mui/material/Grid'

import { Card, CardContent, CardHeader } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import { useSession } from 'next-auth/react'

import type { FieldConfig } from '@/components/forms/CustomForm'
import CustomForm from '@/components/forms/CustomForm'
import { useResident } from '@/contexts/residentContext'
import type { AuxHousesType, AuxProgramType } from '@/types/aux'
import type { IUpdateResident } from '@/types/residents/service'
import { fetchData } from '@/utils/fetch'
import { fields } from './form'

const URL_RESIDENTS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente`

const PersonalTab: React.FC<{
  housesData: AuxHousesType[]
  programsData: AuxProgramType[]
}> = ({ programsData, housesData }) => {
  const { resident, updateResident } = useResident()
  const { data: session } = useSession()

  const {
    id,
    nombre,
    fechaNacimiento,
    rut,
    flagRsh = true,
    direccion,
    codsis,
    idCasa,
    hobbie,
    idGenero,
    idPrograma,
    discapacidad
  } = resident

  const houseOptions = housesData.map(house => ({
    id: house.id.toString(),
    nombre: house.casa
  }))

  const programOptions = programsData.map(program => ({
    id: program.id,
    nombre: program.programa
  }))

  const onSubmit: SubmitHandler<IUpdateResident> = async (updateResidentData: IUpdateResident) => {
    console.log('updateResidentData :', updateResidentData)

    try {
      if (!session?.user) {
        toast.error('¡Sesión no válida!')

        return
      }

      const queryParams = new URLSearchParams(updateResidentData as unknown as Record<string, string>).toString()

      const response = await fetchData({
        endpoint: `${URL_RESIDENTS}/editar?idResidente=${id}&${queryParams}`,
        session,
        method: 'PUT'
      })

      console.log('response :', response)
      updateResident(updateResidentData)

      toast.success('Se han actualizado los datos correctamente')
    } catch (error) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  const updatedFields: FieldConfig[] = useMemo(() => {
    return fields.map(field => {
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
  }, [houseOptions, programOptions])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Datos Personales' />
          <CardContent className='flex flex-col gap-4'>
            <CustomForm<IUpdateResident>
              fields={updatedFields}
              defaultValues={{
                nombre,
                fechaNacimiento,
                rut,
                idGenero,
                flagRsh,
                direccion,
                codsis,
                idCasa,
                hobbie,
                idPrograma,
                discapacidad
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
