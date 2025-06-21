<template>
  <div class="detail-modal-overlay" @click="$emit('close')" v-if="modelValue">
    <div class="detail-modal" @click.stop>
      <!-- Mac 风格按钮 -->
      <div class="mac-buttons">
        <div class="mac-button close" @click="$emit('close')"></div>
        <div class="mac-button minimize" @click="minimizeModal"></div>
        <div class="mac-button maximize" @click="maximizeModal"></div>
      </div>

      <!-- 答题页面 -->
      <div v-if="showAnswerPage" class="answer-page-container">
        <AnswerPage :testData="testData" @submitTest="handleSubmitTest" />
      </div>

      <!-- 测试详情页面 -->
      <div v-else>
        <!-- 开始答题按钮 -->
        <div class="start-answer-container">
          <button class="start-answer-btn" @click="startAnswer">开始答题</button>
        </div>

        <!-- 标题 -->
        <h1 class="detail-title">{{ testData.title || '计算机视觉综合测试题' }}</h1>

        <!-- 发布时间 -->
        <div class="detail-time">截止时间：{{ testData.endTime || '2023年6月7日 19:18' }}</div>

        <!-- 教师信息 -->
        <div class="detail-creators">
          <div class="creator">
            <img src="/src/assets/avatar.png" alt="Teacher" class="creator-avatar" />
            <div class="creator-info">
              <div class="creator-name">李老师</div>
              <div class="creator-role">教授</div>
            </div>
          </div>

          <div class="creator">
            <img src="/src/assets/avatar.png" alt="Admin" class="creator-avatar" />
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
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" class="transparent" />
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
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" class="transparent" />
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" class="transparent" />
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
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" class="transparent" />
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" class="transparent" />
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" class="transparent" />
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" />
                  </div>
                  <div class="bar-container">
                    <div class="bar" style="width: 3%"></div>
                  </div>
                </div>
                <div class="rating-bar-item">
                  <div class="stars-count">
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" class="transparent" />
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" class="transparent" />
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" class="transparent" />
                    <img src="@/assets/icons/wjx_small_gray.svg" alt="star" class="transparent" />
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
            <div id="wordcloud-container"></div>
            <div class="zoom-controls">
              <button class="zoom-btn" @click="zoomInWordCloud" title="放大">+</button>
              <button class="zoom-btn" @click="zoomOutWordCloud" title="缩小">-</button>
            </div>
          </div>

          <div class="comments-section">
            <div class="comments">
              <div class="comment" v-for="(comment, index) in commentData" :key="index">
                <img :src="comment.avatar" alt="User" class="comment-avatar" />
                <div class="comment-wrapper">
                  <div class="comment-header">
                    <div class="comment-user-info">
                      <div class="comment-name">{{ comment.userName }}</div>
                      <div class="comment-time">{{ formatRelativeTime(comment.timestamp) }}</div>
                    </div>
                    <div class="comment-actions">
                      <div class="comment-more">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                  <div class="comment-content">
                    <div class="comment-text">{{ comment.text }}</div>
                  </div>
                  <div class="comment-footer">
                    <div class="comment-like">
                      <img src="@/assets/icons/like.svg" alt="like" class="footer-icon" />
                      <span>{{ comment.likes }}</span>
                    </div>
                    <div class="comment-reply">
                      <img src="@/assets/icons/reply.svg" alt="reply" class="footer-icon" />
                      <span>回复</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount, onMounted, ref } from 'vue'
import { Chart } from '@antv/g2'
import AnswerPage from './AnswerPage.vue'

// 相对时间格式化函数
const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now()
  const diff = now - timestamp

  // 转换为秒、分钟、小时、天
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  // 根据时间差返回不同格式
  if (seconds < 60) {
    return '刚刚'
  } else if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days < 30) {
    return `${days}天前`
  } else {
    // 日期格式化
    const date = new Date(timestamp)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }
}

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
const emit = defineEmits(['close', 'update:modelValue', 'startAnswer'])

// 答题页面显示控制
const showAnswerPage = ref(false)

// 开始答题
const startAnswer = () => {
  showAnswerPage.value = true
}

