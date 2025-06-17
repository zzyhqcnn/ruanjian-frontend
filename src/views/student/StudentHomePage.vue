<template>
  <div class="student-home">
    <div class="background-text">苏轼</div>

    <div class="content">
      <div class="quote-container">
        <h1 class="quote">「粗缯大布裹生涯，腹有诗书气自华」</h1>
      </div>

      <div class="actions">
        <InteractiveHoverButton text="每日一题" class="action-button" />
        <InteractiveHoverButton text="好文推荐" class="action-button" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InteractiveHoverButton from '@/components/buttons/InteractiveHoverButton.vue'
</script>

<style scoped>
.student-home {
  position: relative;
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
}

.background-text {
  position: absolute;
  font-size: 30vw;
  font-weight: 900;
  color: rgba(240, 240, 245, 0.6);
  z-index: 0;
  user-select: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-family: 'Noto Serif SC', serif;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
}

.quote-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  width: 100%;
}

.quote {
  font-size: 3rem;
  font-weight: bold;
  color: #1a1a1a;
  letter-spacing: 0.05em;
  line-height: 1.4;
  font-family: 'Noto Serif SC', serif;
  margin: 0;
  position: relative;
}

.actions {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
}

.action-button {
  min-width: 160px;
}

@media (max-width: 768px) {
  .quote {
    font-size: 2rem;
  }

  .background-text {
    font-size: 50vw;
  }

  .actions {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
