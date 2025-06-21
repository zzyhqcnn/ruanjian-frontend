<template>
  <div class="scroll-island" :class="{ 'scroll-island-visible': isVisible }" ref="scrollIslandRef">
    <div class="scroll-island-content">
      <div class="scroll-island-header">
        <h3 class="scroll-island-title">{{ title }}</h3>
      </div>
      <div class="scroll-island-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  containerSelector: {
    type: String,
    default: '.content-area',
  },
})

const scrollIslandRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let scrollContainer: HTMLElement | null = null

const checkVisibility = () => {
  if (!scrollContainer) return

  const scrollTop = scrollContainer.scrollTop
  // Show when scrolled down more than 200px
  isVisible.value = scrollTop > 200
}

onMounted(() => {
  scrollContainer = document.querySelector(props.containerSelector)

  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', checkVisibility)
    // Initial check
    checkVisibility()
  }
})

onUnmounted(() => {
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', checkVisibility)
  }
})
</script>

<style scoped>
.scroll-island {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 200px;
  background-color: #1a1a1a;
  border-radius: 15px;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateX(250px);
  opacity: 0;
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
  z-index: 10;
}

.scroll-island-visible {
  transform: translateX(0);
  opacity: 1;
}

.scroll-island-content {
  padding: 15px;
}

.scroll-island-header {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.scroll-island-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}

.scroll-island-body {
  font-size: 14px;
}

/* Small screens adjustment */
@media (max-width: 768px) {
  .scroll-island {
    display: none;
  }
}
</style>
