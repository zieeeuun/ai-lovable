import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { transactionsApi } from './api'

export const useTransactionStore = defineStore('transaction', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      items.value = await transactionsApi.list()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const addItem = async (payload) => {
    const created = await transactionsApi.create(payload)
    items.value.push(created)
  }

  const removeItem = async (id) => {
    await transactionsApi.remove(id)
    items.value = items.value.filter(i => i.id !== id)
  }

  const totalIncome = computed(() =>
    items.value.filter(i => i.type === 'income').reduce((s, i) => s + Number(i.amount), 0)
  )
  const totalExpense = computed(() =>
    items.value.filter(i => i.type === 'expense').reduce((s, i) => s + Number(i.amount), 0)
  )
  const balance = computed(() => totalIncome.value - totalExpense.value)

  const byCategory = computed(() => {
    const map = {}
    items.value
      .filter(i => i.type === 'expense')
      .forEach(i => {
        map[i.category] = (map[i.category] || 0) + Number(i.amount)
      })
    return map
  })

  const byMonth = computed(() => {
    const map = {}
    items.value.forEach(i => {
      const key = i.date.slice(0, 7) // YYYY-MM
      if (!map[key]) map[key] = { income: 0, expense: 0 }
      map[key][i.type] += Number(i.amount)
    })
    return Object.keys(map).sort().map(k => ({ month: k, ...map[k] }))
  })

  return {
    items, loading, error,
    fetchAll, addItem, removeItem,
    totalIncome, totalExpense, balance, byCategory, byMonth
  }
})
