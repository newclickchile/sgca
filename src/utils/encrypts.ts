import jwt from 'jsonwebtoken'

export type PasswordRules = {
  re: RegExp
  label: string
}

// export const PROHIBITED_WORDS = Config.PROHIBITED_WORDS_IN_PASS.split(",").map(word => word.trim());
// export const REGEX = new RegExp(`^(?!.*\\b\\w*(?:${PROHIBITED_WORDS.join("|")})\\w*\\b).+$`, "i");

// export const createPasswordRules = (passwordRules: PasswordRules[]) => {
//   const functionsObj: any = {};

//   passwordRules.forEach((objeto, index) => {
//         functionsObj[`f(${index})`] = (value: string) => objeto.re.test(value) || objeto.label;
//   });

//   return functionsObj;
// }

// export const validateUserOnText = (searchText: string) => (value: string) => {
//   const regex = new RegExp(`^.*${searchText}.*$`, "i");

//   if (regex.test(value)) {
//     return "No puede contener su nombre de usuario";
//   }

//   if (/\s/.test(value)) {
//     return "No puede contener espacios en blanco";
//   }
// };

export const encryptData = async (text: string) => {
  const key = Uint8Array.from(atob(process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY!), c => c.charCodeAt(0))

  const ivArray = new Uint8Array(16)

  crypto.getRandomValues(ivArray)

  const iv64 = btoa(String.fromCharCode.apply(null, Array.from(ivArray)))

  async function encrypt(text: string): Promise<{ iv: string; encryptedData: string }> {
    const encodedKey = await crypto.subtle.importKey('raw', key, { name: 'AES-CBC' }, false, ['encrypt'])

    const encodedData = new TextEncoder().encode(text)

    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv: ivArray
      },
      encodedKey,
      encodedData
    )

    const bufferToBase64 = (buffer: ArrayBuffer): string => {
      const bytes = new Uint8Array(buffer)
      let binary = ''

      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
      }

      return btoa(binary)
    }

    const base64EncryptedData = bufferToBase64(encryptedData)
    const urlSafeEncryptedData = encodeURIComponent(base64EncryptedData)

    return {
      iv: encodeURIComponent(iv64),
      encryptedData: urlSafeEncryptedData
    }
  }

  return await encrypt(text)
}

export const createJWT = async (email: string, password: string) => {
  // Datos para el JWT
  const payload = {
    sub: email,
    p4ss: password
  }

  const token = jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET_KEY!, { expiresIn: '1h' })

  return token
}
