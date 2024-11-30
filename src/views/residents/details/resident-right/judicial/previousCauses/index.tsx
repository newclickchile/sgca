'use client'

import { useState } from 'react'

import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import CustomDrawer from '@/components/CustomDrawer'
import CustomForm from '@/components/forms/CustomForm'

import { deletePreviousCauses, updatePreviousCauses } from '@/server-actions/residentTabs/judicial/updatePreviousCauses'
import type { IPreviousCauses } from '@/types/residents/judicial/previousCauses'
import { fields } from './form'

const PreviousCausesTabPanel = ({
  previousCauses,
  residentId
}: {
  previousCauses: IPreviousCauses[]
  residentId: number
}) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [deletingCauseId, setDeletingCauseId] = useState<number | undefined>()

  const disableCreateNewItem = previousCauses?.length >= 40

  const GetForm = ({
    previousCauses,
    isDrawer,
    onSubmit,
    onCancel,
    residentId,
    isLoadingCancelAction = false
  }: {
    previousCauses?: IPreviousCauses
    isDrawer: boolean
    onSubmit: SubmitHandler<IPreviousCauses>
    onCancel?: () => void
    residentId: number
    isLoadingCancelAction?: boolean
  }) => {
    return (
      <>
        <CustomForm<IPreviousCauses>
          submitButtonProps={{ fullWidth: false, size: 'small' }}
          cancelButtonProps={{ fullWidth: false, size: 'small' }}
          cancelButtonName='Quitar'
          fields={fields(isDrawer)}
          defaultValues={{
            rit: previousCauses?.rit,
            tribunal: previousCauses?.tribunal,
            id: previousCauses?.id,
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

  const onSubmit: SubmitHandler<IPreviousCauses> = async updateData => {
    try {
      await updatePreviousCauses(residentId, updateData)
      handleDrawerClose()
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  const onDelete = async (causeId: number) => {
    setDeletingCauseId(causeId)

    try {
      await deletePreviousCauses(residentId, causeId)
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
        {previousCauses.map((cause, index) => {
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
                    previousCauses={cause}
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

export default PreviousCausesTabPanel
