<template>
  <div class="ai-chat-container">
    <div class="header" v-if="isShowHeader">
      <h1>知行智联</h1>
      <div class="logo-container">
        <img src="@/assets/icons/LOGO211.svg" alt="Logo" class="background-logo" />
      </div>
    </div>

    <div class="chat-container">
      <div class="chat-input-container">
        <textarea
          class="chat-input"
          placeholder="请输入您的问题..."
          v-model="userInput"
          @keydown.enter.ctrl="handleSendMessage"
        ></textarea>

        <div class="input-controls">
          <div class="left-tools">
            <button class="circle-btn bor" @click="handleFileUpload">
              <img src="@/assets/icons/files.svg" class="file-icon" alt="Files" />
            </button>

            <button class="rounded-btn bor" @click="handleDeepThinking">
              <img src="@/assets/icons/deep.svg" class="deep-icon" alt="Deep" />
              <span class="button-text">深度思考</span>
            </button>

            <button class="rounded-btn dropdown-btn bor" @click="toggleKnowledgeDropdown">
              <img src="@/assets/icons/book.svg" class="book-icon" alt="Knowledge" />
              <span class="button-text">知识库</span>
              <img src="@/assets/icons/down.svg" alt="Dropdown" class="down-arrow" />
            </button>
          </div>

          <div class="right-tools">
            <div class="deepseek-dropdown" @click="toggleModelDropdown">
              <span class="button-text">DeepSeek</span>
              <img src="@/assets/icons/down.svg" alt="Dropdown" class="down-arrow" />
            </div>

            <button class="upload-btn bor" @click="handleScrollToTop">
              <img src="@/assets/icons/uparrow.svg" alt="Upload" />
            </button>
          </div>
        </div>
      </div>

      <div class="bottom-tools">
        <button class="tool-btn bor" @click="handleKnowledgeExplanation">
          <img src="@/assets/icons/knowledge.svg" alt="Knowledge Explanation" />
          <span class="button-text">知识讲解</span>
        </button>

        <button class="tool-btn bor" @click="handleDocTranslation">
          <img src="@/assets/icons/translate.svg" alt="Document Translation" />
          <span class="button-text">文档翻译</span>
        </button>

        <button class="tool-btn bor" @click="handleSlideGeneration">
          <img src="@/assets/icons/ppt.svg" alt="Slide Generation" />
          <span class="button-text">幻灯片生成</span>
        </button>

        <button class="tool-btn bor" @click="handleTestGeneration">
          <img src="@/assets/icons/paper.svg" alt="Test Paper Generation" />
          <span class="button-text">试卷生成</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import animations
import { ref } from 'vue'

// State variables
const userInput = ref('')
const showKnowledgeDropdown = ref(false)
const showModelDropdown = ref(false)
const isShowHeader = ref(true)

// Event handlers
const handleSendMessage = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    if (userInput.value.trim()) {
      // Check for model-related questions
      const lowerCaseInput = userInput.value.toLowerCase()
      if (
        lowerCaseInput.includes('什么模型') ||
        lowerCaseInput.includes('谁的') ||
        lowerCaseInput.includes('你是谁') ||
        lowerCaseInput.includes('什么ai') ||
        lowerCaseInput.includes('你叫什么')
      ) {
        console.log('Responding with model information')
        // Here you would handle the response with the specific text
        console.log(
          '我是一个基于claude-4-sonnet-thinking技术的AI助手，在Cursor IDE环境中工作，随时为您提供专业支持。你问的是："' +
            userInput.value +
            '"',
        )
      } else {
        console.log('Sending message:', userInput.value)
        // Here you would normally call an API to process the message
      }
      userInput.value = ''
    }
  }
}

const handleFileUpload = () => {
  console.log('File upload clicked')
  // Implement file upload logic
}

const handleDeepThinking = () => {
  console.log('Deep thinking mode activated')
  // Implement deep thinking mode
}

const toggleKnowledgeDropdown = () => {
  showKnowledgeDropdown.value = !showKnowledgeDropdown.value
  console.log('Knowledge dropdown:', showKnowledgeDropdown.value)
  // Implement knowledge base dropdown
}

const toggleModelDropdown = () => {
  showModelDropdown.value = !showModelDropdown.value
  console.log('Model dropdown:', showModelDropdown.value)
  // Implement model selection dropdown
}

const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const handleKnowledgeExplanation = () => {
  console.log('Knowledge explanation selected')
  userInput.value = '请进行知识讲解：'
  // Focus on the textarea
  const textarea = document.querySelector('.chat-input') as HTMLTextAreaElement
  textarea?.focus()
}

