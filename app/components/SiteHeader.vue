<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { onMounted, ref } from 'vue'

const activeSection = ref('')

onMounted(() => {
  // Use scroll animation for the whole page
  useScrollAnimation()

  // Track active section for header
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { rootMargin: '-10% 0px -80% 0px' }
  )

  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section)
  })
})

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="fixed top-0 w-full z-50 bg-navy-950/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <div class="font-mono text-xl font-bold text-white tracking-tighter">
          UM<span class="text-blue-500">.</span>
        </div>

        <nav class="hidden md:flex items-center gap-6">
          <button
            class="text-sm font-medium transition-colors hover:text-blue-400"
            :class="activeSection === 'about' ? 'text-blue-400' : 'text-slate-300'"
            @click="scrollTo('about')"
          >
            About
          </button>
          <button
            class="text-sm font-medium transition-colors hover:text-blue-400"
            :class="activeSection === 'leadership' ? 'text-blue-400' : 'text-slate-300'"
            @click="scrollTo('leadership')"
          >
            Leadership
          </button>
          <button
            class="text-sm font-medium transition-colors hover:text-blue-400"
            :class="activeSection === 'skills' ? 'text-blue-400' : 'text-slate-300'"
            @click="scrollTo('skills')"
          >
            Skills
          </button>
          <button
            class="text-sm font-medium transition-colors hover:text-blue-400"
            :class="activeSection === 'projects' ? 'text-blue-400' : 'text-slate-300'"
            @click="scrollTo('projects')"
          >
            Projects
          </button>
          <button
            class="text-sm font-medium transition-colors hover:text-blue-400"
            :class="activeSection === 'experience' ? 'text-blue-400' : 'text-slate-300'"
            @click="scrollTo('experience')"
          >
            Experience
          </button>
          <button
            class="text-sm font-medium transition-colors hover:text-blue-400"
            :class="activeSection === 'contact' ? 'text-blue-400' : 'text-slate-300'"
            @click="scrollTo('contact')"
          >
            Contact
          </button>
        </nav>

        <div class="flex items-center gap-4">
          <UButton
            to="https://github.com/usaidhmohamed"
            target="_blank"
            icon="i-simple-icons-github"
            color="neutral"
            variant="ghost"
            aria-label="GitHub"
          />
          <UButton
            label="Resume"
            color="primary"
            variant="solid"
            to="/resume.pdf"
            target="_blank"
            class="hidden sm:flex"
          />
        </div>
      </div>
    </UContainer>
  </header>
</template>
