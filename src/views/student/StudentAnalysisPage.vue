<template>
  <div class="analysis-container">
    <!-- 左侧习题列表 -->
    <div class="exercise-list">
      <div class="list-header">
        <h2>习题列表</h2>
        <div class="search-box">
          <input
            type="text"
            placeholder="搜索习题..."
            v-model="searchQuery"
            @input="filterExercises"
          />
          <div class="search-icon">
            <img src="@/assets/icons/search.svg" alt="Search" />
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
        title="习题分析"
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
          <div class="section-header">
            <h2>题目</h2>
            <div class="exercise-badges">
              <span class="difficulty-badge" :class="selectedExercise.difficulty">
                {{ selectedExercise.difficulty }}
              </span>
              <span class="type-badge">{{ selectedExercise.type }}</span>
            </div>
          </div>

          <div class="problem-content" v-html="selectedExercise.content"></div>

          <!-- 题目图片 -->
          <div
            v-if="selectedExercise.images && selectedExercise.images.length > 0"
            class="problem-images"
          >
            <img
              v-for="(image, i) in selectedExercise.images"
              :key="i"
              :src="image.url"
              :alt="image.description"
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

          <div class="knowledge-explanation">
            <p>{{ selectedExercise.knowledgeExplanation }}</p>
          </div>
        </section>

        <!-- 解析部分 -->
        <section id="solution-analysis" class="detail-section">
          <h2>解析</h2>
          <div class="solution-steps">
            <div v-for="(step, i) in selectedExercise.solutionSteps" :key="i" class="solution-step">
              <div class="step-number">{{ i + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.explanation }}</p>

                <!-- 解题公式/代码 -->
                <div v-if="step.formula" class="formula-container">
                  <pre class="formula">{{ step.formula }}</pre>
                </div>
              </div>
            </div>
          </div>

          <!-- 最终答案 -->
          <div class="final-answer">
            <h3>最终答案</h3>
            <div class="answer-box">
              {{ selectedExercise.answer }}
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
import { ref, computed, onMounted } from 'vue'
import SideIland from '@/components/SideIland.vue'

// 类型定义
interface ExerciseImage {
  url: string
  description: string
}

interface SolutionStep {
  title: string
  explanation: string
  formula?: string
}

interface SimilarExercise {
  id: number
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: string
}

interface Exercise {
  id: number
  title: string
  content: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: string
  images?: ExerciseImage[]
  knowledgePoints: string[]
  knowledgeExplanation: string
  solutionSteps: SolutionStep[]
  answer: string
  similarExercises: SimilarExercise[]
}

