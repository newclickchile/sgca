'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import type { IAffiliation } from '@/types/residents/familyGroup/affiliationTab'

const URL_RESIDENTS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/padres/actualizar`

export async function updateAffiliationData(residentId: number, residentData: IAffiliation) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user.token) throw new Error('No session available')

    const queryParams = new URLSearchParams(residentData as unknown as Record<string, string>).toString()

    const headers = {
      'Content-Type': 'application/json',
      pus3rN4m3: session.user.userName,
      CSRFC0d160j2vt: session.user.token
    }

    const response = await fetch(`${URL_RESIDENTS}?idResidente=${residentId}&${queryParams}`, {
      method: 'POST',
      headers
    })

    if (!response.ok) {
      throw new Error('Error al guardar los datos')
    }

    revalidatePath(`/residentes/${residentId}`)
  } catch (error) {
    console.error('Error en la acción del servidor:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
