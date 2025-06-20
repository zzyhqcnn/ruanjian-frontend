<template>
  <div class="ai-chat-container">
    <div class="header" v-if="isShowHeader">
      <h1>知行智联</h1>
      <div class="logo-container">
        <img src="@/assets/icons/LOGO211.svg" alt="Logo" class="background-logo" />
      </div>
    </div>

    <!-- Chat messages display area -->
    <div class="messages-container" v-if="messages.length > 0">
      <div v-for="(message, index) in messages" :key="index" class="message-wrapper">
        <!-- User message -->
        <div v-if="message.isUser" class="user-message">
          <div class="message-content">{{ message.text }}</div>
          <div class="user-avatar">
            <img src="@/assets/avatar.png" alt="User Avatar" />
          </div>
        </div>

        <!-- AI response -->
        <div v-else class="ai-message">
          <div class="message-content">{{ message.text }}</div>
        </div>
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

            <button
              class="rounded-btn bor"
              :class="{ 'deep-thinking-active': isDeepThinkingActive }"
              @click="handleDeepThinking"
            >
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

            <button class="upload-btn bor" @click="handleClickSend">
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
const isDeepThinkingActive = ref(false)

// 消息数据结构
interface ChatMessage {
  text: string
  isUser: boolean
  timestamp: number
}

// 聊天消息列表
const messages = ref<ChatMessage[]>([])

// 获取AI回复
const getAIResponse = (question: string): string => {
  // 检查是否是询问模型或身份的问题
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
    return '我是由claude-4-sonnet-thinking模型支持的智能助手，专为Cursor IDE设计，可以帮您解决各类编程难题，请告诉我你需要什么帮助？'
  }

  if (question.includes('报文转发')) {
    return `报文转发 (Message Forwarding) 是计算机网络中的一种数据传输方式，属于报文交换 (Message Switching) 的核心机制。它指的是网络节点（如路由器、交换机）在接收到完整的报文 (Message) 后，将其存储、检查，并选择合适的路径转发到下一跳节点，直到报文最终到达目的地。

报文转发的核心特点:
1. 以完整报文为单位传输
   • 发送方将整个数据块（如文件、邮件、电报）作为一个完整的报文发送，而不是分割成更小的分组(Packet)。
   • 例如: 发送一封长邮件时，整个邮件内容作为一个报文传输，而不是拆分成多个数据包。
2. 存储-转发 (Store-and-Forward) 机制
   • 每个中间节点必须完整接收并存储整个报文，然后才能开始转发到下一跳。
   • 如果报文很大（如1GB文件），节点需要足够的存储空间（内存/磁盘）来缓存整个报文。
3. 独占链路资源
   • 在报文传输期间，发送方到接收方路径上的链路会被独占，其他通信无法使用这些链路，直到整个报文传输完成。`
  }

  // 默认回复
  return '您好，我是AI助手，很高兴为您解答问题。请问有什么可以帮助您的？'
}

// 处理消息发送逻辑
const processSendMessage = () => {
  if (userInput.value.trim()) {
    // 发送消息后隐藏头部
    isShowHeader.value = false

    const userQuestion = userInput.value

    // 添加用户消息到列表
    messages.value.push({
      text: userQuestion,
      isUser: true,
      timestamp: Date.now(),
    })

    userInput.value = ''

    // 添加AI回复
    setTimeout(() => {
      messages.value.push({
        text: getAIResponse(userQuestion),
        isUser: false,
        timestamp: Date.now(),
      })
    }, 500) // 短暂延迟模拟思考
  }
}

// 键盘事件处理
const handleSendMessage = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    processSendMessage()
  }
}

// 点击发送按钮事件
const handleClickSend = () => {
  processSendMessage()
}

const handleFileUpload = () => {
  console.log('File upload clicked')
  // Implement file upload logic
}

const handleDeepThinking = () => {
  isDeepThinkingActive.value = !isDeepThinkingActive.value
  console.log('Deep thinking mode:', isDeepThinkingActive.value ? 'activated' : 'deactivated')
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

/* 消息显示区域样式 */
.messages-container {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 300px);
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-message {
  align-self: flex-end;
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
}

.ai-message {
  align-self: flex-start;
  margin-left: 50px; /* 对齐用户头像下方 */
  margin-bottom: 5px;
  max-width: 80%;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 16px;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.5;
}

.user-message .message-content {
  background-color: #1a1a1a;
  color: white;
  border-radius: 18px 18px 4px 18px;
  margin-right: 10px;
}

.ai-message .message-content {
  background-color: #f5f7fa;
  color: #1a1a1a;
  border-radius: 18px 18px 18px 4px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  margin-left: 25px;
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
  transition: all 0.3s ease; /* 添加过渡动画 */
}

/* 深度思考按钮激活样式 */
.deep-thinking-active {
  background-color: #1a1a1a !important;
  border-color: #1a1a1a !important;
}

.deep-thinking-active .button-text {
  color: #ffffff !important;
}

.deep-thinking-active .deep-icon {
  filter: brightness(0) invert(1) !important;
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
  transition: filter 0.3s ease; /* 平滑过渡 */
}

.file-icon {
  width: 23px;
  height: 23px;
}

.button-text {
  font-size: 15px;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 500;
  transition: color 0.3s ease; /* 添加颜色过渡动画 */
}
</style>