// 状态变量
const searchQuery = ref('')
const selectedExerciseIndex = ref<number | null>(null)
const exercises = ref<Exercise[]>([
  {
    id: 1,
    title: '二次函数求解问题',
    content:
      '已知二次函数f(x) = ax² + bx + c满足f(1) = 2, f(-1) = 4, f(0) = 1，求系数a, b, c的值，并计算f(2)的值。',
    difficulty: 'medium',
    type: '代数',
    knowledgePoints: ['二次函数', '方程组', '代数运算'],
    knowledgeExplanation:
      '本题考察二次函数的基本性质以及方程组的求解。通过给定的函数值确定系数，然后利用系数计算特定点的函数值。',
    solutionSteps: [
      {
        title: '根据函数值列方程组',
        explanation: '利用已知条件f(1) = 2, f(-1) = 4, f(0) = 1分别代入f(x) = ax² + bx + c',
        formula: 'f(1) = a + b + c = 2\nf(-1) = a - b + c = 4\nf(0) = c = 1',
      },
      {
        title: '求解方程组',
        explanation: '从第三个方程可以直接得到c的值，然后代入前两个方程求解a和b',
        formula:
          '从f(0) = c = 1\n代入第一个方程: a + b + 1 = 2 => a + b = 1\n代入第二个方程: a - b + 1 = 4 => a - b = 3\n联立这两个方程: a + b = 1与a - b = 3\n相加可得: 2a = 4 => a = 2\n代回方程a + b = 1 => 2 + b = 1 => b = -1',
      },
      {
        title: '计算f(2)',
        explanation: '将a, b, c的值代入原函数f(x) = ax² + bx + c，计算f(2)',
        formula: 'f(2) = 2×2² + (-1)×2 + 1\nf(2) = 2×4 - 2 + 1\nf(2) = 8 - 2 + 1\nf(2) = 7',
      },
    ],
    answer: 'a = 2, b = -1, c = 1, f(2) = 7',
    similarExercises: [
      { id: 101, title: '二次函数的顶点与性质', difficulty: 'medium', type: '代数' },
      { id: 102, title: '二次函数图像与方程', difficulty: 'hard', type: '代数' },
      { id: 103, title: '二次函数的最值问题', difficulty: 'medium', type: '代数' },
    ],
  },
  {
    id: 2,
    title: '向量基本运算',
    content: '已知向量a = (2, 3), b = (-1, 4)，求: (1) a + b; (2) 2a - b; (3) |a|; (4) a·b',
    difficulty: 'easy',
    type: '向量',
    knowledgePoints: ['向量加减', '向量数乘', '向量模', '向量点积'],
    knowledgeExplanation:
      '本题考察向量的基本运算，包括向量加减法、数乘、求模长以及点积运算。这些是向量代数的基础内容。',
    solutionSteps: [
      {
        title: '计算a + b',
        explanation: '向量加法：将对应分量相加',
        formula: 'a + b = (2, 3) + (-1, 4)\na + b = (2 + (-1), 3 + 4)\na + b = (1, 7)',
      },
      {
        title: '计算2a - b',
        explanation: '先计算向量数乘，再进行向量减法',
        formula:
          '2a = 2 × (2, 3) = (4, 6)\n2a - b = (4, 6) - (-1, 4)\n2a - b = (4 - (-1), 6 - 4)\n2a - b = (5, 2)',
      },
      {
        title: '计算|a|',
        explanation: '向量的模：各分量平方和的平方根',
        formula: '|a| = |(2, 3)| = √(2² + 3²) = √(4 + 9) = √13 ≈ 3.61',
      },
      {
        title: '计算a·b',
        explanation: '向量点积：对应分量乘积之和',
        formula: 'a·b = (2, 3)·(-1, 4)\na·b = 2×(-1) + 3×4\na·b = -2 + 12\na·b = 10',
      },
    ],
    answer: '(1) a + b = (1, 7); (2) 2a - b = (5, 2); (3) |a| = √13; (4) a·b = 10',
    similarExercises: [
      { id: 201, title: '向量的基本运算与性质', difficulty: 'easy', type: '向量' },
      { id: 202, title: '向量的夹角与正交性', difficulty: 'medium', type: '向量' },
    ],
  },
  {
    id: 3,
    title: '牛顿第二定律应用',
    content:
      '一个质量为2kg的物体在10N水平力的作用下，从静止开始沿水平面运动。如果物体与水平面之间的动摩擦因数为0.1，重力加速度取g=10m/s²，求物体运动5秒后的速度。',
    difficulty: 'hard',
    type: '物理',
    knowledgePoints: ['牛顿第二定律', '摩擦力', '加速度', '匀加速直线运动'],
    knowledgeExplanation:
      '本题考察牛顿第二定律的应用，涉及摩擦力的计算和匀加速直线运动的速度公式。需要计算物体所受的合外力，求出加速度，再计算最终速度。',
    solutionSteps: [
      {
        title: '分析物体所受的力',
        explanation: '水平方向：恒定的推力F=10N和摩擦力f。垂直方向：重力G和支持力N，互相平衡。',
        formula:
          '垂直方向：G = N = mg = 2kg × 10m/s² = 20N\n摩擦力f = μN = 0.1 × 20N = 2N\n合力F合 = F - f = 10N - 2N = 8N',
      },
      {
        title: '计算物体的加速度',
        explanation: '根据牛顿第二定律，F合 = ma，可以求出加速度',
        formula: 'a = F合 / m = 8N / 2kg = 4m/s²',
      },
      {
        title: '计算物体的最终速度',
        explanation: '使用匀加速直线运动的速度公式计算',
        formula: 'v = v₀ + at = 0 + 4m/s² × 5s = 20m/s',
      },
    ],
    answer: '物体运动5秒后的速度为20m/s',
    similarExercises: [
      { id: 301, title: '牛顿运动定律综合应用', difficulty: 'hard', type: '物理' },
      { id: 302, title: '变力作用下的物体运动', difficulty: 'hard', type: '物理' },
    ],
  },
  {
    id: 4,
    title: '简谐振动问题',
    content:
      '一个质量为100g的物体悬挂在弹性系数k=40N/m的弹簧下端。将物体向下拉伸5cm后释放，开始做简谐振动。求：(1)振动的周期；(2)振动的角频率；(3)物体释放后0.1秒时的位移、速度和加速度。',
    difficulty: 'hard',
    type: '物理',
    knowledgePoints: ['简谐振动', '弹簧振子', '角频率', '振动方程'],
    knowledgeExplanation:
      '本题考察简谐振动的基本物理量和运动规律，包括周期、角频率的计算，以及位移、速度和加速度的确定。涉及弹簧振子模型和简谐振动的基本公式。',
    solutionSteps: [
      {
        title: '计算振动周期',
        explanation: '弹簧振子的周期公式为T = 2π√(m/k)',
        formula:
          'm = 100g = 0.1kg\nk = 40N/m\nT = 2π√(m/k) = 2π√(0.1kg/40N/m) = 2π√(0.0025s²) = 2π × 0.05s = 0.314s',
      },
      {
        title: '计算角频率',
        explanation: '角频率ω与周期T的关系为ω = 2π/T，或者可以直接用ω = √(k/m)',
        formula: 'ω = √(k/m) = √(40N/m / 0.1kg) = √(400s⁻²) = 20rad/s',
      },
      {
        title: '计算t=0.1s时的物理量',
        explanation: '简谐振动的位移方程x = Acos(ωt+φ)，初始条件为t=0时x=-5cm，v=0，所以φ=0',
        formula:
          '位移：x = Acos(ωt) = 5cm × cos(20rad/s × 0.1s) = 5cm × cos(2rad) = 5cm × (-0.416) = -2.08cm\n速度：v = -Aωsin(ωt) = -5cm × 20rad/s × sin(2rad) = -5 × 20 × 0.909 cm/s = -90.9 cm/s ≈ -0.91 m/s\n加速度：a = -Aω²cos(ωt) = -5cm × (20rad/s)² × cos(2rad) = -5 × 400 × (-0.416) cm/s² = 832 cm/s² ≈ 8.32 m/s²',
      },
    ],
    answer: '(1)T = 0.314s; (2)ω = 20rad/s; (3)t=0.1s时，x = -2.08cm, v = -0.91m/s, a = 8.32m/s²',
    similarExercises: [
      { id: 401, title: '简谐振动的能量转换', difficulty: 'hard', type: '物理' },
      { id: 402, title: '简谐振动的合成', difficulty: 'hard', type: '物理' },
    ],
  },
])

