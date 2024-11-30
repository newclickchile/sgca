// 'use client'

// import { useMemo } from 'react'

// import type { SubmitHandler } from 'react-hook-form'

// import { toast } from 'react-toastify'

// import CustomForm from '@/components/forms/CustomForm'
// import type { IExtendedFamily } from '@/types/residents/familyGroup/extendedFamilyTab'

// import { fields } from './form'
// import type { AuxParentsType } from '@/types/aux'

// import { updateExtendedFamily } from '@/server-actions/residentTabs/familyGroup/updateExtendedFamily'

// const ExtendedFamilyTabPanel = ({
//   extendedFamily,
//   parents
// }: {
//   extendedFamily: IExtendedFamily
//   parents: AuxParentsType[]
// }) => {
//   const onSubmit: SubmitHandler<IExtendedFamily> = async updateData => {
//     try {
//       await updateExtendedFamily(updateData)
//       toast.success('Se han actualizado los datos correctamente')
//     } catch (_) {
//       toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
//     }
//   }

//   const getFields = useMemo(() => {
//     const parentsOptions = parents.map(parent => ({
//       id: parent.id.toString(),
//       nombre: parent.parentesco
//     }))

//     return fields.map(f => {
//       if (f.name === 'idPariente') {
//         return { ...f, listValues: parentsOptions }
//       }

//       return f
//     })
//   }, [parents])

//   return (
//     <>
//       <CustomForm<IExtendedFamily>
//         buttonProps={{ fullWidth: false }}
//         fields={getFields}
//         defaultValues={{
//           comentario: extendedFamily?.comentario,
//           direccion: extendedFamily?.direccion,
//           email: extendedFamily?.email,
//           nombre: extendedFamily?.nombre,
//           telefono: extendedFamily?.telefono,
//           idResidente: extendedFamily?.idResidente,
//           idPariente: extendedFamily?.idPariente,
//           id: extendedFamily?.id
//         }}
//         onSubmit={onSubmit}
//       />
//     </>
//   )
// }

// export default ExtendedFamilyTabPanel

'use client'

import { useState } from 'react'

import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'

import CustomDrawer from '@/components/CustomDrawer'
import CustomForm from '@/components/forms/CustomForm'

import { updateExtendedFamily } from '@/server-actions/residentTabs/familyGroup/updateExtendedFamily'
import type { AuxParentsType } from '@/types/aux'
import type { IExtendedFamily } from '@/types/residents/familyGroup/extendedFamilyTab'
import { fields } from './form'

const ExtendedFamilyTabPanel = ({
  residentId,
  extendedFamily,
  parents
}: {
  residentId: number
  extendedFamily: IExtendedFamily[]
  parents: AuxParentsType[]
}) => {
  const [addUserOpen, setAddUserOpen] = useState(false)

  const disableCreateNewItem = extendedFamily?.length >= 40

  const onSubmit: SubmitHandler<IExtendedFamily> = async updateData => {
    try {
      await updateExtendedFamily(updateData)
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

  const getForm = (extendedFamily?: IExtendedFamily, isDrawer?: boolean) => {
    return (
      <CustomForm<IExtendedFamily>
        submitButtonProps={{ fullWidth: false }}
        fields={fields(parents, isDrawer)}
        defaultValues={{
          comentario: extendedFamily?.comentario,
          direccion: extendedFamily?.direccion,
          email: extendedFamily?.email,
          nombre: extendedFamily?.nombre,
          telefono: extendedFamily?.telefono,
          idResidente: residentId,
          idPariente: extendedFamily?.idPariente,
          id: extendedFamily?.id
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
          Agregar nuevo Pariente
        </Button>
      </Grid>
      {extendedFamily &&
        extendedFamily?.map((brother, index) => {
          return (
            <Grid container my={4} item key={brother.id}>
              <Card variant='elevation'>
                <CardHeader title={`Pariente ${index + 1}`} />
                <CardContent>{getForm(brother, false)}</CardContent>
              </Card>
            </Grid>
          )
        })}

      <CustomDrawer open={addUserOpen} handleClose={handleDrawerClose} title='Agregar nuevo Pariente'>
        {getForm()}
      </CustomDrawer>
    </>
  )
}

export default ExtendedFamilyTabPanel
