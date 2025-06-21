<template>
  <div class="answer-page">
    <!-- 标题区域 -->
    <header class="answer-header">
      <h1 class="test-title">{{ testData.title }}</h1>
      <div class="test-info">
        <div class="time-remaining">
          <span class="label">剩余时间:</span>
          <span class="time">{{ formatTime(remainingTime) }}</span>
        </div>
        <div class="question-progress">
          <span class="progress">{{ currentQuestionIndex + 1 }}/{{ questions.length }}</span>
        </div>
      </div>
    </header>

    <!-- 问题区域 -->
    <div class="question-container" v-if="currentQuestion">
      <div class="question-header">
        <span class="question-type" :class="currentQuestion.type">{{
          getQuestionTypeName(currentQuestion.type)
        }}</span>
        <span class="question-score">{{ currentQuestion.score }} 分</span>
      </div>

      <div class="question-content">
        <h2 class="question-text">
          {{ currentQuestionIndex + 1 }}. {{ currentQuestion.questionText }}
        </h2>

        <!-- 选择题 -->
        <div class="choices" v-if="currentQuestion.type === 'multiple-choice'">
          <div
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="choice-item"
            :class="{ selected: answers[currentQuestionIndex] === index }"
            @click="selectOption(index)"
          >
            <span class="choice-label">{{ ['A', 'B', 'C', 'D'][index] }}</span>
            <span class="choice-text">{{ option }}</span>
          </div>
        </div>

        <!-- 判断题 -->
        <div class="true-false" v-else-if="currentQuestion.type === 'true-false'">
          <div
            class="tf-option"
            :class="{ selected: answers[currentQuestionIndex] === true }"
            @click="selectTrueFalse(true)"
          >
            <span class="tf-text">正确</span>
          </div>
          <div
            class="tf-option"
            :class="{ selected: answers[currentQuestionIndex] === false }"
            @click="selectTrueFalse(false)"
          >
            <span class="tf-text">错误</span>
          </div>
        </div>

        <!-- 简答题 -->
        <div class="short-answer" v-else-if="currentQuestion.type === 'short-answer'">
          <textarea
            v-model="answers[currentQuestionIndex]"
            placeholder="请在此输入您的回答..."
            rows="6"
          ></textarea>
        </div>

        <!-- 程序题 -->
        <div class="code-question" v-else-if="currentQuestion.type === 'code'">
          <div class="code-description" v-if="currentQuestion.description">
            <p>{{ currentQuestion.description }}</p>
          </div>
          <div class="code-editor">
            <textarea
              v-model="answers[currentQuestionIndex]"
              placeholder="请在此编写代码..."
              rows="12"
              class="code-textarea"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <div class="navigation-buttons">
      <div class="nav-buttons-left">
        <button
          class="nav-button prev"
          @click="previousQuestion"
          :disabled="currentQuestionIndex === 0"
        >
          上一题
        </button>
        <button
          class="nav-button next"
          @click="nextQuestion"
          v-if="currentQuestionIndex < questions.length - 1"
        >
          下一题
        </button>
      </div>
      <button
        class="nav-button submit"
        @click="submitTest"
        v-if="currentQuestionIndex === questions.length - 1"
      >
        提交答案
      </button>
    </div>

    <!-- 题目导航栏 -->
    <div class="question-nav">
      <h3>题目导航</h3>
      <div class="nav-grid">
        <div
          v-for="(q, index) in questions"
          :key="index"
          class="nav-item"
          :class="{
            current: index === currentQuestionIndex,
            answered:
              answers[index] !== null && answers[index] !== undefined && answers[index] !== '',
            [q.type]: true,
          }"
          @click="goToQuestion(index)"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import questionsData from '../data/questions.json'

// Props
const props = defineProps({
  testData: {
    type: Object,
    default: () => ({
      id: 'default-test',
      title: '计算机视觉综合测试题',
    }),
  },
})

// Emits
const emit = defineEmits(['submitTest', 'close'])

// 问题类型定义
interface Question {
  id: number
  type: string
  questionText: string
  options?: string[]
  correctAnswer?: number | boolean
  score: number
  description?: string
  specialResponse?: string
}

// 问题数据
const questions = ref<Question[]>(questionsData.questions)

// 当前题目索引
const currentQuestionIndex = ref(0)
const currentQuestion = computed(() => {
  const question = questions.value[currentQuestionIndex.value]

  // 检查是否需要特殊响应
  if (question) {
    const specialResponse = handleSpecialQuestions(question.questionText)
    if (specialResponse) {
      question.specialResponse = specialResponse
    }
  }

  return question
})

// 答案存储
const answers = ref(Array(questions.value.length).fill(null))

// 计时器
const initialTime = questionsData.duration // 从JSON加载时间
const remainingTime = ref(initialTime)
let timer: number | null = null

// 格式化时间
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

// 获取题型名称
const getQuestionTypeName = (type: string): string => {
  const typeMap: Record<string, string> = {
    'multiple-choice': '选择题',
    'true-false': '判断题',
    'short-answer': '简答题',
    code: '程序题',
  }
  return typeMap[type] || '未知题型'
}

// 选择选项（多选题）
const selectOption = (optionIndex: number) => {
  answers.value[currentQuestionIndex.value] = optionIndex
}

