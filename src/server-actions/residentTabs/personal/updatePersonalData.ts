'use server'

import updateData from '@/server-actions/updateData'
import type { IUpdateResident } from '@/types/residents/service'

const URL_RESIDENTS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/editar`

export async function updatePersonalData(residentId: number, data: IUpdateResident) {
  try {
    const aditionalParam = `idResidente=${residentId}&`
    const revalidatePathParam = `/residentes/${residentId}`

    await updateData({
      updateData: data,
      method: 'PUT',
      urlBase: URL_RESIDENTS,
      revalidatePath: revalidatePathParam,
      aditionalParam
    })
  } catch (error) {
    console.error('Error en updatePersonalData:')
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
