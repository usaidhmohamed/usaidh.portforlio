<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: 'Frontend Leadership Collaboration',
  message: ''
})

function sendMail() {
  const subject = encodeURIComponent(`${form.value.subject} - from ${form.value.name}`)
  const body = encodeURIComponent(`Name: ${form.value.name}\nEmail: ${form.value.email}\n\n${form.value.message}`)
  window.location.href = `mailto:usaidh.ai@gmail.com?subject=${subject}&body=${body}`
}
</script>

<template>
  <div class="h-full flex flex-col bg-slate-900 text-slate-200 select-text text-xs">
    <!-- Mail Toolbar -->
    <div class="px-3 py-2 bg-black/30 border-b border-white/10 flex items-center justify-between shrink-0 select-none">
      <div class="flex items-center gap-2">
        <button
          class="flex items-center gap-1 px-3 py-1 rounded bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors"
          @click="sendMail"
        >
          <UIcon
            name="i-lucide-send"
            class="w-3.5 h-3.5"
          />
          <span>Send Message</span>
        </button>
      </div>

      <div class="flex items-center gap-3 text-slate-400">
        <a
          href="https://linkedin.com/in/usaidh"
          target="_blank"
          class="hover:text-primary-400 flex items-center gap-1"
        >
          <UIcon
            name="i-simple-icons-linkedin"
            class="w-3.5 h-3.5"
          />
          <span class="hidden sm:inline">LinkedIn</span>
        </a>
        <span>Singapore</span>
      </div>
    </div>

    <!-- Compose Fields -->
    <div class="p-4 flex-1 overflow-y-auto space-y-3">
      <div class="flex items-center gap-2 border-b border-white/10 pb-2">
        <span class="text-slate-400 font-medium w-16">To:</span>
        <span class="font-mono text-white bg-white/10 px-2 py-0.5 rounded text-xs">usaidh.ai@gmail.com</span>
      </div>

      <div class="flex items-center gap-2 border-b border-white/10 pb-2">
        <span class="text-slate-400 font-medium w-16">Your Name:</span>
        <input
          v-model="form.name"
          type="text"
          placeholder="e.g. Jane Doe"
          class="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder:text-slate-600"
          required
        >
      </div>

      <div class="flex items-center gap-2 border-b border-white/10 pb-2">
        <span class="text-slate-400 font-medium w-16">Your Email:</span>
        <input
          v-model="form.email"
          type="email"
          placeholder="e.g. jane@company.com"
          class="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder:text-slate-600"
          required
        >
      </div>

      <div class="flex items-center gap-2 border-b border-white/10 pb-2">
        <span class="text-slate-400 font-medium w-16">Subject:</span>
        <input
          v-model="form.subject"
          type="text"
          class="flex-1 bg-transparent border-none outline-none text-white text-xs"
        >
      </div>

      <div class="pt-2 flex flex-col h-[calc(100%-180px)] min-h-[140px]">
        <textarea
          v-model="form.message"
          placeholder="Type your message, discussion point, or collaboration opportunity here..."
          class="w-full flex-1 bg-black/20 p-3 rounded-lg border border-white/10 text-white text-xs sm:text-sm resize-none outline-none focus:border-primary-500 placeholder:text-slate-600"
        />
      </div>
    </div>
  </div>
</template>
