'use client'

import CustomForm from '@/components/forms/CustomForm'
import { IExtendedFamily } from '@/types/residents/familyGroup/extendedFamilyTab'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { fields } from './form'
import { AuxParentsType } from '@/types/aux'
import { useMemo } from 'react'
import { updateExtendedFamily } from '@/server-actions/residentTabs/familyGroup/updateExtendedFamily'

const ExtendedFamilyTabPanel = ({
  extendedFamily,
  parents
}: {
  extendedFamily: IExtendedFamily
  parents: AuxParentsType[]
}) => {
  const onSubmit: SubmitHandler<IExtendedFamily> = async updateData => {
    try {
      await updateExtendedFamily(updateData)
      toast.success('Se han actualizado los datos correctamente')
    } catch (_) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  const getFields = useMemo(() => {
    const parentsOptions = parents.map(parent => ({
      id: parent.id.toString(),
      nombre: parent.parentesco
    }))

    return fields.map(f => {
      if (f.name === 'idPariente') {
        return { ...f, listValues: parentsOptions }
      }
      return f
    })
  }, [parents])

  return (
    <>
      <CustomForm<IExtendedFamily>
        buttonProps={{ fullWidth: false }}
        fields={getFields}
        defaultValues={{
          comentario: extendedFamily?.comentario,
          direccion: extendedFamily?.direccion,
          email: extendedFamily?.email,
          nombre: extendedFamily?.nombre,
          telefono: extendedFamily?.telefono,
          idResidente: extendedFamily?.idResidente,
          idPariente: extendedFamily?.idPariente,
          id: extendedFamily?.id
        }}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default ExtendedFamilyTabPanel