// 处理答题提交
const handleSubmitTest = (result: any) => {
  console.log('测试已提交:', result)
  showAnswerPage.value = false
  emit('close')
}

// 评论数据 - 使用时间戳
const commentData = ref([
  {
    avatar: '/src/assets/avatar.png',
    userName: '学生一号',
    timestamp: Date.now() - 1000 * 60 * 3, // 3分钟前
    text: '非常好的题目，收获很多',
    likes: 12,
  },
  {
    avatar: '/src/assets/avatar.png',
    userName: '学生二号',
    timestamp: Date.now() - 1000 * 60 * 15, // 15分钟前
    text: '讲解清晰，内容丰富，非常感谢老师的详细讲解',
    likes: 8,
  },
  {
    avatar: '/src/assets/avatar.png',
    userName: '学生三号',
    timestamp: Date.now() - 1000 * 60 * 60, // 1小时前
    text: '这次测试难度适中，学到了很多边缘检测的知识',
    likes: 5,
  },
  {
    avatar: '/src/assets/avatar.png',
    userName: '学生四号',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2小时前
    text: '非常有收获，希望能有更多这样的学习机会',
    likes: 3,
  },
  {
    avatar: '/src/assets/avatar.png',
    userName: '学生五号',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 昨天
    text: '题目设计得很好，让我对计算机视觉有了更深入的理解',
    likes: 10,
  },
])

