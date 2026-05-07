<script setup>
import { onMounted, computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'
import StatCard from '../components/StatCard.vue'
import GoogleChart from '../components/GoogleChart.vue'

const store = useTransactionStore()
onMounted(() => { if (!store.items.length) store.fetchAll() })

const categoryData = computed(() => {
  const rows = [['카테고리', '지출']]
  Object.entries(store.byCategory).forEach(([k, v]) => rows.push([k, v]))
  return rows
})

const monthData = computed(() => {
  const rows = [['월', '수입', '지출']]
  store.byMonth.forEach(m => rows.push([m.month, m.income, m.expense]))
  return rows
})

const recent = computed(() =>
  [...store.items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8)
)
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-0">대시보드</h2>
        <small class="text-muted">한눈에 보는 나의 가계부</small>
      </div>
      <button class="btn btn-outline-primary" @click="store.fetchAll()">
        <i class="fa-solid fa-rotate me-1"></i>새로고침
      </button>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <StatCard label="총 수입" :value="store.totalIncome"
                  icon="fa-solid fa-arrow-trend-up" color="#16a34a" />
      </div>
      <div class="col-md-4">
        <StatCard label="총 지출" :value="store.totalExpense"
                  icon="fa-solid fa-arrow-trend-down" color="#ef4444" />
      </div>
      <div class="col-md-4">
        <StatCard label="잔액" :value="store.balance"
                  icon="fa-solid fa-piggy-bank" color="#4f46e5" />
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <div class="card chart-card p-3">
          <h6 class="mb-3"><i class="fa-solid fa-chart-pie me-2"></i>카테고리별 지출</h6>
          <GoogleChart v-if="store.items.length" type="PieChart" :data="categoryData"
            :options="{ pieHole: 0.4, legend: { position: 'right' }, chartArea: { width: '90%', height: '85%' } }" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="card chart-card p-3">
          <h6 class="mb-3"><i class="fa-solid fa-chart-column me-2"></i>월별 수입/지출</h6>
          <GoogleChart v-if="store.items.length" type="ColumnChart" :data="monthData"
            :options="{ legend: { position: 'top' }, colors: ['#16a34a', '#ef4444'], chartArea: { width: '85%', height: '70%' } }" />
        </div>
      </div>
    </div>

    <div class="card chart-card p-3">
      <h6 class="mb-3"><i class="fa-solid fa-clock-rotate-left me-2"></i>최근 거래</h6>
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th>날짜</th><th>구분</th><th>카테고리</th><th>내용</th><th class="text-end">금액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in recent" :key="t.id">
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
