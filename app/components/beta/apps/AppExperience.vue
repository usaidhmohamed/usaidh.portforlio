<script setup lang="ts">
import { ref, computed } from 'vue'

const jobs = [
  {
    company: 'Rently',
    role: 'Frontend Developer',
    dates: 'May 2026 — Present',
    type: 'Current Role',
    level: 'Information',
    eventId: 108,
    bullets: [
      'Driving frontend ownership and technical initiatives for innovative property tech solutions.',
      'Building AI-integrated web experiences to enhance property management platforms.',
      'Establishing architecture governance and UI performance benchmarks.'
    ]
  },
  {
    company: 'Aleph-Labs',
    role: 'Lead Frontend Engineer / Senior Software Engineer',
    dates: 'Aug 2022 — May 2026',
    type: 'Enterprise Banking',
    level: 'Information',
    eventId: 107,
    bullets: [
      'Collaborated on UOB Singapore\'s SME Application, delivering a cutting-edge hybrid mobile and responsive online solution for elite banking clients.',
      'Partnered with UOB TMRW to build high-performance retail banking web experiences, optimizing Core Web Vitals to achieve 95+ Lighthouse scores.',
      'Led the frontend team in creating UOB\'s in-house native-web bridge, establishing technical benchmarks against Cordova, Capacitor, and React Native.'
    ]
  },
  {
    company: 'Knowledge Outsource (Pvt) Ltd',
    role: 'Technical Team Lead',
    dates: 'Aug 2021 — Aug 2022',
    type: 'DBS Bank R&D',
    level: 'Information',
    eventId: 106,
    bullets: [
      'Served as Lead Developer for the DBS Singapore R&D department, orchestrating the DBS Insights Direct research platform.',
      'Architected a highly-scalable investment resource platform utilizing React, Python, ChartJS, and AWS.',
      'Championed coding standards, CI/CD pipelines, and accessibility standards achieving WCAG AA compliance.'
    ]
  },
  {
    company: 'Cambio Software Engineering',
    role: 'Technical Lead / Associate Technical Lead',
    dates: 'May 2019 — Jun 2021',
    type: 'Health Tech',
    level: 'Information',
    eventId: 105,
    bullets: [
      'Led a cross-functional engineering team, establishing technical strategies and best practices for enterprise health tech solutions.',
      'Mentored junior developers, successfully growing team members into mid-level engineering roles.',
      'Designed and implemented scalable UI architectures to support platforms serving large user bases.'
    ]
  },
  {
    company: 'IdeaBits',
    role: 'Senior Software Engineer',
    dates: 'Sep 2018 — Apr 2019',
    type: 'Web Applications',
    level: 'Information',
    eventId: 104,
    bullets: [
      'Drove senior-level frontend development and architectural design decisions for complex web applications.',
      'Streamlined deployment pipelines and integrated robust testing methodologies to ensure high system reliability.'
    ]
  },
  {
    company: 'EIGHT25MEDIA',
    role: 'Senior Software Engineer / Software Engineer',
    dates: 'Mar 2017 — Sep 2018',
    type: 'Client Solutions',
    level: 'Information',
    eventId: 103,
    bullets: [
      'Developed responsive, performant customer-facing applications utilizing modern JavaScript frameworks.',
      'Optimized mobile and web interfaces with Appium, significantly reducing time-to-market for key deliverables.'
    ]
  },
  {
    company: 'Calcey Technologies',
    role: 'Software Engineer',
    dates: 'Oct 2015 — Mar 2017',
    type: 'Healthcare & Real Estate',
    level: 'Information',
    eventId: 102,
    bullets: [
      'Engineered full-stack solutions and responsive websites for high-profile clients in healthcare and real estate.',
      'Contributed to agile software development lifecycles, ensuring timely delivery of robust web products.'
    ]
  },
  {
    company: 'hSenid Business Solutions',
    role: 'Support Engineer',
    dates: 'Apr 2015 — Sep 2015',
    type: 'Enterprise Support',
    level: 'Information',
    eventId: 101,
    bullets: [
      'Provided comprehensive Level 1 and Level 2 enterprise system support, rapidly resolving critical client issues.'
    ]
  }
]

const selectedIndex = ref(0)
const activeJob = computed<(typeof jobs)[0]>(() => jobs[selectedIndex.value] ?? (jobs[0] as (typeof jobs)[0]))
</script>

<template>
  <div class="h-full flex flex-col bg-slate-900 text-slate-200 select-text text-xs">
    <!-- Log Header -->
    <div class="p-2.5 bg-black/40 border-b border-white/10 flex items-center justify-between shrink-0 select-none">
      <div class="flex items-center gap-2 text-slate-300 font-medium">
        <UIcon
          name="i-lucide-list-checks"
          class="w-4 h-4 text-primary-400"
        />
        <span>Career Milestones (Total Events: {{ jobs.length }})</span>
      </div>
      <div class="text-[11px] text-slate-400">
        Log: Professional_Timeline.evtx
      </div>
    </div>

    <!-- Main 2-Pane Event Viewer -->
    <div class="flex-1 flex flex-col sm:flex-row overflow-hidden">
      <!-- Top / Left Event List Table -->
      <div class="w-full sm:w-1/2 border-r border-b sm:border-b-0 border-white/10 overflow-y-auto bg-black/20 shrink-0">
        <table class="w-full text-left border-collapse select-none">
          <thead class="bg-white/5 sticky top-0 text-slate-400 font-semibold text-[11px] border-b border-white/10">
            <tr>
              <th class="p-2 w-8">
                Lv
              </th>
              <th class="p-2">
                Company
              </th>
              <th class="p-2 hidden sm:table-cell">
                Dates
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr
              v-for="(job, idx) in jobs"
              :key="idx"
              class="cursor-pointer transition-colors"
              :class="selectedIndex === idx ? 'bg-primary-600/30 text-white font-medium' : 'hover:bg-white/5 text-slate-300'"
              @click="selectedIndex = idx"
            >
              <td class="p-2 text-center">
                <UIcon
                  name="i-lucide-info"
                  class="w-3.5 h-3.5 text-blue-400 inline"
                />
              </td>
              <td class="p-2">
                <div class="font-semibold text-xs text-white">
                  {{ job.company }}
                </div>
                <div class="text-[11px] text-slate-400 line-clamp-1">
                  {{ job.role }}
                </div>
              </td>
              <td class="p-2 text-[11px] text-slate-400 hidden sm:table-cell whitespace-nowrap">
                {{ job.dates.split('—')[0] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Right Event Details Panel -->
      <div class="flex-1 p-4 overflow-y-auto bg-slate-900/80">
        <div class="space-y-3">
          <div class="border-b border-white/10 pb-3">
            <span class="text-[10px] font-mono text-primary-400 font-bold uppercase tracking-wider">
              Event {{ activeJob.eventId }} · {{ activeJob.type }}
            </span>
            <h2 class="text-base sm:text-lg font-bold text-white mt-0.5">
              {{ activeJob.role }}
            </h2>
            <div class="text-xs font-semibold text-primary-300 mt-0.5">
              {{ activeJob.company }} ({{ activeJob.dates }})
            </div>
          </div>

          <div>
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Deliverables & Responsibilities
            </div>
            <ul class="space-y-2">
              <li
                v-for="(bullet, bIdx) in activeJob.bullets"
                :key="bIdx"
                class="flex items-start gap-2 text-slate-300 leading-relaxed text-xs sm:text-sm"
              >
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-4 h-4 text-primary-400 shrink-0 mt-0.5"
                />
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
