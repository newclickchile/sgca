'use server'

import updateData from '@/server-actions/updateData'
import type { IResidentMedicalHistory } from '@/types/residents/health/residentMedicalHistory'

const URL_MEDICAL_HISTORY = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/clinico/historial/agregar`

export async function updateMedicalHistory(data: IResidentMedicalHistory) {
  try {
    const revalidatePathParam = `/residentes/${data.idResidente}`

    await updateData({
      updateData: data,
      urlBase: URL_MEDICAL_HISTORY,
      revalidatePath: revalidatePathParam
    })
  } catch (error) {
    console.error('Error en updateExtendedFamily:', error)
    throw new Error('Error en la operación. Inténtalo nuevamente.')
  }
}