// 词云数据
const wordCloudData = [
  { value: 20.0, text: '适合' },
  { value: 17.0, text: '但' },
  { value: 17.0, text: '缺点' },
  { value: 11.0, text: '款' },
  { value: 11.0, text: '使用' },
  { value: 10.0, text: '效果' },
  { value: 9.0, text: '不' },
  { value: 6.0, text: '好' },
  { value: 6.0, text: '价格' },
  { value: 5.0, text: '表现' },
  { value: 5.0, text: '需要' },
  { value: 5.0, text: '环境' },
  { value: 5.0, text: '体验' },
  { value: 4.0, text: '系统' },
  { value: 4.0, text: '一般' },
  { value: 4.0, text: '不错' },
  { value: 4.0, text: '设计' },
  { value: 3.0, text: '清晰' },
  { value: 3.0, text: '高' },
  { value: 3.0, text: '质量' },
  { value: 3.0, text: '部分' },
  { value: 3.0, text: '喜欢' },
  { value: 3.0, text: '这款' },
  { value: 3.0, text: '会' },
  { value: 3.0, text: '设施' },
  { value: 3.0, text: '得' },
  { value: 3.0, text: '清洁' },
  { value: 3.0, text: '建议' },
  { value: 3.0, text: '后' },
  { value: 3.0, text: '这家' },
  { value: 3.0, text: '特别' },
  { value: 3.0, text: '日常' },
  { value: 3.0, text: '舒适' },
  { value: 3.0, text: '容量' },
  { value: 2.0, text: '出色' },
  { value: 2.0, text: '不足' },
  { value: 2.0, text: '流畅' },
  { value: 2.0, text: '度' },
  { value: 2.0, text: '续航' },
  { value: 2.0, text: '一天' },
  { value: 2.0, text: '总体' },
  { value: 2.0, text: '来说' },
  { value: 2.0, text: '性价比' },
  { value: 2.0, text: '食材' },
  { value: 2.0, text: '这部' },
  { value: 2.0, text: '剧情' },
  { value: 2.0, text: '演员' },
  { value: 2.0, text: '到位' },
  { value: 2.0, text: '场景' },
  { value: 2.0, text: '推荐' },
  { value: 2.0, text: '给' },
  { value: 2.0, text: '有些' },
  { value: 2.0, text: '完全' },
  { value: 2.0, text: '整体' },
  { value: 2.0, text: '值得' },
  { value: 2.0, text: '佩戴' },
  { value: 2.0, text: '隔音' },
  { value: 2.0, text: '整洁' },
  { value: 2.0, text: '噪音' },
  { value: 2.0, text: '多' },
  { value: 2.0, text: '性能' },
  { value: 2.0, text: '处理' },
  { value: 2.0, text: '用户' },
  { value: 2.0, text: '维护' },
  { value: 2.0, text: '大' },
  { value: 2.0, text: '放松' },
  { value: 2.0, text: '数量' },
  { value: 2.0, text: '及时' },
  { value: 2.0, text: '周末' },
  { value: 2.0, text: '香味' },
  { value: 2.0, text: '较' },
  { value: 2.0, text: '小贵' },
  { value: 2.0, text: '口感' },
  { value: 2.0, text: '种类' },
  { value: 2.0, text: '速度' },
  { value: 2.0, text: '很快' },
  { value: 2.0, text: '运动' },
  { value: 2.0, text: '专业' },
  { value: 2.0, text: '排队' },
  { value: 2.0, text: '适中' },
  { value: 2.0, text: '干净' },
  { value: 2.0, text: '油腻' },
  { value: 2.0, text: '智能' },
  { value: 2.0, text: '功能' },
  { value: 2.0, text: '健康' },
  { value: 2.0, text: '商品' },
  { value: 2.0, text: '方便' },
  { value: 2.0, text: '合理' },
  { value: 2.0, text: '长时间' },
  { value: 2.0, text: '通勤' },
  { value: 2.0, text: '丰富' },
  { value: 2.0, text: '带' },
  { value: 2.0, text: '孩子' },
  { value: 2.0, text: '偏小' },
  { value: 2.0, text: '办公' },
  { value: 2.0, text: '明显' },
  { value: 1.0, text: '手机' },
  { value: 1.0, text: '屏幕显示' },
  { value: 1.0, text: '色彩鲜艳' },
  { value: 1.0, text: '且' },
  { value: 1.0, text: '细节' },
  { value: 1.0, text: '强光' },
  { value: 1.0, text: '下' },
  { value: 1.0, text: '可视性' },
  { value: 1.0, text: '稍显' },
  { value: 1.0, text: '不过' },
  { value: 1.0, text: '电池' },
  { value: 1.0, text: '重度' },
  { value: 1.0, text: '两充' },
  { value: 1.0, text: '还是' },
  { value: 1.0, text: '餐厅' },
  { value: 1.0, text: '优雅' },
  { value: 1.0, text: '服务态度' },
  { value: 1.0, text: '周到' },
  { value: 1.0, text: '菜品' },
  { value: 1.0, text: '口味' },
  { value: 1.0, text: '偏重' },
  { value: 1.0, text: '清淡' },
  { value: 1.0, text: '饮食' },
  { value: 1.0, text: '顾客' },
  { value: 1.0, text: '方面' },
  { value: 1.0, text: '略' },
  { value: 1.0, text: '考虑' },
  { value: 1.0, text: '到' },
  { value: 1.0, text: '用餐' },
  { value: 1.0, text: '算' },
  { value: 1.0, text: '物有所值' },
  { value: 1.0, text: '电影' },
  { value: 1.0, text: '巧妙' },
  { value: 1.0, text: '反转' },
  { value: 1.0, text: '令人' },
  { value: 1.0, text: '意想不到' },
  { value: 1.0, text: '表演' },
  { value: 1.0, text: '后期' },
  { value: 1.0, text: '节奏' },
  { value: 1.0, text: '稍慢' },
  { value: 1.0, text: '拖沓' },
  { value: 1.0, text: '悬疑' },
  { value: 1.0, text: '题材' },
  { value: 1.0, text: '观众' },
  { value: 1.0, text: '这本' },
  { value: 1.0, text: '小说' },
  { value: 1.0, text: '文笔' },
  { value: 1.0, text: '细腻' },
  { value: 1.0, text: '人物' },
  { value: 1.0, text: '刻画' },
  { value: 1.0, text: '深刻' },
  { value: 1.0, text: '尤其' },
  { value: 1.0, text: '主角' },
  { value: 1.0, text: '心理' },
  { value: 1.0, text: '描写' },
  { value: 1.0, text: '真实' },
  { value: 1.0, text: '结局' },
  { value: 1.0, text: '略显' },
  { value: 1.0, text: '仓促' },
  { value: 1.0, text: '伏笔' },
  { value: 1.0, text: '展开' },
  { value: 1.0, text: '一读' },
  { value: 1.0, text: '耳机' },
  { value: 1.0, text: '音质' },
  { value: 1.0, text: '超出' },
  { value: 1.0, text: '预期' },
  { value: 1.0, text: '低音' },
  { value: 1.0, text: '浑厚' },
  { value: 1.0, text: '高音' },
  { value: 1.0, text: '舒适度' },
  { value: 1.0, text: '嘈杂' },
  { value: 1.0, text: '中' },
  { value: 1.0, text: '打折扣' },
  { value: 1.0, text: '酒店' },
  { value: 1.0, text: '新' },
  { value: 1.0, text: '房间' },
  { value: 1.0, text: '宽敞' },
  { value: 1.0, text: '较差' },
  { value: 1.0, text: '晚上' },
  { value: 1.0, text: '能' },
  { value: 1.0, text: '听到' },
  { value: 1.0, text: '走廊' },
  { value: 1.0, text: '位置' },
  { value: 1.0, text: '交通' },
  { value: 1.0, text: '便利' },
  { value: 1.0, text: '周边' },
  { value: 1.0, text: '餐饮' },
  { value: 1.0, text: '选择' },
  { value: 1.0, text: '商务' },
  { value: 1.0, text: '短住' },
  { value: 1.0, text: '笔记本电脑' },
  { value: 1.0, text: '强劲' },
  { value: 1.0, text: '多任务' },
  { value: 1.0, text: '毫无' },
  { value: 1.0, text: '压力' },
  { value: 1.0, text: '散热' },
  { value: 1.0, text: '屏幕' },
  { value: 1.0, text: '亮度' },
  { value: 1.0, text: '偏低' },
  { value: 1.0, text: '户外' },
  { value: 1.0, text: '吃力' },
  { value: 1.0, text: '追求' },
  { value: 1.0, text: '公园' },
  { value: 1.0, text: '绿化' },
  { value: 1.0, text: '面积' },
  { value: 1.0, text: '散步' },
  { value: 1.0, text: '公共' },
  { value: 1.0, text: '卫生间' },
  { value: 1.0, text: '少且' },
  { value: 1.0, text: '人流量' },
  { value: 1.0, text: '错峰' },
  { value: 1.0, text: '前往' },
  { value: 1.0, text: '护肤品' },
  { value: 1.0, text: '保湿' },
  { value: 1.0, text: '非常明显' },
  { value: 1.0, text: '皮肤' },
  { value: 1.0, text: '水润' },
  { value: 1.0, text: '弹性' },
  { value: 1.0, text: '浓' },
  { value: 1.0, text: '敏感' },
  { value: 1.0, text: '肌' },
  { value: 1.0, text: '对得起' },
  { value: 1.0, text: '价位' },
  { value: 1.0, text: '咖啡店' },
  { value: 1.0, text: '拿' },
  { value: 1.0, text: '铁' },
  { value: 1.0, text: '醇厚' },
  { value: 1.0, text: '咖啡豆' },
  { value: 1.0, text: '品质' },
  { value: 1.0, text: '甜品' },
  { value: 1.0, text: '偏少' },
  { value: 1.0, text: '店内' },
  { value: 1.0, text: '装修' },
  { value: 1.0, text: '格调' },
  { value: 1.0, text: '拍照' },
  { value: 1.0, text: '打卡' },
  { value: 1.0, text: '略高于' },
  { value: 1.0, text: '连锁' },
  { value: 1.0, text: '品牌' },
  { value: 1.0, text: '相机' },
  { value: 1.0, text: '对焦' },
  { value: 1.0, text: '成像' },
  { value: 1.0, text: '拍摄' },
  { value: 1.0, text: '菜单' },
  { value: 1.0, text: '复杂' },
  { value: 1.0, text: '新手' },
  { value: 1.0, text: '适应' },
  { value: 1.0, text: '健身房' },
  { value: 1.0, text: '设备齐全' },
  { value: 1.0, text: '教练' },
  { value: 1.0, text: '负责' },
  { value: 1.0, text: '高峰' },
  { value: 1.0, text: '时段' },
  { value: 1.0, text: '人太多' },
  { value: 1.0, text: '会员' },
  { value: 1.0, text: '规律' },
  { value: 1.0, text: '锻炼' },
  { value: 1.0, text: '习惯' },
  { value: 1.0, text: '人' },
  { value: 1.0, text: '洗发水' },
  { value: 1.0, text: '去' },
  { value: 1.0, text: '油' },
  { value: 1.0, text: '洗完' },
  { value: 1.0, text: '头发' },
  { value: 1.0, text: '蓬松' },
  { value: 1.0, text: '持久' },
  { value: 1.0, text: '短' },
  { value: 1.0, text: '控油' },
  { value: 1.0, text: '只能' },
  { value: 1.0, text: '维持' },
  { value: 1.0, text: '左右' },
  { value: 1.0, text: '油性' },
  { value: 1.0, text: '发质' },
  { value: 1.0, text: '旅游景点' },
  { value: 1.0, text: '自然风光' },
  { value: 1.0, text: '很美' },
  { value: 1.0, text: '配套' },
  { value: 1.0, text: '不够' },
  { value: 1.0, text: '完善' },
  { value: 1.0, text: '上山' },
  { value: 1.0, text: '路程' },
  { value: 1.0, text: '陡' },
  { value: 1.0, text: '穿着' },
  { value: 1.0, text: '鞋子' },
  { value: 1.0, text: '并' },
  { value: 1.0, text: '自备' },
  { value: 1.0, text: '饮水' },
  { value: 1.0, text: '徒步' },
  { value: 1.0, text: '游客' },
  { value: 1.0, text: '手表' },
  { value: 1.0, text: '全面' },
  { value: 1.0, text: '监测数据' },
  { value: 1.0, text: '准确' },
  { value: 1.0, text: '优秀' },
  { value: 1.0, text: '表盘' },
  { value: 1.0, text: '偏' },
  { value: 1.0, text: '风不太' },
  { value: 1.0, text: '正式' },
  { value: 1.0, text: '场合' },
  { value: 1.0, text: '快递' },
  { value: 1.0, text: '配送' },
  { value: 1.0, text: '包装' },
  { value: 1.0, text: '完好无损' },
  { value: 1.0, text: '实物' },
  { value: 1.0, text: '网页' },
  { value: 1.0, text: '图片' },
  { value: 1.0, text: '存在' },
  { value: 1.0, text: '色差' },
  { value: 1.0, text: '退换货' },
  { value: 1.0, text: '流程' },
  { value: 1.0, text: '客服' },
  { value: 1.0, text: '响应' },
  { value: 1.0, text: '购物' },
  { value: 1.0, text: '良好' },
  { value: 1.0, text: '电视剧' },
  { value: 1.0, text: '服装道具' },
  { value: 1.0, text: '考究' },
  { value: 1.0, text: '历史' },
  { value: 1.0, text: '还原' },
  { value: 1.0, text: '度高' },
  { value: 1.0, text: '某些' },
  { value: 1.0, text: '改编' },
  { value: 1.0, text: '偏离' },
  { value: 1.0, text: '原著' },
  { value: 1.0, text: '演技' },
  { value: 1.0, text: '在线' },
  { value: 1.0, text: '配角' },
  { value: 1.0, text: '亮眼' },
  { value: 1.0, text: '值得一看' },
  { value: 1.0, text: '背包' },
  { value: 1.0, text: '收纳' },
  { value: 1.0, text: '人性化' },
  { value: 1.0, text: '大且' },
  { value: 1.0, text: '分区' },
  { value: 1.0, text: '肩带' },
  { value: 1.0, text: '填充物' },
  { value: 1.0, text: '偏薄' },
  { value: 1.0, text: '背负' },
  { value: 1.0, text: '舒服' },
  { value: 1.0, text: '短途' },
  { value: 1.0, text: '博物馆' },
  { value: 1.0, text: '展品' },
  { value: 1.0, text: '讲解' },
  { value: 1.0, text: '展区' },
  { value: 1.0, text: '灯光' },
  { value: 1.0, text: '太暗' },
  { value: 1.0, text: '影响' },
  { value: 1.0, text: '观赏' },
  { value: 1.0, text: '门票价格' },
  { value: 1.0, text: '亲子' },
  { value: 1.0, text: '互动' },
  { value: 1.0, text: '活动' },
  { value: 1.0, text: '参观' },
  { value: 1.0, text: '扫地' },
  { value: 1.0, text: '机器人' },
  { value: 1.0, text: '效率' },
  { value: 1.0, text: '地毯' },
  { value: 1.0, text: '区域' },
  { value: 1.0, text: '较大' },
  { value: 1.0, text: '夜间' },
  { value: 1.0, text: '智能化' },
  { value: 1.0, text: '程度' },
  { value: 1.0, text: '令人满意' },
  { value: 1.0, text: '甜品店' },
  { value: 1.0, text: '提拉' },
  { value: 1.0, text: '米苏' },
  { value: 1.0, text: '层次' },
  { value: 1.0, text: '咖啡' },
  { value: 1.0, text: '酒味' },
  { value: 1.0, text: '恰到好处' },
  { value: 1.0, text: '分量' },
  { value: 1.0, text: '偏高' },
  { value: 1.0, text: '安静' },
  { value: 1.0, text: '朋友' },
  { value: 1.0, text: '小聚' },
  { value: 1.0, text: '聊天' },
  { value: 1.0, text: '钢笔' },
  { value: 1.0, text: '书写' },
  { value: 1.0, text: '刮' },
  { value: 1.0, text: '纸握' },
  { value: 1.0, text: '感' },
  { value: 1.0, text: '墨水' },
  { value: 1.0, text: '小' },
  { value: 1.0, text: '频繁' },
  { value: 1.0, text: '加墨' },
  { value: 1.0, text: '记录' },
  { value: 1.0, text: '音乐节' },
  { value: 1.0, text: '舞台效果' },
  { value: 1.0, text: '震撼' },
  { value: 1.0, text: '艺人' },
  { value: 1.0, text: '阵容强大' },
  { value: 1.0, text: '场内' },
  { value: 1.0, text: '移动' },
  { value: 1.0, text: '厕所' },
  { value: 1.0, text: '自带' },
  { value: 1.0, text: '便携' },
  { value: 1.0, text: '座椅' },
  { value: 1.0, text: '氛围' },
  { value: 1.0, text: '很棒' },
  { value: 1.0, text: '枕头' },
  { value: 1.0, text: '对' },
  { value: 1.0, text: '颈椎' },
  { value: 1.0, text: '支撑' },
  { value: 1.0, text: '睡醒' },
  { value: 1.0, text: '肩颈' },
  { value: 1.0, text: '面料' },
  { value: 1.0, text: '夏天' },
  { value: 1.0, text: '稍' },
  { value: 1.0, text: '闷热' },
  { value: 1.0, text: '睡眠' },
  { value: 1.0, text: '提升' },
  { value: 1.0, text: '网购' },
  { value: 1.0, text: '平台' },
  { value: 1.0, text: '搜索' },
  { value: 1.0, text: '精准' },
  { value: 1.0, text: '分类' },
  { value: 1.0, text: '商家' },
  { value: 1.0, text: '发货' },
  { value: 1.0, text: '速度慢' },
  { value: 1.0, text: '退货' },
  { value: 1.0, text: '政策' },
  { value: 1.0, text: '宽松' },
  { value: 1.0, text: '支付' },
  { value: 1.0, text: '方式' },
  { value: 1.0, text: '多样' },
  { value: 1.0, text: '防晒霜' },
  { value: 1.0, text: '质地' },
  { value: 1.0, text: '轻薄' },
  { value: 1.0, text: '防晒' },
  { value: 1.0, text: '经' },
  { value: 1.0, text: '实测' },
  { value: 1.0, text: '可靠' },
  { value: 1.0, text: '防水' },
  { value: 1.0, text: '性' },
  { value: 1.0, text: '出汗' },
  { value: 1.0, text: '补涂' },
  { value: 1.0, text: '游乐场' },
  { value: 1.0, text: '安全措施' },
  { value: 1.0, text: '节假日' },
  { value: 1.0, text: '过长' },
  { value: 1.0, text: '购买' },
  { value: 1.0, text: '快速' },
  { value: 1.0, text: '通行证' },
  { value: 1.0, text: '玩得' },
  { value: 1.0, text: '开心' },
  { value: 1.0, text: '无线' },
  { value: 1.0, text: '鼠标' },
  { value: 1.0, text: '反应' },
  { value: 1.0, text: '灵敏' },
  { value: 1.0, text: '人体工学' },
  { value: 1.0, text: '握感' },
  { value: 1.0, text: '静音' },
  { value: 1.0, text: '滚轮' },
  { value: 1.0, text: '偶尔' },
  { value: 1.0, text: '会卡顿' },
  { value: 1.0, text: '足够' },
  { value: 1.0, text: '火锅店' },
  { value: 1.0, text: '汤底' },
  { value: 1.0, text: '味道' },
  { value: 1.0, text: '正宗' },
  { value: 1.0, text: '新鲜' },
  { value: 1.0, text: '通风' },
  { value: 1.0, text: '不好' },
  { value: 1.0, text: '衣服' },
  { value: 1.0, text: '容易' },
  { value: 1.0, text: '留味' },
  { value: 1.0, text: '服务' },
  { value: 1.0, text: '热情周到' },
  { value: 1.0, text: '人均' },
  { value: 1.0, text: '消费' },
  { value: 1.0, text: '空气' },
  { value: 1.0, text: '炸锅' },
  { value: 1.0, text: '操作' },
  { value: 1.0, text: '简单' },
  { value: 1.0, text: '烹饪' },
  { value: 1.0, text: '接近' },
  { value: 1.0, text: '油炸' },
  { value: 1.0, text: '大家庭' },
  { value: 1.0, text: '懒人' },
]

