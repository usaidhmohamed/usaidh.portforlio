<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWindowManager, type AppId } from '~/composables/useWindowManager'
import { useThemeManager } from '~/composables/useThemeManager'
import { useSoundManager } from '~/composables/useSoundManager'
import ThemeSwitcher from './ThemeSwitcher.vue'

// Import the app window components
import AppAbout from './apps/AppAbout.vue'
import AppProjects from './apps/AppProjects.vue'
import AppExperience from './apps/AppExperience.vue'
import AppSkills from './apps/AppSkills.vue'
import AppTerminal from './apps/AppTerminal.vue'
import AppContact from './apps/AppContact.vue'
import AppResume from './apps/AppResume.vue'

const { windows } = useWindowManager()
const { currentTheme } = useThemeManager()
const { playOpen, playClose, isMuted, toggleMute } = useSoundManager()

const activeMobileApp = ref<AppId | null>('about')
const currentApp = computed(() => activeMobileApp.value ? windows.value[activeMobileApp.value] : null)

function openApp(id: AppId) {
  playOpen()
  activeMobileApp.value = id
}

function closeApp() {
  playClose()
  activeMobileApp.value = null
}
</script>

<template>
  <div class="mobile-os-shell flex flex-col h-[100dvh] w-screen overflow-hidden text-white select-none">
    <!-- Mobile OS Header -->
    <header class="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-lg border-b border-white/10 z-50 shrink-0">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center font-bold text-xs shadow-md">
          UM
        </div>
        <div>
          <h1 class="text-xs font-bold leading-none">
            Usaidh OS
          </h1>
          <span class="text-[10px] text-slate-400 capitalize">{{ currentTheme }} Edition</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <ThemeSwitcher />
        <button
          class="p-1 rounded bg-white/10 text-white"
          :title="isMuted ? 'Unmute' : 'Mute'"
          @click="toggleMute"
        >
          <UIcon
            :name="isMuted ? 'i-lucide-volume-x' : 'i-lucide-volume-2'"
            class="w-4 h-4"
          />
        </button>
        <NuxtLink
          to="/"
          class="px-2 py-1 rounded bg-white/10 text-[11px] font-medium"
        >
          Classic
        </NuxtLink>
      </div>
    </header>

    <!-- App Grid / Launcher -->
    <main class="flex-1 overflow-y-auto p-4 flex flex-col justify-center">
      <div class="grid grid-cols-3 gap-4 max-w-sm mx-auto w-full py-4">
        <button
          v-for="win in Object.values(windows)"
          :key="win.id"
          class="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 active:scale-95 transition-transform"
          @click="openApp(win.id)"
        >
          <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-2 shadow-inner text-primary-400">
            <UIcon
              :name="win.icon"
              class="w-6 h-6"
            />
          </div>
          <span class="text-[11px] font-medium text-center line-clamp-1">
            {{ (win.title.split('-')[0] || '').trim() }}
          </span>
        </button>
      </div>
    </main>

    <!-- Full-screen Mobile App Sheet -->
    <div
      v-if="activeMobileApp && currentApp"
      class="fixed inset-0 z-[1000] bg-slate-900 flex flex-col animate-in slide-in-from-bottom duration-200"
    >
      <!-- Sheet Top Bar -->
      <div class="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10 shrink-0">
        <div class="flex items-center gap-2">
          <UIcon
            :name="currentApp.icon"
            class="w-4 h-4 text-primary-400"
          />
          <h2 class="text-xs font-semibold truncate max-w-[200px]">
            {{ currentApp.title }}
          </h2>
        </div>

        <button
          class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium"
          @click="closeApp"
        >
          <UIcon
            name="i-lucide-x"
            class="w-3.5 h-3.5"
          />
          <span>Close</span>
        </button>
      </div>

      <!-- App Content Container -->
      <div class="flex-1 overflow-y-auto">
        <AppAbout v-if="activeMobileApp === 'about'" />
        <AppProjects v-else-if="activeMobileApp === 'projects'" />
        <AppExperience v-else-if="activeMobileApp === 'experience'" />
        <AppSkills v-else-if="activeMobileApp === 'skills'" />
        <AppTerminal v-else-if="activeMobileApp === 'terminal'" />
        <AppContact v-else-if="activeMobileApp === 'contact'" />
        <AppResume v-else-if="activeMobileApp === 'resume'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-os-shell {
  background: var(--os-desktop-bg);
  background-size: cover;
  background-position: center;
}
</style>