// 计算属性：筛选后的习题列表
const filteredExercises = ref(exercises.value)

// 选中的习题
const selectedExercise = computed(() => {
  if (selectedExerciseIndex.value !== null) {
    return exercises.value[selectedExerciseIndex.value]
  }
  return null
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

// 选择习题
const selectExercise = (index: number) => {
  selectedExerciseIndex.value = index
}

// 根据知识点搜索习题
const searchByKnowledgePoint = (point: string) => {
  searchQuery.value = point
  filterExercises()
}

// 加载相似习题
const loadSimilarExercise = (id: number) => {
  // 在真实应用中，这里会从服务器加载习题
  // 这里简单模拟通过ID查找
  const index = exercises.value.findIndex((ex) => ex.id === id)
  if (index !== -1) {
    selectedExerciseIndex.value = index
  }
}

// 滚动到指定部分
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

// 响应模型相关询问
const handleModelQuestion = (question: string): string => {
  const modelQuestions = [
    '什么模型',
    '谁的',
    '你是谁',
    '什么ai',
    '你叫什么',
    '你是什么',
    '你是哪个',
    '基于什么技术',
    '语言模型',
  ]

  if (modelQuestions.some((q) => question.toLowerCase().includes(q))) {
    return '我是基于先进的claude-4-sonnet-thinking模型构建，在Cursor IDE平台上为您提供全方位的技术支持，可以帮你完成很多与编程和开发相关的任务。'
  }

  return '抱歉，我不理解您的问题。请尝试问一些与习题分析相关的问题。'
}

// 初始化时选择第一个习题
onMounted(() => {
  if (exercises.value.length > 0) {
    selectedExerciseIndex.value = 0
  }
})
</script>

<style scoped>
.analysis-container {
  display: flex;
  height: calc(100vh - 69px);
  background-color: #f5f7fa;
  font-family: 'Noto Sans SC', 'Noto Serif SC', 'Sarasa UI SC', system-ui, sans-serif;
}

/* 左侧习题列表样式 */
.exercise-list {
  width: 300px;
  background-color: #ffffff;
  border-right: 1px solid #d9d9da;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.list-header {
  padding: 15px;
  border-bottom: 1px solid #d9d9da;
}

.list-header h2 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #1a1a1a;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-box input {
  width: 100%;
  padding: 8px 30px 8px 10px;
  border-radius: 15px;
  border: 1px solid #d9d9da;
  font-size: 14px;
  background-color: #f5f7fa;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.search-icon img {
  width: 16px;
  height: 16px;
}

.list-content {
  flex: 1;
  overflow-y: auto;
}

.exercise-item {
  padding: 15px;
  border-bottom: 1px solid #f5f7fa;
  cursor: pointer;
  transition: background-color 0.2s;
}

.exercise-item:hover,
.exercise-item.active {
  background-color: #f5f7fa;
}

.exercise-title {
  font-weight: 600;
  margin-bottom: 5px;
  color: #1a1a1a;
}

.exercise-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.difficulty {
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 500;
}

.difficulty.easy {
  background-color: #e6f7e6;
  color: #28a745;
}

.difficulty.medium {
  background-color: #fff3cd;
  color: #ffc107;
}

.difficulty.hard {
  background-color: #f8d7da;
  color: #dc3545;
}

.exercise-type {
  color: #6c757d;
}

/* 右侧分析内容样式 */
.analysis-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  position: relative;
}

