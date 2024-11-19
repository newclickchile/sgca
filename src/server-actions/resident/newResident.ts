'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import type { INewResident } from '@/types/residents/service'

const URL_RESIDENT = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/crear`

export async function newResident(residentData: INewResident) {
  console.log('residentData :', residentData)

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user.token) throw new Error('No session available')

    const queryParams = new URLSearchParams(residentData as unknown as Record<string, string>).toString()

    const headers = {
      'Content-Type': 'application/json',
      pus3rN4m3: session.user.userName,
      CSRFC0d160j2vt: session.user.token
    }

    console.log('`${URL_RESIDENT}&${queryParams}` :', `${URL_RESIDENT}&${queryParams}`)

    const response = await fetch(`${URL_RESIDENT}&${queryParams}`, {
      method: 'POST',
      headers
    })

    if (!response.ok) {
      throw new Error('Error al guardar los datos')
    }

    revalidatePath('/residentes')
  } catch (error) {
    console.error('Error en la acción del servidor:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
