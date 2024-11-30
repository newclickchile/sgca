'use server'

import updateData from '@/server-actions/updateData'
import type { IMedicalConsultation } from '@/types/residents/health/medicalConsultations'

const URL_MEDICAL_CONSULTATION = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/consulta-medica`

export async function updateMedicalConsultation(data: IMedicalConsultation) {
  try {
    const urlBase = `${URL_MEDICAL_CONSULTATION}/${data.id ? 'crear' : 'crear'}`

    const aditionalParam = data.id ? `id=${data.id}&` : ''
    const revalidatePathParam = `/residentes/${data.idResidente}`

    await updateData({
      updateData: data,
      urlBase,
      revalidatePath: revalidatePathParam,
      aditionalParam
    })
  } catch (error) {
    console.error('Error en updateExtendedFamily:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
