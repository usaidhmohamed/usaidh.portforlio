<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { WindowState } from '~/composables/useWindowManager'
import { useWindowManager } from '~/composables/useWindowManager'
import { useThemeManager } from '~/composables/useThemeManager'
import { useSoundManager } from '~/composables/useSoundManager'
import { useWindowDrag } from '~/composables/useWindowDrag'

const props = defineProps<{
  window: WindowState
}>()

const { activeWindowId, focusWindow, closeWindow, toggleMinimize, toggleMaximize, updatePosition, updateSize } = useWindowManager()
const { currentTheme } = useThemeManager()
const { playClick, playClose, playMinimize } = useSoundManager()

const isFocused = computed(() => activeWindowId.value === props.window.id)

// Setup window drag
const titlebarRef = ref<HTMLElement | null>(null)
const { isDragging, onPointerDown, setPosition } = useWindowDrag(
  (x, y) => {
    updatePosition(props.window.id, x, y)
  },
  { x: props.window.x, y: props.window.y }
)

// Resize handling
let isResizing = false
let startResizeX = 0
let startResizeY = 0
let startWidth = 0
let startHeight = 0

function startResize(e: PointerEvent) {
  e.preventDefault()
  e.stopPropagation()
  isResizing = true
  startResizeX = e.clientX
  startResizeY = e.clientY
  startWidth = props.window.width
  startHeight = props.window.height

  function onResizeMove(moveEvent: PointerEvent) {
    if (!isResizing) return
    const newWidth = Math.max(340, startWidth + (moveEvent.clientX - startResizeX))
    const newHeight = Math.max(240, startHeight + (moveEvent.clientY - startResizeY))
    updateSize(props.window.id, newWidth, newHeight)
  }

  function onResizeUp() {
    isResizing = false
    window.removeEventListener('pointermove', onResizeMove)
    window.removeEventListener('pointerup', onResizeUp)
  }

  window.addEventListener('pointermove', onResizeMove)
  window.addEventListener('pointerup', onResizeUp)
}

function handleClose() {
  playClose()
  closeWindow(props.window.id)
}

function handleMinimize() {
  playMinimize()
  toggleMinimize(props.window.id)
}

function handleMaximize() {
  playClick()
  toggleMaximize(props.window.id)
}

function handleWindowClick() {
  if (!isFocused.value) {
    focusWindow(props.window.id)
  }
}

onMounted(() => {
  setPosition(props.window.x, props.window.y)
})

const windowStyle = computed(() => {
  if (props.window.isMaximized) {
    return {
      zIndex: props.window.zIndex
    }
  }

  return {
    transform: `translate3d(${props.window.x}px, ${props.window.y}px, 0)`,
    width: `${props.window.width}px`,
    height: `${props.window.height}px`,
    zIndex: props.window.zIndex
  }
})
</script>

