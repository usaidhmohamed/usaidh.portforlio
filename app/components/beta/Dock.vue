<script setup lang="ts">
import { useWindowManager, type AppId } from '~/composables/useWindowManager'
import { useSoundManager } from '~/composables/useSoundManager'
import { useThemeManager } from '~/composables/useThemeManager'

const { windows, openWindow, toggleMinimize } = useWindowManager()
const { playClick, playOpen } = useSoundManager()
const { openThemeSwitcher, isThemeSwitcherOpen } = useThemeManager()

function handleDockClick(id: AppId) {
  const win = windows.value[id]
  if (!win.isOpen) {
    playOpen()
    openWindow(id)
  } else {
    playClick()
    toggleMinimize(id)
  }
}
</script>

<template>
  <div class="macos-dock-container">
    <div
      v-for="win in Object.values(windows)"
      :key="win.id"
      class="group relative flex flex-col items-center cursor-pointer"
      @click="handleDockClick(win.id)"
    >
      <!-- Tooltip / Label on hover -->
      <div class="absolute -top-9 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm shadow-md">
        {{ (win.title.split('-')[0] || '').trim() }}
      </div>

      <!-- Icon with macOS style hover pop -->
      <div class="w-12 h-12 rounded-2xl bg-gradient-to-b from-white/20 to-white/5 border border-white/30 flex items-center justify-center text-white shadow-lg transition-all duration-200 group-hover:-translate-y-2 group-hover:scale-115">
        <UIcon
          :name="win.icon"
          class="w-6 h-6 drop-shadow-md"
        />
      </div>

      <!-- Active indicator dot -->
      <div
        class="w-1 h-1 rounded-full mt-1 transition-all"
        :class="win.isOpen ? 'bg-white shadow-[0_0_4px_#ffffff]' : 'bg-transparent'"
      />
    </div>

    <!-- Divider -->
    <div class="h-8 w-px bg-white/20 mx-1 mb-2" />

    <!-- System Preferences / Theme Switcher in macOS Dock -->
    <div
      class="group relative flex flex-col items-center cursor-pointer"
      @click="openThemeSwitcher"
    >
      <div class="absolute -top-9 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm shadow-md">
        System Preferences (Themes)
      </div>

      <div class="w-12 h-12 rounded-2xl bg-gradient-to-b from-blue-500/30 to-indigo-600/30 border border-white/30 flex items-center justify-center text-white shadow-lg transition-all duration-200 group-hover:-translate-y-2 group-hover:scale-115">
        <UIcon
          name="i-lucide-palette"
          class="w-6 h-6 text-cyan-300 drop-shadow-md"
        />
      </div>

      <div
        class="w-1 h-1 rounded-full mt-1 transition-all"
        :class="isThemeSwitcherOpen ? 'bg-white shadow-[0_0_4px_#ffffff]' : 'bg-transparent'"
      />
    </div>
  </div>
</template>

<style scoped>
.macos-dock-container {
  touch-action: manipulation;
}
</style>