.exercise-details {
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 30px;
}

.detail-section {
  margin-bottom: 40px;
}

.detail-section h2 {
  font-size: 20px;
  color: #1a1a1a;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9da;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9da;
}

.section-header h2 {
  margin: 0;
  padding: 0;
  border: none;
}

.exercise-badges {
  display: flex;
  gap: 10px;
}

.difficulty-badge,
.type-badge {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
}

.difficulty-badge.easy {
  background-color: #e6f7e6;
  color: #28a745;
}

.difficulty-badge.medium {
  background-color: #fff3cd;
  color: #ffc107;
}

.difficulty-badge.hard {
  background-color: #f8d7da;
  color: #dc3545;
}

.type-badge {
  background-color: #e2e3e5;
  color: #1a1a1a;
}

.problem-content {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.problem-images {
  display: flex;
  gap: 15px;
  margin: 15px 0;
  overflow-x: auto;
}

.problem-image {
  max-width: 300px;
  max-height: 200px;
  border-radius: 5px;
  border: 1px solid #d9d9da;
}

.knowledge-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.knowledge-tag {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.knowledge-tag:hover {
  background-color: #333333;
}

.knowledge-explanation {
  background-color: #f5f7fa;
  border-radius: 10px;
  padding: 15px;
  font-size: 16px;
  line-height: 1.6;
}

.solution-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.solution-step {
  display: flex;
  gap: 15px;
}

.step-number {
  width: 30px;
  height: 30px;
  background-color: #1a1a1a;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 16px;
  margin: 0 0 10px 0;
  color: #1a1a1a;
}

.step-content p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
}

.formula-container {
  background-color: #f5f7fa;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  overflow-x: auto;
}

.formula {
  font-family: 'Sarasa UI SC', monospace;
  white-space: pre-wrap;
  font-size: 14px;
  line-height: 1.6;
}

.final-answer {
  margin-top: 30px;
  background-color: #e6f7e6;
  border-radius: 10px;
  padding: 15px;
}

.final-answer h3 {
  font-size: 16px;
  margin: 0 0 10px 0;
  color: #28a745;
}

.answer-box {
  font-weight: 600;
  line-height: 1.6;
}

.similar-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.similar-item {
  background-color: #f5f7fa;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.similar-item:hover {
  background-color: #e9ecef;
}

.similar-title {
  font-weight: 600;
  margin-bottom: 5px;
  color: #1a1a1a;
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
  color: #1a1a1a;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.scroll-link:hover {
  color: #0056b3;
}
</style>
