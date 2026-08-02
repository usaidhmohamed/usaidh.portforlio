<template>
  <section id="experience" class="py-24 relative">
    <div class="container mx-auto px-6">
      <div class="mb-16 max-w-2xl" ref="headerRef" :class="getAnimClass(headerAnim)">
        <div class="flex items-center gap-4 mb-4">
          <div class="h-1 w-12 bg-primary-500 rounded-full"></div>
          <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Experience</h2>
        </div>
      </div>

      <div class="relative max-w-4xl mx-auto" ref="timelineRef" :class="getAnimClass(timelineAnim)">
        <!-- Timeline Line -->
        <div class="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-slate-800/50 transform -translate-x-1/2"></div>

        <div class="space-y-12">
          <div
            v-for="(job, index) in jobs"
            :key="index"
            class="relative flex flex-col md:flex-row justify-between items-center w-full group"
            :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''"
          >
            <!-- Timeline Dot -->
            <div class="absolute left-2 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-[#080c1a] shadow-[0_0_10px_rgba(var(--color-primary-500),0.5)] transform -translate-x-1/2 z-10 transition-transform group-hover:scale-125" :class="{ 'animate-pulse bg-primary-400': job.current }"></div>
            
            <!-- Mobile Date (Hidden on desktop) -->
            <div class="md:hidden self-start ml-10 mb-2 text-primary-400 font-medium text-sm">
              {{ job.dates }}
            </div>

            <!-- Content Card -->
            <div class="w-full md:w-[calc(50%-3rem)] ml-10 md:ml-0 glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors duration-300">
              <div class="flex flex-col mb-4">
                <h3 class="text-xl font-bold text-white mb-1">{{ job.role }}</h3>
                <span class="text-lg text-slate-300 font-medium">{{ job.company }}</span>
              </div>
              <ul class="space-y-3">
                <li v-for="(bullet, bIndex) in job.bullets" :key="bIndex" class="text-slate-400 text-sm md:text-base flex items-start gap-3">
                  <UIcon name="i-lucide-check-circle-2" class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <span>{{ bullet }}</span>
                </li>
              </ul>
            </div>

            <!-- Desktop Date -->
            <div class="hidden md:flex w-[calc(50%-3rem)] text-primary-400 font-medium tracking-wider" :class="index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'">
              {{ job.dates }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { setupAnimation, getAnimClass } = useScrollAnimation()

const headerRef = ref<HTMLElement | null>(null)
const headerAnim = ref({ isVisible: false, hasAnimated: false })

const timelineRef = ref<HTMLElement | null>(null)
const timelineAnim = ref({ isVisible: false, hasAnimated: false })

onMounted(() => {
  setupAnimation(headerRef, headerAnim, { threshold: 0.2 })
  setupAnimation(timelineRef, timelineAnim, { threshold: 0.1, delay: 200 })
})

const jobs = [
  {
    company: 'Rently',
    role: 'Frontend Developer',
    dates: 'May 2026 — Present',
    current: true,
    bullets: [
      'Driving frontend ownership and technical initiatives for innovative property tech solutions.',
      'Building AI-integrated web experiences to enhance property management platforms.',
      'Establishing architecture governance and UI performance benchmarks.'
    ]
  },
  {
    company: 'Aleph-Labs',
    role: 'Lead Frontend Engineer / Senior Software Engineer',
    dates: 'Aug 2022 — May 2026',
    current: false,
    bullets: [
      'Collaborated on UOB Singapore\'s SME Application, delivering a cutting-edge hybrid mobile and responsive online solution for elite banking clients.',
      'Partnered with UOB TMRW to build high-performance retail banking web experiences, optimizing Core Web Vitals to achieve 95+ Lighthouse scores.',
      'Led the frontend team in creating UOB\'s in-house native-web bridge, establishing technical benchmarks against Cordova, Capacitor, and React Native.'
    ]
  },
  {
    company: 'Knowledge Outsource (Pvt) Ltd',
    role: 'Technical Team Lead',
    dates: 'Aug 2021 — Aug 2022',
    current: false,
    bullets: [
      'Served as Lead Developer for the DBS Singapore R&D department, orchestrating the DBS Insights Direct research platform.',
      'Architected a highly-scalable investment resource platform utilizing React, Python, ChartJS, and AWS.',
      'Championed coding standards, CI/CD pipelines, and accessibility standards achieving WCAG AA compliance.'
    ]
  },
  {
    company: 'Cambio Software Engineering',
    role: 'Technical Lead / Associate Technical Lead',
    dates: 'May 2019 — Jun 2021',
    current: false,
    bullets: [
      'Led a cross-functional engineering team, establishing technical strategies and best practices for enterprise health tech solutions.',
      'Mentored junior developers, successfully growing team members into mid-level engineering roles.',
      'Designed and implemented scalable UI architectures to support platforms serving large user bases.'
    ]
  },
  {
    company: 'IdeaBits',
    role: 'Senior Software Engineer',
    dates: 'Sep 2018 — Apr 2019',
    current: false,
    bullets: [
      'Drove senior-level frontend development and architectural design decisions for complex web applications.',
      'Streamlined deployment pipelines and integrated robust testing methodologies to ensure high system reliability.'
    ]
  },
  {
    company: 'EIGHT25MEDIA',
    role: 'Senior Software Engineer / Software Engineer',
    dates: 'Mar 2017 — Sep 2018',
    current: false,
    bullets: [
      'Developed responsive, performant customer-facing applications utilizing modern JavaScript frameworks.',
      'Optimized mobile and web interfaces with Appium, significantly reducing time-to-market for key deliverables.'
    ]
  },
  {
    company: 'Calcey Technologies',
    role: 'Software Engineer',
    dates: 'Oct 2015 — Mar 2017',
    current: false,
    bullets: [
      'Engineered full-stack solutions and responsive websites for high-profile clients in healthcare and real estate.',
      'Contributed to agile software development lifecycles, ensuring timely delivery of robust web products.'
    ]
  },
  {
    company: 'hSenid Business Solutions',
    role: 'Support Engineer',
    dates: 'Apr 2015 — Sep 2015',
    current: false,
    bullets: [
      'Provided comprehensive Level 1 and Level 2 enterprise system support, rapidly resolving critical client issues.'
    ]
  }
]
</script>

<style scoped>
.glass-card {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
</style>
