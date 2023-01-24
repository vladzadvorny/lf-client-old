/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
import axios from 'axios'

import { uri as baseURL } from '../constants/config'
import { storage } from '../constants/storage'

export const agent = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

agent.interceptors.request.use(
  async config => {
    const token = localStorage.getItem(storage.token)

    config.headers['Authorization'] = `Bearer ${token}`

    return config
  },
  error => Promise.reject(error)
)

agent.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      localStorage.removeItem(storage.token)
    }

    return Promise.reject(error)
  }
)
