import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'

export const useSession = async () => {
  const session = await getServerSession(authOptions)

  return session
}
