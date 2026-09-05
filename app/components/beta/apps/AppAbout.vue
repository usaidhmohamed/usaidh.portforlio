<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'overview' | 'specs' | 'bio'>('overview')

const stats = [
  { label: 'System Experience', value: '10+ Years Enterprise Craft' },
  { label: 'Primary Architecture', value: 'Frontend Lead & Design Systems' },
  { label: 'Domain Specialties', value: 'Enterprise Banking (UOB, DBS) & Fintech' },
  { label: 'Location Runtime', value: 'Singapore (SGT / UTC+8)' },
  { label: 'Core Engine', value: 'Vue, Nuxt, React, TypeScript, AI APIs' }
]
</script>

<template>
  <div class="h-full flex flex-col bg-slate-900/90 text-slate-100 select-text text-xs sm:text-sm">
    <!-- OS Tab Bar -->
    <div class="flex items-center px-4 pt-3 border-b border-white/10 gap-2 shrink-0 bg-black/20 select-none">
      <button
        class="px-4 py-1.5 rounded-t-lg font-medium border-t border-x transition-colors text-xs"
        :class="activeTab === 'overview' ? 'bg-slate-800 border-white/20 text-white shadow-sm' : 'border-transparent text-slate-400 hover:text-white'"
        @click="activeTab = 'overview'"
      >
        System Overview
      </button>
      <button
        class="px-4 py-1.5 rounded-t-lg font-medium border-t border-x transition-colors text-xs"
        :class="activeTab === 'specs' ? 'bg-slate-800 border-white/20 text-white shadow-sm' : 'border-transparent text-slate-400 hover:text-white'"
        @click="activeTab = 'specs'"
      >
        Hardware & Specs
      </button>
      <button
        class="px-4 py-1.5 rounded-t-lg font-medium border-t border-x transition-colors text-xs"
        :class="activeTab === 'bio' ? 'bg-slate-800 border-white/20 text-white shadow-sm' : 'border-transparent text-slate-400 hover:text-white'"
        @click="activeTab = 'bio'"
      >
        Executive Bio
      </button>
    </div>

    <!-- Tab Content -->
    <div class="p-6 flex-1 overflow-y-auto">
      <!-- Overview Tab -->
      <div
        v-if="activeTab === 'overview'"
        class="space-y-6"
      >
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shrink-0 border border-white/20">
            UM
          </div>
          <div class="text-center sm:text-left">
            <h1 class="text-xl font-bold text-white tracking-tight">
              Usaidh Mohamed
            </h1>
            <p class="text-primary-400 font-medium text-xs sm:text-sm mt-0.5">
              Frontend Technical Lead & Full Stack Architect
            </p>
            <p class="text-slate-400 text-xs mt-2 leading-relaxed max-w-lg">
              Architecting enterprise-grade frontend systems, design token infrastructures, and AI integrations across Singapore banking (UOB, DBS) and high-growth fintech.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <div class="text-[11px] text-slate-400 font-medium">
              {{ stat.label }}
            </div>
            <div class="text-xs sm:text-sm font-semibold text-white mt-0.5">
              {{ stat.value }}
            </div>
          </div>
        </div>
      </div>

      <!-- Specs Tab -->
      <div
        v-if="activeTab === 'specs'"
        class="space-y-4"
      >
        <h2 class="text-sm font-semibold text-white border-b border-white/10 pb-2">
          Engineering Specifications
        </h2>
        <div class="space-y-2 text-xs font-mono">
          <div class="flex justify-between py-1.5 border-b border-white/5">
            <span class="text-slate-400">Processor:</span>
            <span class="text-white">Senior Engineering Mindset (10+ Years)</span>
          </div>
          <div class="flex justify-between py-1.5 border-b border-white/5">
            <span class="text-slate-400">Memory Architecture:</span>
            <span class="text-white">Design Tokens, Micro-frontends, State Governance</span>
          </div>
          <div class="flex justify-between py-1.5 border-b border-white/5">
            <span class="text-slate-400">Graphics Engine:</span>
            <span class="text-white">Tailwind CSS, Storybook, WCAG AA Accessibility</span>
          </div>
          <div class="flex justify-between py-1.5 border-b border-white/5">
            <span class="text-slate-400">AI Neural Engine:</span>
            <span class="text-white">Gemini API, LLM Pipelines, Figma-to-Code Scaffolding</span>
          </div>
          <div class="flex justify-between py-1.5 border-b border-white/5">
            <span class="text-slate-400">Operating Bandwidth:</span>
            <span class="text-white">100% Core Web Vitals, Sub-second LCP</span>
          </div>
        </div>
      </div>

      <!-- Bio Tab -->
      <div
        v-if="activeTab === 'bio'"
        class="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed"
      >
        <p>
          With over a decade of experience spanning enterprise banking at UOB and DBS to cutting-edge fintech in Singapore, I've built my career at the intersection of technical excellence and team leadership.
        </p>
        <p>
          I specialize in architecting scalable frontend systems—from design token frameworks to AI-powered development workflows—that empower teams to ship faster without sacrificing quality.
        </p>
        <p>
          My approach combines deep ownership mentality with hands-on technical leadership, whether I'm co-leading a 6-person framework team or driving CEO-level frontend governance initiatives.
        </p>
      </div>
    </div>
  </div>
</template>
