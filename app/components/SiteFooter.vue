<template>
  <footer class="bg-[#080c1a]/80 backdrop-blur-lg border-t border-white/5 py-12 relative z-10">
    <div class="container mx-auto px-6">
      <div class="flex flex-col items-center justify-center gap-8">
        <!-- Quick Links -->
        <nav class="flex flex-wrap justify-center gap-8 text-sm font-medium">
          <a v-for="link in links" :key="link.name" :href="link.href" class="text-slate-400 hover:text-primary-400 transition-colors">
            {{ link.name }}
          </a>
        </nav>
        
        <!-- Built With -->
        <div class="flex items-center gap-2 text-slate-500 text-sm">
          <span>Built with</span>
          <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Nuxt 4</a>
          <span>&middot;</span>
          <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Vue 3</a>
          <span>&middot;</span>
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Tailwind CSS</a>
        </div>
        
        <!-- Copyright -->
        <div class="text-slate-500 text-sm text-center">
          &copy; {{ currentYear }} Usaidh Mohamed. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const links = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
]
</script>
