<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const { animateOnScroll } = useScrollAnimation()

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([
  {
    id: Date.now(),
    role: 'assistant',
    content: "Hi! I'm Usaidh's AI assistant. Ask me anything about his experience, skills, or projects."
  }
])
const inputMessage = ref('')
const isLoading = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

const suggestedQuestions = [
  "What's your tech stack?",
  "Tell me about your leadership experience",
  "What AI projects have you built?"
]

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const askQuestion = (question: string) => {
  inputMessage.value = question
  sendMessage()
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value || messages.value.length >= 20) return

  const userMsg = inputMessage.value.trim()
  inputMessage.value = ''
  
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: userMsg
  })
  
  scrollToBottom()
  isLoading.value = true

  try {
    const response = await $fetch<{ reply: string }>('/api/chat', {
      method: 'POST',
      body: { message: userMsg }
    })
    
    messages.value.push({
      id: Date.now(),
      role: 'assistant',
      content: response.reply || "I couldn't generate a response."
    })
  } catch (error) {
    messages.value.push({
      id: Date.now(),
      role: 'assistant',
      content: "Sorry, I'm having trouble connecting right now. Please try again later."
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<template>
  <section id="ai-playground" class="py-24 relative" v-bind="animateOnScroll">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="mb-16 text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">AI Playground</h2>
        <div class="h-1 w-24 bg-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] mb-6"></div>
        <p class="text-slate-400 max-w-2xl mx-auto text-lg">Ask my AI assistant anything about my experience, skills, and projects.</p>
      </div>

      <div class="glass-card max-w-2xl mx-auto rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl flex flex-col">
        <div 
          ref="chatContainer" 
          class="p-6 overflow-y-auto flex-grow bg-[#080c1a]/50" 
          style="min-height: 300px; max-height: 400px;"
        >
          <div class="flex flex-col space-y-4">
            <div 
              v-for="msg in messages" 
              :key="msg.id" 
              class="chat-message max-w-[85%] rounded-2xl p-4"
              :class="msg.role === 'assistant' ? 'self-start bg-[#0f1629]/50 border border-slate-700/50 text-slate-200 rounded-tl-sm' : 'self-end bg-blue-600/20 border border-blue-500/30 text-white rounded-tr-sm'"
            >
              <p class="whitespace-pre-wrap text-sm md:text-base">{{ msg.content }}</p>
            </div>
            
            <div v-if="isLoading" class="self-start bg-[#0f1629]/50 border border-slate-700/50 text-slate-200 rounded-2xl rounded-tl-sm p-4 max-w-[85%] chat-message">
              <div class="flex space-x-1 h-5 items-center">
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-4 bg-[#0f1629] border-t border-slate-800">
          <div class="flex flex-wrap gap-2 mb-4">
            <button 
              v-for="(question, index) in suggestedQuestions" 
              :key="index"
              @click="askQuestion(question)"
              :disabled="isLoading || messages.length >= 20"
              class="text-xs bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 rounded-full px-3 py-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ question }}
            </button>
          </div>
          
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <UInput 
              v-model="inputMessage" 
              placeholder="Ask about my experience..." 
              :disabled="isLoading || messages.length >= 20"
              class="flex-grow"
              size="lg"
            />
            <UButton 
              type="submit" 
              color="primary" 
              icon="i-lucide-send-horizontal" 
              :disabled="isLoading || !inputMessage.trim() || messages.length >= 20"
              size="lg"
            />
          </form>
          <div v-if="messages.length >= 20" class="text-xs text-center text-slate-500 mt-2">
            Conversation limit reached.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