// 词云缩放相关
const zoomLevel = ref(1)
const maxZoom = 1.5
const minZoom = 0.7
const currentChart = ref<any>(null)

// 初始化词云图
const initWordCloud = () => {
  if (typeof window !== 'undefined') {
    const chart = new Chart({
      container: 'wordcloud-container',
      autoFit: true,
      paddingTop: 20,
      height: 230,
    })

    chart
      .wordCloud()
      .data(wordCloudData)
      .layout({
        spiral: 'rectangular',
        fontSize: [16, 50],
        // padding: 2,
        ratio: zoomLevel.value, // 控制词云的缩放比例
      })
      .style('fill', '#03a9f4')
      .tooltip(false) // 禁用hover提示

    chart.render()

    // 保存chart实例用于缩放
    currentChart.value = chart
  }
}

// 放大词云
const zoomInWordCloud = () => {
  if (zoomLevel.value < maxZoom) {
    zoomLevel.value += 0.1
    refreshWordCloud()
  }
}

// 缩小词云
const zoomOutWordCloud = () => {
  if (zoomLevel.value > minZoom) {
    zoomLevel.value -= 0.1
    refreshWordCloud()
  }
}

// 刷新词云
const refreshWordCloud = () => {
  if (currentChart.value) {
    // 重新渲染词云图
    currentChart.value.wordCloud().layout({
      spiral: 'rectangular',
      fontSize: [16, 50],
      padding: 2,
      ratio: zoomLevel.value,
    })
    currentChart.value.render()
  }
}

