<template>
  <div
    class="student-home"
    v-motion
    :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
    :enter="{
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 300,
        duration: 800,
        ease: 'easeInOut',
      },
    }"
  >
    <!-- <ParticlesBg
      class="particles-background"
      :quantity="250"
      :ease="60"
      :color="'#787878'"
      :staticity="20"
    /> -->

    <SnowfallBg
      color="1a1a1a"
      class="particles-background"
      :min-radius="0.2"
      :max-radius="2"
      :speed="0.3"
      :quantity="100"
    />

    <div class="background-text">{{ homeData.backgroundText }}</div>

    <div class="content">
      <div class="quote-container">
        <h1 class="quote">{{ homeData.quote }}</h1>
      </div>

      <div class="actions">
        <InteractiveHoverButton
          text="每日一题"
          class="action-button"
          color="#ffffff"
          textColor="#1a1a1a"
          backgroundColor="#1a1a1a"
        />
        <InteractiveHoverButton
          text="好文推荐"
          class="action-button"
          color="#ffffff"
          textColor="#1a1a1a"
          backgroundColor="#1a1a1a"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InteractiveHoverButton from '@/components/buttons/InteractiveHoverButton.vue'
import ParticlesBg from '@/components/ParticlesBg.vue'
import SnowfallBg from '@/components/SnowfallBg.vue'
import { homePageData } from '@/data/student'
import { ref } from 'vue'

// Use imported data
const homeData = ref(homePageData)
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
  color: #bec3dec5;
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

.particles-background {
  position: absolute;
  inset: 0;
  z-index: 0;
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
  font-size: min(4.3rem, 10vw);
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
  /* border: 1px solid #575757; */
  font-family: 'Noto Sans SC', sans-serif;
  /* background-color: #1a1a1a; */
  color: #ffffff;
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
