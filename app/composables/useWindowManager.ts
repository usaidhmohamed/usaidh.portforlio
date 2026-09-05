import { ref, computed } from 'vue'

export type AppId = 'about' | 'projects' | 'experience' | 'skills' | 'contact' | 'terminal' | 'resume'

export interface WindowState {
  id: AppId
  title: string
  icon: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  x: number
  y: number
  width: number
  height: number
  defaultWidth: number
  defaultHeight: number
}

const DEFAULT_WINDOWS: Record<AppId, Omit<WindowState, 'isOpen' | 'isMinimized' | 'isMaximized' | 'zIndex' | 'x' | 'y'>> = {
  about: {
    id: 'about',
    title: 'About Usaidh - System Information',
    icon: 'i-lucide-user',
    width: 680,
    height: 520,
    defaultWidth: 680,
    defaultHeight: 520
  },
  projects: {
    id: 'projects',
    title: 'File Explorer - Featured Projects',
    icon: 'i-lucide-folder-git-2',
    width: 840,
    height: 580,
    defaultWidth: 840,
    defaultHeight: 580
  },
  experience: {
    id: 'experience',
    title: 'Event Viewer - Career History',
    icon: 'i-lucide-briefcase',
    width: 780,
    height: 540,
    defaultWidth: 780,
    defaultHeight: 540
  },
  skills: {
    id: 'skills',
    title: 'Task Manager - Tech Stack & Processes',
    icon: 'i-lucide-cpu',
    width: 720,
    height: 520,
    defaultWidth: 720,
    defaultHeight: 520
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal - AI Assistant CLI',
    icon: 'i-lucide-terminal',
    width: 700,
    height: 480,
    defaultWidth: 700,
    defaultHeight: 480
  },
  contact: {
    id: 'contact',
    title: 'Mail Client - Compose Message',
    icon: 'i-lucide-mail',
    width: 640,
    height: 500,
    defaultWidth: 640,
    defaultHeight: 500
  },
  resume: {
    id: 'resume',
    title: 'Document Viewer - Resume.pdf',
    icon: 'i-lucide-file-text',
    width: 800,
    height: 620,
    defaultWidth: 800,
    defaultHeight: 620
  }
}

// Global shared state for windows
const windows = ref<Record<AppId, WindowState>>(initWindows())
let globalZIndex = 100

function initWindows(): Record<AppId, WindowState> {
  const state = {} as Record<AppId, WindowState>
  const ids = Object.keys(DEFAULT_WINDOWS) as AppId[]

  ids.forEach((id, index) => {
    const config = DEFAULT_WINDOWS[id]
    // Cascade windows initially
    const offsetX = 60 + (index % 5) * 36
    const offsetY = 50 + (index % 5) * 32

    state[id] = {
      ...config,
      isOpen: id === 'about', // Open About window by default on launch
      isMinimized: false,
      isMaximized: false,
      zIndex: id === 'about' ? 101 : 100,
      x: offsetX,
      y: offsetY
    }
  })

  return state
}

export function useWindowManager() {
  const activeWindowId = ref<AppId | null>('about')

  const openWindows = computed(() => {
    return Object.values(windows.value).filter(w => w.isOpen)
  })

  const focusedWindow = computed(() => {
    if (!activeWindowId.value) return null
    return windows.value[activeWindowId.value] || null
  })

  function focusWindow(id: AppId) {
    if (!windows.value[id]) return
    if (windows.value[id].isMinimized) {
      windows.value[id].isMinimized = false
    }
    globalZIndex += 1
    windows.value[id].zIndex = globalZIndex
    activeWindowId.value = id
  }

  function openWindow(id: AppId) {
    if (!windows.value[id]) return
    const win = windows.value[id]
    win.isOpen = true
    win.isMinimized = false
    focusWindow(id)
  }

  function closeWindow(id: AppId) {
    if (!windows.value[id]) return
    windows.value[id].isOpen = false
    windows.value[id].isMinimized = false
    if (activeWindowId.value === id) {
      const remaining = Object.values(windows.value)
        .filter(w => w.isOpen && !w.isMinimized && w.id !== id)
        .sort((a, b) => b.zIndex - a.zIndex)
      activeWindowId.value = remaining[0]?.id || null
    }
  }

  function minimizeWindow(id: AppId) {
    if (!windows.value[id]) return
    windows.value[id].isMinimized = true
    if (activeWindowId.value === id) {
      const remaining = Object.values(windows.value)
        .filter(w => w.isOpen && !w.isMinimized && w.id !== id)
        .sort((a, b) => b.zIndex - a.zIndex)
      activeWindowId.value = remaining[0]?.id || null
    }
  }

  function toggleMinimize(id: AppId) {
    if (!windows.value[id]) return
    if (windows.value[id].isMinimized) {
      windows.value[id].isMinimized = false
      focusWindow(id)
    } else if (activeWindowId.value === id) {
      minimizeWindow(id)
    } else {
      focusWindow(id)
    }
  }

  function toggleMaximize(id: AppId) {
    if (!windows.value[id]) return
    windows.value[id].isMaximized = !windows.value[id].isMaximized
    focusWindow(id)
  }

  function updatePosition(id: AppId, x: number, y: number) {
    if (!windows.value[id]) return
    windows.value[id].x = Math.max(0, x)
    windows.value[id].y = Math.max(0, y)
  }

  function updateSize(id: AppId, width: number, height: number) {
    if (!windows.value[id]) return
    windows.value[id].width = Math.max(340, width)
    windows.value[id].height = Math.max(260, height)
  }

  return {
    windows,
    activeWindowId,
    openWindows,
    focusedWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMinimize,
    toggleMaximize,
    focusWindow,
    updatePosition,
    updateSize
  }
}
