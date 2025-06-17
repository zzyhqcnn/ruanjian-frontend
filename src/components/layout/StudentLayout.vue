<template>
  <div class="student-layout">
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="navbar-container">
        <!-- 左侧Logo -->
        <div class="logo">
          <img src="@/assets/icons/LOGO-文字小.svg" alt="KnoQuest Logo" />
        </div>

        <!-- 中间导航链接 -->
        <nav class="nav-links">
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
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=student123"
            alt="User Avatar"
            class="avatar-img"
          />
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
import { computed } from 'vue'

const route = useRoute()

// 判断导航链接是否激活
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<style scoped>
.student-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 0.75rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}

.logo {
  flex: 0 0 auto;
}

.logo img {
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
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

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #1a1a1a;
  transition: width 0.3s ease;
}

.nav-link.active::after,
.nav-link:hover::after {
  width: 100%;
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
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}
</style>
