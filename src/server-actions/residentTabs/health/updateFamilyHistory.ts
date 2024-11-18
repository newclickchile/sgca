'use server'

import { authOptions } from '@/libs/auth'
import { IFamilyHistory } from '@/types/residents/health/familyHistory'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

const URL_FAMILY_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/historial/familia`

export async function updateFamilyHistory(updateFamilyData: IFamilyHistory) {
  console.log('updateFamilyData :: updateFamilyData :', updateFamilyData)
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || !session.user.token) throw new Error('No session available')

    const queryParams = new URLSearchParams(updateFamilyData as unknown as Record<string, string>).toString()

    const headers = {
      'Content-Type': 'application/json',
      pus3rN4m3: session.user.userName,
      CSRFC0d160j2vt: session.user.token
    }

    const urlBase = updateFamilyData.id
      ? `${URL_FAMILY_HISTORY}/editar?ID=${updateFamilyData.id}`
      : `${URL_FAMILY_HISTORY}/crear?`

    console.log('`${urlBase}&${queryParams}` :', `${urlBase}&${queryParams}`)
    const response = await fetch(`${urlBase}&${queryParams}`, {
      method: 'POST',
      headers
    })

    if (!response.ok) {
      throw new Error('Error al guardar los datos')
    }

    revalidatePath(`/residentes/${updateFamilyData.id}`)
  } catch (error) {
    console.error('Error en la acción del servidor:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
