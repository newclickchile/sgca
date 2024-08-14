import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

export const fetchData = async (endpoint: string): Promise<any> => {
  try {
    // const session = await getUserSession()
    const session = await getServerSession(authOptions)

    if (!session?.user) return null

    const headers = {
      pus3rN4m3: session.user.userName,
      CSRFC0d160j2vt: session.user.token
    }

    const res = await fetch(endpoint, {
      method: 'GET',
      headers
    })

    if (!res.ok) throw new Error('Failed to fetch data')

    const response = await res.json()

    return response
  } catch (error) {
    console.error('Error fetching data:', error)

    return null
  }
}
