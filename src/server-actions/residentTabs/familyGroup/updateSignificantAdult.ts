'use server'

import updateData from '@/server-actions/updateData'
import type { ISignificantAdult } from '@/types/residents/familyGroup/significantAdultTab'

const URL_SIGNIFICANT_ADULT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/adulto`

export async function updateSignificantAdult(data: ISignificantAdult) {
  try {
    const urlBase = `${URL_SIGNIFICANT_ADULT}/${data.id ? 'editar' : 'crear'}`
    const aditionalParam = data.id ? `idAdulto=${data.id}&` : ''
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
