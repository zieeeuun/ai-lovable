// json-server 와 axios 를 연결하는 모듈
import axios from 'axios'

export const API_BASE = 'http://localhost:3001'

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

// 거래내역 CRUD
export const transactionsApi = {
  list: () => api.get('/transactions').then(r => r.data),
  get: (id) => api.get(`/transactions/${id}`).then(r => r.data),
  create: (payload) => api.post('/transactions', payload).then(r => r.data),
  update: (id, payload) => api.put(`/transactions/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/transactions/${id}`).then(r => r.data)
}
