<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowManager, type AppId } from '~/composables/useWindowManager'
import { useThemeManager } from '~/composables/useThemeManager'
import { useSoundManager } from '~/composables/useSoundManager'
import ThemeSwitcher from './ThemeSwitcher.vue'

const { windows, activeWindowId, openWindow, toggleMinimize } = useWindowManager()
const { currentTheme } = useThemeManager()
const { playClick, toggleMute, isMuted } = useSoundManager()

const isStartMenuOpen = ref(false)
const currentTime = ref('')

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function handleAppClick(id: AppId) {
  playClick()
  toggleMinimize(id)
}

function handleStartApp(id: AppId) {
  playClick()
  openWindow(id)
  isStartMenuOpen.value = false
}
</script>

<template>
  <div
    class="taskbar-container fixed bottom-0 left-0 right-0 z-[9990] flex items-center justify-between px-2 select-none border-t"
    :style="{
      height: 'var(--os-taskbar-height)',
      background: 'var(--os-taskbar-bg)',
      borderColor: 'var(--os-taskbar-border)',
      color: 'var(--os-taskbar-color)'
    }"
  >
    <!-- Start Button & Running App Tabs -->
    <div class="flex items-center gap-1.5 h-full overflow-hidden">
      <!-- Windows 7 Start Orb -->
      <div
        v-if="currentTheme === 'win7'"
        class="win7-start-orb mr-2 shrink-0"
        title="Start"
        @click="isStartMenuOpen = !isStartMenuOpen"
      >
        <UIcon
          name="i-lucide-layout-grid"
          class="w-4 h-4 text-white drop-shadow"
        />
      </div>

      <!-- Windows 8 Start Button -->
      <div
        v-if="currentTheme === 'win8'"
        class="win8-start-btn mr-1 shrink-0 px-3"
        title="Start"
        @click="isStartMenuOpen = !isStartMenuOpen"
      >
        <UIcon
          name="i-lucide-layout-grid"
          class="w-5 h-5"
        />
      </div>

      <!-- Open Windows Tabs -->
      <div class="flex items-center gap-1 h-full overflow-x-auto py-1">
        <button
          v-for="win in Object.values(windows).filter(w => w.isOpen)"
          :key="win.id"
          class="flex items-center gap-2 px-3 h-full max-w-[180px] rounded text-xs transition-all truncate border"
          :class="[
            activeWindowId === win.id && !win.isMinimized
              ? 'bg-white/20 border-white/40 shadow-inner font-semibold text-white'
              : 'bg-white/5 border-transparent hover:bg-white/10 text-slate-300'
          ]"
          @click="handleAppClick(win.id)"
        >
          <UIcon
            :name="win.icon"
            class="w-3.5 h-3.5 shrink-0"
          />
          <span class="truncate">{{ (win.title.split('-')[0] || '').trim() }}</span>
        </button>
      </div>
    </div>

    <!-- System Tray (Right) -->
    <div class="flex items-center gap-2 text-xs">
      <ThemeSwitcher />

      <!-- Sound toggle -->
      <button
        class="p-1 rounded hover:bg-white/10 transition-colors"
        :title="isMuted ? 'Unmute' : 'Mute'"
        @click="toggleMute"
      >
        <UIcon
          :name="isMuted ? 'i-lucide-volume-x' : 'i-lucide-volume-2'"
          class="w-4 h-4"
        />
      </button>

      <!-- Return to Classic Site Button -->
      <NuxtLink
        to="/"
        class="flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors border border-white/10"
        title="Switch back to classic portfolio"
      >
        <UIcon
          name="i-lucide-undo-2"
          class="w-3 h-3 text-primary-400"
        />
        <span>Classic Site</span>
      </NuxtLink>

      <!-- Clock -->
      <div class="px-2 py-1 font-mono text-[11px] font-medium tracking-wide">
        {{ currentTime }}
      </div>
    </div>

    <!-- Start Menu Popup -->
    <div
      v-if="isStartMenuOpen"
      class="fixed inset-0 z-[9995]"
      @click="isStartMenuOpen = false"
    >
      <div
        class="absolute bottom-12 left-2 w-72 bg-slate-900/95 border border-white/20 rounded-xl p-3 shadow-2xl backdrop-blur-2xl text-white animate-in fade-in slide-in-from-bottom-2 duration-150"
        @click.stop
      >
        <div class="flex items-center gap-3 p-2 mb-2 border-b border-white/10">
          <div class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white shadow-md">
            UM
          </div>
          <div>
            <div class="font-bold text-sm">
              Usaidh Mohamed
            </div>
            <div class="text-[10px] text-slate-400">
              Frontend Technical Lead
            </div>
          </div>
        </div>

        <div class="space-y-1">
          <button
            v-for="win in Object.values(windows)"
            :key="win.id"
            class="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/10 transition-colors text-left text-xs"
            @click="handleStartApp(win.id)"
          >
            <UIcon
              :name="win.icon"
              class="w-4 h-4 text-primary-400"
            />
            <span>{{ (win.title.split('-')[0] || '').trim() }}</span>
          </button>
        </div>

        <div class="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 font-medium"
          >
            <UIcon
              name="i-lucide-arrow-left"
              class="w-3.5 h-3.5"
            />
            <span>Exit to Classic Site</span>
          </NuxtLink>
          <button
            class="text-xs text-slate-400 hover:text-white"
            @click="isStartMenuOpen = false"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.taskbar-container {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
</style>
