<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'

const store = useTransactionStore()
const filter = ref('all')
const keyword = ref('')

onMounted(() => { if (!store.items.length) store.fetchAll() })

const list = computed(() => {
  return store.items
    .filter(i => filter.value === 'all' ? true : i.type === filter.value)
    .filter(i => !keyword.value ||
      i.description.includes(keyword.value) ||
      i.category.includes(keyword.value))
    .sort((a, b) => b.date.localeCompare(a.date))
})
</script>

<template>
  <div>
    <h2 class="mb-3">거래내역</h2>
    <div class="card chart-card p-3 mb-3">
      <div class="row g-2">
        <div class="col-md-3">
          <select v-model="filter" class="form-select">
            <option value="all">전체</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
          </select>
        </div>
        <div class="col-md-9">
          <input v-model="keyword" type="text" class="form-control"
                 placeholder="카테고리 또는 내용 검색..." />
        </div>
      </div>
    </div>

    <div class="card chart-card p-3">
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th>날짜</th><th>구분</th><th>카테고리</th><th>내용</th>
            <th class="text-end">금액</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in list" :key="t.id">
            <td>{{ t.date }}</td>
            <td>
              <span :class="t.type === 'income' ? 'badge bg-success' : 'badge bg-danger'">
                {{ t.type === 'income' ? '수입' : '지출' }}
              </span>
            </td>
            <td>{{ t.category }}</td>
            <td>{{ t.description }}</td>
            <td class="text-end" :class="t.type === 'income' ? 'text-income' : 'text-expense'">
              {{ (t.type === 'income' ? '+' : '-') + Number(t.amount).toLocaleString('ko-KR') }}원
            </td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-danger" @click="store.removeItem(t.id)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
