<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <aside class="col-md-2 sidebar p-0">
        <div class="p-4 border-bottom border-secondary">
          <h4 class="mb-0"><i class="fa-solid fa-wallet me-2"></i>가계부</h4>
          <small class="text-secondary">Household Book</small>
        </div>
        <nav class="mt-3">
          <RouterLink to="/"><i class="fa-solid fa-gauge-high me-2"></i>대시보드</RouterLink>
          <RouterLink to="/transactions"><i class="fa-solid fa-list me-2"></i>거래내역</RouterLink>
          <RouterLink to="/add"><i class="fa-solid fa-plus me-2"></i>거래추가</RouterLink>
        </nav>
      </aside>
      <main class="col-md-10 p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>
