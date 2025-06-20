<template>
  <div class="interaction-page">
    <div class="interaction-container">
      <!-- 左侧会话列表 -->
      <div class="conversations-sidebar">
        <div class="sidebar-header">
          <div class="search-container">
            <input type="text" placeholder="搜索" class="search-input" />
            <span class="search-icon">
              <img src="@/assets/icons/search.svg" alt="Search" />
            </span>
          </div>
          <button class="add-conversation-btn">
            <span class="plus-icon">+</span>
          </button>
        </div>

        <div class="conversations-list">
          <div
            v-for="(item, index) in conversationsList"
            :key="index"
            class="conversation-item"
            :class="{ active: activeConversation === index }"
            @click="setActiveConversation(index)"
          >
            <div class="avatar">
              <img :src="item.avatar" alt="Teacher Avatar" />
            </div>
            <div class="conversation-info">
              <div class="conversation-name">{{ item.name }}</div>
              <div class="conversation-preview">{{ item.preview }}</div>
            </div>
            <div class="conversation-meta">
              <div class="conversation-time">{{ item.time }}</div>
              <div v-if="item.unread" class="unread-count">{{ item.unread }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧聊天区域 -->
      <div class="chat-area">
        <div class="chat-container" ref="chatContainer">
          <div v-if="messages.length > 0" class="chat-messages">
            <div
              v-for="(message, idx) in messages"
              :key="idx"
              class="message"
              :class="{ 'message-sent': message.sent, 'message-received': !message.sent }"
            >
              <div class="message-content">
                {{ message.content }}
              </div>
              <div class="message-time">{{ message.time }}</div>
            </div>
          </div>
          <div v-else class="empty-chat">
            <div class="empty-chat-content">
              <div class="arrow-line"></div>
              <p>选择一位老师开始交流</p>
            </div>
          </div>
        </div>

        <div class="message-input-area">
          <button class="attachment-btn">
            <img src="@/assets/icons/attachment.svg" alt="Attachment" />
          </button>
          <div class="input-container">
            <textarea
              class="message-input"
              placeholder="输入消息..."
              v-model="newMessage"
              @keyup.enter="sendMessage"
            ></textarea>
          </div>
          <button class="send-btn" @click="sendMessage">
            <img src="@/assets/icons/send.svg" alt="Send" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

// 定义消息接口
interface Message {
  content: string
  time: string
  sent: boolean
}

// 定义会话接口
interface Conversation {
  name: string
  avatar: string
  preview: string
  time: string
  unread?: number
}

// 活跃的会话索引
const activeConversation = ref(0)
const chatContainer = ref<HTMLElement | null>(null)

// 示例会话列表数据
const conversationsList = ref<Conversation[]>([
  {
    name: '张老师',
    avatar: '/src/assets/avatar.png',
    preview: '很好',
    time: '20:11',
    unread: 10,
  },
  {
    name: '张老师',
    avatar: '/src/assets/avatar.png',
    preview: '很好',
    time: '20:11',
    unread: 10,
  },
  {
    name: '张老师',
    avatar: '/src/assets/avatar.png',
    preview: '很好',
    time: '20:11',
    unread: 10,
  },
  {
    name: '张老师',
    avatar: '/src/assets/avatar.png',
    preview: '很好',
    time: '20:11',
    unread: 10,
  },
  {
    name: '张老师',
    avatar: '/src/assets/avatar.png',
    preview: '很好',
    time: '20:11',
    unread: 10,
  },
  {
    name: '张老师',
    avatar: '/src/assets/avatar.png',
    preview: '很好',
    time: '20:11',
    unread: 10,
  },
  {
    name: '张老师',
    avatar: '/src/assets/avatar.png',
    preview: '很好',
    time: '20:11',
    unread: 10,
  },
])

// 聊天消息数据
const messages = ref<Message[]>([])
const newMessage = ref('')

// 设置当前活跃会话
const setActiveConversation = (index: number) => {
  activeConversation.value = index

  // 模拟加载该会话的消息
  messages.value = []
}

// 发送消息
const sendMessage = () => {
  if (!newMessage.value.trim()) return

  const now = new Date()
  const timeString = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`

  messages.value.push({
    content: newMessage.value,
    time: timeString,
    sent: true,
  })

  newMessage.value = ''

  // 滚动到底部
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })

  // 模拟老师回复
  setTimeout(() => {
    messages.value.push({
      content: '收到你的消息，我会尽快回复。',
      time: timeString,
      sent: false,
    })

    // 更新会话列表预览
    conversationsList.value[activeConversation.value].preview = '收到你的消息，我会尽快回复。'
    conversationsList.value[activeConversation.value].time = timeString

    // 滚动到底部
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })
  }, 1000)
}

onMounted(() => {
  // 初始化聊天容器
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
})
</script>

<style scoped>
.interaction-page {
  height: calc(100vh - 69px);
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.interaction-container {
  display: flex;
  width: 90%;
  height: 100%;
  max-height: calc(100vh - 109px);
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 左侧会话列表样式 */
.conversations-sidebar {
  width: 300px;
  border-right: 1px solid #d9d9da;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #d9d9da;
}

.search-container {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 8px 30px 8px 10px;
  border-radius: 15px;
  border: 1px solid #d9d9da;
  font-size: 14px;
  background-color: #f5f7fa;
  font-family: 'Noto Sans SC', sans-serif;
}

.search-input:focus {
  outline: none;
  border-color: #1a1a1a;
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

.add-conversation-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #1a1a1a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  border: none;
  cursor: pointer;
}

.plus-icon {
  font-size: 20px;
  line-height: 1;
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f5f7fa;
  cursor: pointer;
  transition: background-color 0.2s;
}

.conversation-item:hover,
.conversation-item.active {
  background-color: #f5f7fa;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.conversation-info {
  flex: 1;
  min-width: 0;
}

.conversation-name {
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-preview {
  color: #666666;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 10px;
}

.conversation-time {
  font-size: 12px;
  color: #999999;
  margin-bottom: 5px;
}

.unread-count {
  background-color: #0085ff;
  color: white;
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 右侧聊天区域 */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.chat-messages {
  display: flex;
  flex-direction: column;
}

.message {
  max-width: 80%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
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

.message-sent {
  align-self: flex-end;
}

.message-received {
  align-self: flex-start;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 16px;
  background-color: #1a1a1a;
  color: #ffffff;
}

.message-received .message-content {
  background-color: #f5f7fa;
  color: #1a1a1a;
}

.message-time {
  font-size: 12px;
  color: #999999;
  margin-top: 5px;
  align-self: flex-end;
}

.message-received .message-time {
  align-self: flex-start;
}

.empty-chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999999;
}

.empty-chat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arrow-line {
  width: 100px;
  height: 2px;
  background-color: #d9d9da;
  position: relative;
  margin-bottom: 20px;
}

.arrow-line:after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  border-top: 2px solid #d9d9da;
  border-right: 2px solid #d9d9da;
}

.message-input-area {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-top: 1px solid #d9d9da;
}

.attachment-btn,
.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.attachment-btn:hover,
.send-btn:hover {
  background-color: #f5f7fa;
}

.attachment-btn img,
.send-btn img {
  width: 24px;
  height: 24px;
}

.input-container {
  flex: 1;
  margin: 0 10px;
}

.message-input {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #d9d9da;
  padding: 10px 15px;
  font-size: 16px;
  resize: none;
  font-family: 'Noto Sans SC', sans-serif;
  background-color: #f5f7fa;
}

.message-input:focus {
  outline: none;
  border-color: #1a1a1a;
}
</style>
