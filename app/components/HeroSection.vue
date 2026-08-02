<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080c1a] pt-20 pb-16"
  >
    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

    <!-- Gradient glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl flex flex-col items-center text-center">
      <!-- Badge -->
      <div class="animate-on-scroll opacity-0 translate-y-4 mb-8">
        <UBadge
          color="primary"
          variant="subtle"
          class="rounded-full px-4 py-1.5 border border-primary-500/20 backdrop-blur-md bg-primary-500/10"
        >
          <span class="flex items-center gap-2 text-sm font-medium text-primary-300">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
            </span>
            ✦ Available for opportunities
          </span>
        </UBadge>
      </div>

      <!-- Main Heading -->
      <h1
        class="animate-on-scroll opacity-0 translate-y-4 text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
        style="transition-delay: 100ms;"
      >
        Usaidh Mohamed
      </h1>

      <!-- Subheading -->
      <h2
        class="animate-on-scroll opacity-0 translate-y-4 text-lg md:text-xl text-slate-400 max-w-2xl mb-4 font-medium"
        style="transition-delay: 200ms;"
      >
        Frontend Technical Lead | Full Stack | AI-Driven Design Systems & Team Leadership
      </h2>

      <!-- Tagline -->
      <p
        class="animate-on-scroll opacity-0 translate-y-4 text-base text-slate-500 max-w-2xl mb-10"
        style="transition-delay: 300ms;"
      >
        Building enterprise-grade web experiences with 10+ years of craft across fintech, banking, and healthcare in Singapore.
      </p>

      <!-- CTA Buttons -->
      <div
        class="animate-on-scroll opacity-0 translate-y-4 flex flex-wrap items-center justify-center gap-4"
        style="transition-delay: 400ms;"
      >
        <UButton
          to="/resume.pdf"
          target="_blank"
          download
          color="primary"
          variant="solid"
          icon="i-lucide-download"
          size="lg"
          class="shadow-[0_0_20px_rgba(var(--color-primary-500),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-primary-500),0.5)] transition-shadow duration-300 rounded-xl px-6"
        >
          Download Resume
        </UButton>

        <UButton
          to="#contact"
          color="primary"
          variant="outline"
          icon="i-lucide-mail"
          size="lg"
          class="backdrop-blur-sm bg-[#0f1629]/50 border-primary-500/30 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-300 rounded-xl px-6"
        >
          Get In Touch
        </UButton>

        <UButton
          to="https://linkedin.com/in/usaidh"
          target="_blank"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-linkedin"
          size="lg"
          class="hover:text-primary-400 hover:bg-white/5 transition-colors duration-300 rounded-xl"
        >
          LinkedIn
        </UButton>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
      <UIcon
        name="i-lucide-chevron-down"
        class="w-6 h-6"
      />
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
