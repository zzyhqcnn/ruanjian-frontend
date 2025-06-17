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
import { ref, onMounted } from 'vue'

const route = useRoute()
const navLinksRef = ref<HTMLElement | null>(null)

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

onMounted(() => {
  // 监听窗口大小变化
  window.addEventListener('resize', () => {})
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
  font-size: 25px;
  font-weight: 400;
  padding: 0.5rem 1rem;
  position: relative;
  border-radius: 30px;
  font-family: 'Noto Sans SC', sans-serif;
  min-width: 4em;
  text-align: center; /* 添加这行使内容居中 */
}

.nav-link:hover {
  color: #000000;
}

/* .nav-link.active {
  background-color: #1a1a1a;
  color: #ffffff;
  font-weight: 500;
  min-width: 4em;
} */

.nav-link.active {
  background-color: #1a1a1a;
  color: #ffffff;
  font-weight: 500;
  min-width: 4em;
  text-align: center; /* 添加这行使内容居中 */
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
  padding: 2rem;
  margin: 0 auto;
  width: 100%;
  background-color: #f5f7fa;
}
</style>
