<template>
  <div class="login-container">
    <!-- 粒子背景 -->
    <ParticlesBg
      class="particles-background"
      :quantity="550"
      :ease="60"
      :color="'#787878'"
      :staticity="20"
    />

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

    <input type="text" style="position: absolute; top: -9999px; left: -99999px" />
    <input type="password" style="position: absolute; top: -9999px; left: -99999px" />
    <!-- 右侧登录表单区域 -->
    <div class="login-form-container">
      <div class="login-form-content">
        <h1 class="login-title">登 录</h1>

        <!-- 学生端/教师端切换器 -->
        <div class="login-switcher-container">
          <div class="login-switcher-track" ref="switcherTrackRef">
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
            <div class="tab-highlight" :style="highlightStyle" ref="tabHighlightRef"></div>
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
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { animate, createTimeline, createTimer } from 'animejs'
import ParticlesBg from '@/components/ParticlesBg.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const activeTab = ref('学生端')
const switcherTrackRef = ref<HTMLElement | null>(null)
const tabHighlightRef = ref<HTMLElement | null>(null)
const highlightStyle = ref({
  display: 'none',
  left: '0px',
  width: '0px',
  height: '0px',
  top: '0px',
  transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1.4)',
})

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

    // 切换后更新高亮位置
    nextTick(() => {
      // 使用anime.js增强动画效果
      const activeTabElement = switcherTrackRef.value?.querySelector(
        '.login-switcher-option.active',
      )
      if (!activeTabElement || !tabHighlightRef.value || !switcherTrackRef.value) return

      const rect = activeTabElement.getBoundingClientRect()
      const containerRect = switcherTrackRef.value.getBoundingClientRect()

      // 计算目标位置，严格确保不超出容器边界
      const targetLeft = Math.max(
        0,
        Math.min(rect.left - containerRect.left, containerRect.width - rect.width),
      )
      const targetTop = Math.max(
        0,
        Math.min(rect.top - containerRect.top, containerRect.height - rect.height),
      )

      // 添加安全边距，确保高亮块完全在容器内
      const safeTargetLeft = Math.min(targetLeft, containerRect.width - rect.width)
      const safeTargetTop = Math.min(targetTop, containerRect.height - rect.height)

      // 检测是否触及边界 - 使用更精确的边界检测
      const isTouchingLeftEdge = safeTargetLeft <= 2
      const isTouchingRightEdge = safeTargetLeft + rect.width >= containerRect.width - 2

      // 创建动画计时器
      const timer = createTimer()

      // 主移动动画 - 使用安全坐标
      animate(timer, {
        targets: '.tab-highlight',
        left: safeTargetLeft + 'px',
        top: safeTargetTop + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        duration: 550,
        easing: 'cubicBezier(.25, .6, .25, 1)',
        complete: function () {
          // 如果触及边界，添加挤压动画
          if (isTouchingLeftEdge || isTouchingRightEdge) {
            // 创建新的计时器用于挤压动画
            const squeezeTimer = createTimer()

            // 执行挤压动画序列
            animate(squeezeTimer, {
              targets: '.tab-highlight',
              // 水平缩放动画序列 - 更平滑的弹性效果
              scaleX: [
                { value: isTouchingLeftEdge ? 0.92 : 0.92, duration: 100 }, // 初始压缩
                { value: isTouchingLeftEdge ? 1.04 : 1.04, duration: 100 }, // 反弹
                { value: 1, duration: 150 }, // 恢复正常
              ],
              // 水平位移动画序列 - 确保不会超出边界的轻微位移
              translateX: [
                { value: isTouchingLeftEdge ? '1.5px' : '-1.5px', duration: 100 },
                { value: isTouchingLeftEdge ? '-0.8px' : '0.8px', duration: 100 },
                { value: '0px', duration: 150 },
              ],
              // 使用更精确的弹性曲线，确保不会弹出容器边界
              easing: 'easeOutElastic(1, 0.35)',
              duration: 350,
            })
          }
        },
      })
    })
  }
}

// 设置活动标签的高亮
const setActiveHighlight = () => {
  if (!switcherTrackRef.value) return

  // 找到当前活动标签
  const activeTab = switcherTrackRef.value.querySelector('.login-switcher-option.active')
  if (!activeTab) return

  // 计算位置
  const rect = activeTab.getBoundingClientRect()
  const containerRect = switcherTrackRef.value.getBoundingClientRect()

  // 严格确保不超出容器边界
  const targetLeft = Math.max(
    0,
    Math.min(rect.left - containerRect.left, containerRect.width - rect.width),
  )
  const targetTop = Math.max(
    0,
    Math.min(rect.top - containerRect.top, containerRect.height - rect.height),
  )

  // 添加安全边距，确保高亮块完全在容器内
  const safeTargetLeft = Math.min(targetLeft, containerRect.width - rect.width)
  const safeTargetTop = Math.min(targetTop, containerRect.height - rect.height)

  // 设置高亮样式，使用更平滑的过渡曲线
  highlightStyle.value = {
    display: 'block',
    left: `${safeTargetLeft}px`,
    top: `${safeTargetTop}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
  }
}

// 监听 activeTab 变化
watch(activeTab, () => {
  nextTick(() => {
    setActiveHighlight()
  })
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

  // 登录成功后根据角色跳转
  if (activeTab.value === '学生端') {
    router.push('/student')
  } else {
    router.push('/teacher')
  }
}

onMounted(() => {
  startCarousel()

  // 初始化高亮位置
  nextTick(() => {
    setActiveHighlight()

    // 监听窗口大小变化，更新高亮位置
    window.addEventListener('resize', setActiveHighlight)
  })
})

onUnmounted(() => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }

  // 移除事件监听
  window.removeEventListener('resize', setActiveHighlight)
})
</script>

<style scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  position: relative;
  overflow: hidden;
}

.particles-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.carousel-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dadceb;
  border-radius: 24px;
  margin: 60px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  backdrop-filter: blur(5px);
  /* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); */
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
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background-color: #1a1a1a;
  transform: scale(1.2);
}

.login-form-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  position: relative;
  z-index: 1;
}

.login-form-content {
  width: 100%;
  max-width: 420px;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 40px;
  border-radius: 24px;
  backdrop-filter: blur(10px);
  /* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); */
}

.login-title {
  font-size: 45px;
  font-weight: bolder;
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
  background-color: #f5f9fe;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 4px;
  overflow: hidden; /* 确保子元素不超出边界 */
  /* border: 1px solid #e6e6e6; */
}

.tab-highlight {
  position: absolute;
  background-color: white;
  border-radius: 25px;
  z-index: 1;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform-origin: center center;
  will-change: transform, left, top, width, height; /* 优化性能 */
  backface-visibility: hidden; /* 防止3D变换闪烁 */
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
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  user-select: none;
  font-family: 'Noto Serif SC', serif;
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
  border-radius: 35px;
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
  border-radius: 30px;
  font-size: 18px;
  font-weight: normal;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;
  font-family: 'Noto Sans SC', sans-serif;
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
