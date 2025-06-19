<template>
  <div class="test-page">
    <!-- 中心卡片 -->
    <div class="main-card">
      <!-- Mac 风格按钮 -->
      <div class="mac-buttons">
        <div class="mac-button close"></div>
        <div class="mac-button minimize"></div>
        <div class="mac-button maximize"></div>
      </div>

      <!-- 内部导航栏 -->
      <div class="card-nav" ref="cardNavRef">
        <div
          v-for="(item, index) in navItems"
          :key="index"
          class="nav-item"
          :class="{ active: activeNavIndex === index }"
          @click="setActiveNav(index)"
        >
          {{ item.name }}
          <span class="badge">{{ item.count }}</span>
        </div>
        <div class="nav-indicator" ref="navIndicatorRef"></div>
        <div class="nav-pagination">
          <div class="nav-arrow left">&#8249;</div>
          <div>我的作业</div>
          <div class="nav-arrow right">&#8250;</div>
        </div>
      </div>

      <!-- 测试卡片内容区 -->
      <div class="test-cards-container" ref="cardsContainer" @scroll="handleScroll">
        <div class="test-cards-grid">
          <!-- 卡片 1 -->
          <div class="test-card" @click="showDetailModal = true">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <!-- 卡片 2 -->
          <div class="test-card hadoop" @click="showDetailModal = true">
            <div class="card-title">Hadoop综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <!-- 卡片 3 -->
          <div class="test-card light-purple" @click="showDetailModal = true">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <!-- 卡片 4 -->
          <div class="test-card light-green" @click="showDetailModal = true">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <!-- 卡片 5 -->
          <div class="test-card light-blue" @click="showDetailModal = true">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <!-- 卡片 6 -->
          <div class="test-card purple" @click="showDetailModal = true">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <!-- 卡片 7 -->
          <div class="test-card mint">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card mint">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card mint">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card mint">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>

          <div class="test-card mint">
            <div class="card-title">计算机视觉综合测试题</div>
            <div class="card-creator">创建者：张老师</div>
            <div class="card-time">
              <div>发布时间：2023.6.7 19:18</div>
              <div>截止时间：2023.6.9 19:18</div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: 78%"></div>
              <div class="progress-text">78%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 页面指示器 -->
      <div class="page-indicator">
        <div
          v-for="(dot, index) in pageCount"
          :key="index"
          class="indicator-dot"
          :class="{ active: activePage === index }"
          @click="scrollToPage(index)"
        ></div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="action-button">
      作业生成
      <span class="arrow-down">&#9660;</span>
    </div>

    <!-- 详情弹窗 - 使用分离出的组件 -->
    <TestDetailModal v-model="showDetailModal" :test-data="activeCard" @close="closeDetailModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, onBeforeUnmount } from 'vue'
// @ts-ignore - Suppress TypeScript error for missing declaration file
import { animate } from '@/animejs/lib/anime.esm.js'
import TestDetailModal from '@/components/TestDetailModal.vue'

// 导航项数据
const navItems = [
  { name: '计算机视觉', count: '7' },
  { name: '深度学习', count: '5' },
  { name: 'NLP', count: '2' },
  { name: 'RAG', count: '6' },
]

const cardNavRef = ref<HTMLElement | null>(null)
const navIndicatorRef = ref<HTMLElement | null>(null)
const activeNavIndex = ref(0) // 默认选中第一项
const cardsContainer = ref<HTMLElement | null>(null)
const activePage = ref(0)
const pageCount = ref(3) // 初始值，将在计算后更新

// 计算页面指示器点数
const calculatePageCount = () => {
  // 获取卡片网格中的卡片数量
  const cards = document.querySelectorAll('.test-card').length
  // 每行显示5个卡片 (从grid-template-columns: repeat(5, 1fr)得知)
  const cardsPerRow = 5
  // 计算行数
  const rows = Math.ceil(cards / cardsPerRow)
  // 根据行数计算点数 (行数//2+1)
  pageCount.value = Math.floor(rows / 2) + 1
}

// 设置活动导航项
const setActiveNav = (index: number) => {
  activeNavIndex.value = index
  nextTick(() => {
    updateIndicator()
  })
}

