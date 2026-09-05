<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useWindowManager } from '~/composables/useWindowManager'
import { useThemeManager } from '~/composables/useThemeManager'
import { useSoundManager } from '~/composables/useSoundManager'

import DesktopIcon from './DesktopIcon.vue'
import Window from './Window.vue'
import Taskbar from './Taskbar.vue'
import Dock from './Dock.vue'
import TopPanel from './TopPanel.vue'
import MobileShell from './MobileShell.vue'

// Lazy-load app bodies for perfect initial load and zero bundle bloat
const AppAbout = defineAsyncComponent(() => import('./apps/AppAbout.vue'))
const AppProjects = defineAsyncComponent(() => import('./apps/AppProjects.vue'))
const AppExperience = defineAsyncComponent(() => import('./apps/AppExperience.vue'))
const AppSkills = defineAsyncComponent(() => import('./apps/AppSkills.vue'))
const AppTerminal = defineAsyncComponent(() => import('./apps/AppTerminal.vue'))
const AppContact = defineAsyncComponent(() => import('./apps/AppContact.vue'))
const AppResume = defineAsyncComponent(() => import('./apps/AppResume.vue'))

const { windows, openWindows } = useWindowManager()
const { currentTheme, initTheme, openThemeSwitcher } = useThemeManager()
const { initSound, playStartup } = useSoundManager()

const isMobile = ref(false)

function checkScreenSize() {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 768
  }
}

onMounted(() => {
  initTheme()
  initSound()
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize, { passive: true })

  // Play subtle nostalgic startup chord on first load
  setTimeout(() => {
    playStartup()
  }, 400)
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', checkScreenSize)
  }
})
</script>

<template>
  <ClientOnly>
    <!-- Simplified Mobile Tablet Mode on smaller screens -->
    <MobileShell v-if="isMobile" />

    <!-- Full Interactive Desktop OS on Desktop / Laptop screens -->
    <div
      v-else
      class="os-desktop-root select-none overflow-hidden"
      :data-os-theme="currentTheme"
    >
      <!-- macOS / Ubuntu Top Bar -->
      <TopPanel v-if="currentTheme === 'macos' || currentTheme === 'ubuntu'" />

      <!-- Desktop Icons Grid -->
      <div
        class="desktop-icons-area absolute top-8 left-4 bottom-14 flex flex-col flex-wrap gap-4 content-start z-10"
        :class="{
          'top-10': currentTheme === 'macos' || currentTheme === 'ubuntu',
          'left-16': currentTheme === 'ubuntu'
        }"
      >
        <DesktopIcon
          v-for="win in Object.values(windows)"
          :id="win.id"
          :key="win.id"
          :title="(win.title.split('-')[0] || '').trim()"
          :icon="win.icon"
        />

        <!-- Desktop Theme Settings Shortcut -->
        <div
          class="desktop-icon group flex flex-col items-center justify-center p-2 rounded cursor-pointer select-none transition-all w-24 h-24 text-center"
          title="Switch OS Theme"
          @click="openThemeSwitcher"
        >
          <div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-md border border-white/20 group-hover:scale-105 group-hover:bg-white/20 transition-transform mb-1.5 text-white">
            <UIcon
              name="i-lucide-palette"
              class="w-7 h-7 text-primary-400 drop-shadow-md"
            />
          </div>
          <span class="text-xs text-white font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2 px-1 rounded group-hover:bg-black/40">
            Switch Themes
          </span>
        </div>
      </div>

      <!-- Open Windows Layer -->
      <div class="windows-layer absolute inset-0 pointer-events-none z-20">
        <template
          v-for="win in openWindows"
          :key="win.id"
        >
          <div class="pointer-events-auto">
            <Window :window="win">
              <AppAbout v-if="win.id === 'about'" />
              <AppProjects v-else-if="win.id === 'projects'" />
              <AppExperience v-else-if="win.id === 'experience'" />
              <AppSkills v-else-if="win.id === 'skills'" />
              <AppTerminal v-else-if="win.id === 'terminal'" />
              <AppContact v-else-if="win.id === 'contact'" />
              <AppResume v-else-if="win.id === 'resume'" />
            </Window>
          </div>
        </template>
      </div>

      <!-- macOS Floating Dock -->
      <Dock v-if="currentTheme === 'macos'" />

      <!-- Windows 7 & Windows 8 Taskbar -->
      <Taskbar v-if="currentTheme === 'win7' || currentTheme === 'win8'" />
    </div>
  </ClientOnly>
</template>

<style scoped>
.os-desktop-root {
  background: var(--os-desktop-bg);
  background-size: cover;
  background-position: center;
}
</style>