// 监听详情弹窗显示状态变化控制背景滚动
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden' // 禁止背景滚动
      // 当模态框显示时，初始化词云图
      setTimeout(() => {
        initWordCloud()
      }, 300)
    } else {
      document.body.style.overflow = '' // 恢复背景滚动
      // 当关闭模态框时，重置答题页面状态
      showAnswerPage.value = false
    }
  },
)

onMounted(() => {
  if (props.modelValue) {
    // 如果模态框已经显示，初始化词云图
    setTimeout(() => {
      initWordCloud()
    }, 300)
  }
})

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

// 窗口状态控制
const isMinimized = ref(false)
const isMaximized = ref(false)

// 最小化模态框
const minimizeModal = () => {
  // 如果答题页面正在显示，则返回详情页面
  if (showAnswerPage.value) {
    showAnswerPage.value = false
    return
  }

  // 否则执行原来的最小化功能
  isMinimized.value = !isMinimized.value
  const modalElement = document.querySelector('.detail-modal') as HTMLElement | null

  if (!modalElement) return

  if (isMinimized.value) {
    // 保存当前高度，然后最小化
    modalElement.style.height = '40px'
    modalElement.style.overflow = 'hidden'
  } else {
    // 恢复原始高度
    modalElement.style.height = '93vh'
    modalElement.style.overflow = 'auto'
  }
}

