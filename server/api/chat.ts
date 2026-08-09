import { GoogleGenAI } from '@google/genai'

interface ChatRequest {
  message: string
}

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory rate limiter
const rateLimitMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT_MAX = 20
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRateLimitKey(event: any): string {
  const forwarded = getHeader(event, 'x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || getHeader(event, 'x-real-ip') || 'anonymous'
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count++
  return true
}

// Clean up stale entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, 60 * 1000)

const SYSTEM_PROMPT = `You are an AI assistant on Usaidh Mohamed's portfolio website. You answer questions ONLY about Usaidh's professional experience, skills, and background. Keep answers concise (2-4 sentences max).

Here is Usaidh's professional background:

**Name:** Usaidh Mohamed
**Title:** Frontend Technical Lead / Full Stack Engineer
**Location:** Singapore
**Experience:** 10+ years

**Current Role:** Frontend Technical Lead at a leading fintech company in Singapore, driving CEO-level frontend ownership initiative, building AI-driven web experiences and design systems.

**Key Leadership Experience:**
- Co-led a 6-member framework team at UOB (United Overseas Bank) to build and maintain the enterprise design system and component library.
- Led a 9-person frontend team at Cambio (fintech), establishing coding standards, CI/CD pipelines, and mentoring junior developers.
- Founding member of UOB's native-web bridge initiative, enabling seamless integration between native mobile apps and web views.
- Currently driving a CEO-level frontend ownership initiative, establishing frontend architecture governance across multiple product teams.

**Industries:** Fintech, Banking (UOB, DBS), Health, Real Estate

**Technical Skills:**
- Frontend Ecosystem: React, Next.js, Vue, Nuxt, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, SCSS, Web Components, Micro-frontends
- State Management & Data: Redux, Zustand, Pinia, Vuex, TanStack Query, RxJS, WebSockets
- AI & Emerging Tech: Google Gemini API integration, AI-driven content pipelines, Figma-to-Code AI agent workflows, Prompt engineering
- Design Systems & Tokens: Design token architecture, Storybook, Component libraries, Figma integration, Style Dictionary, WCAG AA Accessibility
- Backend & DevOps: Node.js, Express, REST APIs, GraphQL, PostgreSQL, MongoDB, AWS, Docker, CI/CD (GitHub Actions, Jenkins), Vercel, Netlify
- Performance & SEO: Core Web Vitals optimization (95+ Lighthouse scores), Performance Auditing, SSR/SSG/ISR strategies, Search Engine & Answer Engine Optimization (SEO/AEO)

**Featured Projects:**
1. UOB Modern Private Banking Web App - Enterprise banking web application serving high-net-worth clients, built with a custom design system and real-time dashboards.
2. UOB Design System - Enterprise-grade component library and design token system used across multiple banking applications.
3. Automated Blog Content Pipeline - AI-powered content generation system using LLMs for automated blog post creation and SEO optimization.
4. Figma-to-Code AI Agent Workflow - AI agent that converts Figma designs to production-ready UI components with design token integration.

**Work History:**
- Frontend Developer, Rently (May 2026 - Present)
- Lead Frontend Engineer / Senior Software Engineer, Aleph-Labs (Aug 2022 - May 2026)
- Technical Team Lead, Knowledge Outsource (Pvt) Ltd (Aug 2021 - Aug 2022)
- Technical Lead / Associate Technical Lead, Cambio Software Engineering (May 2019 - Jun 2021)
- Senior Software Engineer, IdeaBits (Sep 2018 - Apr 2019)
- Senior Software Engineer / Software Engineer, EIGHT25MEDIA (Mar 2017 - Sep 2018)
- Software Engineer, Calcey Technologies (Oct 2015 - Mar 2017)
- Support Engineer, hSenid Business Solutions (Apr 2015 - Sep 2015)

If someone asks something unrelated to Usaidh's professional profile, politely redirect them: "I'm here to help you learn about Usaidh's professional experience. Feel free to ask about his skills, projects, or work history!"

Do NOT make up information not provided above. If uncertain, say so honestly.`

export default defineEventHandler(async (event) => {
  // Only allow POST
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  // Rate limiting
  const clientKey = getRateLimitKey(event)
  if (!checkRateLimit(clientKey)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again in a few minutes.'
    })
  }

  // Parse and validate body
  const body = await readBody<ChatRequest>(event)

  if (!body?.message || typeof body.message !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Message is required' })
  }

  const message = body.message.trim()
  if (message.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Message cannot be empty' })
  }

  if (message.length > 500) {
    throw createError({ statusCode: 400, statusMessage: 'Message too long (max 500 characters)' })
  }

  // Get API key from runtime config
  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey

  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured')
    return {
      reply: 'I\'m currently unavailable. The AI service hasn\'t been configured yet. Please reach out to Usaidh directly via email or LinkedIn!'
    }
  }

  try {
    const ai = new GoogleGenAI({ apiKey })

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1000,
        temperature: 0.7
      }
    })

    const reply = response.text || 'I couldn\'t generate a response. Please try asking something else!'

    return { reply }
  } catch (error: unknown) {
    console.error('Gemini API error:', error instanceof Error ? error.message : error)

    return {
      reply: 'I\'m having trouble connecting to the AI service right now. Please try again later, or reach out to Usaidh directly via the contact section below!'
    }
  }
})
