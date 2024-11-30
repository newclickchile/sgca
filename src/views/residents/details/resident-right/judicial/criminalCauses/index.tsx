'use client'

import { useState } from 'react'

import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import CustomDrawer from '@/components/CustomDrawer'
import CustomForm from '@/components/forms/CustomForm'

import { deleteCriminalCauses, updateCriminalCauses } from '@/server-actions/residentTabs/judicial/updateCriminalCauses'
import type { AuxProsecutorsType } from '@/types/aux'
import type { ICriminalCauses } from '@/types/residents/judicial/criminalCauses'
import { fields } from './form'

const CriminalCausesTabPanel = ({
  prosecutors,
  criminalCauses,
  residentId
}: {
  prosecutors: AuxProsecutorsType[]
  criminalCauses: ICriminalCauses[]
  residentId: number
}) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [deletingCauseId, setDeletingCauseId] = useState<number | undefined>()

  const disableCreateNewItem = criminalCauses?.length >= 40

  const GetForm = ({
    criminalCause,
    isDrawer,
    onSubmit,
    onCancel,
    residentId,
    isLoadingCancelAction = false
  }: {
    criminalCause?: ICriminalCauses
    isDrawer: boolean
    onSubmit: SubmitHandler<ICriminalCauses>
    onCancel?: () => void
    residentId: number
    isLoadingCancelAction?: boolean
  }) => {
    return (
      <>
        <CustomForm<ICriminalCauses>
          submitButtonProps={{ fullWidth: false, size: 'small' }}
          cancelButtonProps={{ fullWidth: false, size: 'small' }}
          cancelButtonName='Quitar'
          fields={fields(prosecutors, isDrawer)}
          defaultValues={{
            fechaCreacion: criminalCause?.fechaCreacion,
            idFiscalia: criminalCause?.idFiscalia,
            rit: criminalCause?.rit,
            ruc: criminalCause?.ruc,
            tribunal: criminalCause?.tribunal,
            id: criminalCause?.id,
            idResidente: residentId
          }}
          resetForm={isDrawer}
          isLoadingCancelAction={isLoadingCancelAction}
          onSubmit={onSubmit}
          onCancel={onCancel ?? undefined}
        />
      </>
    )
  }

  const onSubmit: SubmitHandler<ICriminalCauses> = async updateData => {
    try {
      await updateCriminalCauses(residentId, updateData)
      handleDrawerClose()
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  const onDelete = async (causeId: number) => {
    setDeletingCauseId(causeId)

    try {
      await deleteCriminalCauses(residentId, causeId)
      toast.success('Se ha quitado la causa correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    } finally {
      setDeletingCauseId(undefined)
    }
  }

  const handleDrawerOpen = () => {
    if (disableCreateNewItem) return

    setAddUserOpen(true)
  }

  const handleDrawerClose = () => {
    setAddUserOpen(false)
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
          Agregar causa
        </Button>
      </Grid>

      <Grid container>
        {criminalCauses.map((cause, index) => {
          return (
            <Grid item xs={12} key={cause.id} my={4}>
              <Card variant='elevation'>
                <CardHeader title={`Causa ${index + 1}`} />
                <CardContent>
                  <GetForm
                    isLoadingCancelAction={deletingCauseId === cause.id}
                    onCancel={() => {
                      onDelete(cause.id)
                    }}
                    criminalCause={cause}
                    isDrawer={false}
                    onSubmit={onSubmit}
                    residentId={residentId}
                  />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <CustomDrawer open={addUserOpen} handleClose={handleDrawerClose} title='Agregar causa'>
        <GetForm isDrawer={true} onSubmit={onSubmit} residentId={residentId} />
      </CustomDrawer>
    </>
  )
}

export default CriminalCausesTabPanel
