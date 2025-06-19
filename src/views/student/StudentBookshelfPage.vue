<template>
  <div class="bookshelf-page">
    <!-- 主容器 -->
    <div class="bookshelf-container">
      <!-- 左侧切换按钮 -->
      <div class="nav-button left">
        <span class="nav-arrow">&#8249;</span>
      </div>

      <!-- 书籍网格 -->
      <div class="books-grid-container" ref="booksContainer" @scroll="handleScroll">
        <div class="books-grid">
          <!-- 上传卡片 -->
          <div class="book-card upload-card">
            <div class="upload-icon">
              <img src="@/assets/icons/upload.svg" alt="Upload" />
            </div>
            <div class="upload-text">上传资料</div>
          </div>

          <!-- 书籍卡片 -->
          <div class="book-card" v-for="(book, index) in books" :key="index">
            <div class="book-cover">
              <img :src="book.coverImg" alt="Book Cover" />
            </div>
            <div class="book-title">{{ book.title }}</div>
            <div class="book-info">
              <div class="book-author">{{ book.author }}</div>
              <div class="book-metadata">{{ book.pages }}页 · {{ book.format }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧切换按钮 -->
      <div class="nav-button right">
        <span class="nav-arrow">&#8250;</span>
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
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
// @ts-ignore - Suppress TypeScript error for missing declaration file
import { animate } from '@/animejs/lib/anime.esm.js'

// 页面状态
const booksContainer = ref<HTMLElement | null>(null)
const activePage = ref(0)
const pageCount = ref(3) // 初始页数，将根据实际内容计算更新

// 书籍数据
const books = ref([
  {
    id: 1,
    title: 'NumPy数组是Python世界中数值数据的标准表示形式',
    author: '李玉生',
    pages: 258,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
  {
    id: 2,
    title: 'NumPy数组是Python世界中数值数据的标准表示形式',
    author: '李玉生',
    pages: 258,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
  {
    id: 3,
    title: 'NumPy数组是Python世界中数值数据的标准表示形式',
    author: '李玉生',
    pages: 258,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
  {
    id: 4,
    title: 'NumPy数组是Python世界中数值数据的标准表示形式',
    author: '李玉生',
    pages: 258,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
  {
    id: 5,
    title: 'NumPy数组是Python世界中数值数据的标准表示形式',
    author: '李玉生',
    pages: 258,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
  {
    id: 6,
    title: 'NumPy数组是Python世界中数值数据的标准表示形式',
    author: '李玉生',
    pages: 258,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
  {
    id: 7,
    title: 'NumPy数组是Python世界中数值数据的标准表示形式',
    author: '李玉生',
    pages: 258,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
  {
    id: 8,
    title: 'NumPy数组是Python世界中数值数据的标准表示形式',
    author: '李玉生',
    pages: 258,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
  {
    id: 9,
    title: 'NumPy数组是Python世界中数值数据的标准表示形式',
    author: '李玉生',
    pages: 258,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
  {
    id: 10,
    title: 'Hadoop综合测试题',
    author: '张老师',
    pages: 180,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
  {
    id: 11,
    title: '计算机视觉综合测试题',
    author: '王教授',
    pages: 320,
    format: 'PDF',
    coverImg: '@/src/assets/cover.png',
  },
])

// 计算页面指示器点数
const calculatePageCount = () => {
  // 获取卡片网格中的卡片数量（包括上传卡片）
  const totalCards = books.value.length + 1
  // 每行显示5个卡片
  const cardsPerRow = 5
  // 计算行数
  const rows = Math.ceil(totalCards / cardsPerRow)
  // 根据行数计算点数 (行数//2+1)
  pageCount.value = Math.floor(rows / 2) + 1
}

// 处理滚动事件
const handleScroll = () => {
  if (!booksContainer.value) return

  const scrollTop = booksContainer.value.scrollTop
  const scrollHeight = booksContainer.value.scrollHeight
  const clientHeight = booksContainer.value.clientHeight

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
  }
}

// 点击指示器滚动到对应页面
const scrollToPage = (index: number) => {
  if (!booksContainer.value) return

  const scrollHeight = booksContainer.value.scrollHeight
  const clientHeight = booksContainer.value.clientHeight

  // 分页滚动计算
  const pageHeight = scrollHeight / pageCount.value
  const targetScrollTop = index * pageHeight

  // 更新激活页
  activePage.value = index

  // 使用动画平滑滚动
  animate(booksContainer.value, {
    scrollTop: targetScrollTop,
    duration: 600,
    easing: 'easeInOutQuad',
    complete: () => {
      // 滚动完成后确保页面指示正确
      handleScroll()
    },
  })
}

onMounted(() => {
  // 计算页面指示器点数
  calculatePageCount()

  // 确保初始化时页面指示器正确
  if (booksContainer.value) {
    handleScroll()
  }
})
</script>

<style scoped>
.bookshelf-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 1rem;
  position: relative;
  box-sizing: border-box;
}

.bookshelf-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
}

/* 书籍网格容器 */
.books-grid-container {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  position: relative;
  padding: 0 2rem;
}

.books-grid-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 书籍网格 */
.books-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  padding: 1rem;
}

/* 书籍卡片样式 */
.book-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: auto;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* 上传卡片样式 */
.upload-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 280px;
  border: 2px dashed #d9d9da;
  background-color: #f5f7fa;
  box-shadow: none;
}

.upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
}

.upload-icon img {
  width: 80px;
  height: 80px;
}

.upload-text {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;
}

/* 书籍封面 */
.book-cover {
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 书籍标题和信息 */
.book-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin: 0.75rem 1rem 0.25rem;
  color: #1a1a1a;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-info {
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: flex-end;
}

.book-author {
  font-family: 'Noto Serif SC', serif;
  font-size: 13px;
  color: #666;
}

.book-metadata {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 12px;
  color: #888;
}

/* 导航按钮 */
.nav-button {
  width: 50px;
  height: 50px;
  background-color: #1a1a1a;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 10;
}

.nav-button.left {
  left: 1rem;
}

.nav-button.right {
  right: 1rem;
}

.nav-arrow {
  font-size: 24px;
  font-weight: bold;
}

/* 页面指示器 */
.page-indicator {
  position: absolute;
  bottom: 20px;
  display: flex;
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
  width: 24px; /* 激活时变长 */
  border-radius: 4px; /* 保持圆角 */
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .books-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .books-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .books-grid {
    grid-template-columns: 1fr;
  }
}
</style>
