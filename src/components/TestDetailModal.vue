<template>
  <div class="detail-modal-overlay" @click="$emit('close')" v-if="modelValue">
    <div class="detail-modal" @click.stop>
      <!-- Mac 风格按钮 -->
      <div class="mac-buttons">
        <div class="mac-button close" @click="$emit('close')"></div>
        <div class="mac-button minimize"></div>
        <div class="mac-button maximize"></div>
      </div>

      <!-- 标题 -->
      <h1 class="detail-title">{{ testData.title || '计算机视觉综合测试题' }}</h1>

      <!-- 发布时间 -->
      <div class="detail-time">截止时间：{{ testData.endTime || '2023年6月7日 19:18' }}</div>

      <!-- 教师信息 -->
      <div class="detail-creators">
        <div class="creator">
          <img src="@/assets/avatar.png" alt="Teacher" class="creator-avatar" />
          <div class="creator-info">
            <div class="creator-name">李老师</div>
            <div class="creator-role">教授</div>
          </div>
        </div>

        <div class="creator">
          <img src="@/assets/avatar.png" alt="Admin" class="creator-avatar" />
          <div class="creator-info">
            <div class="creator-name">朱泳全</div>
            <div class="creator-role">校长</div>
          </div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="divider"></div>

      <!-- 标签 -->
      <div class="detail-tags">
        <span class="tag">边缘检测</span>
        <span class="tag">OpenCV</span>
        <span class="tag">Pillow</span>
        <span class="tag">Numpy</span>
        <span class="tag">Python</span>
      </div>

      <!-- 内容区域 -->
      <div class="detail-content">
        <div class="rating-section">
          <h2>学生评价</h2>
          <div class="rating-overview">
            <div class="rating-score">
              <div class="big-score">8.7</div>
              <div class="stars">
                <img src="@/assets/icons/wjx_yellow.svg" alt="star" />
                <img src="@/assets/icons/wjx_yellow.svg" alt="star" />
                <img src="@/assets/icons/wjx_yellow.svg" alt="star" />
                <img src="@/assets/icons/wjx_yellow.svg" alt="star" />
                <img src="@/assets/icons/wjx_gray.svg" alt="star" />
              </div>
            </div>
            <div class="rating-bars">
              <div class="rating-bar-item">
                <div class="stars-count">
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                </div>
                <div class="bar-container">
                  <div class="bar" style="width: 70%"></div>
                </div>
              </div>
              <div class="rating-bar-item">
                <div class="stars-count">
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                </div>
                <div class="bar-container">
                  <div class="bar" style="width: 20%"></div>
                </div>
              </div>
              <div class="rating-bar-item">
                <div class="stars-count">
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                </div>
                <div class="bar-container">
                  <div class="bar" style="width: 5%"></div>
                </div>
              </div>
              <div class="rating-bar-item">
                <div class="stars-count">
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                </div>
                <div class="bar-container">
                  <div class="bar" style="width: 3%"></div>
                </div>
              </div>
              <div class="rating-bar-item">
                <div class="stars-count">
                  <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                </div>
                <div class="bar-container">
                  <div class="bar" style="width: 2%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="word-cloud">
          <div class="word-cloud-bg">
            <div class="word">数字李玉生</div>
            <div class="word medium">Design</div>
            <div class="word small">Web</div>
            <div class="word medium">云渲染</div>
            <div class="word small">静炸合成渲染</div>
            <div class="word large">RayData</div>
            <div class="word medium">技术领域</div>
            <div class="word">大数据可视化</div>
            <div class="word small">标准化建模</div>
            <div class="word medium">工业互联网</div>
            <div class="word small">Future</div>
          </div>
        </div>

        <div class="comments-section">
          <h2>评论区</h2>
          <div class="comments">
            <div class="comment">
              <img src="@/assets/avatar.png" alt="User" class="comment-avatar" />
              <div class="comment-content">
                <div class="comment-name">老人小孩都爱吃</div>
                <div class="comment-text">非常好的题目，收获很多</div>
              </div>
            </div>
            <div class="comment">
              <img src="@/assets/avatar.png" alt="User" class="comment-avatar" />
              <div class="comment-content">
                <div class="comment-name">很好的题目</div>
                <div class="comment-text">收获很多，讲解也很清晰</div>
              </div>
            </div>
            <div class="comment">
              <img src="@/assets/avatar.png" alt="User" class="comment-avatar" />
              <div class="comment-content">
                <div class="comment-name">老人小孩都爱吃</div>
                <div class="comment-text">非常好的题目，收获很多</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'

