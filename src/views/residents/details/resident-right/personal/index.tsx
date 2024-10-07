'use client'

import { useMemo } from 'react'

import Grid from '@mui/material/Grid'

import { Card, CardContent, CardHeader } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import { useSession } from 'next-auth/react'

import { format } from 'date-fns'

import type { FieldConfig } from '@/components/forms/CustomForm'
import CustomForm from '@/components/forms/CustomForm'

// import type { AuxHousesType, AuxProgramType } from '@/types/aux'
import type { IUpdateResident, ResidentType } from '@/types/residents/service'
import { fields } from './form'
import type { AuxHousesType, AuxProgramType } from '@/types/aux'

const PersonalTab: React.FC<{
  residentData: ResidentType
  housesData: AuxHousesType[]
  programsData: AuxProgramType[]
}> = ({ residentData, programsData, housesData }) => {
  const { data: session } = useSession()
  const { nombre, fechaNacimiento, rut, flagRsh = true, direccion, codsis, idCasa, hobbie, idGenero } = residentData

  const houseOptions = housesData.map(house => ({
    id: house.id.toString(),
    nombre: house.casa
  }))

  const programOptions = programsData.map(program => ({
    id: program.id,
    nombre: program.programa
  }))

  const onSubmit: SubmitHandler<IUpdateResident> = async (updateResidentData: IUpdateResident) => {
    // const URL_RESIDENTS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente`

    try {
      if (!session?.user) {
        toast.error('¡Sesión no válida!')

        return
      }

      const fechaNacimientoFormat = format(updateResidentData.fechaNacimiento, 'dd/MM/yyyy')

      console.log('fechaNacimientoFormat :', fechaNacimientoFormat)

      console.log('residentData :', updateResidentData)

      const queryParams = new URLSearchParams({
        ...updateResidentData

        // fechaNacimiento: fechaNacimientoFormat
      } as unknown as Record<string, string>).toString()

      console.log('queryParams :', queryParams)

      // const response = await fetchClientData(
      //   `${URL_RESIDENTS}/editar?idResidente=${residentData.id}&${queryParams}`,
      //   session,
      //   'PUT'
      // )

      // console.log('response :', response)

      toast.success('Se ha creado el nuevo residente')
    } catch (error) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  const updatedFields: FieldConfig[] = useMemo(() => {
    return fields.map(field => {
      if (field.name === 'casa') {
        return {
          ...field,
          listValues: houseOptions
        }
      }

      if (field.name === 'programa') {
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
                genero: idGenero,
                flagRsh,
                direccion,
                codigosis: codsis,
                casa: idCasa,
                hobbie,
                discapacidad: ''
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
