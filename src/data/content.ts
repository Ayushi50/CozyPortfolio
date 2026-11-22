// All professional content is sourced from https://ayushi-dev.netlify.app/
// Optional case-study fields (problem, approach, contribution, challenges, outcomes)
// render automatically when you fill them in — nothing is invented here.

export type SectionId = 'about' | 'projects' | 'experience' | 'skills' | 'contact'

export const profile = {
  name: 'Ayushi',
  role: 'Software Engineer',
  tagline: 'Building things that grow.',
  summary:
    'Building software that feels effortless on the surface and stays reliable underneath.',
  email: 'ayushi2k@gmail.com',
  linkedin: 'https://www.linkedin.com/in/itsayushi/',
  github: 'https://github.com/Ayushi50',
  resume: 'https://ayushi-dev.netlify.app/images/Ayushi_Resume.pdf',
  classicSite: 'https://ayushi-dev.netlify.app/',
}

export const about = {
  intro:
    'I’m a software engineer at Fidelity Investments, working on distributed systems and production APIs. I like backends that stay calm under load and interfaces that never make you think about them.',
  background:
    'I joined Fidelity as a full stack engineer intern in January 2023 and have grown through the engineering ladder since — from Angular screens and batch jobs to REST APIs and service migrations.',
  focus: ['Distributed systems', 'Production APIs', 'Reliable, useful software'],
  currently: 'Building reliable products with Java, Spring Boot and Angular.',
  sideQuests: [
    'Tracking books, movies, anime and K-dramas',
    'Reading and discovering comics',
    'Planting small side projects',
  ],
}

export interface Role {
  id: string
  company: string
  role: string
  dates: string
  start: string
  work: string[]
  tech: string[]
}

// Ordered oldest → newest so the path "grows" toward the cottage.
export const roles: Role[] = [
  {
    id: 'intern',
    company: 'Fidelity Investments',
    role: 'Full Stack Engineer Intern',
    dates: 'Jan 2023 — Jul 2023',
    start: 'Jan 2023',
    work: [
      'Developed an end-to-end application used extensively by operations.',
      'Created engaging front-end experiences with Angular.',
    ],
    tech: ['Angular', 'JavaScript', 'Full stack'],
  },
  {
    id: 'swe',
    company: 'Fidelity Investments',
    role: 'Software Engineer',
    dates: 'Aug 2023 — Aug 2024',
    start: 'Aug 2023',
    work: [
      'Developed Angular screens for Alternative Investments and an AWS Batch job for confirms processing.',
      'Replaced a legacy Linux cron job with Spring Batch for better automation and traceability.',
    ],
    tech: ['Angular', 'Spring Batch', 'AWS Batch', 'Jenkins'],
  },
  {
    id: 'swe2',
    company: 'Fidelity Investments',
    role: 'Software Engineer 2',
    dates: 'Aug 2024 — Present',
    start: 'Aug 2024',
    work: [
      'Built a production-ready Order Entry REST API with Java, Spring Boot, and a Flex rule engine.',
      'Delivered MF-to-ETF conversion and migrated a legacy .NET image service to Keel Micronaut.',
    ],
    tech: ['Java', 'Spring Boot', 'Micronaut', 'JUnit', 'Mockito'],
  },
]

export interface Certification {
  issuer: string
  title: string
  blurb: string
  href: string
}

export const certifications: Certification[] = [
  {
    issuer: 'Amazon Web Services',
    title: 'AWS Certified Developer – Associate',
    blurb: 'Cloud development, deployment, and secure application delivery.',
    href: 'https://www.credly.com/badges/3a66069e-6db6-4d28-a582-d7ee03bc3f9e/linked_in_profile',
  },
  {
    issuer: 'Google Cloud',
    title: 'Architecting with Google Compute Engine',
    blurb: 'Building scalable cloud infrastructure with Google Compute Engine.',
    href: 'https://drive.google.com/file/d/1KF7ZXNujDa-lVbpi92Xb_FJWnuiH2ity/view',
  },
  {
    issuer: 'Cisco Networking Academy',
    title: 'CCNA: Introduction to Networks',
    blurb: 'Networking foundations, IP connectivity, and network services.',
    href: 'https://drive.google.com/file/d/1XBO83UodV-r54bauJd12wTIEGHY1CXbO/view',
  },
]

export interface Project {
  id: string
  name: string
  kind: string
  plant: 'fern' | 'cactus' | 'bonsai' | 'orchid'
  plantName: string
  overview: string
  tech: string[]
  live?: string
  github?: string
  // Optional deeper write-up; rendered only when present.
  problem?: string
  approach?: string
  contribution?: string
  challenges?: string
  outcomes?: string
  // Architecture nodes derived strictly from the listed stack.
  architecture?: { label: string; sub: string }[]
}

