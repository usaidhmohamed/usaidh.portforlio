<template>
  <section
    id="leadership"
    class="py-12 md:py-20 relative overflow-hidden"
  >
    <div class="container mx-auto px-4 md:px-8">
      <div class="mb-8 md:mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Leadership Highlights
        </h2>
        <div class="h-1 w-20 bg-[var(--ui-primary)] rounded-full shadow-[0_0_10px_var(--ui-primary)]" />
      </div>

      <div class="relative border-l-2 border-slate-700/50 ml-4 md:ml-8 stagger-children">
        <div
          v-for="(highlight, index) in highlights"
          :key="index"
          class="mb-12 relative pl-8 md:pl-12 animate-on-scroll"
        >
          <!-- Timeline Dot -->
          <div class="absolute -left-[9px] top-4 w-4 h-4 bg-[var(--ui-primary)] rounded-full shadow-[0_0_15px_var(--ui-primary)] ring-4 ring-[#080c1a]" />

          <!-- Card -->
          <div class="bg-[#0f1629]/70 backdrop-blur-lg border border-slate-800 hover:border-slate-600 transition-all duration-300 rounded-2xl p-6 md:p-8 group shadow-xl">
            <div class="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div class="flex-shrink-0 w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-[var(--ui-primary)]/50 group-hover:shadow-[0_0_15px_var(--ui-primary)/20] transition-all">
                <UIcon
                  :name="highlight.icon"
                  class="w-6 h-6 text-[var(--ui-primary)]"
                />
              </div>

              <div class="flex-1">
                <h3 class="text-xl md:text-2xl font-semibold text-white mb-2">
                  {{ highlight.title }}
                </h3>
                <p class="text-slate-300 leading-relaxed mb-4">
                  {{ highlight.description }}
                </p>

                <!-- Impact Metric -->
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--ui-primary)]/10 border border-[var(--ui-primary)]/20 text-[var(--ui-primary)] text-sm font-medium">
                  <UIcon
                    name="i-lucide-target"
                    class="w-4 h-4"
                  />
                  {{ highlight.impact }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { initScrollAnimations } = useScrollAnimation()

onMounted(() => {
  initScrollAnimations()
})

const highlights = [
  {
    icon: 'i-lucide-users',
    title: 'UOB Framework Team Lead',
    description: 'Co-led a 6-member framework team building and maintaining the enterprise design system and component library, standardizing UI patterns across 20+ banking applications.',
    impact: '6 Engineers · 20+ Apps'
  },
  {
    icon: 'i-lucide-rocket',
    title: 'Cambio Engineering Lead',
    description: 'Led a 9-person frontend team at Cambio, establishing coding standards, CI/CD pipelines, code review processes, and mentoring junior developers into mid-level engineers.',
    impact: '9 Engineers · Full Ownership'
  },
  {
    icon: 'i-lucide-smartphone',
    title: 'Native-Web Bridge Pioneer',
    description: 'Founding member of UOB\'s native-web bridge initiative, architecting the communication layer enabling seamless integration between native iOS/Android apps and embedded web views.',
    impact: 'Founding Member · Bank-wide Adoption'
  },
  {
    icon: 'i-lucide-crown',
    title: 'CEO-Level Frontend Ownership',
    description: 'Currently driving a strategic frontend ownership initiative, establishing architecture governance, shared component standards, and performance benchmarks across multiple product teams.',
    impact: 'Strategic Initiative · Cross-Team Impact'
  }
]
</script>
