'use server'

import updateData from '@/server-actions/updateData'
import type { ICriminalCauses } from '@/types/residents/judicial/criminalCauses'

const URL_JUDICIAL_CRIMINAL_CAUSES = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/causa/penal`

export async function updateCriminalCauses(residentId: number, data: ICriminalCauses) {
  try {
    const revalidatePathParam = `/residentes/${residentId}`
    const urlBase = `${URL_JUDICIAL_CRIMINAL_CAUSES}/${data.id ? 'actualizar' : 'agregar'}`

    await updateData({
      updateData: data,
      urlBase,
      revalidatePath: revalidatePathParam,
      aditionalParam: data.id ? `idCausa=${data.id}&` : ''
    })
  } catch (error) {
    console.error('Error en updateCriminalCauses:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}

export async function deleteCriminalCauses(residentId: number, causeId: number) {
  try {
    const revalidatePathParam = `/residentes/${residentId}`
    const urlBase = `${URL_JUDICIAL_CRIMINAL_CAUSES}/eliminar`

    await updateData({
      updateData: { idResidente: residentId },
      urlBase,
      method: 'DELETE',
      revalidatePath: revalidatePathParam,
      aditionalParam: `idCausa=${causeId}&`
    })
  } catch (error) {
    console.error('Error en deleteCriminalCauses:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
