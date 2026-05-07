<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '../stores/transaction'

const store = useTransactionStore()
const router = useRouter()

const form = reactive({
  date: new Date().toISOString().slice(0, 10),
  type: 'expense',
  category: '식비',
  description: '',
  amount: 0
})

const categories = {
  expense: ['식비', '교통', '쇼핑', '주거', '의료', '문화', '교육', '기타'],
  income: ['급여', '용돈', '투자', '부수입', '기타']
}

const submit = async () => {
  if (!form.amount || form.amount <= 0) return alert('금액을 입력해주세요')
  await store.addItem({ ...form, amount: Number(form.amount) })
  router.push('/transactions')
}
</script>

<template>
  <div>
    <h2 class="mb-3">거래 추가</h2>
    <div class="card chart-card p-4" style="max-width: 600px;">
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label class="form-label">구분</label>
          <div class="btn-group w-100">
            <input type="radio" class="btn-check" id="t-expense" value="expense" v-model="form.type" />
            <label class="btn btn-outline-danger" for="t-expense">지출</label>
            <input type="radio" class="btn-check" id="t-income" value="income" v-model="form.type" />
            <label class="btn btn-outline-success" for="t-income">수입</label>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">날짜</label>
          <input type="date" class="form-control" v-model="form.date" required />
        </div>
        <div class="mb-3">
          <label class="form-label">카테고리</label>
          <select class="form-select" v-model="form.category">
            <option v-for="c in categories[form.type]" :key="c">{{ c }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">내용</label>
          <input type="text" class="form-control" v-model="form.description" />
        </div>
        <div class="mb-3">
          <label class="form-label">금액 (원)</label>
          <input type="number" class="form-control" v-model="form.amount" min="0" />
        </div>
        <button class="btn btn-primary w-100" type="submit">
          <i class="fa-solid fa-floppy-disk me-1"></i>저장
        </button>
      </form>
    </div>
  </div>
</template>
