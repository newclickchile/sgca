import { NextResponse } from 'next/server'

import { createJWT, encryptData } from '@/utils/encrypts'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    const url = `${process.env.NEXT_PUBLIC_API_URL_USUARIO}/usuario/login?pus3rN4m3=${username}`
    const encryptText = await encryptData(password)
    const jwtData = await createJWT(username, encryptText.encryptedData)

    const headers = {
      CSRFP466: encryptText.encryptedData,
      CSRFIv: encryptText.iv,
      CSRFC0d160j2vt: jwtData
    }

    const res = await fetch(url, {
      method: 'POST',
      headers
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const response = await res.json()

    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: ['Email or Password is invalid'] },
      { status: 401, statusText: 'Unauthorized Access' }
    )
  }
}
