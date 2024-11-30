import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

type method = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface FetchClientDataParams {
  endpoint: string
  data?: any
  method?: method
}

export const fetchData = async ({ endpoint, method = 'GET' }: FetchClientDataParams): Promise<any> => {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user.token) {
      throw new Error('No session available')
    }

    const headers = {
      'Content-Type': 'application/json',
      pus3rN4m3: session.user.userName,
      CSRFC0d160j2vt: session.user.token
    }

    const res = await fetch(endpoint, {
      method,
      headers
    })

    if (!res.ok) {
      console.error(`Error fetching data:${endpoint}: ${res.status} - ${res.statusText}`)

      return null
    }

    const contentType = res.headers.get('content-type')

    if (!contentType || !contentType.includes('application/json')) {
      console.error('Error: Response is not JSON')

      return null
    }

    const jsonResponse = await res.json()

    if (!jsonResponse || !jsonResponse.data) {
      console.error('Error: Response data is not present')

      return null
    }

    return jsonResponse.data
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error)

    return null
  }
}
