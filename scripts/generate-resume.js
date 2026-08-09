import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'

const doc = new PDFDocument({
  size: 'A4',
  margin: 40
})

const outputDir = path.join(process.cwd(), 'public')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const outputPath = path.join(outputDir, 'resume.pdf')
const writeStream = fs.createWriteStream(outputPath)
doc.pipe(writeStream)

// Colors
const PRIMARY = '#0f1629'
const ACCENT = '#2563eb'
const TEXT_DARK = '#1e293b'
const TEXT_MUTED = '#64748b'
const LINE_COLOR = '#e2e8f0'

// Header
doc.fillColor(PRIMARY).fontSize(22).font('Helvetica-Bold').text('USAIDH MOHAMED', { characterSpacing: 0.5 })
doc.fillColor(ACCENT).fontSize(12).font('Helvetica-Bold').text('Frontend Technical Lead / Full Stack Engineer', { spaceAfter: 6 })

// Contact Info & Portfolio Link
doc.fontSize(9).font('Helvetica').fillColor(TEXT_MUTED)
doc.text('Singapore  |  uaidh.ai@gmail.com  |  linkedin.com/in/usaidh  |  Portfolio: ', { continued: true })
doc.fillColor(ACCENT).font('Helvetica-Bold').text('https://usaidh-portforlio.vercel.app/', { link: 'https://usaidh-portforlio.vercel.app/' })

doc.moveDown(0.8)
doc.strokeColor(LINE_COLOR).lineWidth(1).moveTo(40, doc.y).lineTo(555, doc.y).stroke()
doc.moveDown(0.8)

// Section Generator Helper
function addSectionHeader(title) {
  doc.fillColor(PRIMARY).fontSize(12).font('Helvetica-Bold').text(title.toUpperCase())
  doc.moveDown(0.3)
  doc.strokeColor(ACCENT).lineWidth(1.5).moveTo(40, doc.y).lineTo(100, doc.y).stroke()
  doc.strokeColor(LINE_COLOR).lineWidth(0.5).moveTo(100, doc.y).lineTo(555, doc.y).stroke()
  doc.moveDown(0.5)
}

// Summary
addSectionHeader('Professional Summary')
doc.fillColor(TEXT_DARK).fontSize(9.5).font('Helvetica').lineGap(3)
doc.text('Frontend Technical Lead with 10+ years of experience driving enterprise frontend architecture, CEO-level ownership initiatives, design systems, and AI-driven web applications across Fintech, Banking (UOB, DBS), Healthcare, and Real Estate. Specialist in Vue, Nuxt, React, and Next.js. Proven track record in mentoring engineering teams, optimizing Core Web Vitals to 95+ scores, and building high-performance web applications.')

doc.moveDown(1)

// Skills
addSectionHeader('Core Competencies')
const skills = [
  ['Frontend Architecture:', 'Vue, Nuxt, React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, SCSS'],
  ['AI & Emerging Tech:', 'Google Gemini API Integration, AI-Driven Content Pipelines, Figma-to-Code AI Workflows, Prompt Engineering'],
  ['Design Systems:', 'Design Token Architecture, Storybook, Component Libraries, Figma Integration, Style Dictionary'],
  ['Backend & DevOps:', 'Node.js, Express, REST APIs, GraphQL, PostgreSQL, MongoDB, AWS, Docker, CI/CD, Vercel'],
  ['Performance & SEO:', 'Core Web Vitals Optimization, Lighthouse Auditing, SSR/SSG Strategies, Accessibility (WCAG AA)']
]

skills.forEach(([category, list]) => {
  doc.font('Helvetica-Bold').fillColor(TEXT_DARK).fontSize(9).text(category + ' ', { continued: true })
  doc.font('Helvetica').fillColor(TEXT_MUTED).text(list)
})

doc.moveDown(1)

// Experience
addSectionHeader('Professional Experience')

