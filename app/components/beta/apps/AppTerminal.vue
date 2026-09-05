<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface TerminalLine {
  id: number
  type: 'system' | 'user' | 'assistant' | 'error'
  text: string
}

const lines = ref<TerminalLine[]>([
  { id: 1, type: 'system', text: 'Usaidh OS [Version 10.0.22000.1]' },
  { id: 2, type: 'system', text: '(c) 2026 Usaidh Mohamed. All rights reserved.' },
  { id: 3, type: 'system', text: 'Type a message or question to consult the AI Technical Lead Assistant.' },
  { id: 4, type: 'assistant', text: 'AI: Ready. Ask me anything about Usaidh\'s architecture, fintech background, or skills!' }
])

const inputCommand = ref('')
const isLoading = ref(false)
const terminalBody = ref<HTMLElement | null>(null)

async function scrollToBottom() {
  await nextTick()
  if (terminalBody.value) {
    terminalBody.value.scrollTop = terminalBody.value.scrollHeight
  }
}

async function handleCommand() {
  const cmd = inputCommand.value.trim()
  if (!cmd || isLoading.value) return

  inputCommand.value = ''

  // Add user prompt to terminal output
  lines.value.push({
    id: Date.now(),
    type: 'user',
    text: `user@usaidh-os:~$ ${cmd}`
  })
  scrollToBottom()

  if (cmd.toLowerCase() === 'clear' || cmd.toLowerCase() === 'cls') {
    lines.value = [{ id: Date.now(), type: 'system', text: 'Terminal cleared.' }]
    return
  }

  if (cmd.toLowerCase() === 'help') {
    lines.value.push({
      id: Date.now(),
      type: 'system',
      text: 'Available commands:\n- clear: Clear terminal buffer\n- help: Show this guide\n- Or type any question to chat with the Gemini AI model.'
    })
    scrollToBottom()
    return
  }

  isLoading.value = true

  try {
    const response = await $fetch<{ reply: string }>('/api/chat', {
      method: 'POST',
      body: { message: cmd }
    })

    lines.value.push({
      id: Date.now(),
      type: 'assistant',
      text: `AI: ${response.reply || 'No output generated.'}`
    })
  } catch {
    lines.value.push({
      id: Date.now(),
      type: 'error',
      text: 'Error: Failed to connect to AI neural endpoint. Verify API key or network connection.'
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

function askPreset(prompt: string) {
  inputCommand.value = prompt
  handleCommand()
}
</script>

<template>
  <div class="h-full flex flex-col bg-black text-green-400 font-mono text-xs select-text">
    <!-- Quick Command Prompts -->
    <div class="px-3 py-1.5 bg-neutral-900 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto text-[11px] shrink-0 select-none">
      <span class="text-neutral-500">Suggested:</span>
      <button
        class="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors whitespace-nowrap"
        @click="askPreset('What is your tech stack and architecture?')"
      >
        Tech Stack
      </button>
      <button
        class="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors whitespace-nowrap"
        @click="askPreset('Tell me about your leadership experience at UOB and DBS')"
      >
        Banking Leadership
      </button>
      <button
        class="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors whitespace-nowrap"
        @click="askPreset('What AI workflows have you built?')"
      >
        AI Workflows
      </button>
    </div>

    <!-- Output Body -->
    <div
      ref="terminalBody"
      class="flex-1 p-4 overflow-y-auto space-y-1.5 leading-relaxed font-mono"
    >
      <div
        v-for="line in lines"
        :key="line.id"
        :class="{
          'text-neutral-400': line.type === 'system',
          'text-cyan-300 font-semibold': line.type === 'user',
          'text-green-400': line.type === 'assistant',
          'text-red-400': line.type === 'error'
        }"
        class="whitespace-pre-wrap"
      >
        {{ line.text }}
      </div>

      <div
        v-if="isLoading"
        class="text-yellow-400 animate-pulse"
      >
        [Executing query via Gemini AI...]
      </div>
    </div>

    <!-- Command Prompt Input -->
    <form
      class="p-2 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2 shrink-0"
      @submit.prevent="handleCommand"
    >
      <span class="text-green-500 select-none font-bold">❯</span>
      <input
        v-model="inputCommand"
        type="text"
        placeholder="Type a command or ask a question..."
        :disabled="isLoading"
        class="flex-1 bg-transparent border-none outline-none text-green-300 font-mono text-xs placeholder:text-neutral-600"
        autofocus
      >
      <button
        type="submit"
        :disabled="isLoading || !inputCommand.trim()"
        class="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs disabled:opacity-40"
      >
        Send
      </button>
    </form>
  </div>
</template>
