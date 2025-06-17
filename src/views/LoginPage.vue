<template>
  <div class="login-container">
    <!-- 左侧轮播图区域 -->
    <div class="carousel-container">
      <div class="carousel-content">
        <img
          v-for="(image, index) in carouselImages"
          :key="index"
          :src="image.src"
          :alt="image.alt"
          class="carousel-image"
          :class="{ active: currentImageIndex === index }"
        />
      </div>
      <div class="carousel-dots">
        <span
          v-for="(dot, index) in carouselImages.length"
          :key="index"
          class="dot"
          :class="{ active: currentImageIndex === index }"
          @click="currentImageIndex = index"
        ></span>
      </div>
    </div>

    <!-- 右侧登录表单区域 -->
    <div class="login-form-container">
      <div class="login-form-content">
        <h1 class="login-title">登 录</h1>

        <!-- 学生端/教师端切换器 -->
        <div class="login-switcher-container">
          <div class="login-switcher-track" ref="switcherTrack">
            <div class="login-switcher-indicator" ref="switcherIndicator"></div>
            <div
              class="login-switcher-option"
              :class="{ active: activeTab === '学生端' }"
              @click="switchTab('学生端')"
            >
              学生端
            </div>
            <div
              class="login-switcher-option"
              :class="{ active: activeTab === '教师端' }"
              @click="switchTab('教师端')"
            >
              教师端
            </div>
          </div>
        </div>

        <div class="login-form">
          <div class="form-item">
            <input type="text" placeholder="邮箱" v-model="email" class="form-input" />
          </div>
          <div class="form-item">
            <input type="password" placeholder="密码" v-model="password" class="form-input" />
          </div>

          <button class="login-button" @click="handleLogin">登录</button>

          <div class="login-actions">
            <router-link to="/register" class="register-link">注册</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import anime from 'animejs/lib/anime.es.js'

const router = useRouter()
const email = ref('')
const password = ref('')
const activeTab = ref('学生端')
const switcherTrack = ref<HTMLElement | null>(null)
const switcherIndicator = ref<HTMLElement | null>(null)

const carouselImages = [
  {
    src: '/src/assets/login/slide1.jpg',
    alt: '轮播图1',
  },
  {
    src: '/src/assets/login/slide1.jpg',
    alt: '轮播图2',
  },
  {
    src: '/src/assets/login/slide1.jpg',
    alt: '轮播图3',
  },
  {
    src: '/src/assets/login/slide1.jpg',
    alt: '轮播图4',
  },
]

const currentImageIndex = ref(0)
let carouselInterval: number | null = null

const startCarousel = () => {
  carouselInterval = window.setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % carouselImages.length
  }, 5000)
}

const switchTab = (tab: string) => {
  if (activeTab.value !== tab) {
    activeTab.value = tab
  }
}

// 动画效果：移动指示器
const animateIndicator = () => {
  if (!switcherIndicator.value) return

  const targetX = activeTab.value === '学生端' ? '0' : '50%'

  anime({
    targets: switcherIndicator.value,
    translateX: targetX,
    duration: 600,
    easing: 'easeInOutQuad',
  })
}

// 监听 activeTab 变化，触发动画
watch(activeTab, () => {
  animateIndicator()
})

const handleLogin = () => {
  if (!email.value || !password.value) {
    alert('请输入邮箱和密码')
    return
  }

  // 这里添加登录逻辑，后续与后端对接
  console.log('登录信息', {
    type: activeTab.value,
    email: email.value,
    password: password.value,
  })

  // 登录成功后跳转
  // router.push('/')
}

onMounted(() => {
  startCarousel()
  // 初始化指示器位置
  animateIndicator()
})

onUnmounted(() => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
})
</script>

<style scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
}

.carousel-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dadceb;
  border-radius: 24px;
  margin: 24px;
  position: relative;
  overflow: hidden;
}

.carousel-content {
  width: 100%;
  height: 90%;
  position: relative;
  overflow: hidden;
}

.carousel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-image.active {
  opacity: 1;
}

.carousel-dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background-color: rgb(104, 104, 104);
  transform: scale(1.2);
}

.login-form-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
}

.login-form-content {
  width: 100%;
  max-width: 420px;
}

.login-title {
  font-size: 40px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 40px;
  text-align: center;
  font-family: 'Noto Serif SC', serif;
}

/* 学生端/教师端切换器样式 */
.login-switcher-container {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.login-switcher-track {
  position: relative;
  width: 100%;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 4px;
  overflow: hidden;
  border: 1px solid #e6e6e6;
}

.login-switcher-indicator {
  position: absolute;
  width: 50%;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  top: 5px;
  left: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.login-switcher-option {
  position: relative;
  z-index: 2;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.3s ease;
  font-size: 18px;
  font-weight: 500;
  color: #666;
  user-select: none;
}

.login-switcher-option.active {
  color: #1a1a1a;
  font-weight: 600;
}

.login-form {
  margin-top: 32px;
}

.form-item {
  margin-bottom: 24px;
}

.form-input {
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #d9d9da;
  padding: 0 16px;
  font-size: 16px;
  background-color: white;
  transition: all 0.3s;
}

.form-input:focus {
  border-color: #1a1a1a;
  outline: none;
  box-shadow: 0 0 0 2px rgba(26, 26, 26, 0.1);
}

.login-button {
  width: 100%;
  height: 50px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;
}

.login-button:hover {
  background-color: #333;
}

.login-actions {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.register-link {
  color: #1a1a1a;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.2s;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
