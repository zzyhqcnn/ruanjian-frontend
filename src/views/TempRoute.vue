<template>
  <div class="temp-page-container">
    <h1 class="page-title">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.temp-page-container {
  font-size: 40px;
  text-align: center;
  margin-top: 20vh;
  font-family: 'Noto Serif SC', serif;
}

.page-title {
  color: #1a1a1a;
  font-weight: normal;
}
</style>
