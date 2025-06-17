<template>
  <AuroraBackground class="background-wrapper">
    <SplashCursor />
    <div class="layout-root">
      <!-- 左侧导航栏 -->
      <aside class="sidebar">
        <div class="logo-container">
          <img src="@/assets/icons/LOGO-文字大.svg" alt="logo" class="logo" />
        </div>
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
