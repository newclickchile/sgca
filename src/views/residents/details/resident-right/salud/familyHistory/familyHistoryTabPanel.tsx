'use client'
import { useMemo, useState } from 'react'

import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { Box, Button, Grid, Typography } from '@mui/material'

import type { FieldConfig } from '@/components/forms/CustomForm'
import CustomForm from '@/components/forms/CustomForm'
import { useResident } from '@/contexts/residentContext'
import type { AuxParentsType } from '@/types/aux'
import type { IFamilyHistory, IFamilyHistoryForm } from '@/types/residents/health/familyHistory'
import { fetchData } from '@/utils/fetch'
import { fieldsParents } from './form'

const URL_FAMILY_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/historial/familia/agregar`
const URL_FAMILY_HISTORY_GET = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/familia/historial`

const FamilyHistoryTabPanel: React.FC<{
  children: React.ReactNode
  familyHistoryData: IFamilyHistory[]
  parents: AuxParentsType[]
}> = ({ familyHistoryData, parents, children }) => {
  // const { resident } = useResident()
  // const { data: session } = useSession()
  // const [familyData, setFamiliyData] = useState<IFamilyHistoryForm[]>(
  //   familyHistoryData.map(f => {
  //     return { idParentesco: f.idParentesco, antecedentes: f.antecedentes }
  //   })
  // )
  // const onSubmit = async (data: IFamilyHistoryForm) => {
  //   try {
  //     const queryParams = new URLSearchParams(data as unknown as Record<string, string>).toString()
  //     console.log('queryParams :', queryParams)
  //     const response = await fetchData({
  //       endpoint: `${URL_FAMILY_HISTORY}?idResidente=${resident.id}&${queryParams}`,
  //       session,
  //       method: 'POST'
  //     })
  //     console.log('response :', response)
  //     if (response.status === 200) {
  //       toast.success('Datos actualizados correctamente')
  //       const { data: familyHistoryData } = await fetchData({
  //         session,
  //         endpoint: `${URL_FAMILY_HISTORY_GET}=${resident.id}`
  //       })
  //       setFamiliyData(familyHistoryData)
  //     }
  //   } catch (error) {}
  // }
  // const parentsOptions = parents.map(parent => ({
  //   id: parent.id.toString(),
  //   nombre: parent.parentesco
  // }))
  // const updatedFields: FieldConfig[] = useMemo(() => {
  //   return fieldsParents.map(field => {
  //     if (field.name === 'idParentesco') {
  //       return {
  //         ...field,
  //         listValues: parentsOptions
  //       }
  //     }
  //     return field
  //   })
  // }, [parentsOptions])
  // const handleRemoveBrother = () => {}
  // const handleAddBrother = () => {
  //   const newFamiliyData: IFamilyHistoryForm = { idParentesco: 0, antecedentes: '' }
  //   setFamiliyData(prevFamilyData => [...prevFamilyData, newFamiliyData])
  // }
  return (
    <Box m={5}>
      {children}
      {/* <Grid item xs={12}>
        {familyData?.map((familiar, index) => {
          return (
            <Grid key={`${familiar.idParentesco}-${index}`} my={10}>
              <Typography mb={5} sx={{ color: 'primary.main' }}>
                Familiar {index + 1}
              </Typography>
              <CustomForm<IFamilyHistoryForm>
                fields={updatedFields}
                defaultValues={{
                  antecedentes: familiar.antecedentes,
                  idParentesco: familiar.idParentesco
                }}
                onSubmit={onSubmit}
                submitButtonName={'Guardar'}
                submitButtonFullWidth={false}
              />
            </Grid>
          )
        })}
        <Grid item xs={12} container justifyContent={'flex-end'} gap={2}>
          {familyData.length <= 3 && familyData[familyData.length - 1]?.idParentesco !== 0 && (
            <Button onClick={handleAddBrother} variant='outlined'>
              Agregar familiar
            </Button>
          )}
          {familyData.length >= 1 && (
            <Button onClick={handleRemoveBrother} variant='contained'>
              Quitar familiar {familyData.length}
            </Button>
          )}
        </Grid>
      </Grid> */}
    </Box>
  )
}

export default FamilyHistoryTabPanel
