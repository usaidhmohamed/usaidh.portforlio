<script setup lang="ts">
import { ref } from 'vue'
import type { AppId } from '~/composables/useWindowManager'
import { useWindowManager } from '~/composables/useWindowManager'
import { useSoundManager } from '~/composables/useSoundManager'

const props = defineProps<{
  id: AppId
  title: string
  icon: string
}>()

const { openWindow } = useWindowManager()
const { playClick, playOpen } = useSoundManager()

const isSelected = ref(false)
let clickTimer: ReturnType<typeof setTimeout> | null = null

function handleClick() {
  playClick()
  if (clickTimer) {
    // Double click detected
    clearTimeout(clickTimer)
    clickTimer = null
    playOpen()
    openWindow(props.id)
    isSelected.value = false
  } else {
    isSelected.value = true
    clickTimer = setTimeout(() => {
      clickTimer = null
    }, 300)
  }
}
</script>

<template>
  <div
    class="desktop-icon group flex flex-col items-center justify-center p-2 rounded cursor-pointer select-none transition-all w-24 h-24 text-center"
    :class="{ 'bg-white/20 ring-1 ring-white/40': isSelected }"
    @click.stop="handleClick"
  >
    <div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-md border border-white/20 group-hover:scale-105 group-hover:bg-white/20 transition-transform mb-1.5 text-white">
      <UIcon
        :name="icon"
        class="w-7 h-7 drop-shadow-md"
      />
    </div>
    <span class="text-xs text-white font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2 px-1 rounded group-hover:bg-black/40">
      {{ title }}
    </span>
  </div>
</template>

<style scoped>
.desktop-icon {
  touch-action: manipulation;
}
</style>
