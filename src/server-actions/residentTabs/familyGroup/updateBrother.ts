'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import type { IBrother } from '@/types/residents/familyGroup/brothersTab'

const URL_SIGNIFICANT_ADULT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/hermano`

export async function updateBrother(updateBrotherData: IBrother) {
  console.log('updateBrother :: updateBrotherData :', updateBrotherData)

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user.token) throw new Error('No session available')

    const queryParams = new URLSearchParams(updateBrotherData as unknown as Record<string, string>).toString()

    const headers = {
      'Content-Type': 'application/json',
      pus3rN4m3: session.user.userName,
      CSRFC0d160j2vt: session.user.token
    }

    const urlBase = updateBrotherData.id
      ? `${URL_SIGNIFICANT_ADULT}/editar?idHermano=${updateBrotherData.id}`
      : `${URL_SIGNIFICANT_ADULT}/crear?`

    console.log('`${urlBase}&${queryParams}` :', `${urlBase}&${queryParams}`)

    const response = await fetch(`${urlBase}&${queryParams}`, {
      method: 'POST',
      headers
    })

    if (!response.ok) {
      throw new Error('Error al guardar los datos')
    }

    revalidatePath(`/residentes/${updateBrotherData.id}`)
  } catch (error) {
    console.error('Error en la acción del servidor:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
