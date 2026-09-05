<script setup lang="ts">
import Desktop from '~/components/beta/Desktop.vue'

definePageMeta({
  layout: 'beta'
})

useHead({
  title: 'Usaidh OS (Beta) — Interactive Desktop Portfolio',
  meta: [
    {
      name: 'description',
      content: 'An interactive retro OS desktop portfolio with Windows 7, Windows 8, Mac OS X, and Ubuntu themes. Explore projects, engineering leadership, experience, and an AI terminal.'
    },
    {
      name: 'theme-color',
      content: '#0d1b2a'
    }
  ]
})
</script>

<template>
  <div class="h-screen w-screen overflow-hidden bg-[#0d1b2a]">
    <Desktop />
  </div>
</template>
