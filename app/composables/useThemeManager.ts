import { ref } from 'vue'

export type OSTheme = 'win7' | 'win8' | 'macos' | 'ubuntu'

export interface ThemeMeta {
  id: OSTheme
  name: string
  subtitle: string
  accentColor: string
  icon: string
  previewClass: string
}

export const AVAILABLE_THEMES: ThemeMeta[] = [
  {
    id: 'win7',
    name: 'Windows 7 Aero',
    subtitle: 'Aero Glass & Translucency',
    accentColor: '#2b78e4',
    icon: 'i-lucide-layers',
    previewClass: 'theme-win7'
  },
  {
    id: 'win8',
    name: 'Windows 8 Metro',
    subtitle: 'Modern UI & Bold Tiles',
    accentColor: '#0078d7',
    icon: 'i-lucide-layout-grid',
    previewClass: 'theme-win8'
  },
  {
    id: 'macos',
    name: 'Mac OS X Aqua',
    subtitle: 'Brushed Metal & Glass Dock',
    accentColor: '#0066cc',
    icon: 'i-lucide-apple',
    previewClass: 'theme-macos'
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu 22.04 LTS',
    subtitle: 'Yaru Dark & GNOME Shell',
    accentColor: '#e95420',
    icon: 'i-lucide-terminal',
    previewClass: 'theme-ubuntu'
  }
]

const currentTheme = ref<OSTheme>('win7')
const isThemeSwitcherOpen = ref(false)

export function useThemeManager() {
  function openThemeSwitcher() {
    isThemeSwitcherOpen.value = true
  }

  function closeThemeSwitcher() {
    isThemeSwitcherOpen.value = false
  }

  function toggleThemeSwitcher() {
    isThemeSwitcherOpen.value = !isThemeSwitcherOpen.value
  }

  function setTheme(theme: OSTheme) {
    currentTheme.value = theme
    if (import.meta.client) {
      document.documentElement.dataset.osTheme = theme
      try {
        localStorage.setItem('usaidh:os_theme', theme)
      } catch {
        // ignore localStorage failure
      }
    }
  }

  function initTheme() {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('usaidh:os_theme') as OSTheme | null
        if (saved && ['win7', 'win8', 'macos', 'ubuntu'].includes(saved)) {
          setTheme(saved)
          return
        }
      } catch {
        // fallback
      }
      setTheme('win7')
    }
  }

  return {
    currentTheme,
    isThemeSwitcherOpen,
    themes: AVAILABLE_THEMES,
    setTheme,
    initTheme,
    openThemeSwitcher,
    closeThemeSwitcher,
    toggleThemeSwitcher
  }
}
