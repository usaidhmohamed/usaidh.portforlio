<script setup lang="ts">
import { ref, computed } from 'vue'

const projects = [
  {
    id: 1,
    title: 'UOB Modern Private Banking Web App',
    category: 'Fintech & Banking',
    filename: 'uob-private-banking.app',
    problem: 'High-net-worth clients needed a sophisticated, secure digital banking experience that matched the premium service they received in-person.',
    approach: 'Architected a Vue web application with a custom design system, biometric authentication flows, and real-time portfolio dashboards with WebSocket integration.',
    outcome: 'Delivered a platform serving 50K+ HNW clients with 99.9% uptime and a 40% increase in digital engagement.',
    tags: ['Vue', 'TypeScript', 'Design System', 'WebSocket', 'Biometric Auth']
  },
  {
    id: 2,
    title: 'UOB Enterprise Design System',
    category: 'Design Systems',
    filename: 'uob-design-system.pkg',
    problem: '20+ banking applications built by different teams led to inconsistent UI, duplicated effort, and poor accessibility scores.',
    approach: 'Built a design token architecture with Style Dictionary, created 60+ accessible components in Storybook, and established governance processes for contributions.',
    outcome: 'Unified UI across 20+ apps, reduced new feature development time by 35%, and achieved WCAG AA compliance bank-wide.',
    tags: ['Design Tokens', 'Storybook', 'Style Dictionary', 'Vue', 'Accessibility']
  },
  {
    id: 3,
    title: 'Automated Blog Content Pipeline',
    category: 'AI & Automation',
    filename: 'ai-content-pipeline.service',
    problem: 'Content team spent 8+ hours per article on research, writing, SEO optimization, and publishing—limiting output to 2-3 posts per week.',
    approach: 'Built an AI pipeline using LLMs for topic research, draft generation, SEO scoring, and automated WordPress publishing with human-in-the-loop review.',
    outcome: 'Increased content output 4x while maintaining quality scores, reduced per-article time from 8 hours to 2 hours.',
    tags: ['LLM Integration', 'Node.js', 'SEO', 'Automation', 'WordPress API']
  },
  {
    id: 4,
    title: 'Figma-to-Code AI Agent Workflow',
    category: 'AI & Automation',
    filename: 'figma-code-agent.workflow',
    problem: 'Design-to-development handoff created bottlenecks—developers spent days translating Figma specs into pixel-perfect Vue components.',
    approach: 'Developed an AI agent workflow that extracts design tokens from Figma, generates Vue component scaffolds with proper prop interfaces, and maps to the existing design system.',
    outcome: 'Reduced component development time by 60%, eliminated design-dev misalignment, and standardized the component creation process.',
    tags: ['Figma API', 'AI Agent', 'Vue', 'Design Tokens', 'Code Generation']
  }
]

const selectedCategory = ref<string>('All')
const selectedProjectId = ref<number>(1)

const categories = ['All', 'Fintech & Banking', 'Design Systems', 'AI & Automation']

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects
  return projects.filter(p => p.category === selectedCategory.value)
})

const activeProject = computed<(typeof projects)[0]>(() => {
  return projects.find(p => p.id === selectedProjectId.value) ?? (projects[0] as (typeof projects)[0])
})
</script>

<template>
  <div class="h-full flex flex-col bg-slate-900 text-slate-200 select-text">
    <!-- Explorer Path / Toolbar -->
    <div class="flex items-center justify-between px-3 py-2 bg-black/30 border-b border-white/10 text-xs shrink-0 select-none">
      <div class="flex items-center gap-2 text-slate-400">
        <UIcon
          name="i-lucide-hard-drive"
          class="w-3.5 h-3.5 text-primary-400"
        />
        <span>C: \ Usaidh \ Featured_Projects \ {{ activeProject.filename }}</span>
      </div>
      <div class="text-[11px] text-slate-500">
        {{ filteredProjects.length }} items
      </div>
    </div>

    <!-- Explorer Body (2 Columns) -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar / Folders -->
      <div class="w-44 sm:w-52 border-r border-white/10 bg-black/20 p-3 space-y-1 shrink-0 overflow-y-auto select-none text-xs">
        <div class="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-1">
          Categories
        </div>
        <button
          v-for="cat in categories"
          :key="cat"
          class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-left transition-colors"
          :class="selectedCategory === cat ? 'bg-primary-600/30 text-white font-medium' : 'text-slate-400 hover:bg-white/5 hover:text-white'"
          @click="selectedCategory = cat"
        >
          <UIcon
            name="i-lucide-folder"
            class="w-3.5 h-3.5 text-yellow-400"
          />
          <span class="truncate">{{ cat }}</span>
        </button>

        <div class="pt-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-1">
          Projects
        </div>
        <button
          v-for="p in filteredProjects"
          :key="p.id"
          class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-left transition-colors"
          :class="selectedProjectId === p.id ? 'bg-white/15 text-white font-medium' : 'text-slate-400 hover:bg-white/5 hover:text-white'"
          @click="selectedProjectId = p.id"
        >
          <UIcon
            name="i-lucide-file-code"
            class="w-3.5 h-3.5 text-primary-400"
          />
          <span class="truncate text-[11px]">{{ p.title.split(' ')[0] }}...</span>
        </button>
      </div>

      <!-- Project Detail Pane -->
      <div class="flex-1 p-5 overflow-y-auto bg-slate-900/60">
        <div class="max-w-2xl space-y-4">
          <div>
            <span class="text-[11px] font-mono text-primary-400 font-semibold uppercase tracking-wider block">
              Project 0{{ activeProject.id }} · {{ activeProject.category }}
            </span>
            <h1 class="text-xl sm:text-2xl font-bold text-white mt-1">
              {{ activeProject.title }}
            </h1>
          </div>

          <!-- Problem / Approach / Outcome -->
          <div class="space-y-3 pt-2">
            <div class="p-3.5 rounded-lg bg-white/5 border border-white/10">
              <h2 class="text-xs font-bold text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <UIcon
                  name="i-lucide-alert-circle"
                  class="w-3.5 h-3.5"
                /> Problem
              </h2>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {{ activeProject.problem }}
              </p>
            </div>

            <div class="p-3.5 rounded-lg bg-white/5 border border-white/10">
              <h2 class="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <UIcon
                  name="i-lucide-cpu"
                  class="w-3.5 h-3.5"
                /> Approach & Architecture
              </h2>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {{ activeProject.approach }}
              </p>
            </div>

            <div class="p-3.5 rounded-lg bg-white/5 border border-white/10">
              <h2 class="text-xs font-bold text-green-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-3.5 h-3.5"
                /> Measurable Outcome
              </h2>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {{ activeProject.outcome }}
              </p>
            </div>
          </div>

          <!-- Tags -->
          <div class="pt-2">
            <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
              Technologies Utilized
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in activeProject.tags"
                :key="tag"
                class="px-2 py-0.5 rounded text-xs bg-primary-500/20 text-primary-300 border border-primary-500/30"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
