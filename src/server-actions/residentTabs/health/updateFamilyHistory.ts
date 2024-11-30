'use server'

import updateData from '@/server-actions/updateData'
import type { IFamilyHistory } from '@/types/residents/health/familyHistory'

const URL_FAMILY_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/historial/familia`

export async function updateFamilyHistory(data: IFamilyHistory) {
  try {
    const urlBase = `${URL_FAMILY_HISTORY}/${data.id ? 'actualizar' : 'agregar'}`
    const aditionalParam = data.id ? `id=${data.id}&` : ''
    const revalidatePathParam = `/residentes/${data.idResidente}`

    await updateData({
      updateData: data,
      urlBase,
      revalidatePath: revalidatePathParam,
      aditionalParam
    })
  } catch (error) {
    console.error('Error en updateFamilyHistory:')
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