// 最大化模态框
const maximizeModal = () => {
  isMaximized.value = !isMaximized.value
  const modalElement = document.querySelector('.detail-modal') as HTMLElement | null

  if (!modalElement) return

  if (isMaximized.value) {
    // 保存原始尺寸，然后最大化
    modalElement.style.width = '100%'
    modalElement.style.height = '100vh'
    modalElement.style.borderRadius = '0'
  } else {
    // 恢复原始尺寸
    modalElement.style.width = '80%'
    modalElement.style.height = '93vh'
    modalElement.style.borderRadius = '20px'
  }
}
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
  /* max-width: 1200px; */
  height: 93vh;
  background-color: white;
  border-radius: 20px;
  padding: 0rem 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  position: relative;
}

/* Mac 样式按钮 */
.mac-buttons {
  display: flex;
  gap: 8px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: -10px;
  position: sticky;
  top: 0;
  z-index: 10;
  padding-top: 10px;
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
  /* margin-top: 1rem; */
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
  margin-bottom: 1rem;
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
  grid-template-columns: 450px 1fr;
  grid-template-areas:
    'rating comments'
    'wordcloud comments';
  gap: 1rem 1rem;
  width: 100%;
  height: 100px;
  min-height: fit-content;
}

.rating-section {
  height: 170px;
  width: 450px;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 10px 30px 10px 30px;
  grid-area: rating;
}

