<template>
  <div class="teacher-home">
    <SnowfallBg
      color="1a1a1a"
      class="particles-background"
      :min-radius="0.2"
      :max-radius="2"
      :speed="0.3"
      :quantity="100"
    />
    <!-- 时间和日期部分 -->
    <div class="time-section">
      <h1 class="current-time">{{ currentTime }}</h1>
      <p class="current-date">{{ currentDate }} {{ weatherInfo }}</p>
    </div>

    <!-- 内容区域 -->
    <div class="content-section">
      <!-- 左侧：学生作业完成情况 -->
      <div class="homework-status">
        <h2>学生作业完成情况</h2>
        <div class="homework-cards" ref="homeworkCardsRef" @scroll="handleHomeworkScroll">
          <div
            v-for="(homework, index) in homeworkList"
            :key="index"
            class="homework-card"
            :class="{ completed: homework.completion === '100%' }"
          >
            <h3>{{ homework.title }}</h3>
            <div class="homework-dates">
              <p>发布日期: {{ homework.startDate }}</p>
              <p>截止日期: {{ homework.endDate }}</p>
            </div>
            <div class="progress-bar">
              <div class="progress-filled" :style="{ width: homework.completion }"></div>
            </div>
            <!-- <span class="completion-label">{{ homework.completion }}</span> -->
          </div>
        </div>

        <!-- 页面指示器 -->
        <div class="page-indicator">
          <div
            v-for="(dot, index) in homeworkPageCount"
            :key="index"
            class="indicator-dot"
            :class="{ active: activeHomeworkPage === index }"
            @click="scrollToHomeworkPage(index)"
          ></div>
        </div>
      </div>

      <!-- 右侧：教学日历 -->
      <div class="teaching-calendar">
        <h2>教学日历</h2>
        <div class="calendar-header">
          <!-- 周数显示 -->
          <div class="week-number">
            <span class="week-number-value">15</span>
            <span class="week-label">周</span>
          </div>

          <!-- 星期显示 -->
          <div class="weekdays">
            <div
              v-for="(day, index) in weekDays"
              :key="index"
              class="weekday"
              :class="{ 'current-day': day.isCurrent }"
            >
              <div class="day-name">{{ day.name }}</div>
              <div class="day-date">{{ day.date }}</div>
            </div>
          </div>
        </div>

        <!-- 上午课程 -->
        <div class="schedule-section">
          <div class="time-slots">
            <div class="time-slot" v-for="(slot, index) in morningSlots" :key="index">
              <div class="slot-number">{{ slot.number }}</div>
              <!-- <div class="slot-time">{{ slot.startTime }}<br />{{ slot.endTime }}</div> -->
            </div>
          </div>

          <!-- 课程安排网格 -->
          <div class="class-grid">
            <!-- 这里将根据数据动态显示课程 -->
            <div
              v-for="(course, index) in morningCourses"
              :key="index"
              class="course-block"
              :style="{
                gridColumn: `${course.day + 1}`,
                gridRow: `${course.slot + 1}`,
                backgroundColor: course.bgColor,
              }"
            >
              <div class="course-title">{{ course.title }}</div>
              <div class="course-room">{{ course.room }}</div>
            </div>
          </div>
        </div>

        <!-- 下午课程 -->
        <div class="schedule-section">
          <div class="time-slots">
            <div class="time-slot" v-for="(slot, index) in afternoonSlots" :key="index">
              <div class="slot-number">{{ slot.number }}</div>
              <!-- <div class="slot-time">{{ slot.startTime }}<br />{{ slot.endTime }}</div> -->
            </div>
          </div>

          <!-- 课程安排网格 -->
          <div class="class-grid">
            <!-- 这里将根据数据动态显示课程 -->
            <div
              v-for="(course, index) in afternoonCourses"
              :key="index"
              class="course-block"
              :style="{
                gridColumn: `${course.day + 1}`,
                gridRow: `${course.slot + 1}`,
                backgroundColor: course.bgColor,
              }"
            >
              <div class="course-title">{{ course.title }}</div>
              <div class="course-room">{{ course.room }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { animate } from '@/animejs/lib/anime.esm.js'
import SnowfallBg from '@/components/SnowfallBg.vue'

// 当前时间和日期
const currentTime = ref('23:35')
const currentDate = ref('6月8日周日 多云')
const weatherInfo = ref('多云')

// 更新时间的函数
const updateTime = () => {
  const now = new Date()

  // 更新时间
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`

  // 更新日期
  const month = now.getMonth() + 1
  const date = now.getDate()
  const weekDayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const weekDay = weekDayNames[now.getDay()]
  currentDate.value = `${month}月${date}日${weekDay}`
}

// 定时器引用
let timer: number

// 挂载时启动定时器
onMounted(() => {
  updateTime() // 立即执行一次
  timer = window.setInterval(updateTime, 60000) // 每分钟更新一次
})

// 组件销毁前清除定时器
onBeforeUnmount(() => {
  clearInterval(timer)
})

// 学生作业列表
const homeworkList = ref([
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '78%',
  },
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '78%',
  },
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '100%',
  },
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '78%',
  },
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '78%',
  },
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '78%',
  },
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '78%',
  },
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '78%',
  },
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '78%',
  },
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '78%',
  },
  {
    title: '综合测试1',
    startDate: '2025.6.4 18:40',
    endDate: '2025.6.9 23:59',
    completion: '78%',
  },
])

// 作业页面指示器相关
const homeworkCardsRef = ref<HTMLElement | null>(null)
const activeHomeworkPage = ref(0)
const homeworkPageCount = ref(2)

// 计算作业页面指示器点数
const calculateHomeworkPageCount = () => {
  if (!homeworkCardsRef.value) return

  // 获取作业卡片数量
  const cards = homeworkList.value.length
  // 每页显示的卡片数量 (根据高度和每个卡片高度估算)
  const cardsPerPage = 2
  // 计算总页数
  homeworkPageCount.value = Math.ceil(cards / cardsPerPage)
}

// 处理作业区域滚动事件
const handleHomeworkScroll = () => {
  if (!homeworkCardsRef.value) return

  const scrollTop = homeworkCardsRef.value.scrollTop
  const scrollHeight = homeworkCardsRef.value.scrollHeight
  const clientHeight = homeworkCardsRef.value.clientHeight

  // 计算滚动百分比
  const scrollPercentage = scrollTop / (scrollHeight - clientHeight)

  // 根据滚动百分比确定当前页
  const newActivePage = Math.min(
    Math.floor(scrollPercentage * homeworkPageCount.value),
    homeworkPageCount.value - 1,
  )

  // 只有在页面变化时才更新
  if (newActivePage !== activeHomeworkPage.value) {
    activeHomeworkPage.value = newActivePage
  }
}

// 点击指示器滚动到对应作业页面
const scrollToHomeworkPage = (index: number) => {
  if (!homeworkCardsRef.value) return

  const scrollHeight = homeworkCardsRef.value.scrollHeight
  const clientHeight = homeworkCardsRef.value.clientHeight

  // 分页滚动计算
  const pageHeight = (scrollHeight - clientHeight) / (homeworkPageCount.value - 1)
  const targetScrollTop = Math.min(index * pageHeight, scrollHeight - clientHeight)

  // 更新激活页
  activeHomeworkPage.value = index

  // 使用动画平滑滚动
  animate(homeworkCardsRef.value, {
    scrollTop: targetScrollTop,
    duration: 600,
    easing: 'easeInOutQuad',
    complete: () => {
      // 滚动完成后确保页面指示正确
      handleHomeworkScroll()
    },
  })
}

// 星期与日期信息
const weekDays = ref<{ name: string; date: string; isCurrent: boolean }[]>([])

// 生成本周日期
const generateWeekDays = () => {
  const today = new Date()
  const currentDay = today.getDay() // 0是周日，1是周一，以此类推

  // 计算本周一的日期（如果今天是周日，则需要往前推6天）
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay
  const monday = new Date(today)
  monday.setDate(today.getDate() + mondayOffset)

  const weekDayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const result = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)

    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedDate = `${month}.${day}`

    // 检查是否为今天
    const isToday = date.toDateString() === today.toDateString()

    result.push({
      name: weekDayNames[i],
      date: formattedDate,
      isCurrent: isToday,
    })
  }

  weekDays.value = result
}

// 上午时间段
const morningSlots = ref([
  { number: '1', startTime: '08:00', endTime: '08:45' },
  { number: '2', startTime: '08:00', endTime: '08:45' },
  { number: '3', startTime: '08:00', endTime: '08:45' },
  { number: '4', startTime: '08:00', endTime: '08:45' },
])

// 下午时间段
const afternoonSlots = ref([
  { number: '1', startTime: '08:00', endTime: '08:45' },
  { number: '2', startTime: '08:00', endTime: '08:45' },
  { number: '3', startTime: '08:00', endTime: '08:45' },
  { number: '4', startTime: '08:00', endTime: '08:45' },
])

// 上午课程
const morningCourses = ref([
  { day: 1, slot: 1, title: 'Java程序设计', room: '12-314', bgColor: '#e2e3f1' },
  { day: 2, slot: 0, title: 'Java程序设计', room: '12-314', bgColor: '#e2e3f1' },
])

// 下午课程
const afternoonCourses = ref([
  { day: 4, slot: 0, title: 'Python程序设计', room: '12-314', bgColor: '#f2e6db' },
  { day: 2, slot: 1, title: 'Java程序设计', room: '12-314', bgColor: '#e2e3f1' },
])

onMounted(() => {
  // 初始化
  nextTick(() => {
    calculateHomeworkPageCount()
  })

  // 生成真实日期信息
  generateWeekDays()

  // 监听窗口大小变化
  window.addEventListener('resize', calculateHomeworkPageCount)
})

onBeforeUnmount(() => {
  // 移除事件监听
  window.removeEventListener('resize', calculateHomeworkPageCount)
})
</script>

<style scoped>
.teacher-home {
  /* padding: 2rem; */
  background-color: #f5f7fa;
  height: calc(100vh - 72px);
}

.particles-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

/* 时间和日期样式 */
.time-section {
  text-align: center;
  margin-bottom: 0rem;
  margin-top: 0;
  z-index: 10;
}

.current-time {
  font-family: 'Noto Serif SC', serif;
  font-size: 85px;
  font-weight: bolder;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.2;
}

.current-date {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 25px;
  font-weight: 300;
  color: #1a1a1a;
  margin: 0;
  z-index: 10;
}

.content-section {
  display: flex;
  gap: 2rem;
  margin: 4vh auto 1rem auto; /* 上边距 2rem，左右自动（居中） */
  width: 75vw;
  max-width: 1500px;
  justify-content: space-between;
}

/* 左侧：作业完成情况 */
.homework-status {
  /* flex: 1; */
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem 2rem 2rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 40vw;
  max-width: 750px;
  position: relative; /* 添加相对定位用于绝对定位子元素 */
  height: 68vh;
  max-height: 700px;
}

.homework-status h2 {
  font-family: 'Noto Serif SC', serif;
  font-size: 35px;
  margin-bottom: 1rem;
  font-weight: 650;
  margin-left: -15px;
  color: #1a1a1a;
}

.homework-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  height: 52vh; /* 设置固定高度 */
  max-height: 550px;
  overflow-y: auto; /* 添加垂直滚动 */
  padding-right: 2rem; /* 为页面指示器腾出空间 */
  /* border-radius: 20px; */

  /* 隐藏滚动条但保留滚动功能 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.homework-cards::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.homework-card {
  border-radius: 20px;
  padding: 0.5rem 1rem;
  background-color: #e9efef;
  position: relative;
  height: 100%;
}

.homework-card.completed {
  background-color: #ffffff;
}

.homework-card h3 {
  font-family: 'Noto Serif SC', serif;
  font-size: 25px;
  font-weight: 550;
  margin: 0 0 0.3rem;
  color: #1a1a1a;
  margin-bottom: -3px;
}

.homework-dates {
  font-size: 15px;
  color: #666;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 550;
  margin-bottom: 1rem;
}

.homework-dates p {
  margin: 0rem 0;
  font-size: 14px;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 400;
}

.progress-bar {
  height: 8px;
  background-color: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-bottom: 0.5rem;
  margin-top: -0.5rem;
}

.progress-filled {
  height: 100%;
  background-color: #1a1a1a;
  border-radius: 4px;
}

.completion-label {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  font-weight: bold;
  color: #1a1a1a;
}

/* 页面指示器样式 */
.page-indicator {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 10;
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

/* 右侧：教学日历 */
.teaching-calendar {
  /* flex: 1; */
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1rem 2rem 2rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 40vw;
  max-width: 750px;
  position: relative; /* 添加相对定位用于绝对定位子元素 */
  height: 68vh;
  max-height: 700px;
}
.teaching-calendar h2 {
  font-family: 'Noto Serof SC', serif;
  font-size: 35px;
  margin-bottom: 0.7rem;
  font-weight: 650;
  margin-left: -15px;
  color: #1a1a1a;
}

.calendar-header {
  display: flex;
  align-items: flex-start;
  /* margin-bottom: 1rem; */
}

.week-number {
  position: relative;
  border: 1px solid #d9d9da;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin-right: 8px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
}

.week-number-value {
  font-family: 'HYXinRenWenSongW', serif;
  font-size: 27px;
  font-weight: normal;
  margin-left: -3px;
}

.week-label {
  font-family: 'Noto Serif SC', serif;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.weekdays {
  display: flex;
  flex: 1;
  justify-content: space-around; /* 水平均匀分布 */
  align-items: center; /* 垂直居中 */
  border: 1px solid #d9d9da;
  border-radius: 8px;
  height: 60px;
  padding-top: 10px;
  /* padding: 5px; */
}

.weekday {
  /* flex: 1; */
  text-align: center;
  /* padding: 0.5rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  width: 60px;
  height: 55px;
}

.current-day {
  background-color: #1a1a1a;
  color: #ffffff;
  height: 50px;
  margin-bottom: 10px;
}

.day-name {
  font-family: 'Noto Serif SC', serif;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: -3px;
}

.day-date {
  font-family: 'Swei Spring Sugar CJKtc', serif;
  font-size: 15px;
  font-weight: 550;
}

/* 课程表部分 */
.schedule-section {
  display: flex;
  margin-top: 8px;
  /* border: 1px solid #d9d9da; */
  /* border-radius: 8px; */
  overflow: hidden;
  height: 37%;
}

.time-slots {
  width: 60px;
  /* background-color: #f5f7fa; */
  border: 1px solid #d9d9da;
  border-radius: 10px;
  /* padding: 10px; */
}

.time-slot {
  /* height: 80px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border-bottom: 1px solid #d9d9da; */
  height: 25%;
}

.time-slot:last-child {
  border-bottom: none;
}

.slot-number {
  font-family: 'HYXinRenWenSongW', serif;
  font-size: 20px;
  font-weight: 500;
}

.slot-time {
  font-size: 10px;
  text-align: center;
  color: #666;
  line-height: 1;
  margin-top: -5px;
}

.class-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7列等宽 */
  grid-template-rows: repeat(2, 50%); /* 每行高度=5.625vh */
  gap: 1px;
  border-radius: 10px;
  border: 1px solid #d9d9da;
  margin-left: 8px;
  overflow: hidden; /* 确保圆角效果不被内部元素破坏 */
  /* padding-top: 10px;
  padding-bottom: 10px; */
}

.course-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* This will push first and last items to opposite ends */
  align-items: center;
  border-radius: 4px;
  height: 90%;
  width: 80%;
  margin: auto;
  padding: 0 5px;
}

.course-title {
  font-size: 12px;
  font-weight: 550;
  font-family: 'Noto Sans SC', sans-serif;
  margin-top: 0.5rem;
  /* Three-line text truncation with ellipsis */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  /* text-align: center; Center the text */
  line-height: 1.2; /* Adjust line height for better appearance */
  max-height: calc(3 * 1.2em); /* Fallback for non-WebKit browsers */
}

.course-room {
  font-size: 12px;
  color: #666;
  margin-bottom: 0.5rem; /* Add some space at the bottom */
  margin-left: -4px;
}
</style>
