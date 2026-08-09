<template>
  <section
    id="skills"
    class="py-12 md:py-20 relative overflow-hidden bg-[#080c1a]"
  >
    <div class="container mx-auto px-4 md:px-8">
      <div class="mb-8 md:mb-16 animate-on-scroll">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Technical Skills
        </h2>
        <div class="h-1 w-20 bg-[var(--ui-primary)] rounded-full shadow-[0_0_10px_var(--ui-primary)]" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 stagger-children">
        <div
          v-for="(category, index) in skillCategories"
          :key="index"
          class="bg-[#0f1629]/80 backdrop-blur-md border border-slate-800 hover:border-slate-600 transition-all duration-300 rounded-2xl p-6 md:p-8 animate-on-scroll shadow-lg hover:shadow-xl hover:shadow-[var(--ui-primary)]/5"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="flex-shrink-0 w-10 h-10 bg-slate-800/80 rounded-lg flex items-center justify-center border border-slate-700">
              <UIcon
                :name="category.icon"
                class="w-5 h-5 text-[var(--ui-primary)]"
              />
            </div>
            <h3 class="text-xl font-semibold text-white">
              {{ category.name }}
            </h3>
          </div>

          <div class="flex flex-wrap gap-2.5">
            <UBadge
              v-for="skill in category.skills"
              :key="skill"
              color="neutral"
              variant="subtle"
              class="skill-pill cursor-default hover:bg-slate-700 hover:text-white hover:border-[var(--ui-primary)]/50 hover:shadow-[0_0_10px_var(--ui-primary)/30] transition-all duration-300 border border-slate-800/50"
            >
              {{ skill }}
            </UBadge>
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

const skillCategories = [
  {
    icon: 'i-lucide-monitor',
    name: 'Frontend',
    skills: ['Vue', 'Nuxt', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'SCSS']
  },
  {
    icon: 'i-lucide-sparkles',
    name: 'AI & Emerging Tech',
    skills: ['Gemini API', 'LLM Integration', 'AI Content Pipelines', 'Figma-to-Code AI', 'Prompt Engineering', 'RAG Patterns']
  },
  {
    icon: 'i-lucide-palette',
    name: 'Design Systems & Tokens',
    skills: ['Design Token Architecture', 'Storybook', 'Component Libraries', 'Figma Integration', 'Style Dictionary', 'Theming Systems']
  },
  {
    icon: 'i-lucide-server',
    name: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Prisma']
  },
  {
    icon: 'i-lucide-cloud',
    name: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'GitHub Actions', 'Jenkins', 'Vercel', 'Netlify', 'CI/CD Pipelines']
  },
  {
    icon: 'i-lucide-gauge',
    name: 'Performance & SEO',
    skills: ['Core Web Vitals', 'Lighthouse Optimization', 'SSR/SSG', 'Semantic HTML', 'Accessibility (WCAG)', 'Bundle Analysis']
  }
]
</script>
