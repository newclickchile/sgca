'use server'

import type { INewResident } from '@/types/residents/service'
import updateData from '../updateData'

const URL_RESIDENT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/crear`

export async function newResident(data: INewResident) {
  try {
    await updateData({
      updateData: data,
      urlBase: URL_RESIDENT,
      revalidatePath: '/residentes'
    })
  } catch (error) {
    console.error('Error en newResident:')
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
