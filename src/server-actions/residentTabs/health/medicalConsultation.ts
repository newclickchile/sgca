'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import type { IMedicalConsultation } from '@/types/residents/health/medicalConsultations'

const URL_MEDICAL_CONSULTATION = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/consulta-medica`

export async function updateMedicalConsultation(updateData: IMedicalConsultation) {
  console.log('updateMedicalConsultation :: updateData :', updateData)

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
      ? `${URL_MEDICAL_CONSULTATION}/editar?id=${updateData.id}`
      : `${URL_MEDICAL_CONSULTATION}/crear?`

    console.log('`${urlBase}&${queryParams}` :', `${urlBase}&${queryParams}`)

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
