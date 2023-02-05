export const isProduction = process.env.NODE_ENV === 'production'

export const baseUri = isProduction
  ? 'https://api.lilyfamily.ru'
  : 'http://192.168.1.54:3001'
export const uri = `${baseUri}/v1`
export const port = 3000
export const siteName = 'Lily Family'
export const filesUri = `${baseUri}/files`
export const isBrowser = typeof window !== 'undefined'
