<script setup lang="ts">
// Page meta
useHead({
  title: 'Usaidh Mohamed | Frontend Technical Lead',
  meta: [
    { name: 'description', content: 'Frontend Technical Lead and Full Stack Engineer building enterprise-grade, AI-driven web experiences.' }
  ]
})
</script>

<template>
  <div class="bg-navy-950 min-h-screen text-slate-200 selection:bg-blue-500/30 font-sans">
    <SiteHeader />

    <main>
      <HeroSection />

      <div class="grid-bg">
        <UContainer class="py-24 space-y-32">
          <AboutSection />
          <LeadershipSection />
          <SkillsSection />
        </UContainer>
      </div>

      <div class="bg-navy-900 border-y border-white/5 relative overflow-hidden">
        <div class="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl" />
        <UContainer class="py-24 relative z-10">
          <ProjectsSection />
        </UContainer>
      </div>

      <div
        id="ai-assistant"
        class="grid-bg"
      >
        <UContainer class="py-24 space-y-32">
          <AiPlayground />
          <ExperienceTimeline />
        </UContainer>
      </div>

      <div class="bg-navy-900 relative">
        <UContainer class="py-24">
          <ContactSection />
        </UContainer>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>
