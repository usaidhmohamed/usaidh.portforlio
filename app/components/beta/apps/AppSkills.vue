<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const skillCategories = [
  {
    icon: 'i-lucide-monitor',
    name: 'Frontend Core Engine',
    utilization: '98%',
    skills: ['Vue', 'Nuxt', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'SCSS']
  },
  {
    icon: 'i-lucide-sparkles',
    name: 'AI & Neural Workflows',
    utilization: '92%',
    skills: ['Gemini API', 'LLM Integration', 'AI Content Pipelines', 'Figma-to-Code AI', 'Prompt Engineering', 'RAG Patterns']
  },
  {
    icon: 'i-lucide-palette',
    name: 'Design Systems Architecture',
    utilization: '96%',
    skills: ['Design Token Architecture', 'Storybook', 'Component Libraries', 'Figma Integration', 'Style Dictionary', 'Theming Systems']
  },
  {
    icon: 'i-lucide-gauge',
    name: 'Performance & Web Vitals',
    utilization: '100%',
    skills: ['Core Web Vitals (INP, LCP, CLS)', 'Lighthouse 100', 'SSR/SSG Optimization', 'Semantic HTML', 'WCAG AA Accessibility']
  },
  {
    icon: 'i-lucide-server',
    name: 'Backend & APIs',
    utilization: '88%',
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Prisma']
  },
  {
    icon: 'i-lucide-cloud',
    name: 'Cloud & DevOps Infrastructure',
    utilization: '85%',
    skills: ['AWS', 'Docker', 'GitHub Actions', 'Jenkins', 'Vercel', 'Netlify', 'CI/CD Pipelines']
  }
]

// Animated CPU & RAM simulation for Task Manager realism
const cpuUsage = ref(12)
const memUsage = ref(42)
let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  interval = setInterval(() => {
    cpuUsage.value = Math.floor(8 + Math.random() * 14)
    memUsage.value = Math.floor(40 + Math.random() * 4)
  }, 2000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="h-full flex flex-col bg-slate-900 text-slate-100 select-text text-xs">
    <!-- Performance Summary Bar -->
    <div class="p-3 bg-black/40 border-b border-white/10 flex items-center justify-between gap-4 shrink-0 select-none">
      <div class="flex items-center gap-6">
        <div>
          <div class="text-[10px] text-slate-400 font-medium">
            CPU Load (Performance)
          </div>
          <div class="text-sm font-bold text-green-400 font-mono">
            {{ cpuUsage }}% <span class="text-[10px] text-slate-400 font-normal">Optimal</span>
          </div>
        </div>
        <div>
          <div class="text-[10px] text-slate-400 font-medium">
            Core Web Vitals
          </div>
          <div class="text-sm font-bold text-primary-400 font-mono">
            100/100
          </div>
        </div>
        <div>
          <div class="text-[10px] text-slate-400 font-medium">
            Active Competencies
          </div>
          <div class="text-sm font-bold text-white font-mono">
            36 Process Modules
          </div>
        </div>
      </div>
      <div class="hidden sm:block text-[11px] text-slate-400 font-mono">
        Status: Healthy / Running
      </div>
    </div>

    <!-- Process Table -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="cat in skillCategories"
        :key="cat.name"
        class="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
      >
        <div class="flex items-center justify-between mb-2.5">
          <div class="flex items-center gap-2">
            <UIcon
              :name="cat.icon"
              class="w-4 h-4 text-primary-400"
            />
            <span class="font-bold text-xs sm:text-sm text-white">{{ cat.name }}</span>
          </div>
          <span class="font-mono text-xs text-primary-400 font-semibold bg-primary-500/10 px-2 py-0.5 rounded border border-primary-500/20">
            {{ cat.utilization }} Efficiency
          </span>
        </div>

        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="skill in cat.skills"
            :key="skill"
            class="px-2 py-1 rounded bg-black/40 text-slate-300 text-[11px] border border-white/10 hover:border-primary-400/50 hover:text-white transition-colors"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