/* .word-cloud, */
.comments-section {
  background-color: #ffffff;
  border-radius: 25px;
  /* padding: 1.5rem; */
  grid-area: comments;
  height: 100%;
  /* min-height: 450px; */
}

.word-cloud {
  grid-area: wordcloud;
  height: 250px;
  position: relative;
}

#wordcloud-container {
  width: 100%;
  height: 100%;
  background-color: #000000;
  border-radius: 12px;
}

.zoom-controls {
  position: absolute;
  right: 15px;
  bottom: 15px;
  display: flex;
  gap: 5px;
}

.zoom-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.zoom-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.rating-section h2,
.comments-section h2 {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 0.5rem;
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
  /* padding-top: 10px; */
}

.rating-bar-item {
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  width: 250px;
}

.stars-count {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto; /* 关键：将星星推到右侧 */
  margin-right: 5px; /* 保留原有的右侧间距 */
}

.stars-count img {
  width: 13px;
  height: 13px;
}

/* 不需要显示的星星设为透明 */
.stars-count img.transparent {
  opacity: 0;
  visibility: hidden;
  /* width: 0; */
  margin-left: 0;
}

.bar-container {
  flex: 1;
  background-color: #e0e0e0;
  height: 7px;
  border-radius: 5px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background-color: #fd9a00;
  border-radius: 5px;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 55vh;
  overflow-y: auto;
  padding: 1rem;
}

