'use client'

import CustomDrawer from '@/components/CustomDrawer'
import CustomForm from '@/components/forms/CustomForm'
import { updateBrother } from '@/server-actions/residentTabs/familyGroup/updateBrother'
import { IBrother } from '@/types/residents/familyGroup/brothersTab'
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { fields } from './form'

const BrothersTabPanel = ({ brothers, residentId }: { brothers: IBrother[]; residentId: number }) => {
  const [addUserOpen, setAddUserOpen] = useState(false)

  const disableCreateNewItem = brothers?.length >= 40

  const onSubmit: SubmitHandler<IBrother> = async updateBrothersData => {
    console.log('updateBrothersData :', updateBrothersData)
    try {
      await updateBrother(updateBrothersData)
      handleDrawerClose()
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  const handleDrawerOpen = () => {
    if (disableCreateNewItem) return

    setAddUserOpen(true)
  }

  const handleDrawerClose = () => {
    setAddUserOpen(false)
  }

  const getForm = (brother?: IBrother, isDrawer?: boolean) => {
    return (
      <CustomForm<IBrother>
        buttonProps={{ fullWidth: false }}
        fields={fields(isDrawer)}
        defaultValues={{
          fechaNacimiento: brother?.fechaNacimiento,
          nombre: brother?.nombre,
          comentario: brother?.comentario,
          id: brother?.id,
          ingresadoAlaRed: brother?.inred,
          idResidente: residentId
        }}
        onSubmit={onSubmit}
      />
    )
  }

  return (
    <>
      <Grid container justifyContent='flex-end' mb={4}>
        <Button variant='outlined' onClick={handleDrawerOpen} disabled={disableCreateNewItem}>
          Agregar nuevo Hermano
        </Button>
      </Grid>

      {brothers.map((brother, index) => {
        return (
          <Grid container my={4} item key={brother.id}>
            <Card variant='elevation'>
              <CardHeader title={`Hermano ${index + 1}`} />
              <CardContent>{getForm(brother, false)}</CardContent>
            </Card>
          </Grid>
        )
      })}

      <CustomDrawer open={addUserOpen} handleClose={handleDrawerClose} title='Agregar nuevo Hermano'>
        {getForm()}
      </CustomDrawer>
    </>
  )
}

export default BrothersTabPanel
