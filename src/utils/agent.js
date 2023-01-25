/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */

import { uri } from '../constants/config'
import { storage } from '../constants/storage'

export const agent = async (...args) => {
  const [resource, config] = args
  // request interceptor here
  const token = localStorage.getItem(storage.token)

  const response = await fetch(`${uri}${resource}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    ...config
  })

  // response interceptor here
  if (!response.ok && response.status === 401) {
    localStorage.removeItem(storage.token)

    return Promise.reject(response)
  }

  const data = await response.json()

  return data
}
