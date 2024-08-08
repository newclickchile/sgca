// next-auth.d.ts
import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name?: string
    email?: string
    token?: string
    menu_left?: string[]
  }

  interface Session {
    user: User
  }
}
