'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

interface UpdateData {
  [key: string]: any
}

interface UpdateParams {
  method?: string
  updateData: UpdateData
  urlBase: string
  revalidatePath: string
  aditionalParam?: string
  body?: any
}

async function updateData({
  method = 'POST',
  updateData,
  urlBase,
  revalidatePath: revalidatePathParam,
  aditionalParam = '',
  body
}: UpdateParams) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user.token) throw new Error('No session available')

    const queryParams = new URLSearchParams(updateData as unknown as Record<string, string>).toString()

    const headers = {
      'Content-Type': 'application/json',
      pus3rN4m3: session.user.userName,
      CSRFC0d160j2vt: session.user.token
    }

    const finalUrl = `${urlBase}?${aditionalParam}${queryParams}`

    const response = await fetch(finalUrl, {
      method,
      headers,
      ...(body && { body })
    })

    if (!response.ok) {
      throw new Error('Error al guardar los datos')
    }

    revalidatePath(revalidatePathParam)
  } catch (error) {
    console.error('Error en la acción del servidor:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}

export default updateData