// 定义Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  testData: {
    type: Object,
    default: () => ({
      title: '计算机视觉综合测试题',
      endTime: '2023年6月7日 19:18',
      creator: '张老师',
    }),
  },
})

// 定义Emits
const emit = defineEmits(['close', 'update:modelValue'])

// 监听详情弹窗显示状态变化控制背景滚动
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden' // 禁止背景滚动
    } else {
      document.body.style.overflow = '' // 恢复背景滚动
    }
  },
)

// 监听ESC键退出
const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modelValue) {
    emit('close')
    emit('update:modelValue', false)
  }
}

// 添加和移除ESC键盘事件监听
document.addEventListener('keydown', handleEscKey)
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey)
})
</script>

<style scoped>
/* 详情弹窗样式 */
.detail-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.detail-modal {
  width: 80%;
  max-width: 1200px;
  height: 80vh;
  background-color: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  position: relative;
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

.detail-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 28px;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.detail-time {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: #666;
  margin-bottom: 1.5rem;
}

.detail-creators {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.creator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.creator-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.creator-info {
  font-family: 'Noto Serif SC', serif;
}

.creator-name {
  font-weight: 700;
  font-size: 16px;
}

.creator-role {
  font-size: 14px;
  color: #666;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 1rem 0;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 600;
}

.tag {
  padding: 0.3rem 0.8rem;
  background-color: #f5f5f5;
  border-radius: 20px;
  font-size: 14px;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.rating-section {
  height: 200px;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
}

.word-cloud,
.comments-section {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 1.5rem;
}

.rating-section h2,
.comments-section h2 {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 1rem;
}

.rating-overview {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.rating-score {
  text-align: center;
}

.big-score {
  font-size: 50px;
  font-weight: bolder;
  margin-bottom: 0.5rem;
  line-height: 1;
}

.stars {
  display: flex;
  justify-content: center;
}

.stars img {
  width: 20px;
  height: 20px;
}

.rating-bars {
  flex: 1;
  padding-top: 10px;
}

/* .rating-bar-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.stars-count {
  width: auto;
  display: flex;
  align-items: center;
  gap: 2px;
  margin-right: 10px;
} */

.rating-bar-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.stars-count {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto; /* 关键：将星星推到右侧 */
  margin-right: 10px; /* 保留原有的右侧间距 */
}

.stars-count img {
  width: 15px;
  height: 15px;
}

.bar-container {
  flex: 1;
  background-color: #e0e0e0;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background-color: #fd9a00;
  border-radius: 5px;
}

.word-cloud {
  grid-column: 1 / -1;
}

.word-cloud-bg {
  background-color: #000;
  color: #fff;
  padding: 2rem;
  border-radius: 10px;
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.word {
  color: #4fc3f7;
  font-size: 18px;
}

.word.small {
  font-size: 14px;
  opacity: 0.8;
}

.word.medium {
  font-size: 22px;
  color: #29b6f6;
}

.word.large {
  font-size: 28px;
  font-weight: bold;
  color: #03a9f4;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 200px;
  overflow-y: auto;
}

.comment {
  display: flex;
  gap: 0.75rem;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.comment-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.comment-text {
  color: #333;
}
</style>
