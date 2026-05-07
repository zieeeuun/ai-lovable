# 가계부 대시보드 (Vue 3 + Pinia + json-server)

Vue 3 Composition API, Pinia, axios, Bootstrap 5, Google Charts, Font Awesome 으로 만든 가계부 대시보드입니다.

## 설치

```bash
npm install
```

## 실행 (json-server + vite 동시 실행)

```bash
npm start
```

- 프런트: http://localhost:5173
- json-server API: http://localhost:3001/transactions

분리 실행이 필요하면:

```bash
npm run server   # json-server (db.json)
npm run dev      # vite
```

## 폴더 구조

```
src/
 ├─ stores/
 │   ├─ api.js           ← axios 로 json-server 연결
 │   └─ transaction.js   ← Pinia store (Composition API)
 ├─ views/               ← Dashboard, Transactions, AddTransaction
 ├─ components/          ← StatCard, GoogleChart
 ├─ router/index.js
 ├─ App.vue
 └─ main.js
```

샘플 거래내역 100건이 `db.json` 에 포함되어 있습니다.
