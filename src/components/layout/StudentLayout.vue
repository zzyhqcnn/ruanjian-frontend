<template>
  <div class="student-layout">
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="navbar-container">
        <!-- 左侧Logo -->
        <div class="logo">
          <router-link to="/">
            <img src="@/assets/icons/LOGO-文字小.svg" alt="KnoQuest Logo" />
          </router-link>
        </div>

        <!-- 导航链接 -->
        <nav class="nav-links" ref="navLinksRef">
          <router-link to="/student" class="nav-link" :class="{ active: isActive('/student') }"
            >首页</router-link
          >
          <router-link
            to="/student/test"
            class="nav-link"
            :class="{ active: isActive('/student/test') }"
            >综合测试</router-link
          >
          <router-link
            to="/student/analysis"
            class="nav-link"
            :class="{ active: isActive('/student/analysis') }"
            >习题分析</router-link
          >
          <router-link
            to="/student/resources"
            class="nav-link"
            :class="{ active: isActive('/student/resources') }"
            >学习资源</router-link
          >
          <router-link
            to="/student/bookshelf"
            class="nav-link"
            :class="{ active: isActive('/student/bookshelf') }"
            >书架</router-link
          >
          <router-link
            to="/student/ai-chat"
            class="nav-link"
            :class="{ active: isActive('/student/ai-chat') }"
            >智能对话</router-link
          >
          <router-link
            to="/student/interaction"
            class="nav-link"
            :class="{ active: isActive('/student/interaction') }"
            >师生互动</router-link
          >
          <!-- 添加滑动指示器 -->
          <div class="nav-indicator" ref="navIndicatorRef">
            <SnowfallBg color="#FFFFFF" :speed="0.1" :quantity="30" />
            <!-- <ParticlesBg color="#FFFFFF" :quantity="30" /> -->
          </div>
        </nav>

        <!-- 右侧用户头像 -->
        <div class="user-avatar">
          <img src="@/assets/avatar.png" alt="User Avatar" class="avatar-img" />
        </div>
      </div>
    </header>

    <!-- 内容区 -->
    <main class="content-area">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch, nextTick } from 'vue'
import { animate } from '@/animejs/lib/anime.esm.js'
import SnowfallBg from '../SnowfallBg.vue'
import ParticlesBg from '../ParticlesBg.vue'

const route = useRoute()
const router = useRouter()
const navLinksRef = ref<HTMLElement | null>(null)
const navIndicatorRef = ref<HTMLElement | null>(null)
const activeLink = ref<HTMLElement | null>(null)

// 判断导航链接是否激活
const isActive = (path: string) => {
  // 特殊处理首页路径
  if (path === '/student') {
    // 首页路径只有在完全匹配时才激活
    return route.path === '/student'
  }
  // 其他路径保持原来的判断逻辑
  return route.path === path || route.path.startsWith(path + '/')
}

// 更新导航指示器位置
const updateIndicator = (initial = false) => {
  if (!navLinksRef.value || !navIndicatorRef.value) return

  // 获取当前激活的链接元素
  const activeElement = navLinksRef.value.querySelector('.nav-link.active') as HTMLElement
  if (!activeElement) return

  // 获取所有链接元素
  const allLinks = Array.from(navLinksRef.value.querySelectorAll('.nav-link')) as HTMLElement[]

  // 如果是初始化，直接设置位置，不进行动画
  if (initial) {
    const { width, left } = activeElement.getBoundingClientRect()
    const navLeft = navLinksRef.value.getBoundingClientRect().left

    navIndicatorRef.value.style.width = `${width}px`
    navIndicatorRef.value.style.left = `${left - navLeft}px`
    navIndicatorRef.value.style.opacity = '1'

    // 设置激活链接的颜色
    activeElement.style.color = '#ffffff'

    return
  }

  // 计算新位置并动画
  const { width, left } = activeElement.getBoundingClientRect()
  const navLeft = navLinksRef.value.getBoundingClientRect().left

  // 重置所有链接颜色（除了当前激活的）
  allLinks.forEach((link) => {
    if (link !== activeElement) {
      // 强制设置非活动链接为原始颜色
      link.style.color = '#1a1a1a'
    }
  })

  // 使用anime.js进行动画，应用慢-快-慢的动画曲线
  animate(navIndicatorRef.value, {
    left: `${left - navLeft}px`,
    width: `${width}px`,
    duration: 600,
    easing: 'cubic-bezier(0,1,0,1)', // 慢-快-慢的曲线
    complete: () => {
      activeLink.value = activeElement
    },
  })

  // 同步为文字添加动画，使颜色变化与滑块同步
  animate(activeElement, {
    color: '#ffffff',
    duration: 600,
    easing: 'cubic-bezier(0,1,0,1)', // 使用相同的缓动函数
    delay: 100, // 稍微延迟颜色变化，确保滑块先移动
  })
}

// 监听路由变化
watch(
  () => route.path,
  async () => {
    // 等待DOM更新后再执行动画
    await nextTick()
    updateIndicator()
  },
)

onMounted(() => {
  // 初始化滑块位置
  nextTick(() => {
    updateIndicator(true)
  })

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    updateIndicator()
  })
})
</script>

<style scoped>
.student-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: #f5f7fa;
  padding: 0.75rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  /* border-bottom: 1px solid #542525; */
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 auto;
  width: 100%;
}

.logo {
  flex: 0 0 auto;
  margin-right: auto;
  padding-left: 20px;
}

.logo img {
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
  padding-right: 2rem;
  position: relative;
}

.nav-link {
  color: #1a1a1a;
  text-decoration: none;
  font-size: 21px;
  font-weight: bold;
  padding: 0.5rem 1rem;
  position: relative;
  border-radius: 30px;
  font-family: 'Noto Serif SC', serif;
  min-width: 4em;
  text-align: center;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #000000;
}

/* 修改active样式，让动画控制颜色变化 */
.nav-link.active {
  font-weight: 600;
  min-width: 4em;
  text-align: center;
  position: relative;
  z-index: 2;
}

/* 添加导航指示器样式 */
.nav-indicator {
  position: absolute;
  height: 100%;
  background-color: #1a1a1a;
  border-radius: 30px;
  z-index: 1;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s;

  /* 新增以下属性，确保内容超出时不显示 */
  overflow: hidden; /* 裁剪超出部分 */
}

.user-avatar {
  flex: 0 0 auto;
}

.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f5f7fa;
  background-color: #1a1a1a;
}

.content-area {
  flex: 1;
  margin: 0;
  width: 100%;
  background-color: #f5f7fa;
  overflow: hidden; /* 禁止滚动 */
  padding: 0;
}

/* 添加路由切换淡入动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