// 更新指示器位置
const updateIndicator = (initial = false) => {
  if (!cardNavRef.value || !navIndicatorRef.value) return

  // 获取当前激活的导航项元素
  const activeElement = cardNavRef.value.querySelectorAll('.nav-item')[
    activeNavIndex.value
  ] as HTMLElement
  if (!activeElement) return

  // 计算文字宽度 (排除badge的宽度)
  const badge = activeElement.querySelector('.badge')
  const badgeWidth = badge ? badge.getBoundingClientRect().width : 0
  const { width: totalWidth, left } = activeElement.getBoundingClientRect()
  const textWidth = totalWidth - badgeWidth - 10 // 减去badge宽度和一些间距
  const indicatorWidth = textWidth * 0.7 // 取文字宽度的70%

  // 计算指示器的水平居中位置
  const navLeft = cardNavRef.value.getBoundingClientRect().left
  const centerOffset = (textWidth - indicatorWidth) / 2
  const finalLeft = left - navLeft + centerOffset

  // 如果是初始化，直接设置位置
  if (initial) {
    navIndicatorRef.value.style.width = `${indicatorWidth}px`
    navIndicatorRef.value.style.left = `${finalLeft}px`
    navIndicatorRef.value.style.opacity = '1'
    return
  }

  // 使用anime.js进行动画
  animate(navIndicatorRef.value, {
    left: `${finalLeft}px`,
    width: `${indicatorWidth}px`,
    duration: 600,
    easing: 'cubic-bezier(0,1,0,1)', // 慢-快-慢的动画曲线
  })
}

// 处理滚动事件
const handleScroll = () => {
  if (!cardsContainer.value) return

  const scrollTop = cardsContainer.value.scrollTop
  const scrollHeight = cardsContainer.value.scrollHeight
  const clientHeight = cardsContainer.value.clientHeight

  // 计算滚动百分比
  const scrollPercentage = scrollTop / (scrollHeight - clientHeight)

  // 根据滚动百分比确定当前页
  const newActivePage = Math.min(
    Math.floor(scrollPercentage * pageCount.value),
    pageCount.value - 1,
  )

  // 只有在页面变化时才更新
  if (newActivePage !== activePage.value) {
    activePage.value = newActivePage
    // 可以在这里添加其他页面变化的逻辑
  }
}

// 点击指示器滚动到对应页面
const scrollToPage = (index: number) => {
  if (!cardsContainer.value) return

  const scrollHeight = cardsContainer.value.scrollHeight
  const clientHeight = cardsContainer.value.clientHeight

  // 分页滚动计算
  const pageHeight = scrollHeight / pageCount.value
  const targetScrollTop = index * pageHeight

  // 更新激活页
  activePage.value = index

  // 使用动画平滑滚动
  animate(cardsContainer.value, {
    scrollTop: targetScrollTop,
    duration: 600,
    easing: 'easeInOutQuad',
    complete: () => {
      // 滚动完成后确保页面指示正确
      handleScroll()
    },
  })
}

// 详情弹窗
const showDetailModal = ref(false)
const activeCard = ref({
  title: '',
  endTime: '',
  creator: '',
})

// 显示详情弹窗
const showCardDetail = (card: any) => {
  activeCard.value = card
  showDetailModal.value = true
  document.body.style.overflow = 'hidden' // 禁止背景滚动
}

// 关闭详情弹窗
const closeDetailModal = () => {
  showDetailModal.value = false
  document.body.style.overflow = '' // 恢复背景滚动
}

// 监听详情弹窗显示状态变化
watch(showDetailModal, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden' // 禁止背景滚动
  } else {
    document.body.style.overflow = '' // 恢复背景滚动
  }
})

// 监听ESC键退出
const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showDetailModal.value) {
    closeDetailModal()
  }
}

onMounted(() => {
  // 初始化指示器
  nextTick(() => {
    updateIndicator(true)
  })

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    updateIndicator()
  })

  // 确保初始化时页面指示器正确
  if (cardsContainer.value) {
    handleScroll()
  }

  // 计算页面指示器点数
  calculatePageCount()

  // 添加ESC键监听
  document.addEventListener('keydown', handleEscKey)
})

// 组件卸载前移除事件监听
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey)
  // 正确移除resize事件监听
  window.removeEventListener('resize', () => {
    updateIndicator()
  })
})
</script>

<style scoped>
/* 添加全局样式防止滚动 */
:deep(html),
:deep(body) {
  overflow: hidden;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.test-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* 使用视口高度 */
  /* padding: 2rem; */
  background-color: #f5f7fa;
  position: relative; /* 添加相对定位，用于绝对定位子元素 */
  overflow: hidden; /* 防止页面整体滚动 */
  box-sizing: border-box; /* 确保内边距不会增加元素总高度 */
}

/* 主卡片样式 */
.main-card {
  width: 90vw;
  height: 85vh; /* 使用视口高度的85% */
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem; /* 减少底部边距，防止溢出 */
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 确保内容不溢出 */
  box-sizing: border-box; /* 确保内边距不会增加元素总高度 */
}

