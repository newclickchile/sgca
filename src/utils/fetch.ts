import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

type method = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface FetchClientDataParams {
  endpoint: string
  data?: any
  method?: method
}

// export const fetchDataOld = async ({ endpoint, session, method = 'GET' }: FetchClientDataParams): Promise<any> => {
//   try {
//     const session2 = await getServerSession(authOptions)
//     console.log('session2 :', session2)

//     if (!session?.user || !session.user.token) throw new Error('No session available')

//     const headers = {
//       'Content-Type': 'application/json',
//       pus3rN4m3: session.user.userName,
//       CSRFC0d160j2vt: session.user.token
//     }

//     const res = await fetch(endpoint, {
//       method,
//       headers
//     })

//     if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`)
//     const contentType = res.headers.get('content-type')

//     if (!contentType || !contentType.includes('application/json')) {
//       throw new Error('Response is not JSON')
//     }

//     const response = await res.json()

//     return response
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     throw new Error(`Failed to fetch data from ${endpoint}: ${error}`)
//   }
// }

export const fetchData = async ({ endpoint, method = 'GET' }: FetchClientDataParams): Promise<any> => {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user.token) throw new Error('No session available')

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

    const response = await res.json()

    return response
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error(`Failed to fetch data from ${endpoint}: ${error}`)
  }
}
