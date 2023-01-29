export const isProduction = process.env.NODE_ENV === 'production'

export const uri = isProduction
  ? 'https://api.lilyfamily.ru/v1'
  : 'http://192.168.1.54:3001/v1'
export const port = 3000
export const siteName = 'Lily Family'
export const filesUri = `${uri}/files`