/* Mac 样式按钮 */
.mac-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
  margin-left: 10px;
}

.mac-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.mac-button.close {
  background-color: #ff5f56;
}

.mac-button.minimize {
  background-color: #ffbd2e;
}

.mac-button.maximize {
  background-color: #27c93f;
}

/* 内部导航栏样式 */
.card-nav {
  display: flex;
  margin-bottom: 2rem;
  position: relative;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 20px;
}

.nav-item {
  display: inline-flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  padding: 0 0.5rem;
  margin-right: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
  border-bottom: none; /* 移除原有下边框 */
  margin-bottom: 0;
  color: #1a1a1a;
}

/* .nav-item.active {
  font-weight: 700;
  color: #000;
} */

.badge {
  display: inline-flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: #d9d9d9;
  color: #64635f;
  border-radius: 10px;
  width: 30px;
  height: 16px;
  font-size: 0.75rem;
  margin-left: 5px;
  /* 可以移除 line-height，因为 flex 布局会处理居中 */
}

/* 导航滑块指示器 */
.nav-indicator {
  position: absolute;
  height: 5px; /* 增加厚度 */
  background-color: #1a1a1a;
  border-radius: 5px; /* 圆角矩形 */
  bottom: -8px; /* 位置调整，与导航项保持一定距离 */
  opacity: 0;
  transition: opacity 0.3s;
}

.nav-pagination {
  margin-left: auto;
  margin-right: 50px;
  display: flex;
  align-items: center; /* 确保子元素垂直居中 */
  justify-content: center; /* 如果需要水平居中也可以添加 */
  gap: 8px;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 25px;
  height: 40px; /* 示例高度，根据实际需求调整 */
  /* 或者使用 min-height 确保最小高度 */
  min-height: 40px;
  cursor: pointer;
}

.nav-arrow {
  font-size: 30px;
  cursor: pointer;
}

/* 测试卡片容器 - 隐藏滚动条但保留滚动功能 */
.test-cards-container {
  flex: 1;
  position: relative;
  /* margin-bottom: 1rem; */
  overflow-y: auto; /* 内容过多时可滚动 */
  /* 隐藏滚动条但保留滚动功能 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  border-radius: 12px;
}

.test-cards-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 测试卡片网格 */
.test-cards-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 固定5列 */
  gap: 1.5rem;
  padding-right: 100px; /* 添加右侧间距 */
  box-sizing: border-box; /* 确保padding包含在宽度内 */
  border-radius: 0px;
}

/* 测试卡片样式 */
.test-card {
  background-color: #f9eae5;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  width: auto; /* 由网格控制宽度 */
  height: 150px; /* 设置固定高度 */
  overflow: hidden; /* 超出内容不显示 */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer; /* 添加鼠标指针样式 */
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.test-card:hover {
  /* transform: translateY(-5px); */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.test-card::-webkit-scrollbar {
  width: 4px;
}

.test-card::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.test-card.hadoop {
  background-color: #d6d9cb;
}

.test-card.light-purple {
  background-color: #d8d6e4;
}

.test-card.light-green {
  background-color: #c8dcd6;
}

.test-card.light-blue {
  background-color: #e5eaf9;
}

.test-card.purple {
  background-color: #e9e9f5;
}

.test-card.mint {
  background-color: #e0f0ed;
}

.card-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-family: 'Noto Sans SC', sans-serif;
}

.card-creator {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.3rem;
  font-family: 'Noto Serif SC', sans-serif;
  font-weight: 700;
}

.card-time {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 0.7rem;
  font-family: 'Noto Serif SC', sans-serif;
  font-weight: 700;
}

/* 进度条 */
.progress-bar-container {
  height: 8px;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem; /* 减少与卡片底部的距离 */
}

.progress-bar {
  height: 100%;
  background-color: #333;
  border-radius: 4px;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -1.5rem;
  font-size: 0.75rem;
  color: #666;
}

/* 页面指示器 */
.page-indicator {
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 10;
  transition: opacity 0.3s ease;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background-color: #333;
  height: 24px; /* 激活时变长 */
  border-radius: 12px; /* 保持圆角 */
  transition: all 0.3s ease;
}

/* 底部按钮 - 固定在屏幕底部 */
.action-button {
  background-color: #1a1a1a;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 100px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: fixed; /* 固定定位 */
  bottom: 20px; /* 距离底部20px */
  z-index: 100; /* 确保在顶层 */
}

.arrow-down {
  font-size: 0.75rem;
}

/* 详情弹窗样式已移至TestDetailModal组件 */
</style>
