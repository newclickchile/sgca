// src/types/next-auth.d.ts
import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    userName: string
    email?: string
    token: string
    menu_left?: string[]
    institutionId: number
  }

  interface Session {
    user: User
  }
}