.comment {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.comment-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-user-info {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.comment-name {
  font-weight: 600;
  font-size: 15px;
  color: #1a1a1a;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-actions {
  margin-right: 0.5rem;
}

.comment-more {
  display: flex;
  gap: 2px;
  cursor: pointer;
}

.comment-more span {
  width: 4px;
  height: 4px;
  background-color: #999;
  border-radius: 50%;
}

.comment-content {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

.comment-text {
  color: #333;
  font-size: 14px;
  line-height: 1.5;
}

.comment-footer {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.25rem;
}

.comment-like,
.comment-reply {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.comment-like:hover,
.comment-reply:hover {
  color: #1a1a1a;
}

.footer-icon {
  width: 16px;
  height: 16px;
}

/* 开始答题按钮样式 */
.start-answer-container {
  position: absolute;
  top: 1rem;
  right: 2.5rem;
  z-index: 10;
}

.start-answer-btn {
  background-color: #1a1a1a;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.start-answer-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.start-answer-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.answer-page-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: #f5f7fa;
  border-radius: 20px;
  overflow: auto; /* 改为auto而不是hidden，允许滚动 */
  padding-top: 40px; /* 为Mac按钮留出空间 */
  padding-bottom: 20px; /* 为底部按钮留出空间 */
}
</style>