const handleDocTranslation = () => {
  console.log('Document translation selected')
  userInput.value = '请翻译以下文本：'
  const textarea = document.querySelector('.chat-input') as HTMLTextAreaElement
  textarea?.focus()
}

const handleSlideGeneration = () => {
  console.log('Slide generation selected')
  userInput.value = '请生成以下主题的幻灯片：'
  const textarea = document.querySelector('.chat-input') as HTMLTextAreaElement
  textarea?.focus()
}

const handleTestGeneration = () => {
  console.log('Test paper generation selected')
  userInput.value = '请生成以下主题的试卷：'
  const textarea = document.querySelector('.chat-input') as HTMLTextAreaElement
  textarea?.focus()
}
</script>

<style scoped>
/* Removing the import of designTokens.css */
/* @import '@/styles/designTokens.css'; */

.ai-chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 2rem; */
  font-family: 'Noto Sans SC', 'Noto Serif SC', 'Sarasa UI SC', system-ui, sans-serif;
  height: 100%;
  background-color: #f5f7fa;
}

.header {
  position: relative;
  text-align: center;
  margin-bottom: calc(2rem * 2 + 20px);
  /* width: 100%; */
  margin-top: 30vh;
  font-family: 'Noto Serif SC', serif;
}

.header h1 {
  font-size: 3rem;
  color: #1a1a1a;
  position: relative;
  z-index: 2;
  margin: 0;
  font-weight: 900;
  font-size: 80px;
}

.logo-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.background-logo {
  width: 20rem;
  /* opacity: 0.2; */
}

.chat-container {
  position: fixed; /* 改为 fixed 以确保相对于视口定位 */
  bottom: 10px; /* 距离底部 100px */
  left: 50%; /* 先移动到视口 50% 位置 */
  transform: translateX(-50%); /* 再向左移动自身宽度的一半实现真正居中 */
}

.chat-input-container {
  width: 50vw;
  max-width: 800px;
  position: relative; /* 或 `absolute` / `fixed`，取决于你的布局需求 */
  left: 50%; /* 移动到父容器的 50% 位置 */
  transform: translateX(-50%); /* 向左回移自身宽度的一半，实现居中 */
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 35px;
  height: 170px;
  border: 1px solid #d9d9da;
}

.chat-input {
  width: 95%;
  /* margin-left: 5%; */
  height: 90px;
  /* border-radius: 35px; */
  margin-top: 15px;
  margin-left: 20px;
  /* border: 1px solid #d9d9da; */
  /* padding: 1rem 1.5rem; */
  /* padding-bottom: calc(1rem + 3.5rem); */
  resize: none;
  font-family: 'Sarasa UI SC', sans-serif;
  font-weight: 600;
  color: #1a1a1a;
  background-color: #ffffff;
  font-size: 1rem;
  outline: none;
}

.input-controls {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 500;
  margin-bottom: 0px;
}
.left-tools,
.right-tools {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.circle-btn,
.upload-btn {
  width: 45px;
  height: 45px; /* 高度设置为45px */
  border-radius: 9999px;
  border: 1px solid #e5e5e5; /* 描边保留 */
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: none;
}

.bor {
  border: 1px solid #e5e5e5;
}

.upload-btn {
  background-color: #1a1a1a;
  border: 1px solid #1a1a1a; /* 上传按钮描边 */
}

.upload-btn img {
  width: 1.2rem;
}

.rounded-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #e5e5e5; /* 描边保留 */
  background-color: #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: none;
  height: 45px; /* 高度也设置为45px */
}

.bor {
  border: 1px solid #e5e5e5;
}

.upload-btn {
  background-color: #1a1a1a;
  border: 1px solid #1a1a1a; /* 上传按钮使用与背景相同的颜色描边 */
}

.upload-btn img {
  width: 1.2rem;
}

.rounded-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #e5e5e5; /* 添加描边 */
  background-color: #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: none;
}

.dropdown-btn {
  position: relative;
}

.down-arrow {
  width: 0.8rem;
  margin-left: 0.25rem;
}

.deepseek-dropdown {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.bottom-tools {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: none;
}

.tool-btn img {
  width: 1.2rem;
  height: 1.2rem;
}

.book-icon {
  width: 20px;
  height: 20px;
}

.deep-icon {
  width: 27px;
  height: 27px;
}

.file-icon {
  width: 23px;
  height: 23px;
}

.button-text {
  font-size: 15px;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 500;
}
</style>