export const projects: Project[] = [
  {
    id: 'flowboard',
    name: 'Flowboard',
    kind: 'Featured project',
    plant: 'fern',
    plantName: 'Fern',
    overview:
      'A project and task management board to plan work, track progress and keep teams in flow.',
    tech: ['Java 21', 'Spring Boot', 'PostgreSQL', 'React 19', 'TypeScript', 'Tailwind CSS'],
    live: 'https://flowboard-web-46vf.onrender.com/',
    github: 'https://github.com/Ayushi50/FlowBoard',
    problem: 'Planning work, tracking progress and keeping a team in flow in one place.',
    architecture: [
      { label: 'Web client', sub: 'React 19 · TypeScript · Tailwind CSS' },
      { label: 'API', sub: 'Java 21 · Spring Boot' },
      { label: 'Data', sub: 'PostgreSQL' },
    ],
  },
  {
    id: 'syncroom',
    name: 'SyncRoom',
    kind: 'Full stack',
    plant: 'cactus',
    plantName: 'Cactus',
    overview:
      'Meeting room booking: search by date, time, headcount and equipment, see only rooms that are free, and get a confirmation email with a calendar invite.',
    tech: ['Java 21', 'Spring Boot', 'PostgreSQL', 'React 18', 'Tailwind CSS', 'JWT'],
    live: 'https://syncroom-g48g.onrender.com/',
    github: 'https://github.com/Ayushi50/SyncRoom',
    architecture: [
      { label: 'Web client', sub: 'React 18 · Tailwind CSS' },
      { label: 'API', sub: 'Java 21 · Spring Boot · JWT' },
      { label: 'Data', sub: 'PostgreSQL' },
    ],
  },
  {
    id: 'gatepass',
    name: 'Gatepass',
    kind: 'Microservices',
    plant: 'bonsai',
    plantName: 'Bonsai',
    overview:
      'Live event ticket booking built as an event-driven microservices system, with seat holds, payments and a load test proving zero duplicate sales.',
    tech: ['NestJS', 'Next.js', 'Kafka', 'PostgreSQL', 'Redis', 'Grafana'],
    github: 'https://github.com/Ayushi50/Gatepass',
    architecture: [
      { label: 'Web client', sub: 'Next.js' },
      { label: 'Services', sub: 'NestJS · Kafka · Redis' },
      { label: 'Data & monitoring', sub: 'PostgreSQL · Grafana' },
    ],
  },
  {
    id: 'library',
    name: 'The Livin’ Library',
    kind: 'Side quest',
    plant: 'bonsai',
    plantName: 'Bonsai',
    overview:
      'A personal tracker for books, movies, anime and K-dramas, with reading progress, stats and goals in one place.',
    tech: ['React 19', 'TypeScript', 'CSS', 'Supabase Auth', 'Postgres', 'TMDB API', 'Node.js'],
    live: 'https://livin-library.vercel.app/',
    github: 'https://github.com/Ayushi50/Living-Library.git',
    architecture: [
      { label: 'Web client', sub: 'React 19 · TypeScript · CSS' },
      { label: 'Auth & data', sub: 'Supabase Auth · Postgres' },
      { label: 'Media source', sub: 'TMDB API · Node.js' },
    ],
  },
  {
    id: 'comic-gali',
    name: 'Comic-gali',
    kind: 'Side quest',
    plant: 'orchid',
    plantName: 'Orchid',
    overview: 'A cozy corner of the internet for reading and discovering comics.',
    tech: ['React 18', 'TypeScript', 'Vite', 'Cloudflare Pages', 'Cloudflare D1'],
    live: 'https://comic-gali.pages.dev/',
    github: 'https://github.com/Ayushi50/Comic-gali.git',
    architecture: [
      { label: 'Web client', sub: 'React 18 · TypeScript · Vite' },
      { label: 'Hosting', sub: 'Cloudflare Pages' },
      { label: 'Data', sub: 'Cloudflare D1' },
    ],
  },
]

export interface SkillGroup {
  id: string
  title: string
  note: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend',
    note: 'The workbench',
    items: ['Java', 'Spring Boot', 'Spring Batch', 'JPA/Hibernate', 'RESTful API Design', 'Micronaut', 'Maven'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    note: 'Greenhouse tools',
    items: ['Angular', 'React', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'database',
    title: 'Databases',
    note: 'The jar shelf',
    items: ['PostgreSQL', 'MySQL', 'SQL'],
  },
  {
    id: 'cloud',
    title: 'Cloud & infrastructure',
    note: 'Heavy gear',
    items: ['AWS (EKS, Batch, EC2)', 'Terraform', 'Kompass', 'Docker'],
  },
  {
    id: 'devtools',
    title: 'Developer tools',
    note: 'Pocket tools',
    items: ['Jenkins', 'CI/CD', 'JUnit', 'Mockito', 'Selenium', 'Cucumber', 'Cypress', 'Jasmine'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    note: 'Blueprint drawer',
    items: ['Microservices', 'Distributed Systems', 'System Design (LLD/HLD)', 'Design Patterns', 'OOP', 'SOLID'],
  },
  {
    id: 'ai',
    title: 'AI tooling',
    note: 'New on the shelf',
    items: ['Prompt Engineering (Claude, Copilot)'],
  },
]

// Skills that appear in the technologies of professional roles above.
export const usedAtWork = new Set<string>([
  'Java',
  'Spring Boot',
  'Spring Batch',
  'Micronaut',
  'Angular',
  'JavaScript',
  'JUnit',
  'Mockito',
  'Jenkins',
  'AWS (EKS, Batch, EC2)',
])

export const sections: { id: SectionId; label: string; key: string; object: string }[] = [
  { id: 'about', label: 'About', key: '1', object: 'The cottage' },
  { id: 'projects', label: 'Projects', key: '2', object: 'The greenhouse' },
  { id: 'experience', label: 'Experience', key: '3', object: 'The garden path' },
  { id: 'skills', label: 'Skills', key: '4', object: 'The tool shed' },
  { id: 'contact', label: 'Contact', key: '5', object: 'The mailbox' },
]
