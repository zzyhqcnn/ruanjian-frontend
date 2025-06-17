<template>
  <div class="student-layout">
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="navbar-container">
        <!-- 左侧Logo -->
        <div class="logo">
          <img src="@/assets/icons/LOGO-文字小.svg" alt="KnoQuest Logo" />
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
          <div class="nav-highlight" :style="highlightStyle" ref="navHighlightRef"></div>
        </nav>

        <!-- 右侧用户头像 -->
        <div class="user-avatar">
          <img src="@/assets/avatar.png" alt="User Avatar" class="avatar-img" />
        </div>
      </div>
    </header>

    <!-- 内容区 -->
    <main class="content-area">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, nextTick, watch } from 'vue'

const route = useRoute()
const navLinksRef = ref<HTMLElement | null>(null)
const navHighlightRef = ref<HTMLElement | null>(null)
const highlightStyle = ref({
  display: 'block',
  left: '0px',
  width: '0px',
  height: '2px',
  bottom: '0px',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
})

// 判断导航链接是否激活
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// 设置活动链接的高亮
const setActiveHighlight = () => {
  if (!navLinksRef.value) return

  // 找到当前活动链接
  const activeLink = navLinksRef.value.querySelector('.nav-link.active')
  if (!activeLink || !navHighlightRef.value) return

  // 计算位置
  const rect = activeLink.getBoundingClientRect()
  const containerRect = navLinksRef.value.getBoundingClientRect()

  // 计算目标位置
  const targetLeft = rect.left - containerRect.left
  const targetWidth = rect.width

  console.log('设置滑块位置:', { targetLeft, targetWidth, el: activeLink })

  // 设置高亮样式
  highlightStyle.value = {
    display: 'block',
    left: `${targetLeft}px`,
    width: `${targetWidth}px`,
    height: '3px',
    bottom: '-1px',
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  }
}

// 监听路由变化
watch(
  () => route.path,
  () => {
    nextTick(() => {
      setActiveHighlight()
    })
  },
)

onMounted(() => {
  // 初始化高亮位置
  nextTick(() => {
    setActiveHighlight()
    // 监听窗口大小变化
    window.addEventListener('resize', setActiveHighlight)
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
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); */
  padding: 0.75rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* max-width: 1440px; */
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
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #000000;
}

.nav-link.active {
  font-weight: 600;
}

.nav-highlight {
  position: absolute;
  background-color: #1a1a1a;
  border-radius: 1px;
  z-index: 1;
  bottom: -1px;
  height: 3px;
  pointer-events: none;
  transform-origin: center center;
  will-change: transform, left, width;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
}

.content-area {
  flex: 1;
  padding: 2rem;
  margin: 0 auto;
  width: 100%;
  background-color: #f5f7fa;
}
</style>
