'use client'

import CustomForm from '@/components/forms/CustomForm'
import { updateBrother } from '@/server-actions/residentTabs/familyGroup/updateBrother'
import { IBrother } from '@/types/residents/familyGroup/brothersTab'
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import NewBrotherDrawer from './drawer'
import { fields } from './form'

const BrothersTabPanel = ({ brothers }: { brothers: IBrother[] }) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [resetDrawerForm, setResetDrawerForm] = useState<boolean>(false)

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
    if (brothers.length >= 40) return

    setResetDrawerForm(false)
    setAddUserOpen(true)
  }

  const handleDrawerClose = () => {
    setAddUserOpen(false)
  }

  const handleCancel = () => {
    handleDrawerClose()
  }

  return (
    <>
      <Grid container justifyContent='flex-end' mb={4}>
        <Button variant='outlined' onClick={handleDrawerOpen} disabled={brothers.length >= 40}>
          Agregar nuevo Hermano
        </Button>
      </Grid>

      {brothers.map((brother, index) => {
        return (
          <Grid container my={4} item key={brother.id}>
            <Card variant='outlined'>
              <CardHeader title={`Hermano ${index + 1}`} />
              <CardContent>
                <CustomForm<IBrother>
                  buttonProps={{ fullWidth: false }}
                  fields={fields}
                  defaultValues={{
                    fechaNacimiento: brother?.fechaNacimiento,
                    nombre: brother?.nombre,
                    comentario: brother?.comentario,
                    id: brother?.id,
                    ingresadoAlaRed: brother?.inred,
                    idResidente: brother?.idResidente
                  }}
                  onSubmit={onSubmit}
                />
              </CardContent>
            </Card>
          </Grid>
        )
      })}
      <NewBrotherDrawer
        residentId={brothers[0].idResidente}
        handleCancel={handleCancel}
        open={addUserOpen}
        handleClose={handleDrawerClose}
        onSubmit={onSubmit}
        resetForm={resetDrawerForm}
      />
    </>
  )
}

export default BrothersTabPanel
