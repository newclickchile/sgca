import { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'

type FetchOptions = {
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
}

const useFetchData = <T>({
  endpoint,
  method = 'GET',
  body,
  shouldFetch = true
}: FetchOptions & { shouldFetch?: boolean }) => {
  const { data: session } = useSession()
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user || !endpoint || !shouldFetch || !session.user.token) return
      setLoading(true)
      setError(null)

      try {
        const headers = {
          'Content-Type': 'application/json',
          pus3rN4m3: session.user.userName,
          CSRFC0d160j2vt: session.user.token
        }

        const response = await fetch(endpoint, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined
        })

        if (!response.ok) throw new Error('Failed to fetch data')
        const result = await response.json()

        setData(result.data || [])
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint, method, body, session?.user, shouldFetch])

  return { data, error, loading }
}

export default useFetchData