const experiences = [
  {
    company: 'Rently',
    role: 'Frontend Developer',
    dates: 'May 2026 – Present',
    bullets: [
      'Driving frontend ownership and technical initiatives for innovative prop-tech solutions.',
      'Building AI-integrated web experiences to enhance property management platforms.',
      'Establishing frontend architecture governance and UI performance benchmarks.'
    ]
  },
  {
    company: 'Aleph-Labs',
    role: 'Lead Frontend Engineer / Senior Software Engineer',
    dates: 'Aug 2022 – May 2026',
    bullets: [
      'Collaborated on UOB Singapore\'s Private Banking & SME applications, delivering high-performance hybrid mobile and web solutions.',
      'Partnered with UOB TMRW to optimize retail banking web experiences, achieving 95+ Lighthouse scores.',
      'Led the frontend team in creating UOB\'s in-house native-web bridge, benchmarking performance against Cordova and React Native.'
    ]
  },
  {
    company: 'Knowledge Outsource (Pvt) Ltd',
    role: 'Technical Team Lead',
    dates: 'Aug 2021 – Aug 2022',
    bullets: [
      'Served as Lead Developer for DBS Singapore R&D, orchestrating the DBS Insights Direct research platform.',
      'Architected scalable investment resource platforms using React, Python, ChartJS, and AWS.',
      'Enforced coding standards, CI/CD pipelines, and WCAG AA accessibility compliance.'
    ]
  },
  {
    company: 'Cambio Software Engineering',
    role: 'Technical Lead / Associate Technical Lead',
    dates: 'May 2019 – Jun 2021',
    bullets: [
      'Led a cross-functional engineering team establishing UI strategies for enterprise healthcare platforms.',
      'Mentored junior developers into mid-level engineering roles while ensuring high code quality.'
    ]
  },
  {
    company: 'IdeaBits & EIGHT25MEDIA',
    role: 'Senior Software Engineer',
    dates: 'Mar 2017 – Apr 2019',
    bullets: [
      'Architected customer-facing web applications and streamlined CI/CD automated deployment pipelines.'
    ]
  }
]

experiences.forEach((exp) => {
  doc.font('Helvetica-Bold').fillColor(PRIMARY).fontSize(10).text(exp.company, { continued: true })
  doc.font('Helvetica').fillColor(TEXT_MUTED).fontSize(9).text(`  |  ${exp.role}`, { continued: true })
  doc.font('Helvetica-Oblique').fillColor(TEXT_MUTED).fontSize(8.5).text(` (${exp.dates})`, { align: 'right' })

  exp.bullets.forEach((bullet) => {
    doc.font('Helvetica').fillColor(TEXT_DARK).fontSize(8.5).text(`•  ${bullet}`, { indent: 10, lineGap: 1.5 })
  })
  doc.moveDown(0.4)
})

doc.moveDown(0.6)

// Featured Projects
addSectionHeader('Featured Projects')

const projects = [
  { name: 'UOB Private Banking & Design System:', desc: 'Enterprise banking web app and component library serving high-net-worth clients.' },
  { name: 'AI Portfolio & Chatbot:', desc: 'Interactive developer portfolio with Gemini AI Assistant (https://usaidh-portforlio.vercel.app/).' },
  { name: 'Figma-to-Code AI Agent:', desc: 'Automated workflow translating Figma designs into production-ready Vue components.' }
]

projects.forEach((proj) => {
  doc.font('Helvetica-Bold').fillColor(TEXT_DARK).fontSize(9).text(proj.name + ' ', { continued: true })
  doc.font('Helvetica').fillColor(TEXT_MUTED).fontSize(8.5).text(proj.desc)
})

doc.moveDown(1)
doc.strokeColor(LINE_COLOR).lineWidth(0.5).moveTo(40, doc.y).lineTo(555, doc.y).stroke()
doc.moveDown(0.5)

// Footer
doc.font('Helvetica-Oblique').fillColor(TEXT_MUTED).fontSize(8).text(
  'Online Portfolio & Live AI Assistant: https://usaidh-portforlio.vercel.app/',
  { align: 'center', link: 'https://usaidh-portforlio.vercel.app/' }
)

doc.end()

writeStream.on('finish', () => {
  console.log('PDF generated successfully at public/resume.pdf')
})
