<script setup>
defineProps({
  label: String,
  value: [Number, String],
  icon: String,
  color: { type: String, default: '#4f46e5' }
})
const fmt = (v) => Number(v).toLocaleString('ko-KR') + '원'
</script>

<template>
  <div class="card stat-card p-3">
    <div class="d-flex align-items-center">
      <div class="icon me-3" :style="{ background: color }">
        <i :class="icon"></i>
      </div>
      <div>
        <div class="text-muted small">{{ label }}</div>
        <div class="fs-4 fw-bold">{{ fmt(value) }}</div>
      </div>
    </div>
  </div>
</template>
