import { type Session } from 'next-auth'

type method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface FetchClientDataParams {
  endpoint: string
  session: Session | null
  data?: any
  method?: method
}

export const fetchData = async ({ endpoint, session, method = 'GET' }: FetchClientDataParams): Promise<any> => {
  try {
    if (!session?.user) throw new Error('No session available')

    const headers = {
      'Content-Type': 'application/json',
      pus3rN4m3: session.user.userName,
      CSRFC0d160j2vt: session.user.token
    }

    const res = await fetch(endpoint, {
      method,
      headers
    })

    if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`)

    const contentType = res.headers.get('content-type')

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON')
    }

    const response = await res.json()

    return response
  } catch (error) {
    console.error('Error fetching data:', error)

    throw new Error(`Failed to fetch data from ${endpoint}: ${error}`)
  }
}
