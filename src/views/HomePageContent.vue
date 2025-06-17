<template>
  <div
    class="cover-root"
    v-motion
    :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
    :enter="{
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 300,
        duration: 800,
        ease: 'easeInOut',
      },
    }"
    style="width: 100%"
  >
    <div class="cover-bg-logo">
      <img src="@/assets/icons/LOGO-BIG.svg" alt="bg-logo" />
    </div>
    <div class="cover-content">
      <h1 class="title">知行智联</h1>
      <h2 class="subtitle">基于KG-RAG架构的教学实训智能体软件</h2>
      <div class="actions">
        <button class="btn btn-light">注册</button>
        <RainbowButton @click="navigateToLogin" class="btn btn-dark">登录</RainbowButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RainbowButton from '@/components/buttons/RainbowButton.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.cover-root {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.cover-bg-logo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.08;
  z-index: 0;
  pointer-events: none;
}
.cover-bg-logo img {
  width: 500px;
  max-width: 50vw;
}
.cover-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  font-family: 'Noto Serif SC', serif;
  font-size: 107px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
  line-height: 1.1;
  text-align: center;
}
.subtitle {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 30px;
  font-weight: 400;
  color: #444;
  margin-bottom: 48px;
  text-align: center;
}
.actions {
  display: flex;
  gap: 32px;
  justify-content: center;
}
.btn {
  min-width: 120px;
  height: 55px;
  border-radius: 12px;
  font-size: 28px;
  font-family: 'Noto Sans SC', 'Noto Sans', system-ui, sans-serif;
  font-weight: 600;
  border: 1.5px solid #d9d9da;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
  margin-top: 30px;
}
.btn-light {
  /* background: #fff;
  color: #1a1a1a;
  font-weight: 400; */

  background: rgba(255, 255, 255, 0.2); /* 半透明白色背景 */
  border-radius: 10px; /* 圆角边框 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 简单的阴影效果 */
  backdrop-filter: blur(10px); /* 模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* 针对 Safari 浏览器的兼容性 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* 边框 */
}
.btn-dark {
  background: #1a1a1a;
  color: #fff;
  border: none;
  box-shadow: none;
  margin-left: 0;
  width: 250px;
}
</style>
