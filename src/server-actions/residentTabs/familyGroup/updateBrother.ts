'use server'

import updateData from '@/server-actions/updateData'
import type { IBrother } from '@/types/residents/familyGroup/brothersTab'

const URL_BROTHERS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/hermano`

export async function updateBrother(data: IBrother) {
  try {
    const urlBase = `${URL_BROTHERS}/${data.id ? 'editar' : 'crear'}`
    const aditionalParam = data.id ? `idHermano=${data.id}` : ''
    const revalidatePathParam = `/residentes/${data.idResidente}`

    await updateData({
      updateData: data,
      urlBase,
      revalidatePath: revalidatePathParam,
      aditionalParam
    })
  } catch (error) {
    console.error('Error en updateBrother:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
