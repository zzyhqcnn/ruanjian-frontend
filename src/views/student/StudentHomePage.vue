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
  font-size: 10vw;
  font-weight: 900;
  color: #bec3de;
  z-index: 0;
  user-select: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-family: 'Noto Serif SC', serif;
  /* font-family: 'ZCOOL XiaoWei', serif; */
}

.content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  z-index: 1;
  gap: 8rem;
}

.quote-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
  position: absolute;
  bottom: 27%;
  left: 50%;
  transform: translateX(-50%);
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
