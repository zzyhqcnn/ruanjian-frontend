<template>
  <div class="history-page">
    <!-- macOS风格导航栏 -->
    <nav class="macos-nav">
      <div class="nav-container">
        <div class="tabs-section" ref="tabsContainerRef">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.path"
            :to="tab.path"
            class="mac-tab"
            :class="{ active: route.name === tab.name }"
            @mouseenter="handleTabHover($event)"
          >
            <i :class="tab.icon"></i>
            <span class="tab-label">{{ tab.label }}</span>
            <div class="active-indicator"></div>
          </RouterLink>
          <div class="tab-highlight" :style="highlightStyle" ref="tabHighlightRef"></div>
        </div>

        <div class="date-picker-section">
          <DateRangeSelector v-model="selectedDate" :max-date="maxDate" />
        </div>
      </div>
    </nav>

    <!-- 内容区域 -->
    <main class="content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component
            :is="Component"
            :selectedDate="selectedDate"
            :refreshTrigger="refreshTrigger"
            :key="refreshTrigger"
          />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import { ref, provide, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import DateRangeSelector from '@/components/DateRangeSelector.vue'

const route = useRoute()

// 导航相关
const tabsContainerRef = ref(null)
const tabHighlightRef = ref(null)
const highlightStyle = ref({
  display: 'none',
  left: '0px',
  width: '0px',
  height: '0px',
  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
})

// 日期选择
const today = new Date()
const maxDate = computed(() => {
  return today.toISOString().split('T')[0]
})

// 确保日期格式为 YYYY-MM-DD
const selectedDate = ref(maxDate.value)

// 用于触发子组件重新加载的计数器
const refreshTrigger = ref(0)

// 监听日期变化，更新刷新触发器
watch(selectedDate, (newValue, oldValue) => {
  console.log('日期已变更:', oldValue, '->', newValue)

  // 确保日期格式为 YYYY-MM-DD 格式
  if (newValue && newValue.includes('/')) {
    selectedDate.value = newValue.replace(/\//g, '-')
  }

  // 触发子组件刷新
  refreshTrigger.value++
})

// 为子组件提供日期值和刷新触发器
provide('selectedDate', selectedDate)
provide('refreshTrigger', refreshTrigger)

// 处理标签悬停效果
const handleTabHover = (event) => {
  const tab = event.currentTarget
  const rect = tab.getBoundingClientRect()
  const containerRect = tabsContainerRef.value.getBoundingClientRect()

  // 根据悬停的标签设置高亮样式
  highlightStyle.value = {
    display: 'block',
    left: `${rect.left - containerRect.left}px`,
    top: `${rect.top - containerRect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  }
}

// 当前活动标签的索引
const setActiveHighlight = () => {
  if (!tabsContainerRef.value) return

  // 找到当前活动标签
  const activeTab = tabsContainerRef.value.querySelector('.mac-tab.active')
  if (!activeTab) return

  // 计算位置
  const rect = activeTab.getBoundingClientRect()
  const containerRect = tabsContainerRef.value.getBoundingClientRect()

  // 设置高亮样式
  highlightStyle.value = {
    display: 'block',
    left: `${rect.left - containerRect.left}px`,
    top: `${rect.top - containerRect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  }
}

// 在路由变化时更新高亮
watch(
  () => route.name,
  () => {
    nextTick(() => {
      setActiveHighlight()
    })
  },
  { immediate: true },
)

// 组件挂载后初始化
onMounted(() => {
  console.log('初始日期:', selectedDate.value)

  // 在组件挂载后设置初始高亮
  nextTick(() => {
    setActiveHighlight()

    // 监听窗口大小变化，更新高亮位置
    window.addEventListener('resize', setActiveHighlight)
  })
})

// 导航数据
const tabs = ref([
  {
    name: 'fish-count',
    path: '/history/fish-count',
    label: '鱼道计量',
    // icon: 'ri-fish-line'
  },
  {
    name: 'flow-measurement',
    path: '/history/flow-measurement',
    label: '流量计量',
    // icon: 'ri-water-flash-line'
  },
  {
    name: 'rubish-cnt',
    path: '/history/rubish-cnt',
    label: '漂浮物计量',
    // icon: 'ri-recycle-line'
  },
])
</script>

<style scoped>
/* macOS风格导航栏样式 */
.macos-nav {
  padding: 8px 24px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  color: rgb(245, 245, 247);
}

.tabs-section {
  display: flex;
  gap: 25px;
  position: relative;
  padding: 4px;
}

.date-picker-section {
  margin-left: auto;
}

.mac-tab {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
  position: relative;
  z-index: 2;
}

.mac-tab:hover {
  color: #000;
}

.mac-tab.active {
  color: #ffffff;
}

.tab-highlight {
  position: absolute;
  background-color: #272727;
  border-radius: 8px;
  z-index: 1;
  pointer-events: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.mac-tab.active .tab-label {
  font-weight: 400;
}

.active-indicator {
  display: none;
}

/* 图标样式 */
i {
  font-size: 18px;
  margin-right: 10px;
  transition: transform 0.2s ease;
}

.mac-tab:hover i {
  transform: scale(1.1);
}

.mac-tab.active i {
  color: #ffffff;
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 24px;
  background: #f5f5f7;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .macos-nav {
    padding: 8px 12px;
  }

  .mac-tab {
    padding: 8px 12px;
  }

  .tab-label {
    font-size: 14px;
  }

  .nav-container {
    flex-direction: column;
    gap: 12px;
  }

  .date-picker-section {
    margin-left: 0;
    width: 100%;
  }
}
</style>
