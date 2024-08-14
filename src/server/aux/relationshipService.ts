import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

interface SessionUser {
  userName: string
  token: string
}

const getUserSession = async (): Promise<SessionUser | null> => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error('User not authenticated')
  }

  return {
    userName: session.user.userName,
    token: session.user.token
  }
}

export const getRelationship = async (): Promise<any> => {
  try {
    const session = await getUserSession()

    if (!session) return null

    const url = `${process.env.NEXT_PUBLIC_API_URL_AUXILIARES}/parentesco`

    const headers = {
      pus3rN4m3: session.userName,
      CSRFC0d160j2vt: session.token
    }

    const res = await fetch(url, {
      method: 'GET',
      headers
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const response = await res.json()

    return response
  } catch (error) {
    console.error('Error fetching getRelationship data:', error)

    return null
  }
}