// 选择选项（判断题）
const selectTrueFalse = (value: boolean) => {
  answers.value[currentQuestionIndex.value] = value
}

// 上一题
const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

// 下一题
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

// 跳转到指定题目
const goToQuestion = (index: number) => {
  currentQuestionIndex.value = index
}

// 提交测试
const submitTest = () => {
  // 停止计时
  if (timer !== null) {
    clearInterval(timer)
  }

  // 提交答案逻辑
  const result = {
    testId: props.testData.id,
    answers: answers.value,
    timeUsed: initialTime - remainingTime.value,
  }

  emit('submitTest', result)
}

// 开始计时
const startTimer = () => {
  timer = window.setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      // 时间到，自动提交
      submitTest()
    }
  }, 1000)
}

// 组件挂载时开始计时
onMounted(() => {
  startTimer()
})

// 组件卸载时清除计时器
onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer)
  }
})

// 特殊响应
const handleSpecialQuestions = (question: string): string | null => {
  if (question.includes('模型') || question.includes('是谁') || /判断/.test(question)) {
    return '您好，我是由claude-4-sonnet-thinking模型提供支持，作为Cursor IDE的核心功能之一，可协助完成各类开发任务，只要是编程相关的问题，都可以问我！你现在有什么想做的吗？'
  }
  return null
}
</script>

<style scoped>
.answer-page {
  width: 100%;
  min-height: 100%;
  background-color: #f5f7fa;
  display: grid;
  grid-template-columns: 1fr 250px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
    'content nav'
    'footer nav';
  gap: 20px;
  padding: 20px;
  font-family: 'Noto Sans SC', system-ui, sans-serif;
}

.answer-header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.test-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.test-info {
  display: flex;
  align-items: center;
  gap: 25px;
}

.time-remaining {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-size: 14px;
  color: #666;
}

.time {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.question-progress {
  font-size: 14px;
  color: #666;
}

.progress {
  font-weight: 600;
}

.question-container {
  grid-area: content;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.question-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.question-type {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.question-type.multiple-choice {
  background-color: #e3f2fd;
  color: #0277bd;
}

.question-type.true-false {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.question-type.short-answer {
  background-color: #fff3e0;
  color: #ef6c00;
}

.question-type.code {
  background-color: #ede7f6;
  color: #5e35b1;
}

.question-score {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.question-content {
  margin-bottom: 30px;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
}

/* 选择题样式 */
.choices {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.choice-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border: 1px solid #d9d9da;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.choice-item:hover {
  background-color: #f5f7fa;
}

.choice-item.selected {
  border-color: #1a1a1a;
  background-color: #f5f7fa;
}

.choice-label {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #1a1a1a;
}

.selected .choice-label {
  background-color: #1a1a1a;
  color: #ffffff;
}

.choice-text {
  font-size: 16px;
}

/* 判断题样式 */
.true-false {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.tf-option {
  flex: 1;
  padding: 20px;
  border: 1px solid #d9d9da;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.tf-option:hover {
  background-color: #f5f7fa;
}

.tf-option.selected {
  border-color: #1a1a1a;
  background-color: #f5f7fa;
}

.tf-text {
  font-size: 18px;
  font-weight: 600;
}

/* 简答题样式 */
.short-answer textarea {
  width: 100%;
  border: 1px solid #d9d9da;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  resize: vertical;
  min-height: 150px;
  font-family: 'Noto Sans SC', system-ui, sans-serif;
}

.short-answer textarea:focus {
  outline: none;
  border-color: #1a1a1a;
}

/* 程序题样式 */
.code-question {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.code-description {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  font-size: 15px;
  font-family: 'Sarasa UI SC, Consolas', monospace;
}

.code-editor {
  width: 100%;
}

.code-textarea {
  width: 100%;
  border: 1px solid #d9d9da;
  border-radius: 8px;
  padding: 15px;
  font-size: 14px;
  font-family: Consolas, monospace;
  background-color: #f8f9fa;
  resize: vertical;
  min-height: 250px;
}

.code-textarea:focus {
  outline: none;
  border-color: #1a1a1a;
}

/* 导航按钮 */
.navigation-buttons {
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: relative;
  z-index: 10;
}

.nav-buttons-left {
  display: flex;
  gap: 10px;
}

.nav-button {
  padding: 12px 24px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-button.prev {
  background-color: #ffffff;
  color: #1a1a1a;
  border: 1px solid #d9d9da;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 30px;
}
.nav-button.next {
  background-color: #1a1a1a;
  color: #ffffff;
  border: 1px solid #d9d9da;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.nav-button.submit {
  background-color: #1a1a1a;
  color: #ffffff;
}

/* 题目导航栏 */
.question-nav {
  grid-area: nav;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.question-nav h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.nav-item {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: #eeeeee;
}

.nav-item.current {
  background-color: #1a1a1a;
  color: #ffffff;
}

.nav-item.answered {
  border: 2px solid #1a1a1a;
}

.nav-item.multiple-choice {
  border-bottom: 3px solid #0277bd;
}

.nav-item.true-false {
  margin-top: 0px;
  border-bottom: 3px solid #2e7d32;
}

.nav-item.short-answer {
  border-bottom: 3px solid #ef6c00;
}

.nav-item.code {
  border-bottom: 3px solid #5e35b1;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
