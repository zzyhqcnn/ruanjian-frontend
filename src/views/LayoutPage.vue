<template>
  <AuroraBackground class="background-wrapper">
    <div class="layout-root">
      <!-- 左侧导航栏 -->
      <aside class="sidebar">
        <div class="logo-container">
          <img src="@/assets/icons/LOGO-文字大.svg" alt="logo" class="logo" />
        </div>
        <nav class="nav-menu">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link to="/intro" class="nav-item">介绍</router-link>
          <router-link to="/about" class="nav-item">关于</router-link>
        </nav>
      </aside>
      <!-- 右侧内容区 -->
      <section class="main-content">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </section>
    </div>
  </AuroraBackground>
</template>

<script setup lang="ts">
import AuroraBackground from '@/components/AuroraBackground.vue'
import SplashCursor from '@/components/SplashCursor.vue'
</script>

<style scoped>
.background-wrapper {
  width: 100vw;
  height: 100vh;
}

.layout-root {
  display: flex;
  min-height: 100vh;
  width: 100%;
  font-family: 'Noto Sans SC', 'Noto Serif SC', 'Sarasa UI SC', system-ui, sans-serif;
}

.sidebar {
  width: 180px;
  min-width: 180px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1);
}

.logo-container {
  height: auto;
  display: flex;
  justify-content: center;
  padding: 48px 0 0 0;
}

.logo {
  width: 200px;
  margin: 0 0 50px 50px;
}

.nav-menu {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 300px; /* 设置一个固定高度，根据导航项数量调整 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 56px;
  width: 100%;
}

.nav-item {
  font-family: 'Noto Serif SC', serif;
  font-size: 25px;
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.2s;
  text-align: center;
}

.nav-item.router-link-exact-active {
  font-weight: bold;
  color: #121213;
}

.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: calc(100% - 180px);
  position: relative;
  overflow: hidden;
}
</style>
