<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  type: { type: String, default: 'PieChart' }, // PieChart | ColumnChart | LineChart
  data: { type: Array, required: true },       // [['Label','Value'], ...]
  options: { type: Object, default: () => ({}) }
})

const el = ref(null)
let chart = null
let loaded = false

const draw = () => {
  if (!loaded || !el.value || !window.google?.visualization) return
  const dt = window.google.visualization.arrayToDataTable(props.data)
  chart = new window.google.visualization[props.type](el.value)
  chart.draw(dt, props.options)
}

onMounted(() => {
  if (window.google && window.google.charts) {
    window.google.charts.load('current', { packages: ['corechart'] })
    window.google.charts.setOnLoadCallback(() => {
      loaded = true
      draw()
    })
  }
  window.addEventListener('resize', draw)
})

watch(() => props.data, draw, { deep: true })
</script>

<template>
  <div ref="el" style="width: 100%; height: 320px;"></div>
</template>
