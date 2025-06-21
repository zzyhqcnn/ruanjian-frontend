<template>
  <div class="bookshelf-page">
    <!-- 背景"学"字 -->
    <div class="background-text">学</div>

    <!-- 主容器 -->
    <div class="bookshelf-container">
      <!-- 左侧切换按钮
      <div class="nav-button left">
        <span class="nav-arrow">&#8249;</span>
      </div> -->

      <!-- 书籍网格 -->
      <div
        class="books-grid-container"
        ref="booksContainer"
        @scroll="handleScroll"
        @wheel="handleWheel"
      >
        <div class="books-grid">
          <!-- 上传卡片 -->
          <div class="upload-card">
            <div class="upload-icon">
              <img src="@/assets/icons/upload.svg" alt="Upload" />
            </div>
            <div class="upload-text">上传资料</div>
          </div>

          <!-- 书籍卡片 -->

          <Book v-for="(book, index) in books" :key="index">
            <div class="book-card">
              <div class="book-cover">
                <img src="@/assets/cover.png" alt="Book Cover" />
              </div>

              <div class="book-content">
                <h3 class="book-title">{{ book.title }}</h3>
                <div class="divider"></div>
                <p class="book-description">{{ book.description }}</p>
              </div>
            </div>
          </Book>
        </div>
      </div>

      <!-- 右侧切换按钮 -->
      <!-- <div class="nav-button right">
        <span class="nav-arrow">&#8250;</span>
      </div> -->
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
import { ref, onMounted, nextTick, computed } from 'vue'
// @ts-ignore - Suppress TypeScript error for missing declaration file
import { animate } from '@/animejs/lib/anime.esm.js'
import Book from '@/components/book/Book.vue'
import { books as bookData } from '@/data/student'

// 页面状态
const booksContainer = ref<HTMLElement | null>(null)
const activePage = ref(0)
const pageCount = ref(3) // 初始页数，将根据实际内容计算更新
const cardsPerPage = 10 // 每页显示的卡片数量（2行×5列）
const visibleColumns = 5 // 一页显示的列数

// 书籍数据
const books = ref(bookData)

// 计算总列数
const totalColumns = computed(() => {
  // 总卡片数量（包括上传卡片）
  const totalCards = books.value.length + 1
  // 计算总列数
  return Math.ceil(totalCards / 2) // 每列2个卡片
})

// 计算页面指示器点数
const calculatePageCount = () => {
  // 总列数 - 一页显示的列数 + 1
  const dots = totalColumns.value > visibleColumns ? totalColumns.value - visibleColumns + 1 : 1
  pageCount.value = dots
}

// 处理鼠标滚轮事件，实现横向滚动
const handleWheel = (e: WheelEvent) => {
  if (!booksContainer.value) return

  // 阻止默认垂直滚动
  e.preventDefault()

  // 滚动方向调整为水平，大幅增加滚动速度系数
  const speedMultiplier = 8
  booksContainer.value.scrollLeft += e.deltaY * speedMultiplier

  // 滚动后更新指示器
  handleScroll()
}

// 处理滚动事件
const handleScroll = () => {
  if (!booksContainer.value) return

  const scrollLeft = booksContainer.value.scrollLeft
  const scrollWidth = booksContainer.value.scrollWidth
  const clientWidth = booksContainer.value.clientWidth

  // 计算滚动百分比
  const maxScrollLeft = scrollWidth - clientWidth
  // 防止除以零
  const scrollPercentage = maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0

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

  const scrollWidth = booksContainer.value.scrollWidth
  const clientWidth = booksContainer.value.clientWidth

  // 计算每页滚动的距离
  const maxScrollLeft = scrollWidth - clientWidth
  const scrollPerPage = maxScrollLeft / (pageCount.value - 1)

  // 如果只有一页，不需要滚动
  const targetScrollLeft = pageCount.value > 1 ? index * scrollPerPage : 0

  // 更新激活页
  activePage.value = index

  // 使用动画平滑滚动
  animate(booksContainer.value, {
    scrollLeft: targetScrollLeft,
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
  height: 100%;
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
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  position: relative;
  padding: 0 2rem;
  scroll-behavior: smooth;
}

.books-grid-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 书籍网格 */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  gap: 3rem;
  padding: 1rem 3rem 1rem 3rem;
  height: 100%;
}

/* 书籍卡片样式 */
.book-card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 230px;
  height: 300px;
  margin-left: -30px;
  margin-bottom: -30px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  position: relative;
}

.upload-card:hover {
  /* transform: translateY(-5px); */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

/* 上传卡片样式 */
.upload-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 280px;
  border: 2px dashed #d9d9da;
  /* background-color: #ffffff; */
  box-shadow: none;
  height: 300px;
  width: 230px;
  border-radius: 10px;
}

.upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
}

.upload-icon img {
  width: 150px;
  height: 150px;
}

.upload-text {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 20px;
  color: #1a1a1a;
  font-weight: 700;
}

/* 书籍封面 */
.book-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px);
  opacity: 0.55;
}

.ba {
  background-color: aqua;
}

.book-content {
  position: relative;
  z-index: 2;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 书籍标题 */
.book-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.4;
  margin: 1rem 0 0.5rem 0;
}

/* 分隔线 */
.divider {
  width: 100%;
  height: 5px;
  background-color: #1a1a1a;
  margin-bottom: 0.3rem;
}

/* 书籍描述 */
.book-description {
  font-family: 'Noto Serif SC', serif;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  margin: 0;
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
  bottom: 0px;
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

/* 背景"学"字样式 */
.background-text {
  position: fixed;
  bottom: 30px;
  right: 30px;
  font-family: 'ChillHuoSong_F', sans-serif;
  font-size: 120px;
  color: #eaecf4;
  z-index: -1;
  user-select: none;
  opacity: 0.7;
  pointer-events: none;
}
</style>
