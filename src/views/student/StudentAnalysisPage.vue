<template>
  <div class="analysis-container">
    <!-- 左侧习题列表 -->
    <div class="exercise-list">
      <div class="list-header">
        <div class="mac-buttons">
          <div class="mac-button close"></div>
          <div class="mac-button minimize"></div>
          <div class="mac-button maximize"></div>
        </div>
        <!-- <h2>习题列表</h2> -->
        <div class="search-box">
          <input
            type="text"
            placeholder="搜索习题..."
            v-model="searchQuery"
            @input="filterExercises"
          />
          <div class="search-icon">
            <img src="@/assets/icons/search-black.svg" alt="Search" />
          </div>
        </div>
      </div>

      <div class="list-content">
        <div
          v-for="(exercise, index) in filteredExercises"
          :key="index"
          class="exercise-item"
          :class="{ active: selectedExerciseIndex === index }"
          @click="selectExercise(index)"
        >
          <div class="exercise-title">{{ exercise.title }}</div>
          <div class="exercise-meta">
            <span class="difficulty" :class="exercise.difficulty">{{ exercise.difficulty }}</span>
            <span class="exercise-type">{{ exercise.type }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧分析内容 -->
    <div class="analysis-content">
      <SideIland
        v-if="selectedExercise"
        :title="selectedExercise.title"
        class="mt-10"
        containerSelector=".analysis-content"
      >
        <div class="my-3 flex flex-col gap-2">
          <a
            href="#exercise-problem"
            @click="scrollToSection('exercise-problem')"
            class="scroll-link"
          >
            题目
          </a>
          <a
            href="#knowledge-points"
            @click="scrollToSection('knowledge-points')"
            class="scroll-link"
          >
            知识点
          </a>
          <a
            href="#solution-analysis"
            @click="scrollToSection('solution-analysis')"
            class="scroll-link"
          >
            解析
          </a>
          <a
            href="#similar-exercises"
            @click="scrollToSection('similar-exercises')"
            class="scroll-link"
          >
            相似习题
          </a>
        </div>
      </SideIland>

      <div v-if="selectedExercise" class="exercise-details">
        <!-- 题目部分 -->
        <section id="exercise-problem" class="detail-section">
          <!-- <div class="section-header">
            <h2>题目</h2>
            <div class="exercise-badges">
              <span class="difficulty-badge" :class="selectedExercise.difficulty">
                {{ selectedExercise.difficulty }}
              </span>
              <span class="type-badge">{{ selectedExercise.type }}</span>
            </div>
          </div> -->

          <!-- 选择题内容 -->
          <div v-if="isMultipleChoice" class="multiple-choice-content">
            <div
              class="question-text"
              v-html="renderMarkdown((selectedExercise.content as MultipleChoiceContent).question)"
            ></div>

            <div class="options-list">
              <div
                v-for="option in (selectedExercise.content as MultipleChoiceContent).options"
                :key="option.id"
                class="option-item"
                :class="{
                  selected: selectedAnswer === option.id,
                  correct:
                    showAnswer &&
                    option.id === (selectedExercise.content as MultipleChoiceContent).correctAnswer,
                  incorrect:
                    showAnswer &&
                    selectedAnswer === option.id &&
                    option.id !== (selectedExercise.content as MultipleChoiceContent).correctAnswer,
                }"
                @click="selectAnswer(option.id)"
              >
                <div class="option-radio">
                  <div
                    class="radio-circle"
                    :class="{ checked: selectedAnswer === option.id }"
                  ></div>
                </div>
                <div class="option-content">
                  <div class="option-label">{{ option.id }}.</div>
                  <div class="option-text" v-html="renderMarkdown(option.text)"></div>
                </div>
              </div>
            </div>

            <div class="answer-actions">
              <button class="submit-btn" :disabled="!selectedAnswer" @click="submitAnswer">
                提交答案
              </button>
            </div>

            <!-- 答案反馈 -->
            <div v-if="showAnswer" class="answer-feedback">
              <div
                class="feedback-header"
                :class="{ correct: isAnswerCorrect, incorrect: !isAnswerCorrect }"
              >
                <span class="feedback-icon">{{ isAnswerCorrect ? '✓' : '✗' }}</span>
                <span class="feedback-text">
                  {{ isAnswerCorrect ? '回答正确！' : '回答错误' }}
                </span>
              </div>
              <div
                class="feedback-explanation"
                v-html="
                  renderMarkdown((selectedExercise.content as MultipleChoiceContent).explanation)
                "
              ></div>
            </div>
          </div>

          <!-- 文本题目内容 -->
          <div
            v-else
            class="problem-content markdown-content"
            v-html="renderMarkdown((selectedExercise.content as TextContent).data)"
          ></div>

          <!-- 题目图片 -->
          <div
            v-if="selectedExercise.images && selectedExercise.images.length > 0"
            class="problem-images"
          >
            <img
              v-for="(image, i) in selectedExercise.images"
              :key="i"
              :src="image.url"
              :alt="image.alt || image.description"
              class="problem-image"
            />
          </div>
        </section>

        <!-- 知识点部分 -->
        <section id="knowledge-points" class="detail-section">
          <h2>知识点</h2>
          <div class="knowledge-tags">
            <span
              v-for="(point, i) in selectedExercise.knowledgePoints"
              :key="i"
              class="knowledge-tag"
              @click="searchByKnowledgePoint(point)"
            >
              {{ point }}
            </span>
          </div>

          <div
            class="knowledge-explanation markdown-content"
            v-html="renderMarkdown(selectedExercise.knowledgeExplanation)"
          ></div>
        </section>

        <!-- 解析部分 -->
        <section id="solution-analysis" class="detail-section">
          <h2>解析</h2>
          <div class="solution-steps">
            <div v-for="(step, i) in selectedExercise.solutionSteps" :key="i" class="solution-step">
              <div class="step-number">{{ i + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <div class="markdown-content" v-html="renderMarkdown(step.explanation)"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- 相似习题 -->
        <section id="similar-exercises" class="detail-section">
          <h2>相似习题</h2>
          <div class="similar-list">
            <div
              v-for="(similar, i) in selectedExercise.similarExercises"
              :key="i"
              class="similar-item"
              @click="loadSimilarExercise(similar.id)"
            >
              <div class="similar-title">{{ similar.title }}</div>
              <div class="similar-meta">
                <span class="difficulty" :class="similar.difficulty">{{ similar.difficulty }}</span>
                <span class="exercise-type">{{ similar.type }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 最终答案 -->
        <div class="final-answer">
          <!-- <h3>最终答案</h3> -->
          <div v-if="isMultipleChoice" class="answer-box">
            <div class="correct-answer">
              正确答案：<strong>{{
                (selectedExercise.answer as MultipleChoiceContent).correctAnswer
              }}</strong>
            </div>
            <div
              class="answer-explanation markdown-content"
              v-html="
                renderMarkdown((selectedExercise.answer as MultipleChoiceContent).explanation)
              "
            ></div>
          </div>
          <div
            v-else
            class="answer-box markdown-content"
            v-html="renderMarkdown((selectedExercise.answer as TextContent).data)"
          ></div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">
          <img src="@/assets/icons/book.svg" alt="Select Exercise" />
        </div>
        <p>请从左侧选择一个习题进行分析</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import SideIland from '@/components/SideIland.vue'
import exercisesData from '@/data/exercises.json'
import { aiModelInfo } from '@/data/student'
import MarkdownIt from 'markdown-it'
// @ts-ignore - markdown-it-anchor doesn't have typescript definitions
import anchor from 'markdown-it-anchor'
// @ts-ignore - markdown-it-katex doesn't have typescript definitions
import katex from 'markdown-it-katex'
import Prism from 'prismjs'
// 导入基础样式和额外语言支持
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
// 导入KaTeX样式
import 'katex/dist/katex.min.css'

// 初始化markdown-it实例
const md: MarkdownIt = new MarkdownIt({
  html: true, // 允许HTML标签
  breaks: true, // 转换'\n'为<br>
  linkify: true, // 自动将URL转换为链接
  typographer: true, // 启用一些语言中立的替换和引号美化
  highlight: function (str: string, lang: string): string {
    if (lang && Prism.languages[lang]) {
      try {
        return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(str, Prism.languages[lang], lang)}</code></pre>`
      } catch (err) {
        console.error('Prism highlighting error:', err)
      }
    }
    // 使用默认转义
    return `<pre class="language-text"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})

// 添加锚点插件
md.use(anchor, {
  permalink: anchor.permalink.ariaHidden({
    placement: 'before',
    class: 'header-anchor',
    symbol: '#',
  }),
  level: [1, 2, 3, 4],
})

// 添加数学公式支持
md.use(katex)

// AI model info is now available through aiModelInfo
// This variable contains:
// {
//   modelName: "claude-4-sonnet-thinking",
//   description: "我是基于先进的claude-4-sonnet-thinking模型构建，在Cursor IDE平台上为您提供全方位的技术支持，可以帮你完成很多与编程和开发相关的任务。",
//   capabilities: ["代码分析", "技术支持", "问题解答", "代码生成", "代码优化", "代码重构"]
// }

// Function to respond to model-related questions
const getModelResponse = (question: string): string => {
  return aiModelInfo.description
}

// 类型定义
interface ExerciseImage {
  url: string
  description: string
  alt?: string
}

interface SolutionStep {
  title: string
  explanation: string
}

interface SimilarExercise {
  id: number
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: string
}

interface MultipleChoiceOption {
  id: string
  text: string
  explanation: string
}

interface MultipleChoiceContent {
  type: 'multiple_choice'
  question: string
  options: MultipleChoiceOption[]
  correctAnswer: string
  explanation: string
}

interface TextContent {
  type: 'text'
  data: string
}

interface Exercise {
  id: number
  title: string
  type: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  tags: string[]
  content: TextContent | MultipleChoiceContent
  images?: ExerciseImage[]
  knowledgePoints: string[]
  knowledgeExplanation: string
  solutionSteps: SolutionStep[]
  answer: TextContent | MultipleChoiceContent
  similarExercises: SimilarExercise[]
  metadata: {
    createdAt: string
    updatedAt: string
    author: string
    estimatedTime: number
    points: number
  }
}

// 状态变量
const searchQuery = ref('')
const selectedExerciseIndex = ref<number | null>(null)
const selectedAnswer = ref<string>('')
const showAnswer = ref(false)
const exercises = ref<Exercise[]>(exercisesData.exercises as Exercise[])

// 计算属性：筛选后的习题列表
const filteredExercises = ref(exercises.value)

// 使用markdown-it渲染Markdown
const renderMarkdown = (text: string): string => {
  if (!text) return ''
  return md.render(text)
}

// 选中的习题
const selectedExercise = computed(() => {
  if (selectedExerciseIndex.value !== null) {
    return exercises.value[selectedExerciseIndex.value]
  }
  return null
})

// 检查是否为选择题
const isMultipleChoice = computed(() => {
  return selectedExercise.value?.content.type === 'multiple_choice'
})

// 检查答案是否正确
const isAnswerCorrect = computed(() => {
  if (!isMultipleChoice.value || !selectedAnswer.value) return false
  const content = selectedExercise.value?.content as MultipleChoiceContent
  return selectedAnswer.value === content.correctAnswer
})

// 搜索和筛选习题
const filterExercises = () => {
  if (!searchQuery.value.trim()) {
    filteredExercises.value = exercises.value
    return
  }

  const query = searchQuery.value.toLowerCase()
  filteredExercises.value = exercises.value.filter((exercise) => {
    return (
      exercise.title.toLowerCase().includes(query) ||
      exercise.type.toLowerCase().includes(query) ||
      exercise.knowledgePoints.some((point) => point.toLowerCase().includes(query))
    )
  })
}

// 定义一个函数来重新应用Prism高亮
const applyPrismHighlighting = (): void => {
  nextTick(() => {
    Prism.highlightAll()
  })
}

// 选择习题
const selectExercise = (index: number) => {
  selectedExerciseIndex.value = index
  selectedAnswer.value = ''
  showAnswer.value = false

  // 选择习题后应用语法高亮
  applyPrismHighlighting()
}

// 选择答案
const selectAnswer = (optionId: string) => {
  selectedAnswer.value = optionId
}

// 提交答案
const submitAnswer = () => {
  showAnswer.value = true
}

// 根据知识点搜索习题
const searchByKnowledgePoint = (point: string) => {
  searchQuery.value = point
  filterExercises()
}

// 加载相似习题
const loadSimilarExercise = (id: number) => {
  const index = exercises.value.findIndex((ex) => ex.id === id)
  if (index !== -1) {
    selectedExerciseIndex.value = index
    selectedAnswer.value = ''
    showAnswer.value = false

    // 加载相似习题后应用语法高亮
    applyPrismHighlighting()
  }
}

// 滚动到指定部分
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

// 监听selectedExercise的变化
watch(
  () => selectedExercise.value,
  () => {
    applyPrismHighlighting()
  },
)

// 初始化时选择第一个习题
onMounted(() => {
  if (exercises.value.length > 0) {
    selectedExerciseIndex.value = 0

    // 初始加载完成后应用语法高亮
    applyPrismHighlighting()
  }
})
</script>

<style>
/* 取消scoped，确保样式可以应用到动态生成的内容 */
/* 将关键的markdown样式移至非scoped样式块 */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: #1a1a1a;
  font-weight: 600;
}

.markdown-content h1 {
  font-size: 2em;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.3em;
}

.markdown-content h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 0.3em;
}

.markdown-content h3 {
  font-size: 1.25em;
}

.markdown-content h4 {
  font-size: 1.1em;
}

.markdown-content p {
  margin-bottom: 1em;
}

.markdown-content code {
  background-color: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family:
    'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.9em;
  color: #495057;
}

.markdown-content pre {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  margin: 1em 0;
}

.markdown-content pre code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: 0.85em;
  line-height: 1.5;
}

.markdown-content ul,
.markdown-content ol {
  padding-left: 2em;
  margin-bottom: 1em;
}

.markdown-content li {
  margin-bottom: 0.5em;
}

.markdown-content blockquote {
  border-left: 4px solid #1a1a1a;
  padding-left: 1em;
  margin: 1em 0;
  color: #6c757d;
  font-style: italic;
}

/* Prism.js 语法高亮自定义样式 */
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #6a737d;
  font-style: italic;
}

.token.punctuation {
  color: #5e6687;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol {
  color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin {
  color: #690;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #07a;
}

.token.keyword {
  color: #07a;
  font-weight: bold;
}

.token.function {
  color: #dd4a68;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

/* 改善代码块视觉效果 */
pre[class*='language-'] {
  position: relative;
  border-radius: 8px;
  margin: 1.5em 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

code[class*='language-'] {
  border-radius: 6px;
}

/* KaTeX数学公式样式调整 */
.katex-display {
  margin: 1em 0;
  overflow-x: auto;
  overflow-y: hidden;
}

.katex {
  font-size: 1.1em;
}

.header-anchor {
  font-size: 0.8em;
  float: left;
  margin-left: -0.87em;
  padding-right: 0.23em;
  margin-top: 0.125em;
  opacity: 0;
  text-decoration: none;
  color: #6c757d;
  transition: opacity 0.2s;
}

h1:hover .header-anchor,
h2:hover .header-anchor,
h3:hover .header-anchor,
h4:hover .header-anchor {
  opacity: 1;
}

.header-anchor:hover {
  color: #1a1a1a;
}
</style>

<style scoped>
.analysis-container {
  display: flex;
  height: calc(100vh - 75px);
  background-color: #f8f9fa;
  font-family: 'Noto Sans SC', 'Noto Serif SC', 'Sarasa UI SC', system-ui, sans-serif;
}

/* 左侧习题列表样式 - Mac风格毛玻璃效果 */
.exercise-list {
  width: 300px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  margin: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15); */
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
}

.list-header {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
}

/* Mac按钮样式 */
.mac-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

.mac-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mac-button.close {
  background-color: #ff5f57;
}

.mac-button.minimize {
  background-color: #ffbd2e;
}

.mac-button.maximize {
  background-color: #28ca42;
}

.mac-button:hover {
  transform: scale(1.1);
}

.list-header h2 {
  margin: 0 0 15px 0;
  font-size: 30px;
  color: #1a1a1a;
  font-family: 'Noto Serif SC', serif;
  font-weight: 600;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-box input {
  width: 100%;
  padding: 10px 35px 10px 15px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 14px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  color: #1a1a1a;
}

.search-box input:focus {
  outline: none;
  border-color: #1a1a1a;
  box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
}

.search-box input::placeholder {
  color: #6c757d;
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.search-icon img {
  width: 16px;
  height: 16px;
  opacity: 0.6;
}

.list-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.exercise-item {
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: 'Sarasa UI SC', sans-serif;
}

.exercise-item:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px) scale(1.02); /* 上浮2px并放大2% */
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); */
  transition: all 0.3s ease;
  z-index: 1; /* 确保放大元素覆盖其他元素 */
}

.exercise-item.active {
  background: rgba(180, 180, 180, 0.1);
  /* border-color: rgba(26, 26, 26, 0.511); */
  /* box-shadow: 0 4px 12px rgba(26, 26, 26, 0.2); */
}

.exercise-title {
  font-weight: 600;
  /* margin-bottom: 8px; */
  color: #1a1a1a;
  font-size: 16px;
  /* font-family: 'Noto Sans SC', sans-serif; */

  line-height: 1.4;
}

.exercise-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.difficulty {
  padding: 3px 5px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 11px;
}

.difficulty.easy {
  /* background-color: rgba(40, 167, 69, 0.1); */
  color: #28a745;
  /* border: 1px solid rgba(40, 167, 69, 0.3); */
}

.difficulty.medium {
  /* background-color: rgba(255, 193, 7, 0.1); */
  color: #ffc107;
  /* border: 1px solid rgba(255, 193, 7, 0.3); */
}

.difficulty.hard {
  /* background-color: rgba(220, 53, 69, 0.1); */
  color: #dc3545;
  /* border: 1px solid rgba(220, 53, 69, 0.3); */
}

.exercise-type {
  color: #6c757d;
  font-size: 11px;
  font-weight: 500;
  font-family: 'Sarasa UI SC', sans-serif;
}

/* 右侧分析内容样式 */
.analysis-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  position: relative;
}

.exercise-details {
  max-width: 1300px;
  margin: 0 50px 0 0;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.detail-section {
  margin-bottom: 40px;
  font-family: 'Sarasa UI SC', sans-serif;
}

.detail-section h2 {
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e9ecef;
  font-weight: 700;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e9ecef;
}

.section-header h2 {
  margin: 0;
  padding: 0;
  border: none;
}

.exercise-badges {
  display: flex;
  gap: 12px;
}

.difficulty-badge,
.type-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.difficulty-badge.easy {
  background-color: rgba(40, 167, 69, 0.1);
  color: #28a745;
  border: 1px solid rgba(40, 167, 69, 0.3);
}

.difficulty-badge.medium {
  background-color: rgba(255, 193, 7, 0.1);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.difficulty-badge.hard {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  border: 1px solid rgba(220, 53, 69, 0.3);
}

.type-badge {
  /* background-color: rgba(26, 26, 26, 0.1); */
  color: #1a1a1a;
  /* border: 1px solid rgba(26, 26, 26, 0.3); */
}

/* Markdown内容样式 */
.markdown-content {
  line-height: 1.8;
  color: #333;
}

/* 改善代码块视觉效果 */
:deep(pre[class*='language-']) {
  position: relative;
  border-radius: 8px;
  margin: 1.5em 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.markdown-content ul,
.markdown-content ol {
  padding-left: 2em;
  margin-bottom: 1em;
}

.markdown-content li {
  margin-bottom: 0.5em;
}

.markdown-content blockquote {
  border-left: 4px solid #1a1a1a;
  padding-left: 1em;
  margin: 1em 0;
  color: #6c757d;
  font-style: italic;
}

/* 选择题中的markdown内容样式调整 */
.question-text :deep(h1),
.question-text :deep(h2),
.question-text :deep(h3),
.question-text :deep(h4) {
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.question-text :deep(h1) {
  font-size: 1.6em;
}

.question-text :deep(h2) {
  font-size: 1.4em;
}

.question-text :deep(h3) {
  font-size: 1.2em;
}

.question-text :deep(h4) {
  font-size: 1.1em;
}

/* 针对选项文本中的标题 */
.option-text :deep(h1),
.option-text :deep(h2),
.option-text :deep(h3),
.option-text :deep(h4) {
  font-size: 1em;
  margin: 0.5em 0;
}

/* 确保渲染后的markdown内容在选择题中正确显示 */
.question-text :deep(p) {
  margin-bottom: 0.8em;
}

.question-text :deep(p:last-child) {
  margin-bottom: 0;
}

.option-text :deep(p) {
  margin: 0;
}

.option-text :deep(code) {
  padding: 2px 4px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.feedback-explanation :deep(p) {
  margin-bottom: 0.8em;
}

.feedback-explanation :deep(p:last-child) {
  margin-bottom: 0;
}

.problem-content {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 25px;
}

.problem-images {
  display: flex;
  gap: 15px;
  margin: 20px 0;
  overflow-x: auto;
}

.problem-image {
  max-width: 300px;
  max-height: 200px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.knowledge-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
}

.knowledge-tag {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.knowledge-tag:hover {
  background-color: #333333;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(26, 26, 26, 0.3);
}

.knowledge-explanation {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  font-size: 16px;
  line-height: 1.8;
  /* border-left: 4px solid #1a1a1a; */
}

.solution-steps {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.solution-step {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  /* border-left: 4px solid #1a1a1a; */
}

.step-number {
  width: 35px;
  height: 35px;
  background-color: #1a1a1a;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
  font-size: 16px;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #1a1a1a;
  font-weight: 600;
}

.step-content p {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 15px;
  color: #333;
}

.final-answer {
  margin-top: 35px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 25px;
  /* border-left: 4px solid #1a1a1a; */
}

.final-answer h3 {
  font-size: 20px;
  margin: 0 0 15px 0;
  color: #1a1a1a;
  font-weight: 600;
}

.answer-box {
  font-weight: 600;
  line-height: 1.8;
  color: #1a1a1a;
}

.similar-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.similar-item {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.similar-item:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #1a1a1a;
}

.similar-title {
  font-weight: 600;
  margin-bottom: 10px;
  color: #1a1a1a;
  font-size: 16px;
}

.similar-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6c757d;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* SideIland styles */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.gap-2 {
  gap: 0.5rem;
}

.my-3 {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.mt-10 {
  margin-top: 2.5rem;
}

.scroll-link {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.scroll-link:hover {
  color: #fff;
  background-color: rgb(72, 72, 72);
}

/* 滚动条样式 */
.exercise-list::-webkit-scrollbar,
.analysis-content::-webkit-scrollbar {
  width: 6px;
}

.exercise-list::-webkit-scrollbar-track,
.analysis-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.exercise-list::-webkit-scrollbar-thumb,
.analysis-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.exercise-list::-webkit-scrollbar-thumb:hover,
.analysis-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .analysis-container {
    flex-direction: column;
  }

  .exercise-list {
    width: 100%;
    margin: 10px;
    height: 300px;
  }

  .exercise-details {
    padding: 20px;
    margin: 0 10px 0 0;
  }

  .similar-list {
    grid-template-columns: 1fr;
  }
}

/* 选择题样式 */
.multiple-choice-content {
  margin-bottom: 30px;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 25px;
  line-height: 1.6;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  /* border-left: 4px solid #1a1a1a; */
}

/* 确保渲染后的markdown内容在选择题中正确显示 */
.question-text :deep(p) {
  margin-bottom: 0.8em;
}

.question-text :deep(p:last-child) {
  margin-bottom: 0;
}

.option-text :deep(p) {
  margin: 0;
}

.option-text :deep(code) {
  padding: 2px 4px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.feedback-explanation :deep(p) {
  margin-bottom: 0.8em;
}

.feedback-explanation :deep(p:last-child) {
  margin-bottom: 0;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px 20px;
  border-radius: 12px;
  border: 2px solid #e9ecef;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.option-item:hover {
  border-color: #1a1a1a;
  background-color: #f8f9fa;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.option-item.selected {
  border-color: #1a1a1a;
  background-color: rgba(26, 26, 26, 0.05);
  box-shadow: 0 4px 12px rgba(26, 26, 26, 0.15);
}

.option-item.correct {
  border-color: #28a745;
  background-color: rgba(40, 167, 69, 0.1);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
}

.option-item.incorrect {
  border-color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
}

.option-radio {
  flex-shrink: 0;
  margin-top: 2px;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #6c757d;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
}

.radio-circle.checked {
  border-color: #1a1a1a;
  background-color: #1a1a1a;
}

.radio-circle.checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border-radius: 50%;
}

.option-content {
  flex: 1;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.option-label {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 16px;
  min-width: 25px;
}

.option-text {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  flex: 1;
}

.answer-actions {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.submit-btn {
  background-color: #1a1a1a;
  color: #ffffff;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(26, 26, 26, 0.2);
}

.submit-btn:hover:not(:disabled) {
  background-color: #333333;
  /* transform: translateY(-2px); */
  box-shadow: 0 6px 16px rgba(26, 26, 26, 0.3);
}

.submit-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.answer-feedback {
  margin-top: 25px;
  padding: 20px;
  border-radius: 12px;
  background-color: #f8f9fa;
}

.answer-feedback.correct {
  border-left-color: #28a745;
  background-color: rgba(40, 167, 69, 0.1);
}

.answer-feedback.incorrect {
  border-left-color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
}

.feedback-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 18px;
}

.feedback-header.correct {
  color: #28a745;
}

.feedback-header.incorrect {
  color: #dc3545;
}

.feedback-icon {
  font-size: 24px;
  font-weight: bold;
}

.feedback-text {
  font-size: 18px;
}

.feedback-explanation {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

.correct-answer {
  font-size: 18px;
  font-weight: 600;
  color: #28a745;
  margin-bottom: 15px;
  padding: 10px 15px;
  background-color: rgba(40, 167, 69, 0.1);
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.answer-explanation {
  margin-top: 15px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .question-text {
    font-size: 16px;
    padding: 15px;
  }

  .option-item {
    padding: 12px 15px;
  }

  .option-text {
    font-size: 14px;
  }

  .submit-btn {
    padding: 10px 25px;
    font-size: 14px;
  }
}
</style>
