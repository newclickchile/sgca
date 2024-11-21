'use server'

import updateData from '@/server-actions/updateData'
import type { IPreviousCauses } from '@/types/residents/judicial/previousCauses'

const URL_JUDICIAL_PREVIOUS_CAUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/causa/anterior`

export async function updatePreviousCauses(residentId: number, data: IPreviousCauses) {
  try {
    const revalidatePathParam = `/residentes/${residentId}`
    const urlBase = `${URL_JUDICIAL_PREVIOUS_CAUSES}/${data.id ? 'actualizar' : 'agregar'}`

    await updateData({
      updateData: data,
      urlBase,
      revalidatePath: revalidatePathParam,
      aditionalParam: data.id ? `idCausa=${data.id}&` : ''
    })
  } catch (error) {
    console.error('Error en updatePreviousCauses:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}

export async function deletePreviousCauses(residentId: number, causeId: number) {
  try {
    const revalidatePathParam = `/residentes/${residentId}`
    const urlBase = `${URL_JUDICIAL_PREVIOUS_CAUSES}/eliminar`

    await updateData({
      updateData: { idResidente: residentId },
      urlBase,
      method: 'DELETE',
      revalidatePath: revalidatePathParam,
      aditionalParam: `idCausa=${causeId}&`
    })
  } catch (error) {
    console.error('Error en deletePreviousCauses:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
