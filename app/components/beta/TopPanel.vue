<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowManager, type AppId } from '~/composables/useWindowManager'
import { useThemeManager } from '~/composables/useThemeManager'
import { useSoundManager } from '~/composables/useSoundManager'
import ThemeSwitcher from './ThemeSwitcher.vue'

const { windows, openWindow, toggleMinimize } = useWindowManager()
const { currentTheme, openThemeSwitcher } = useThemeManager()
const { playClick, playOpen, toggleMute, isMuted } = useSoundManager()

const currentTime = ref('')
const currentDate = ref('')
const isAppleMenuOpen = ref(false)

function updateClock() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  currentDate.value = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
}

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function handleAppClick(id: AppId) {
  const win = windows.value[id]
  if (!win.isOpen) {
    playOpen()
    openWindow(id)
  } else {
    playClick()
    toggleMinimize(id)
  }
}

function handleAppleAction(action: 'about' | 'themes') {
  playClick()
  isAppleMenuOpen.value = false
  if (action === 'about') {
    openWindow('about')
  } else if (action === 'themes') {
    openThemeSwitcher()
  }
}
</script>

<template>
  <!-- macOS Top Menu Bar -->
  <div
    v-if="currentTheme === 'macos'"
    class="macos-menubar"
  >
    <div class="flex items-center gap-3">
      <!-- Apple Logo Dropdown -->
      <div class="relative">
        <span
          class="font-bold text-sm cursor-pointer hover:opacity-75 px-1 py-0.5 rounded"
          title="Apple Menu"
          @click.stop="isAppleMenuOpen = !isAppleMenuOpen"
        >
          
        </span>

        <div
          v-if="isAppleMenuOpen"
          class="fixed inset-0 z-[100000]"
          @click="isAppleMenuOpen = false"
        >
          <div
            class="absolute top-6 left-2 w-56 bg-neutral-100/95 text-neutral-900 border border-neutral-300 rounded-lg shadow-xl p-1 text-xs backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100"
            @click.stop
          >
            <button
              class="w-full text-left px-3 py-1.5 rounded hover:bg-blue-600 hover:text-white flex items-center justify-between"
              @click="handleAppleAction('about')"
            >
              <span>About This Portfolio</span>
              <UIcon
                name="i-lucide-user"
                class="w-3.5 h-3.5 opacity-70"
              />
            </button>
            <button
              class="w-full text-left px-3 py-1.5 rounded hover:bg-blue-600 hover:text-white flex items-center justify-between"
              @click="handleAppleAction('themes')"
            >
              <span>System Settings: Themes...</span>
              <UIcon
                name="i-lucide-palette"
                class="w-3.5 h-3.5 opacity-70"
              />
            </button>
            <div class="h-px bg-neutral-200 my-1" />
            <NuxtLink
              to="/"
              class="w-full text-left px-3 py-1.5 rounded hover:bg-blue-600 hover:text-white flex items-center justify-between block"
            >
              <span>Exit to Classic Site</span>
              <UIcon
                name="i-lucide-log-out"
                class="w-3.5 h-3.5 opacity-70"
              />
            </NuxtLink>
          </div>
        </div>
      </div>

      <span class="font-bold">Portfolio</span>
      <span
        class="cursor-pointer hover:opacity-75"
        @click="openWindow('about')"
      >About</span>
      <span
        class="cursor-pointer hover:opacity-75"
        @click="openWindow('projects')"
      >Projects</span>
      <span
        class="cursor-pointer hover:opacity-75"
        @click="openThemeSwitcher"
      >Themes</span>
      <span
        class="cursor-pointer hover:opacity-75"
        @click="openWindow('terminal')"
      >Terminal</span>
    </div>

    <div class="flex items-center gap-3">
      <ThemeSwitcher />

      <!-- Sound toggle -->
      <button
        class="p-0.5 rounded hover:bg-black/10 transition-colors"
        :title="isMuted ? 'Unmute' : 'Mute'"
        @click="toggleMute"
      >
        <UIcon
          :name="isMuted ? 'i-lucide-volume-x' : 'i-lucide-volume-2'"
          class="w-3.5 h-3.5"
        />
      </button>

      <!-- Classic Link -->
      <NuxtLink
        to="/"
        class="px-2 py-0.5 rounded bg-black/10 hover:bg-black/20 text-xs font-medium transition-colors"
      >
        Classic Site
      </NuxtLink>

      <span class="text-xs font-medium">{{ currentDate }} {{ currentTime }}</span>
    </div>
  </div>

  <!-- Ubuntu 22 Top GNOME Panel -->
  <div
    v-if="currentTheme === 'ubuntu'"
    class="ubuntu-top-panel"
  >
    <div class="flex items-center gap-3">
      <span
        class="ubuntu-activities"
        @click="handleAppClick('about')"
      >
        Activities
      </span>
      <span
        class="text-xs text-slate-300 hover:text-white cursor-pointer"
        @click="openThemeSwitcher"
      >
        Themes & Appearance
      </span>
    </div>

    <!-- Centered Date/Time -->
    <div class="text-xs font-medium text-slate-200">
      {{ currentDate }} {{ currentTime }}
    </div>

    <!-- Right Tray -->
    <div class="flex items-center gap-3">
      <ThemeSwitcher />

      <button
        class="p-1 rounded hover:bg-white/10 transition-colors"
        :title="isMuted ? 'Unmute' : 'Mute'"
        @click="toggleMute"
      >
        <UIcon
          :name="isMuted ? 'i-lucide-volume-x' : 'i-lucide-volume-2'"
          class="w-3.5 h-3.5 text-slate-300"
        />
      </button>

      <NuxtLink
        to="/"
        class="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors"
      >
        Classic Site
      </NuxtLink>
    </div>
  </div>

  <!-- Ubuntu Left Dash-to-Dock -->
  <div
    v-if="currentTheme === 'ubuntu'"
    class="ubuntu-dock"
  >
    <div
      v-for="win in Object.values(windows)"
      :key="win.id"
      class="group relative flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-colors hover:bg-white/10"
      :class="win.isOpen ? 'bg-white/10' : ''"
      :title="(win.title.split('-')[0] || '').trim()"
      @click="handleAppClick(win.id)"
    >
      <UIcon
        :name="win.icon"
        class="w-5 h-5 text-white"
      />

      <!-- Orange Ubuntu Active Pip -->
      <div
        v-if="win.isOpen"
        class="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3 rounded-r-full bg-[#e95420]"
      />
    </div>

    <!-- Theme Switcher shortcut at bottom of Ubuntu dock -->
    <div
      class="mt-auto group relative flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-colors hover:bg-white/10"
      title="Switch Theme"
      @click="openThemeSwitcher"
    >
      <UIcon
        name="i-lucide-palette"
        class="w-5 h-5 text-orange-400"
      />
    </div>
  </div>
</template>
