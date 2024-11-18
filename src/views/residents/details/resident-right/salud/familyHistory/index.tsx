'use client'

import CustomForm from '@/components/forms/CustomForm'
import { updateFamilyHistory } from '@/server-actions/residentTabs/health/updateFamilyHistory'
import { AuxParentsType } from '@/types/aux'
import { IFamilyHistory } from '@/types/residents/health/familyHistory'
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { fields } from './form'
import CustomDrawer from '@/components/CustomDrawer'

const FamilyHistoryTabPanel = ({
  familyHistory,
  parents,
  residentId
}: {
  familyHistory: IFamilyHistory[]
  parents: AuxParentsType[]
  residentId: number
}) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const disableCreateNewItem = familyHistory?.length >= 40

  const onSubmit: SubmitHandler<IFamilyHistory> = async updateData => {
    console.log('updateData :', updateData)
    try {
      await updateFamilyHistory(updateData)
      handleDrawerClose()
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!', { position: 'top-center' })
    }
  }

  const handleDrawerOpen = () => {
    if (disableCreateNewItem) return
    setAddUserOpen(true)
  }

  const handleDrawerClose = () => {
    setAddUserOpen(false)
  }

  const getForm = (relative?: IFamilyHistory, isDrawer: boolean = true) => {
    const fieldsData = fields(parents, isDrawer)

    return (
      <CustomForm<IFamilyHistory>
        buttonProps={{ fullWidth: false }}
        fields={fieldsData}
        defaultValues={{
          antecedentes: relative?.antecedentes,
          idParentesco: relative?.idParentesco,
          idResidente: residentId,
          id: relative?.id
        }}
        onSubmit={onSubmit}
      />
    )
  }

  return (
    <>
      <Grid container justifyContent='flex-end' mb={4}>
        <Button variant='outlined' onClick={handleDrawerOpen} disabled={disableCreateNewItem}>
          Agregar nuevo Familiar
        </Button>
      </Grid>

      {familyHistory.map((relative, index) => {
        return (
          <Grid container my={4} item key={relative.id}>
            <Card variant='elevation'>
              <CardHeader title={`Familiar ${index + 1}`} />
              <CardContent>
                <CustomForm<IFamilyHistory>
                  buttonProps={{ fullWidth: false }}
                  fields={fields(parents, false)}
                  defaultValues={{
                    antecedentes: relative?.antecedentes,
                    idParentesco: relative?.idParentesco,
                    idResidente: residentId,
                    id: relative?.id
                  }}
                  onSubmit={onSubmit}
                />
              </CardContent>
            </Card>
          </Grid>
        )
      })}

      <CustomDrawer open={addUserOpen} handleClose={handleDrawerClose} title='Agregar nuevo Familiar'>
        {getForm()}
      </CustomDrawer>
    </>
  )
}

export default FamilyHistoryTabPanel
