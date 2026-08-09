<template>
  <section
    id="about"
    class="py-12 md:py-20 bg-[#0f1629] relative overflow-hidden"
  >
    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
      <!-- Section Header -->
      <div class="animate-on-scroll opacity-0 translate-y-4 mb-8 md:mb-16 flex flex-col items-center md:items-start">
        <div class="flex items-center gap-4 mb-4">
          <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">
            About
          </h2>
          <div class="h-[2px] w-24 bg-gradient-to-r from-primary-500 to-transparent rounded-full" />
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <!-- Summary Card -->
        <div
          class="animate-on-scroll opacity-0 translate-y-4 lg:col-span-12"
          style="transition-delay: 100ms;"
        >
          <div class="relative group">
            <!-- Glass effect background -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] pointer-events-none transition-all duration-500 group-hover:border-primary-500/30" />

            <div class="relative p-8 md:p-12 text-slate-300 leading-relaxed text-lg md:text-xl font-light">
              <p class="mb-6">
                With over a decade of experience spanning enterprise banking at UOB and DBS to cutting-edge fintech in Singapore, I've built my career at the intersection of technical excellence and team leadership.
              </p>
              <p class="mb-6">
                I specialize in architecting scalable frontend systems—from design token frameworks to AI-powered development workflows—that empower teams to ship faster without sacrificing quality.
              </p>
              <p>
                My approach combines deep ownership mentality with hands-on technical leadership, whether I'm co-leading a 6-person framework team or driving CEO-level frontend governance initiatives. I believe the best engineering leaders don't just write code—they build the systems, culture, and tools that multiply an entire team's output.
              </p>
            </div>
          </div>
        </div>

        <!-- Stats Row -->
        <div class="lg:col-span-12 mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <!-- Stat 1 -->
          <div
            class="animate-on-scroll opacity-0 translate-y-4 flex flex-col items-center p-6 bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/5 hover:border-primary-500/20 hover:bg-white/[0.04] transition-all duration-300"
            style="transition-delay: 200ms;"
          >
            <UIcon
              name="i-lucide-clock"
              class="w-8 h-8 text-primary-400 mb-3"
            />
            <span class="text-white font-semibold text-lg">10+ Years</span>
            <span class="text-slate-500 text-sm mt-1">Experience</span>
          </div>

          <!-- Stat 2 -->
          <div
            class="animate-on-scroll opacity-0 translate-y-4 flex flex-col items-center p-6 bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/5 hover:border-primary-500/20 hover:bg-white/[0.04] transition-all duration-300"
            style="transition-delay: 300ms;"
          >
            <UIcon
              name="i-lucide-building-2"
              class="w-8 h-8 text-primary-400 mb-3"
            />
            <span class="text-white font-semibold text-lg text-center">Enterprise Banking</span>
            <span class="text-slate-500 text-sm mt-1">Domain</span>
          </div>

          <!-- Stat 3 -->
          <div
            class="animate-on-scroll opacity-0 translate-y-4 flex flex-col items-center p-6 bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/5 hover:border-primary-500/20 hover:bg-white/[0.04] transition-all duration-300"
            style="transition-delay: 400ms;"
          >
            <UIcon
              name="i-lucide-wallet"
              class="w-8 h-8 text-primary-400 mb-3"
            />
            <span class="text-white font-semibold text-lg">Fintech</span>
            <span class="text-slate-500 text-sm mt-1">Specialty</span>
          </div>

          <!-- Stat 4 -->
          <div
            class="animate-on-scroll opacity-0 translate-y-4 flex flex-col items-center p-6 bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/5 hover:border-primary-500/20 hover:bg-white/[0.04] transition-all duration-300"
            style="transition-delay: 500ms;"
          >
            <UIcon
              name="i-lucide-map-pin"
              class="w-8 h-8 text-primary-400 mb-3"
            />
            <span class="text-white font-semibold text-lg">Singapore</span>
            <span class="text-slate-500 text-sm mt-1">Based</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

onMounted(() => {
  const { initScrollAnimations } = useScrollAnimation()
  initScrollAnimations()
})
</script>