<template>
  <div
    v-show="!window.isMinimized"
    class="os-window"
    :class="{
      'is-focused': isFocused,
      'is-maximized': window.isMaximized,
      'pointer-events-none select-none': isDragging
    }"
    :style="windowStyle"
    @pointerdown="handleWindowClick"
  >
    <!-- Titlebar -->
    <div
      ref="titlebarRef"
      class="os-titlebar"
      @pointerdown="onPointerDown"
      @dblclick="handleMaximize"
    >
      <!-- macOS traffic lights (Left side) -->
      <div
        v-if="currentTheme === 'macos'"
        class="macos-traffic-lights"
      >
        <button
          class="macos-btn macos-btn-close window-control-btn"
          title="Close"
          @click.stop="handleClose"
        />
        <button
          class="macos-btn macos-btn-min window-control-btn"
          title="Minimize"
          @click.stop="handleMinimize"
        />
        <button
          class="macos-btn macos-btn-max window-control-btn"
          title="Zoom"
          @click.stop="handleMaximize"
        />
      </div>

      <!-- Icon & Title -->
      <div class="flex items-center gap-2 overflow-hidden px-1">
        <UIcon
          :name="window.icon"
          class="w-4 h-4 shrink-0 opacity-80"
        />
        <span class="text-xs md:text-sm truncate select-none">
          {{ window.title }}
        </span>
      </div>

      <!-- Windows 7 Controls (Right side) -->
      <div
        v-if="currentTheme === 'win7'"
        class="flex items-center gap-1"
      >
        <button
          class="win7-ctrl-btn window-control-btn"
          title="Minimize"
          @click.stop="handleMinimize"
        >
          <UIcon
            name="i-lucide-minus"
            class="w-3 h-3"
          />
        </button>
        <button
          class="win7-ctrl-btn window-control-btn"
          title="Maximize"
          @click.stop="handleMaximize"
        >
          <UIcon
            :name="window.isMaximized ? 'i-lucide-minimize-2' : 'i-lucide-square'"
            class="w-3 h-3"
          />
        </button>
        <button
          class="win7-ctrl-btn win7-ctrl-close window-control-btn"
          title="Close"
          @click.stop="handleClose"
        >
          <UIcon
            name="i-lucide-x"
            class="w-3 h-3"
          />
        </button>
      </div>

      <!-- Windows 8 Controls (Right side) -->
      <div
        v-if="currentTheme === 'win8'"
        class="flex items-center"
      >
        <button
          class="win8-ctrl-btn window-control-btn"
          title="Minimize"
          @click.stop="handleMinimize"
        >
          <UIcon
            name="i-lucide-minus"
            class="w-3 h-3"
          />
        </button>
        <button
          class="win8-ctrl-btn window-control-btn"
          title="Maximize"
          @click.stop="handleMaximize"
        >
          <UIcon
            :name="window.isMaximized ? 'i-lucide-minimize-2' : 'i-lucide-square'"
            class="w-3 h-3"
          />
        </button>
        <button
          class="win8-ctrl-btn win8-ctrl-close window-control-btn"
          title="Close"
          @click.stop="handleClose"
        >
          <UIcon
            name="i-lucide-x"
            class="w-3.5 h-3.5"
          />
        </button>
      </div>

      <!-- Ubuntu Controls (Right side) -->
      <div
        v-if="currentTheme === 'ubuntu'"
        class="flex items-center gap-1.5"
      >
        <button
          class="ubuntu-ctrl-btn window-control-btn"
          title="Minimize"
          @click.stop="handleMinimize"
        >
          <UIcon
            name="i-lucide-minus"
            class="w-3 h-3"
          />
        </button>
        <button
          class="ubuntu-ctrl-btn window-control-btn"
          title="Maximize"
          @click.stop="handleMaximize"
        >
          <UIcon
            :name="window.isMaximized ? 'i-lucide-minimize-2' : 'i-lucide-square'"
            class="w-2.5 h-2.5"
          />
        </button>
        <button
          class="ubuntu-ctrl-btn ubuntu-ctrl-close window-control-btn"
          title="Close"
          @click.stop="handleClose"
        >
          <UIcon
            name="i-lucide-x"
            class="w-3 h-3"
          />
        </button>
      </div>
    </div>

    <!-- Window Body -->
    <div class="os-window-body">
      <slot />
    </div>

    <!-- Window Resize Handle (Bottom Right) -->
    <div
      v-if="!window.isMaximized"
      class="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 flex items-end justify-end p-0.5 opacity-40 hover:opacity-100"
      @pointerdown="startResize"
    >
      <div class="w-2 h-2 border-r-2 border-b-2 border-current" />
    </div>
  </div>
</template>

<style scoped>
.os-window {
  position: absolute;
  top: 0;
  left: 0;
  transition: box-shadow 0.15s ease;
}
.os-window.is-maximized {
  position: fixed !important;
  transform: none !important;
}
</style>
