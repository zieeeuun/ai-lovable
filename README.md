# 🤖 AI Lovable

> AI를 활용한 대화형 웹 애플리케이션으로, 자연스럽고 따뜻한 상호작용을 제공합니다.

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg)](https://vuejs.org/)
[![Stars](https://img.shields.io/github/stars/zieeeuun/ai-lovable)](https://github.com/zieeeuun/ai-lovable)

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [설치 및 실행](#설치-및-실행)
- [프로젝트 구조](#프로젝트-구조)
- [사용 예제](#사용-예제)
- [기여 방법](#기여-방법)
- [라이센스](#라이센스)

## 🎯 프로젝트 소개

**AI Lovable**은 현대적인 웹 기술과 인공지능을 결합한 프로젝트입니다. 사용자 친화적인 인터페이스로 AI와의 자연스러운 상호작용을 가능하게 하며, 따뜻하고 개인화된 경험을 제공합니다.

이 프로젝트는 다음과 같은 목표를 지향합니다:
- ✨ **우수한 사용자 경험(UX)** 제공
- 🎨 **반응형 디자인** 구현
- 🚀 **빠른 성능** 보장
- 🔒 **보안** 고려

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 💬 **AI 대화** | 자연스러운 대화형 인터페이스 |
| 🎨 **반응형 UI** | 모든 디바이스에서 최적화된 화면 |
| 📱 **모바일 지원** | 모바일, 태블릿, 데스크톱 대응 |
| ⚡ **실시간 처리** | 빠른 응답 속도 |
| 💾 **상태 관리** | 효율적인 데이터 관리 |

## 🛠️ 기술 스택

### Frontend Framework
- **Vue.js 3.x** - Progressive 웹 프레임워크
- **JavaScript** - 핵심 로직 구현
- **HTML5** - 시맨틱 마크업
- **CSS3** - 현대적인 스타일링

### 개발 도구
```javascript
// package.json - 핵심 의존성 (예시)
{
  "dependencies": {
    "vue": "^3.x.x",
    "axios": "^1.x.x",
    "pinia": "^2.x.x"
  },
  "devDependencies": {
    "vite": "^4.x.x",
    "@vitejs/plugin-vue": "^4.x.x"
  }
}
```

### 코드 구성 통계

| 언어 | 코드량 | 비중 |
|------|--------|------|
| Vue | 10,905 bytes | 65.2% |
| JavaScript | 3,453 bytes | 20.7% |
| HTML | 503 bytes | 3.0% |
| CSS | 1,039 bytes | 6.2% |
| **Total** | **16,900 bytes** | **100%** |

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 16.0 이상
- npm 7.0 이상 또는 yarn 1.22 이상

### 설치 단계

```bash
# 1. 저장소 복제
git clone https://github.com/zieeeuun/ai-lovable.git
cd ai-lovable

# 2. 의존성 설치
npm install
# 또는
yarn install

# 3. 개발 서버 실행
npm run dev
# 또는
yarn dev

# 4. 프로덕션 빌드
npm run build
# 또는
yarn build
```

### 환경 설정

```bash
# .env 파일 생성
cp .env.example .env

# API 엔드포인트 설정
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=AI Lovable
```

## 📁 프로젝트 구조

```
ai-lovable/
├── src/
│   ├── components/          # Vue 컴포넌트
│   │   ├── Chat.vue         # 대화 컴포넌트
│   │   ├── Message.vue      # 메시지 컴포넌트
│   │   └── ...
│   ├── views/               # 페이지 뷰
│   │   ├── Home.vue         # 홈 페이지
│   │   └── ...
│   ├── stores/              # Pinia 상태 관리
│   │   ├── chat.js          # 채팅 상태
│   │   └── ...
│   ├── api/                 # API 요청 모듈
│   │   ├── chat.js          # 채팅 API
│   │   └── ...
│   ├── styles/              # 글로벌 스타일
│   │   ├── main.css         # 메인 스타일
│   │   └── ...
│   └── App.vue              # 루트 컴포넌트
├── public/                  # 정적 자산
│   └── index.html           # HTML 진입점
├── vite.config.js           # Vite 설정
├── package.json             # 프로젝트 메타데이터
└── README.md                # 프로젝트 문서
```

## 💻 사용 예제

### 기본 컴포넌트 사용

```vue
<!-- Chat.vue - 메인 대화 컴포넌트 -->
<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message" :class="msg.type">
        {{ msg.text }}
      </div>
    </div>
    <div class="input-area">
      <input 
        v-model="userInput" 
        @keyup.enter="sendMessage"
        placeholder="메시지를 입력하세요..."
      />
      <button @click="sendMessage">전송</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const messages = ref([])
const userInput = ref('')

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  
  const message = {
    id: Date.now(),
    text: userInput.value,
    type: 'user'
  }
  
  messages.value.push(message)
  
  // AI 응답 요청
  const response = await chatStore.sendMessage(userInput.value)
  messages.value.push({
    id: Date.now() + 1,
    text: response,
    type: 'ai'
  })
  
  userInput.value = ''
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 8px;
}

.message.user {
  background-color: #007bff;
  color: white;
  text-align: right;
}

.message.ai {
  background-color: #f0f0f0;
  color: #333;
}

.input-area {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #ddd;
}

.input-area input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-area button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-area button:hover {
  background-color: #0056b3;
}
</style>
```

### API 요청 예제

```javascript
// api/chat.js - AI 채팅 API
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export const chatAPI = {
  sendMessage: async (message) => {
    try {
      const response = await apiClient.post('/chat', {
        message: message,
        timestamp: new Date().toISOString()
      })
      return response.data.reply
    } catch (error) {
      console.error('메시지 전송 실패:', error)
      throw error
    }
  },

  getHistory: async (limit = 20) => {
    try {
      const response = await apiClient.get('/chat/history', {
        params: { limit }
      })
      return response.data.messages
    } catch (error) {
      console.error('채팅 히스토리 조회 실패:', error)
      throw error
    }
  }
}
```

### 상태 관리 예제

```javascript
// stores/chat.js - Pinia 저장소
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { chatAPI } from '@/api/chat'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const sendMessage = async (text) => {
    isLoading.value = true
    error.value = null

    try {
      const reply = await chatAPI.sendMessage(text)
      messages.value.push({
        id: Date.now(),
        text: text,
        type: 'user'
      })
      messages.value.push({
        id: Date.now() + 1,
        text: reply,
        type: 'ai'
      })
      return reply
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return { messages, isLoading, error, sendMessage }
})
```

## 🖼️ 실행 화면

### 홈 화면 (데스크톱)
```
┌──────────────────────────────────────────────────┐
│  🤖 AI Lovable                            ☰      │
├──────────────────────────────────────────────────┤
│                                                  │
│   👤: 안녕하세요!                                │
│   시간: 14:25                                    │
│                                                  │
│   🤖: 안녕하세요! 무엇을 도와드릴까요?          │
│   시간: 14:26                                    │
│                                                  │
│   👤: 날씨가 어떻게 되나요?                     │
│   시간: 14:27                                    │
│                                                  │
│   🤖: 현재 지역의 날씨는 맑음이며               │
│       기온은 20°C입니다.                        │
│   시간: 14:28                                    │
│                                                  │
├──────────────────────────────────────────────────┤
│   입력: [━━━━━━━━━━━━━━━━━━━━━━━━]  [전송]    │
└──────────────────────────────────────────────────┘
```

### 모바일 뷰 (반응형)
```
┌──────────────────┐
│ 🤖 AI Lovable ☰ │
├──────────────────┤
│                  │
│ 👤: 안녕!        │
│ 14:25           │
│                  │
│ 🤖: 반갑습니다! │
│ 14:26           │
│                  │
│ 👤: 도와줘      │
│ 14:27           │
│                  │
│ 🤖: 무엇을      │
│     도와드릴까? │
│ 14:28           │
├──────────────────┤
│ [메시지]   [📤]  │
└──────────────────┘
```

### 다크 모드 (테마)
```
┌──────────────────────────────────────────────────┐
│  🤖 AI Lovable (Dark Mode)              ☀️      │
├──────────────────────────────────────────────────┤
│                                                  │
│   👤: 📝 사용자 메시지                          │
│   └─ 시간: 14:30                               │
│                                                  │
│   🤖: 💬 AI 응답 메시지                        │
│   └─ 시간: 14:31                               │
│                                                  │
│   👤: 🤔 또 다른 질문                          │
│   └─ 시간: 14:32                               │
│                                                  │
├──────────────────────────────────────────────────┤
│   [입력 필드]                          [전송] │
└──────────────────────────────────────────────────┘
```

### 로딩 상태
```
┌──────────────────────────────────────────────────┐
│  🤖 AI Lovable                            ☰      │
├──────────────────────────────────────────────────┤
│                                                  │
│   👤: 날씨 정보를 알려줘                        │
│                                                  │
│   🤖: ⏳ AI가 응답을 준비 중입니다...           │
│       [████░░░░░░░░░░░] 50%                    │
│                                                  │
├──────────────────────────────────────────────────┤
│   입력: [━━━━━━━━━━━━━━━━━━━━━━━━]  [전송]    │
└──────────────────────────────────────────────────┘
```

## 🚀 성능 최적화

### 로드 시간 최적화
- ⚡ Vue 3 Composition API 활용
- 📦 코드 스플리팅 및 번들 최적화
- 🖼️ 이미지 최적화 및 레이지 로딩

### 메모리 관리
```javascript
// 컴포넌트 언마운트 시 정리
import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  // 리스너 제거
  window.removeEventListener('resize', handleResize)
  
  // API 요청 취소
  cancelToken.cancel('Component unmounting')
  
  // 메모리 해제
  clearTimeout(timerId)
})
```

## 🧪 테스트

```bash
# 단위 테스트 실행
npm run test

# E2E 테스트 실행
npm run test:e2e

# 테스트 커버리지
npm run test:coverage
```

## 🤝 기여 방법

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

### 기여 가이드라인
- 📝 명확한 커밋 메시지 작성
- 🧹 코드 스타일 일관성 유지
- ✅ 테스트 추가 및 실행
- 📖 문서 업데이트

## 📄 라이센스

이 프로젝트는 [MIT License](LICENSE) 하에 라이센스됩니다.

## 👥 연락처

- 📧 이메일: [your-email@example.com]
- 💼 GitHub: [@zieeeuun](https://github.com/zieeeuun)

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!**

Made with ❤️ by [zieeeuun](https://github.com/zieeeuun)

</div>
