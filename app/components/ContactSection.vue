<template>
  <section
    id="contact"
    class="py-12 md:py-20 relative overflow-hidden"
  >
    <!-- Background Glow -->
    <div class="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none" />

    <div class="container mx-auto px-6 relative z-10">
      <div
        ref="headerRef"
        class="mb-8 md:mb-16 max-w-2xl mx-auto text-center"
        :class="getAnimClass(headerAnim)"
      >
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="h-1 w-12 bg-primary-500 rounded-full" />
          <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Get In Touch
          </h2>
          <div class="h-1 w-12 bg-primary-500 rounded-full" />
        </div>
        <p class="text-slate-400 text-lg">
          Have a technical challenge, project, or collaboration in mind? Let's connect.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <!-- Form Side -->
        <div
          ref="formRef"
          :class="getAnimClass(formAnim)"
          class="glass-card p-8 md:p-10 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md"
        >
          <form
            class="space-y-6"
            @submit.prevent="submitForm"
          >
            <div class="space-y-2">
              <label
                for="name"
                class="block text-sm font-medium text-slate-300"
              >Name</label>
              <UInput
                id="name"
                v-model="form.name"
                icon="i-lucide-user"
                placeholder="Your name"
                size="lg"
                :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-primary-500' }"
                required
              />
            </div>

            <div class="space-y-2">
              <label
                for="email"
                class="block text-sm font-medium text-slate-300"
              >Email</label>
              <UInput
                id="email"
                v-model="form.email"
                type="email"
                icon="i-lucide-mail"
                placeholder="your@email.com"
                size="lg"
                :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-primary-500' }"
                required
              />
            </div>

            <div class="space-y-2">
              <label
                for="message"
                class="block text-sm font-medium text-slate-300"
              >Message</label>
              <UTextarea
                id="message"
                v-model="form.message"
                placeholder="Tell me about your project..."
                :rows="5"
                size="lg"
                :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-primary-500' }"
                required
              />
            </div>

            <UButton
              type="submit"
              label="Send Message"
              icon="i-lucide-send"
              color="primary"
              size="lg"
              block
              class="mt-8 py-3 font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-shadow"
            />
          </form>
        </div>

        <!-- Contact Info Side -->
        <div
          ref="infoRef"
          :class="getAnimClass(infoAnim)"
          class="flex flex-col gap-6 justify-center"
        >
          <a
            v-for="(info, index) in contactInfo"
            :key="index"
            :href="info.link"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-6 p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 group"
          >
            <div class="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 group-hover:scale-110 transition-all duration-300 shadow-inner shadow-primary-500/20">
              <UIcon
                :name="info.icon"
                class="w-6 h-6 text-primary-400 group-hover:text-primary-300"
              />
            </div>
            <div>
              <div class="text-sm text-slate-400 font-medium mb-1">{{ info.label }}</div>
              <div class="text-white font-medium text-lg">{{ info.value }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollAnimation, type AnimState } from '~/composables/useScrollAnimation'

const { setupAnimation, getAnimClass } = useScrollAnimation()

const headerRef = ref<HTMLElement | null>(null)
const headerAnim = ref<AnimState>({ isVisible: false, hasAnimated: false })

const formRef = ref<HTMLElement | null>(null)
const formAnim = ref<AnimState>({ isVisible: false, hasAnimated: false })

const infoRef = ref<HTMLElement | null>(null)
const infoAnim = ref<AnimState>({ isVisible: false, hasAnimated: false })

onMounted(() => {
  setupAnimation(headerRef, headerAnim)
  setupAnimation(formRef, formAnim, { delay: 100 })
  setupAnimation(infoRef, infoAnim, { delay: 200 })
})

const form = ref({
  name: '',
  email: '',
  message: ''
})

const contactInfo = [
  { label: 'Email', value: 'usaidh.ai@gmail.com', icon: 'i-lucide-mail', link: 'mailto:usaidh.ai@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/usaidh', icon: 'i-simple-icons-linkedin', link: 'https://linkedin.com/in/usaidh' },
  { label: 'Location', value: 'Singapore', icon: 'i-lucide-map-pin', link: '#' }
]

const submitForm = () => {
  const subject = encodeURIComponent(`New Contact Request from ${form.value.name}`)
  const body = encodeURIComponent(`Name: ${form.value.name}\nEmail: ${form.value.email}\n\nMessage:\n${form.value.message}`)
  window.location.href = `mailto:usaidh.ai@gmail.com?subject=${subject}&body=${body}`
}
</script>

<style scoped>
.glass-card {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
</style>
