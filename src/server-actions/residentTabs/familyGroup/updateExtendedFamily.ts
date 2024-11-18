'use server'

import { authOptions } from '@/libs/auth'
import { IBrother } from '@/types/residents/familyGroup/brothersTab'
import { IExtendedFamily } from '@/types/residents/familyGroup/extendedFamilyTab'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

const URL_EXTENDED_FAMILY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/familia`

export async function updateExtendedFamily(updateData: IExtendedFamily) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || !session.user.token) throw new Error('No session available')

    const queryParams = new URLSearchParams(updateData as unknown as Record<string, string>).toString()

    const headers = {
      'Content-Type': 'application/json',
      pus3rN4m3: session.user.userName,
      CSRFC0d160j2vt: session.user.token
    }

    const urlBase = updateData.id
      ? `${URL_EXTENDED_FAMILY}/editar?idFamilia=${updateData.id}`
      : `${URL_EXTENDED_FAMILY}/crear?`

    const response = await fetch(`${urlBase}&${queryParams}`, {
      method: 'POST',
      headers
    })

    if (!response.ok) {
      throw new Error('Error al guardar los datos')
    }

    revalidatePath(`/residentes/${updateData.id}`)
  } catch (error) {
    console.error('Error en la acción del servidor:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
