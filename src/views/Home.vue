<template>
  <div class="layout-root">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <img src="@/assets/icons/LOGO-文字大.svg" alt="logo" class="logo" />
      <nav class="nav-menu">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/intro" class="nav-item">介绍</router-link>
        <router-link to="/about" class="nav-item">关于</router-link>
      </nav>
    </aside>
    <!-- 右侧内容区 -->
    <section class="main-content">
      <router-view />
    </section>
  </div>
</template>

<script setup lang="ts">
import RainbowButton from '@/components/buttons/RainbowButton.vue';
</script>

<style scoped>
.layout-root {
  display: flex;
  min-height: 100vh;
  background: #F5F7FA;
  font-family: "Noto Sans SC", "Noto Serif SC", "Sarasa UI SC", system-ui, sans-serif;
}
.sidebar {
  width: 180px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  position: relative;
}
.logo {
  width: 120px;
  margin: 48px 0 0 0;
}
.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 56px;
  height: 100%;
  width: 100%;
}
.nav-item {
  font-family: "Noto Serif SC", serif;
  font-size: 22px;
  color: #1A1A1A;
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
  position: relative;
}
</style> 