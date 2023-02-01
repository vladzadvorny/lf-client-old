/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */

import { uri } from '../constants/config'
import { storage } from '../constants/storage'

export const agent = async (...args) => {
  const [resource, config] = args
  // request interceptor here
  const token = localStorage.getItem(storage.token)

  const notFormData = config?.body && !(config?.body instanceof FormData)

  const response = await fetch(`${uri}${resource}`, {
    headers: {
      ...(notFormData && { 'Content-Type': 'application/json' }),
      Authorization: `Bearer ${token}`
    },
    ...config,
    ...(notFormData && {
      body: JSON.stringify(config.body)
    })
  })

  // response interceptor here
  if (!response.ok && response.status === 401) {
    localStorage.removeItem(storage.token)

    return Promise.reject(response)
  }

  const data = await response.json()

  return data
}
