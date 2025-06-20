<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  placeholder?: string
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入搜索内容',
  value: '',
})

const emit = defineEmits(['update:value', 'search'])
const searchText = ref(props.value)

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  searchText.value = value
  emit('update:value', value)
}

const handleSearch = () => {
  emit('search', searchText.value)
}
</script>

<template>
  <div class="search-box">
    <div class="left-icon">
      <img src="../assets/icons/ai.svg" alt="AI" />
    </div>
    <input
      type="text"
      class="search-input"
      :placeholder="placeholder"
      :value="searchText"
      @input="handleInput"
    />
    <button class="search-button" @click="handleSearch">
      <img src="../assets/icons/search.svg" class="search-icon" alt="搜索" />
    </button>
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 500px;
  height: 4rem;
}

.left-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: 20px;
  margin-right: 10px;
}

.search-input {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #1a1a1a;
  padding: 0;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-right: 20px;
}

.search-button:hover {
  background-color: #333333;
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #ffffff;
  filter: brightness(0) invert(1);
}
</style>
