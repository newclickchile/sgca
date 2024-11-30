'use client'

import { useState } from 'react'

import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import CustomForm from '@/components/forms/CustomForm'
import { updateFamilyHistory } from '@/server-actions/residentTabs/health/updateFamilyHistory'
import type { AuxParentsType } from '@/types/aux'
import type { IFamilyHistory } from '@/types/residents/health/familyHistory'

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
        submitButtonProps={{ fullWidth: false }}
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
      <Grid container justifyContent='flex-end'>
        <Button
          startIcon={<i className='ri-add-line' />}
          variant='outlined'
          onClick={handleDrawerOpen}
          disabled={disableCreateNewItem}
          size='small'
        >
          Agregar nuevo Familiar
        </Button>
      </Grid>

      <Grid container my={4}>
        {familyHistory.map((relative, index) => {
          return (
            <Grid item key={relative.id} xs={12}>
              <Card variant='elevation'>
                <CardHeader title={`Familiar ${index + 1}`} />
                <CardContent>
                  <CustomForm<IFamilyHistory>
                    submitButtonProps={{ fullWidth: false }}
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
      </Grid>

      <CustomDrawer open={addUserOpen} handleClose={handleDrawerClose} title='Agregar nuevo Familiar'>
        {getForm()}
      </CustomDrawer>
    </>
  )
}

export default FamilyHistoryTabPanel
