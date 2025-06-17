<template>
  <button
    ref="buttonRef"
    :class="
      cn(
        'group relative cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold',
        props.class,
      )
    "
    :style="{
      '--button-color': color,
      '--button-text-color': textColor,
      '--button-bg-color': backgroundColor,
      width: width || 'auto',
      'background-color': backgroundColor || '',
      'border-color': backgroundColor || '',
    }"
  >
    <div class="flex items-center gap-2">
      <div
        class="size-2 scale-100 rounded-lg transition-all duration-300 group-hover:scale-[100.8]"
        :style="{ backgroundColor: 'var(--button-color)' }"
      ></div>
      <span
        class="inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
      >
        {{ text }}
      </span>
    </div>

    <div
      class="absolute top-0 z-10 flex size-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100"
      :style="{ color: 'var(--button-text-color)' }"
    >
      <span class="whitespace-nowrap">{{ text }}</span>
      <slot name="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-right"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { ref, computed } from 'vue'

interface Props {
  text?: string
  class?: string
  width?: string
  color?: string
  textColor?: string
  backgroundColor?: string // Added prop for background color
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Button',
  color: '#007AFF',
  textColor: '#FFFFFF',
  backgroundColor: '', // Default to no background color
})

const buttonRef = ref<HTMLButtonElement>()
const customWidth = computed(() => props.width)
</script>

<style scoped>
button {
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

button:hover {
  border-color: var(--button-color);
  background-color: var(--button-hover-color, inherit);
}

button:hover .group-hover\:scale-$$100\.8$$ {
  background-color: var(--button-color);
}
</style>
