// Third-party Imports
import type { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

import { createJWT, encryptData } from '@/utils/encrypts'

export const authOptions: NextAuthOptions = {
  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    CredentialProvider({
      // ** The name to display on the sign in form (e.g. 'Sign in with...')
      // ** For more details on Credentials Provider, visit https://next-auth.js.org/providers/credentials
      name: 'Credentials',
      type: 'credentials',

      /*
       * As we are using our own Sign-in page, we do not need to change
       * username or password attributes manually in following credentials object.
       */
      credentials: {},
      async authorize(credentials) {
        /*
         * You need to provide your own logic here that takes the credentials submitted and returns either
         * an object representing a user or value that is false/null if the credentials are invalid.
         * For e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
         * You can also use the `req` object to obtain additional parameters (i.e., the request IP address)
         */
        const { username, password } = credentials as { username: string; password: string }

        try {
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

          // const { data } = await res.json()
          // const { sesion, user, pages } = data

          const {
            data: { sesion, user, menu_left }
          } = await res.json()

          const userData = {
            id: sesion.idSesion,
            profile: user.perfil,
            userName: user.userName,
            name: user.nombre,
            token: sesion.token,
            menu_left
          }

          return userData
        } catch (e: any) {
          throw new Error(e.message)
        }
      }
    })
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    strategy: 'jwt',

    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  pages: {
    signIn: '/login'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user }) {
      if (user) {
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        token.name = user.name
        token.email = user.email
        token.token = (user as any).token || ''
        token.menu_left = (user as any).menu_left || []
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = (token.token as string) || ''
        session.user.menu_left = (token.menu_left as string[]) || []
      }

      return session
    }
  }
}
