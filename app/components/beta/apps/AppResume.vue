<script setup lang="ts">
import { ref } from 'vue'

const isPdfLoaded = ref(true)
</script>

<template>
  <div class="h-full flex flex-col bg-slate-900 text-slate-200 select-text text-xs">
    <!-- Document Toolbar -->
    <div class="px-3 py-2 bg-black/40 border-b border-white/10 flex items-center justify-between shrink-0 select-none">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-file-text"
          class="w-4 h-4 text-primary-400"
        />
        <span class="font-medium text-white">resume.pdf</span>
        <span class="text-[10px] text-slate-400 bg-white/10 px-1.5 py-0.5 rounded">PDF Document</span>
      </div>

      <div class="flex items-center gap-2">
        <a
          href="/resume.pdf"
          target="_blank"
          download
          class="flex items-center gap-1.5 px-3 py-1 rounded bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors"
        >
          <UIcon
            name="i-lucide-download"
            class="w-3.5 h-3.5"
          />
          <span>Download PDF</span>
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          class="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white"
          title="Open in new window"
        >
          <UIcon
            name="i-lucide-external-link"
            class="w-4 h-4"
          />
        </a>
      </div>
    </div>

    <!-- Viewer Body -->
    <div class="flex-1 bg-slate-950 flex items-center justify-center overflow-hidden relative">
      <iframe
        v-if="isPdfLoaded"
        src="/resume.pdf#toolbar=0&navpanes=0"
        class="w-full h-full border-none"
        title="Resume Preview"
      />
      <div
        v-else
        class="text-center p-6 text-slate-400"
      >
        <p class="mb-3">
          Unable to preview PDF inside window.
        </p>
        <a
          href="/resume.pdf"
          target="_blank"
          download
          class="px-4 py-2 bg-primary-600 text-white rounded font-medium inline-flex items-center gap-2"
        >
          <UIcon name="i-lucide-download" /> Download Resume
        </a>
      </div>
    </div>
  </div>
</template>
