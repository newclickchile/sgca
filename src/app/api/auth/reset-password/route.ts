// app/api/auth/reset-password/route.ts

import { NextResponse } from 'next/server'

import { encryptData } from '@/utils/encrypts'

export async function POST(req: Request) {
  try {
    const { password, username, code } = await req.json()

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL_USUARIO}/usuario/p4ssw0rd/nologeado/cambiar?pus3rN4m3=${username}`

    const encryptText = await encryptData(password)

    const headers = {
      CSRFP466Nueva: encryptText.encryptedData,
      CSRFIv: encryptText.iv,
      CSRFTokenMail: code
    }

    console.log('headers :', headers)

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
