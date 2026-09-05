<script setup lang="ts">
import { useThemeManager, type OSTheme } from '~/composables/useThemeManager'
import { useSoundManager } from '~/composables/useSoundManager'

const { currentTheme, isThemeSwitcherOpen, themes, setTheme, closeThemeSwitcher, toggleThemeSwitcher } = useThemeManager()
const { playClick, toggleMute, isMuted } = useSoundManager()

function selectTheme(themeId: OSTheme) {
  playClick()
  setTheme(themeId)
  closeThemeSwitcher()
}
</script>

<template>
  <div class="relative">
    <button
      class="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs transition-colors shadow-sm cursor-pointer select-none"
      :class="currentTheme === 'macos' ? 'hover:bg-black/10 text-slate-800 font-medium' : 'bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/20'"
      title="Switch Desktop Theme"
      @click.stop="toggleThemeSwitcher"
    >
      <UIcon
        name="i-lucide-palette"
        class="w-3.5 h-3.5"
      />
      <span class="hidden sm:inline font-medium">Theme</span>
    </button>

    <!-- Teleport to body prevents any parent backdrop-filter or transform from displacing fixed coordinates -->
    <Teleport to="body">
      <div
        v-if="isThemeSwitcherOpen"
        class="fixed inset-0 z-[1000000] cursor-default"
        @click="closeThemeSwitcher"
      >
        <!-- Dynamic positioning: top-right for macOS & Ubuntu, bottom-right for Windows -->
        <div
          class="absolute w-72 bg-slate-900/95 border border-white/20 shadow-2xl rounded-xl p-3 text-white backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 select-none"
          :class="[
            currentTheme === 'macos' || currentTheme === 'ubuntu'
              ? 'top-9 right-4'
              : 'bottom-14 right-4'
          ]"
          @click.stop
        >
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-monitor"
                class="w-4 h-4 text-primary-400"
              />
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-300">Choose OS Theme</span>
            </div>
            <button
              class="text-xs text-slate-400 hover:text-white p-1 rounded hover:bg-white/10"
              @click="closeThemeSwitcher"
            >
              <UIcon
                name="i-lucide-x"
                class="w-3.5 h-3.5"
              />
            </button>
          </div>

          <div class="space-y-1.5">
            <button
              v-for="t in themes"
              :key="t.id"
              class="w-full flex items-center justify-between p-2.5 rounded-lg border transition-all text-left cursor-pointer"
              :class="currentTheme === t.id ? 'bg-primary-600/30 border-primary-500 shadow-sm' : 'border-white/5 hover:bg-white/10'"
              @click="selectTheme(t.id)"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="w-7 h-7 rounded-md flex items-center justify-center text-white shrink-0"
                  :style="{ backgroundColor: t.accentColor }"
                >
                  <UIcon
                    :name="t.icon"
                    class="w-4 h-4"
                  />
                </div>
                <div>
                  <div class="text-xs font-semibold text-white">
                    {{ t.name }}
                  </div>
                  <div class="text-[10px] text-slate-400">
                    {{ t.subtitle }}
                  </div>
                </div>
              </div>
              <UIcon
                v-if="currentTheme === t.id"
                name="i-lucide-check"
                class="w-4 h-4 text-primary-400 shrink-0"
              />
            </button>
          </div>

          <!-- Sound toggle in theme menu -->
          <div class="mt-3 pt-2 border-t border-white/10 flex items-center justify-between px-1">
            <span class="text-xs text-slate-400">Sound Effects</span>
            <button
              class="flex items-center gap-1.5 px-2 py-1 rounded text-xs bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              @click="toggleMute"
            >
              <UIcon
                :name="isMuted ? 'i-lucide-volume-x' : 'i-lucide-volume-2'"
                class="w-3.5 h-3.5 text-primary-400"
              />
              <span>{{ isMuted ? 'Muted' : 'On' }}</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
