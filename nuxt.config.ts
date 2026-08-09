// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vercel/speed-insights/nuxt'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Usaidh Mohamed — Frontend Technical Lead & Full Stack Engineer',
      meta: [
        { name: 'description', content: 'Usaidh Mohamed is a Senior Frontend Technical Lead & Full Stack Engineer with 10+ years of experience in React, Next.js, Vue, Nuxt, TypeScript, Design Systems, and Web Performance Optimization.' },
        { name: 'keywords', content: 'Usaidh Mohamed, Frontend Technical Lead, Frontend Architect, Full Stack Engineer, React, Next.js, Vue.js, Nuxt, TypeScript, JavaScript, Web Performance, Core Web Vitals, Design Systems, Micro-frontends, AI Integration, Tailwind CSS, Singapore Software Engineer' },
        { property: 'og:title', content: 'Usaidh Mohamed — Frontend Technical Lead & Full Stack Engineer' },
        { property: 'og:description', content: 'Explore the portfolio of Usaidh Mohamed, Senior Frontend Technical Lead specializing in React, Next.js, Vue, Nuxt, TypeScript, Design Systems, and AI integrations.' },
        { property: 'og:image', content: 'https://usaidh-portforlio.vercel.app/og-image.png' },
        { property: 'og:url', content: 'https://usaidh-portforlio.vercel.app/' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Usaidh Mohamed — Frontend Technical Lead & Architect' },
        { name: 'twitter:description', content: 'Senior Frontend Tech Lead specializing in React, Next.js, Vue, Nuxt, TypeScript, Design Systems, and AI integrations.' },
        { name: 'twitter:image', content: 'https://usaidh-portforlio.vercel.app/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            'name': 'Usaidh Mohamed',
            'jobTitle': 'Frontend Technical Lead & Full Stack Engineer',
            'url': 'https://usaidh-portforlio.vercel.app/',
            'sameAs': [
              'https://linkedin.com/in/usaidh',
              'https://github.com/usaidhmohamed'
            ],
            'knowsAbout': [
              'Frontend Architecture',
              'React',
              'Next.js',
              'Vue.js',
              'Nuxt',
              'TypeScript',
              'JavaScript',
              'Design Systems',
              'Core Web Vitals & Web Performance',
              'Micro-frontends',
              'Tailwind CSS',
              'AI API Integration & Prompt Engineering'
            ],
            'description': 'Senior Frontend Technical Lead with 10+ years of experience leading enterprise frontend teams, building scalable React/Vue/Nuxt applications, design token architectures, and AI integrations.'
          })
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY || ''
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-07-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
