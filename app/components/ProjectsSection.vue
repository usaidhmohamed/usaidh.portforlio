<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { animateOnScroll, staggerChildren } = useScrollAnimation()

const projects = [
  {
    title: "UOB Modern Private Banking Web App",
    problem: "High-net-worth clients needed a sophisticated, secure digital banking experience that matched the premium service they received in-person.",
    approach: "Architected a Vue 3 SPA with a custom design system, biometric authentication flows, and real-time portfolio dashboards with WebSocket integration.",
    outcome: "Delivered a platform serving 50K+ HNW clients with 99.9% uptime and a 40% increase in digital engagement.",
    tags: ["Vue 3", "TypeScript", "Design System", "WebSocket", "Biometric Auth"]
  },
  {
    title: "UOB Enterprise Design System",
    problem: "20+ banking applications built by different teams led to inconsistent UI, duplicated effort, and poor accessibility scores.",
    approach: "Built a design token architecture with Style Dictionary, created 60+ accessible components in Storybook, and established governance processes for contributions.",
    outcome: "Unified UI across 20+ apps, reduced new feature development time by 35%, and achieved WCAG AA compliance bank-wide.",
    tags: ["Design Tokens", "Storybook", "Style Dictionary", "Vue 3", "Accessibility"]
  },
  {
    title: "Automated Blog Content Pipeline",
    problem: "Content team spent 8+ hours per article on research, writing, SEO optimization, and publishing—limiting output to 2-3 posts per week.",
    approach: "Built an AI pipeline using LLMs for topic research, draft generation, SEO scoring, and automated WordPress publishing with human-in-the-loop review.",
    outcome: "Increased content output 4x while maintaining quality scores, reduced per-article time from 8 hours to 2 hours.",
    tags: ["LLM Integration", "Node.js", "SEO", "Automation", "WordPress API"]
  },
  {
    title: "Figma-to-Code AI Agent Workflow",
    problem: "Design-to-development handoff created bottlenecks—developers spent days translating Figma specs into pixel-perfect Vue components.",
    approach: "Developed an AI agent workflow that extracts design tokens from Figma, generates Vue component scaffolds with proper prop interfaces, and maps to the existing design system.",
    outcome: "Reduced component development time by 60%, eliminated design-dev misalignment, and standardized the component creation process.",
    tags: ["Figma API", "AI Agent", "Vue 3", "Design Tokens", "Code Generation"]
  }
]
</script>

<template>
  <section id="projects" class="py-24 relative" v-bind="animateOnScroll" v-bind:class="staggerChildren">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="mb-16 text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
        <div class="h-1 w-24 bg-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="(project, index) in projects" :key="index" class="glass-card glow-border p-8 rounded-2xl flex flex-col h-full animate-on-scroll">
          <div class="mb-6 flex-grow">
            <span class="text-sm font-medium text-slate-400 mb-2 block">Project 0{{ index + 1 }}</span>
            <h3 class="text-xl lg:text-2xl font-semibold text-white mb-6">{{ project.title }}</h3>
            
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-semibold text-blue-400 mb-1">Problem</h4>
                <p class="text-slate-300 text-sm md:text-base leading-relaxed">{{ project.problem }}</p>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-blue-400 mb-1">Approach</h4>
                <p class="text-slate-300 text-sm md:text-base leading-relaxed">{{ project.approach }}</p>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-blue-400 mb-1">Outcome</h4>
                <p class="text-slate-300 text-sm md:text-base leading-relaxed">{{ project.outcome }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-700/50">
            <UBadge v-for="tag in project.tags" :key="tag" color="primary" variant="subtle" size="xs">
              {{ tag }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
