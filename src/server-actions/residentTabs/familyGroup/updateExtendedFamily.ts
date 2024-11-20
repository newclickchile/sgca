'use server'

import updateData from '@/server-actions/updateData'
import type { IExtendedFamily } from '@/types/residents/familyGroup/extendedFamilyTab'

const URL_EXTENDED_FAMILY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/familia`

export async function updateExtendedFamily(data: IExtendedFamily) {
  try {
    const urlBase = `${URL_EXTENDED_FAMILY}/${data.id ? 'editar' : 'crear'}`
    const aditionalParam = data.id ? `idFamilia=${data.id}&` : ''
    const revalidatePathParam = `/residentes/${data.idResidente}`

    await updateData({
      updateData: data,
      urlBase,
      revalidatePath: revalidatePathParam,
      aditionalParam
    })
  } catch (error) {
    console.error('Error en updateExtendedFamily:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
