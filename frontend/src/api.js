import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export function getClient(adminToken) {
  const instance = axios.create({ baseURL: API_BASE })
  if (adminToken) {
    instance.interceptors.request.use(config => {
      config.headers['X-Admin-Token'] = adminToken
      return config
    })
  }
  return instance
}

export async function listProducts() {
  const client = getClient()
  const res = await client.get('/api/products')
  return res.data
}

export async function getProduct(id) {
  const client = getClient()
  const res = await client.get(`/api/products/${id}`)
  return res.data
}

export function imageUrl(key) {
  const base = import.meta.env.VITE_API_BASE || 'http://localhost:8080'
  return `${base}/api/images/${key}`
}
