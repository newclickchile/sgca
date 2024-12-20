// app/api/auth/reset-password/route.ts

import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import { encryptData } from '@/utils/encrypts'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error('User is not authenticated')
    }

    const { currentPassword, newPassword } = await req.json()

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL_USUARIO}/usuario/p4ssw0rd/logeado/cambiar?pus3rN4m3=${session.user.userName}`

    const encryptCurrent = await encryptData(currentPassword)
    const encryptNew = await encryptData(newPassword)

    const headers = {
      CSRFP466: encryptCurrent.encryptedData,
      CSRFIv: encryptCurrent.iv,
      CSRFP466Nueva: encryptNew.encryptedData,
      CSRFIvNueva: encryptNew.iv,
      CSRFC0d160j2vt: session.user.token
    }

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers
    })

    if (!response.ok) {
      return NextResponse.json({ message: 'Error al cambiar la contraseña' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Contraseña cambiada con éxito' })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)

    return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 })
  }
}
