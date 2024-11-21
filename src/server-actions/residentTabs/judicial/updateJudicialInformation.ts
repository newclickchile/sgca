'use server'

import updateData from '@/server-actions/updateData'
import type {
  IJudicialCurator,
  IJudicialInformation,
  IJudicialResponsibleAdult
} from '@/types/residents/judicial/judicialInformation'

const URL_JUDICIAL_INFORMATION = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/judicial`

export async function updateJudicialInformation(residentId: number, data: IJudicialInformation) {
  try {
    const revalidatePathParam = `/residentes/${residentId}`

    await updateData({
      updateData: data,
      urlBase: `${URL_JUDICIAL_INFORMATION}/agregar`,
      revalidatePath: revalidatePathParam
    })
  } catch (error) {
    console.error('Error en updateJudicialInformation:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}

export async function updateCurator(residentId: number, data: IJudicialCurator) {
  try {
    const revalidatePathParam = `/residentes/${residentId}`

    await updateData({
      updateData: data,
      urlBase: `${URL_JUDICIAL_INFORMATION}/agregar`,
      revalidatePath: revalidatePathParam
    })
  } catch (error) {
    console.error('Error en updateJudicialInformation:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}

export async function updateResponsibleAdult(residentId: number, data: IJudicialResponsibleAdult) {
  try {
    const revalidatePathParam = `/residentes/${residentId}`

    await updateData({
      updateData: data,
      urlBase: `${URL_JUDICIAL_INFORMATION}/agregar`,
      revalidatePath: revalidatePathParam
    })
  } catch (error) {
    console.error('Error en updateJudicialInformation:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
