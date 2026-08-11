/* ============================================================================
 * portfolio.ts is the only file you need to edit.
 *
 * Everything on the site (metadata, nav, sections, schema.org, sitemap)
 * is derived from this object. Anything marked  // TODO  is a placeholder
 * you should replace or delete. The UI hides empty arrays automatically.
 * ==========================================================================*/

export type Social = { label: string; href: string; handle: string; icon: IconName };
export type IconName =
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'phone'
  | 'download'
  | 'external'
  | 'x'
  | 'scholar';

export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  hint: string;
  decimals?: number;
};

export type Skill = { name: string; level: number; note?: string };
export type SkillGroup = { category: string; blurb: string; skills: Skill[] };

export type Experience = {
  company: string;
  /** 1–2 letters used in the logo tile. Drop a real logo in /public/logos and set `logo`. */
  initials: string;
  logo?: string;
  role: string;
  team?: string;
  start: string;
  end: string;
  location: string;
  type: string;
  summary: string;
  /** Headline business outcome. This is what a recruiter reads first. */
  impact: string;
  achievements: string[];
  tech: string[];
  current?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  featured?: boolean;
  status?: 'Shipped' | 'In development' | 'Research';
  /** Path under /public, e.g. '/projects/legallease.png'. Falls back to a generated cover. */
  image?: string;
  problem: string;
  solution: string;
  impact: string[];
  tech: string[];
  /** Rendered as an ASCII/flow diagram inside the architecture modal. */
  architecture: { title: string; nodes: { label: string; detail: string }[] };
  screenshots?: { src: string; caption: string }[];
  links: { github?: string; demo?: string; writeup?: string };
  caseStudy: { heading: string; body: string }[];
};

export type Certification = {
  name: string;
  issuer: string;
  initials: string;
  date: string;
  credentialUrl?: string;
  skills?: string[];
};

export type Achievement = {
  kind: 'Award' | 'Hackathon' | 'Speaking' | 'Publication' | 'Patent' | 'Leadership' | 'Volunteer';
  title: string;
  org: string;
  date: string;
  detail: string;
  href?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatar?: string;
};

export type Post = {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  href: string;
};

export const portfolio = {
  /* ---------------------------------------------------------------- identity */
  site: {
    /** Used for canonical URLs, OG images, sitemap. Change after your first deploy. */
    url: 'https://javinahuja.com',
    locale: 'en_US',
    themeColor: '#060709',
  },

  name: 'Javin Ahuja',
  initials: 'JA',
  /** Level signal. Recruiters scan for this. */
  title: 'AI / Founding Engineer',
  subtitle: 'Applied AI · Agentic Systems · Full-Stack',
  location: 'College Park, MD · Open to relocation',
  availability: 'Open to SWE and AI Engineer roles, 2027 new grad and internships',

  /** Hero headline. Keep it under ~7 words. */
  headline: 'I build AI systems that hold up in production.',
  /** One-sentence value proposition. This is the 10-second pitch. */
  valueProp:
    'I am a founding engineer who builds retrieval and agentic AI systems end to end, from hybrid RAG and evaluation harnesses to the apps that sit on top of them. That work has shipped to more than 10,000 downloads, cut response latency by about 70%, and improved answer accuracy by 34.5%.',

  /** Rotating one-liners under the headline. */
  rotating: [
    'production RAG at 99% retrieval recall',
    'agents that are evaluated, not guessed at',
    'response latency from 9s down to under 3s',
    'TypeScript · Python · PyTorch · Postgres',
  ],

  /** Swap the file in /public to change it. Empty string falls back to a monogram. */
  headshot: '/headshot.jpg',
  resume: '/Javin_Ahuja_Resume.pdf',
  email: 'javinahuja18805@gmail.com',
  phone: '808-469-9684',

  socials: [
    { label: 'GitHub', handle: '@jav359003', href: 'https://github.com/jav359003', icon: 'github' },
    {
      label: 'LinkedIn',
      handle: 'javin-ahuja',
      href: 'https://www.linkedin.com/in/javin-ahuja-560100237/',
      icon: 'linkedin',
    },
    { label: 'Email', handle: 'javinahuja18805@gmail.com', href: 'mailto:javinahuja18805@gmail.com', icon: 'mail' },
  ] as Social[],

  /* ------------------------------------------------------------------- about */
  about: {
    lede: 'I get curious about something, dig into it until I actually understand it, and then I build it. That loop is most of how I spend my time, and it keeps leading me to work I did not expect to be doing.',
    paragraphs: [
      "I am a computer science student at the University of Maryland with a machine learning concentration. Most of what I know well, I learned by getting interested in a problem and then refusing to leave it alone. I take it apart, rebuild it badly, rebuild it better, read the paper I had been avoiding, and eventually end up with something that runs.",
      "That habit is how I ended up as the founding engineer at Peptide AI. I wanted to know why our chat felt slow and shallow, so I went into the retrieval layer and stayed there. I built hybrid dense and BM25 search, added cross-encoder reranking, and designed a semantic cache that brought answers from nine seconds down to under three. Nobody assigned me that work. I kept following the problem until it was fixed.",
      "The same thing happened earlier in my work. At Garden For Wildlife I kept retuning a RAG pipeline until it was 34.5% more accurate across 5,000 real queries. At Booz Allen Hamilton I built a video processing service. At Maryland I helped ship a Monte Carlo financial tool that 5,000 students actually use. On my own time I wrote a CNN with the convolution layer built by hand in NumPy, and a DQN agent that learns to play Pac-Man, because I wanted to see the gradients for myself instead of trusting the framework to be right.",
      'The common thread here is not really AI. It is that I like getting my hands dirty on hard problems, and I care whether the result actually works. That is why almost everything I build ends up with an evaluation harness attached to it.',
    ],
    principles: [
      { title: 'Follow the curiosity', body: 'The interesting problems usually reach me sideways. I go deep on whatever I cannot stop thinking about.' },
      { title: 'Build it to understand it', body: 'Writing the convolution layer by hand taught me more than any tutorial did. I take things apart and then rebuild them.' },
      { title: 'Care about the boring half', body: 'Latency, caching, safety guards, and regression suites are what make a system real, even though none of it is exciting to talk about.' },
      { title: 'Prove it got better', body: 'Every system I build has a number attached to whether it improved. Without that number I am only guessing.' },
    ],
  },

  /* ------------------------------------------------------------------- stats */
  stats: [
    { label: 'Years building', value: 3, suffix: '+', hint: 'Since 2023, across internships, research, and a founding role' },
    { label: 'Projects shipped', value: 12, suffix: '+', hint: 'Production apps, RAG systems, and ML research projects' },
    { label: 'Technologies', value: 40, suffix: '+', hint: 'Across AI, frontend, backend, data, and cloud' },
    { label: 'App downloads', value: 10, suffix: 'K+', hint: 'Cross-platform releases shipped weekly at Peptide AI, +66% MoM' },
    { label: 'App Store impressions', value: 85, suffix: 'K+', hint: 'Daily impressions, +850% growth' },
    { label: 'Latency reduced', value: 70, suffix: '%', hint: 'Semantic cache: 9s → under 3s on cache hits' },
  ] as Stat[],

  /** Recruiter-facing "why interview" bullets, shown high on the page. */
  whyHire: [
    { metric: '34.5%', label: 'RAG accuracy lift', detail: 'Measured across 5,000+ real-world queries at Garden For Wildlife.' },
    { metric: '10,000+', label: 'Downloads shipped', detail: '+66% MoM on cross-platform releases I ship weekly.' },
    { metric: '35% → 55%', label: 'QA accuracy, fine-tuned', detail: 'LoRA fine-tune of Qwen2.5-3B on lease clauses I extracted myself.' },
    { metric: '9s to 3s', label: 'Latency cut', detail: 'Privacy-safe semantic cache at Peptide AI, about 70% faster on cache hits.' },
  ],

  /* ------------------------------------------------------------------ skills */
  skills: [
    {
      category: 'Languages',
      blurb: 'Typed, tested, and shipped to production.',
      skills: [
        { name: 'TypeScript', level: 95 },
        { name: 'Python', level: 94 },
        { name: 'JavaScript', level: 92 },
        { name: 'SQL (PostgreSQL, MySQL, SQLite)', level: 88 },
        { name: 'Java', level: 82 },
        { name: 'C', level: 74 },
        { name: 'Bash', level: 72 },
        { name: 'Swift', level: 60, note: 'in progress' },
      ],
    },
    {
      category: 'AI / Agentic Systems',
      blurb: 'Retrieval, agents, and the evaluation harnesses that keep them honest.',
      skills: [
        { name: 'RAG (hybrid, hierarchical)', level: 95 },
        { name: 'Agentic systems', level: 90 },
        { name: 'Evaluation frameworks', level: 90 },
        { name: 'Prompt engineering', level: 90 },
        { name: 'Anthropic (Claude) API', level: 90 },
        { name: 'OpenAI API', level: 88 },
        { name: 'LangChain', level: 86 },
        { name: 'Fine-tuning (LoRA/SFT, Unsloth)', level: 80 },
        { name: 'RL fine-tuning (GRPO)', level: 70 },
        { name: 'Gemini API', level: 70 },
      ],
    },
    {
      category: 'Frontend & Mobile',
      blurb: 'Cross-platform surfaces shipped weekly.',
      skills: [
        { name: 'React', level: 93 },
        { name: 'React Native', level: 88 },
        { name: 'Next.js', level: 85 },
        { name: 'Capacitor', level: 80 },
        { name: 'SwiftUI', level: 58, note: 'in progress' },
      ],
    },
    {
      category: 'Backend',
      blurb: 'APIs and services that hold up under real traffic.',
      skills: [
        { name: 'Supabase Edge Functions (Deno)', level: 92 },
        { name: 'FastAPI', level: 88 },
        { name: 'Flask', level: 86 },
        { name: 'Node.js / Express', level: 84 },
        { name: 'REST APIs / WebSocket', level: 86 },
        { name: 'Spring Boot', level: 74 },
      ],
    },
    {
      category: 'Data',
      blurb: 'Vectors, pipelines, and row-level security.',
      skills: [
        { name: 'PostgreSQL (RLS, pg_cron)', level: 90 },
        { name: 'pgvector', level: 90 },
        { name: 'FAISS', level: 86 },
        { name: 'Python data pipelines', level: 88 },
        { name: 'Monte Carlo simulation', level: 78 },
      ],
    },
    {
      category: 'Cloud',
      blurb: 'Deployed, observed, and paged on.',
      skills: [
        { name: 'AWS', level: 78 },
        { name: 'Azure', level: 70 },
        { name: 'Supabase', level: 92 },
        { name: 'Sentry', level: 80 },
        { name: 'Mixpanel', level: 78 },
      ],
    },
    {
      category: 'DevOps',
      blurb: 'CI/CD that catches regressions before users do.',
      skills: [
        { name: 'CI/CD (GitHub Actions)', level: 86 },
        { name: 'Docker', level: 82 },
        { name: 'Automated testing', level: 86 },
        { name: 'Linux', level: 82 },
      ],
    },
    {
      category: 'Tools',
      blurb: 'Daily drivers.',
      skills: [
        { name: 'Git', level: 94 },
        { name: 'Postman', level: 86 },
        { name: 'Agile / Scrum', level: 84 },
        { name: 'PyTorch', level: 84 },
        { name: 'NumPy', level: 86 },
      ],
    },
    {
      category: 'Soft skills',
      blurb: 'How I work with people.',
      skills: [
        { name: 'Zero-to-one ownership', level: 94 },
        { name: 'Written communication', level: 90 },
        { name: 'Cross-functional collaboration', level: 90 },
        { name: 'Mentoring', level: 82 },
        { name: 'Product sense', level: 86 },
      ],
    },
  ] as SkillGroup[],

  /* -------------------------------------------------------------- experience */
  experience: [
    {
      company: 'Peptide AI',
      initials: 'PA',
      role: 'AI / Founding Engineer',
      start: 'May 2026',
      end: 'Present',
      location: 'Remote',
      type: 'Founding',
      current: true,
      summary:
        "Own the retrieval and agent stack behind the app's AI Chat, plus the cross-platform clients on top of it.",
      impact: '10,000+ downloads (+66% MoM), 85K+ daily App Store impressions (+850%), 70% latency cut on cache hits.',
      achievements: [
        "Architected the production RAG system (TypeScript, Supabase Edge Functions/Deno) powering AI Chat: hybrid dense + BM25 retrieval, Voyage cross-encoder reranking, and streamed Claude (Anthropic API) responses grounded in each user's own data.",
        'Built an agentic framework (TypeScript) that reasons over user data, wearable signals, and retrieved evidence to generate personalized, safety-aware recommendations.',
        'Designing an agentic Coach system that separates deterministic stats computation from LLM narration, grounds claims in evidence-tiered RAG citations, and evaluates agent trajectories (claim-level grounding, tool-trace correctness, negative-control abstention) rather than final output alone.',
        'Designed a privacy-safe semantic cache (TypeScript, pgvector) cutting response latency ~70% on cache hits (9s → under 3s) at $0 marginal cost, enforced by dedicated safety guards and a Deno regression suite.',
        'Shipped cross-platform apps (React, React Native, Capacitor) weekly, driving 10,000+ downloads (+66% MoM) and 85K+ daily App Store impressions (+850%); leading a native Swift/SwiftUI rewrite.',
      ],
      tech: ['TypeScript', 'Supabase Edge Functions', 'Deno', 'pgvector', 'Anthropic API', 'React', 'React Native', 'Capacitor', 'Swift/SwiftUI'],
    },
    {
      company: 'Garden For Wildlife',
      initials: 'GW',
      role: 'Machine Learning Intern',
      start: 'Aug 2024',
      end: 'Aug 2025',
      location: 'Remote',
      type: 'Internship',
      summary: 'Built and shipped the RAG pipeline behind customer-facing answers, then proved it worked at scale.',
      impact: '34.5% accuracy improvement and 15% latency reduction across 5,000+ evaluated queries.',
      achievements: [
        'Built and shipped a production RAG pipeline (LangChain, FAISS, OpenAI API) evaluated across 5,000+ real-world queries, achieving a 34.5% accuracy improvement and 15% latency reduction through prompt engineering and retrieval optimization.',
        'Automated data ingestion and transformation workflows in Python, improving pipeline reliability and delivering measurable insights to cross-functional stakeholders.',
      ],
      tech: ['Python', 'LangChain', 'FAISS', 'OpenAI API', 'ETL'],
    },
    {
      company: 'Booz Allen Hamilton',
      initials: 'BA',
      role: 'Backend Engineer',
      team: 'App Dev Club',
      start: 'Jan 2026',
      end: 'May 2026',
      location: 'Remote',
      type: 'Client project',
      summary: 'Video-processing backend for structured document extraction from screen recordings.',
      impact: 'Cut redundant frame captures ~3x while keeping extraction resize-resilient.',
      achievements: [
        'Designed a two-pass detection algorithm (DCT perceptual hashing, adaptive SSIM) cutting redundant frame captures ~3x.',
        'Built a FastAPI extraction service with an OpenCV OCR pipeline for structured, resize-resilient video processing.',
      ],
      tech: ['Python', 'FastAPI', 'OpenCV', 'DCT hashing', 'SSIM'],
    },
    {
      company: 'UMD Smith Financial Wellness Team',
      initials: 'UM',
      role: 'Software Engineer',
      start: 'Sep 2025',
      end: 'Dec 2025',
      location: 'College Park, MD',
      type: 'University',
      summary: 'End-to-end ownership of a financial planning app for the student body.',
      impact: 'Shipped to 5,000+ students, running 10,000+ Monte Carlo simulations.',
      achievements: [
        'Shipped a production application to 5,000+ students end-to-end: Flask REST APIs, a React Native frontend, and Python pipelines running 10,000+ Monte Carlo simulations.',
      ],
      tech: ['Python', 'Flask', 'React Native', 'Monte Carlo', 'REST APIs'],
    },
    {
      company: 'DocuGuardian',
      initials: 'DG',
      role: 'Full Stack Engineer Intern',
      start: 'Dec 2024',
      end: 'Jul 2025',
      location: 'Remote',
      type: 'Internship',
      summary: 'Secure document workflows across the stack, plus the CI that kept releases boring.',
      impact: 'Improved release stability 30% via CI/CD hardening and automated testing.',
      achievements: [
        'Built full-stack features (Spring Boot APIs, PostgreSQL, TypeScript/React) for secure document workflows end-to-end.',
        'Improved release stability 30% through CI/CD hardening and automated testing.',
      ],
      tech: ['Spring Boot', 'PostgreSQL', 'TypeScript', 'React', 'CI/CD'],
    },
  ] as Experience[],

  /* ----------------------------------------------------------------- projects */
  projects: [
    {
      slug: 'peptide-ai-rag',
      title: 'Peptide AI RAG and Agent Platform',
      tagline: 'Hybrid retrieval, agent trajectories, and a privacy-safe semantic cache in production.',
      year: '2026 to Present',
      featured: true,
      status: 'Shipped',
      problem:
        'Users ask health questions that have to be answered from their own data, meaning their wearable signals, their logs, and their history, with no leakage between users, and it has to stream fast enough to feel like a conversation. At around 9 seconds to an answer, people stopped engaging with it.',
      solution:
        "A TypeScript retrieval stack on Supabase Edge Functions: hybrid dense + BM25 retrieval, Voyage cross-encoder reranking, streamed Claude responses, and a pgvector semantic cache scoped per user with dedicated safety guards.",
      impact: [
        '~70% latency reduction on cache hits (9s → under 3s) at $0 marginal cost',
        '10,000+ downloads, +66% month over month',
        '85K+ daily App Store impressions (+850%)',
        'Deno regression suite gates every retrieval change',
      ],
      tech: ['TypeScript', 'Deno', 'Supabase Edge Functions', 'pgvector', 'Anthropic API', 'Voyage rerank', 'React Native'],
      architecture: {
        title: 'Retrieval + agent pipeline with privacy-scoped cache',
        nodes: [
          { label: 'Client', detail: 'React / React Native / Capacitor, streamed tokens' },
          { label: 'Edge Function', detail: 'Deno request handler, auth + RLS scoping' },
          { label: 'Semantic cache', detail: 'pgvector nearest-neighbor, per-user scope, safety guards' },
          { label: 'Hybrid retrieval', detail: 'Dense embeddings + BM25 over user-owned data' },
          { label: 'Rerank', detail: 'Voyage cross-encoder over candidate evidence' },
          { label: 'Agent layer', detail: 'Deterministic stats computation, then LLM narration' },
          { label: 'Claude', detail: 'Streamed generation grounded in evidence-tiered citations' },
        ],
      },
      // Closed source, so no repo. The product itself is public.
      links: { demo: 'https://peptideai.co/' },
      caseStudy: [
        {
          heading: 'Latency was the product problem',
          body: 'At around 9 seconds to a first useful answer, users stopped asking follow up questions. The thing that fixed it was not the choice of model. It was noticing how many questions were semantically similar to ones already asked. A pgvector cache keyed on embedding proximity absorbs those, and a cache hit returns in under 3 seconds at no extra inference cost.',
        },
        {
          heading: 'Caching health questions safely',
          body: 'A simple shared cache would leak one user\'s data into another user\'s answer. Entries are scoped per user and gated by dedicated safety guards, and a Deno regression suite runs on every deploy to assert the negative controls, which are the questions that must never return a cache hit.',
        },
        {
          heading: 'Separating computation from narration',
          body: 'The Coach system computes statistics deterministically in code, then asks the model only to narrate what was computed, citing evidence tiers. Numbers stop being hallucination surface area.',
        },
        {
          heading: 'Grading the trajectory',
          body: 'Scoring only the final output hides the failures that matter. The evaluation covers claim level grounding, whether the tool trace was correct, and whether the agent abstained on negative controls. That means an agent that arrives at the right answer through the wrong tools still fails the suite.',
        },
      ],
    },
    {
      slug: 'synthdrive',
      title: 'SynthDrive',
      tagline:
        'You describe a driving scenario in plain English, and it generates a 3D world, runs object detection on it, and scores how hard that scene is to perceive.',
      year: 'Mar 2026',
      featured: true,
      status: 'Shipped',
      problem:
        'Testing how an autonomous vehicle perceives edge cases usually means capturing those situations in the real world, which is expensive, slow, and in some cases dangerous. The scenarios you most need to test, like a pedestrian at night or heavy glare or an occluded object, are exactly the ones you cannot arrange whenever you want.',
      solution:
        'I built a pipeline that chains four AI systems together. GPT-4o takes a one line prompt and expands it into three scenario variants that each target a different perception challenge. World Labs Marble turns those into navigable 3D worlds. YOLOv8 runs object detection on the generated scenes. Then GPT-4o reads the detection results and produces a Perception Difficulty Score from 0 to 100, along with a risk level and recommendations.',
      impact: [
        'Built at BigThink (UMD) x World Labs in March 2026 and deployed live',
        'Generates three 3D worlds in parallel in roughly 45 seconds',
        'Returns a 0 to 100 perception score with low, medium, high, or critical risk levels',
        'Saves full test history per user, enforced by Supabase row level security',
      ],
      tech: [
        'Next.js 14',
        'TypeScript',
        'Tailwind CSS',
        'FastAPI',
        'YOLOv8',
        'OpenAI GPT-4o',
        'World Labs Marble API',
        'Supabase',
        'PostgreSQL',
        'Render',
      ],
      architecture: {
        title: 'Four AI systems chained into one test run',
        nodes: [
          { label: 'Prompt', detail: 'Natural-language scenario, or a preset' },
          { label: 'Scenario generation', detail: 'GPT-4o expands it into 3 variants targeting different perception challenges' },
          { label: '3D world generation', detail: 'World Labs Marble API produces panoramic imagery and Gaussian splat assets, 3 worlds in parallel' },
          { label: 'Detection', detail: 'YOLOv8 via a FastAPI microservice on Render, bounding boxes + confidence' },
          { label: 'Safety analysis', detail: 'GPT-4o turns detections into a 0-100 score, risk level, findings' },
          { label: 'Persistence', detail: 'Supabase Auth + Postgres with row-level security per user' },
        ],
      },
      links: {
        github: 'https://github.com/jav359003/synthdrive',
        demo: 'https://synthdrive-1aro9tjxd-javin-ahujas-projects.vercel.app/login',
        writeup: 'https://devpost.com/software/synthdrive',
      },
      caseStudy: [
        {
          heading: 'Why generate the world instead of filming it',
          body: 'The perception failures worth testing are the rare ones. If you want footage of a pedestrian stepping out in low light with glare on the windshield, you have to wait a long time for it and accept some real risk to get it. Generating the scene instead means the hard case is available whenever you want it and it is reproducible, which is what a test suite actually needs.',
        },
        {
          heading: 'Four models, one contract between each',
          body: 'Each stage hands the next one a narrow artifact that I can check on its own. First text scenarios, then world assets, then bounding boxes with confidence values, then a score. Keeping those handoffs small is what makes a four model chain debuggable. When a run looks wrong, it is usually obvious which stage produced the bad output.',
        },
        {
          heading: 'Detection as a separate service',
          body: 'YOLOv8 runs in its own FastAPI microservice instead of inside the Next.js app, so the computer vision runtime and the web runtime can scale and deploy separately. The detection server URL is configurable, which is what allowed me to move it onto Render without changing any app code.',
        },
        {
          heading: 'Making the output a decision, not a dump',
          body: 'Raw bounding boxes do not tell an engineer whether a scenario is actually dangerous. The final GPT-4o pass turns the detections into one Perception Difficulty Score with a risk level and specific findings, so the result of a test run is something you can act on rather than a pile of output.',
        },
      ],
    },
    {
      slug: 'pannote',
      title: 'PanNote + PipelineEvolve',
      tagline:
        'A Chrome extension that turns Panopto lectures into structured notes, plus a research harness that tries to improve the note pipeline automatically.',
      year: 'Jul 2026 to Present',
      featured: true,
      status: 'In development',
      problem:
        'A 90 minute lecture recording is very hard to search through, and Panopto captions sit behind a session cookie, so nothing outside the browser can reach them. There is also a harder question underneath that one. Once I had hand built a multi agent pipeline for taking notes, I had no real way of knowing whether the prompts and structure I chose were any good.',
      solution:
        'PanNote is a Chrome MV3 extension that detects a Panopto lecture, pulls the captions in the page itself, and runs the transcript through a multi agent GPT-4.1 Mini pipeline that renders structured notes in a side panel. PipelineEvolve treats that pipeline configuration, meaning the prompts and the agent topology, as a program that can be optimized. It searches for a better configuration using LLM driven mutation and a locally trained proposer, and scores every candidate against the pipeline I built by hand.',
      impact: [
        'Captions never leave the browser, since the content script fetches them in the page and posts only plaintext',
        'Notes stay on the client in IndexedDB, and only usage metadata reaches Supabase',
        'PipelineEvolve produced a documented negative result, since no evolved pipeline survived held out data',
        'I isolated the root cause and proved it three separate ways, which is that the reward function cannot tell pipeline quality apart',
      ],
      tech: [
        'Chrome MV3',
        'JavaScript',
        'Node.js',
        'Express',
        'Railway',
        'Supabase',
        'Google OAuth',
        'GPT-4.1 Mini',
        'Python',
        'Qwen2.5-1.5B',
        'GRPO',
        'PyTorch',
      ],
      architecture: {
        title: 'Extension pipeline, plus the harness that searches over it',
        nodes: [
          { label: 'Content script', detail: 'Detects the Panopto lecture GUID, fetches captions in-page with the browser\'s own cookies' },
          { label: 'Backend', detail: 'Node + Express on Railway, JWT-verified on every protected route' },
          { label: 'Agent pipeline', detail: 'Multi-agent GPT-4.1 Mini pass over the transcript, streamed back over SSE' },
          { label: 'Side panel', detail: 'Structured notes rendered in-page; content persisted client-side in IndexedDB' },
          { label: 'PipelineEvolve target', detail: 'Frozen baseline_pipeline.json snapshot. The config is mutated, never the product code' },
          { label: 'PipelineEvolve proposer', detail: 'Qwen2.5-1.5B-Instruct trained with GRPO. These are the only weights that learn' },
          { label: 'Scoring', detail: 'Judge model + concept recall over a held-out transcript test set' },
        ],
      },
      // No repo published yet, so this points at the profile for now.
      links: { github: 'https://github.com/jav359003' },
      caseStudy: [
        {
          heading: 'What I am building right now',
          body: 'This is a side project I started in July 2026 and am still actively working on. PanNote already works end to end. It detects the lecture, builds the transcript, runs the agent pipeline, and renders the notes. What I am working on right now is PipelineEvolve, which is the harness that asks whether the pipeline I wrote by hand is actually the best one available. It treats the prompts and the topology as something that can be searched over, instead of assuming I got the design right the first time.',
        },
        {
          heading: 'The security decision I would defend in an interview',
          body: 'The obvious way to build this is to forward the user\'s Panopto session cookies to the backend so the server can fetch the captions. I did not do that, for three reasons. HttpOnly cookies make it unreliable, it is a real security problem, and it is the kind of thing that gets an extension rejected from the Chrome Web Store. Instead the content script fetches the captions inside the page, where the browser attaches the cookies on its own, and then posts only plaintext to the backend. The extension can do the same thing, and no credential ever leaves the machine.',
        },
        {
          heading: 'Two models, and why confusing them ruins the experiment',
          body: 'The pipeline being tested runs on GPT-4.1 Mini through an API, so its weights can never be trained. Only its configuration gets edited, and then it gets called so the result can be scored. The part that actually learns is a local Qwen2.5-1.5B proposer trained with GRPO to suggest better configurations. Keeping those two roles separate is what makes the whole setup make sense. If you confuse them, any number that comes out the other end is meaningless.',
        },
        {
          heading: 'A negative result I chose to report instead of bury',
          body: 'Two different search methods, run a month apart, both found configurations that beat the baseline on the dev subset, and neither one survived held out data. Instead of reporting the number that looked good, I worked out why it happened. The reward function cannot tell good pipelines from bad ones. A pipeline I deliberately gutted ties the baseline. A mutation that is semantically wrong scored 5.72 points higher. Concept recall goes down while the judge score goes up. The clearest piece of evidence is that the winning prompt says to not omit essential details for brevity, while the trained proposer\'s prompt says to use a maximum of 10 words per point. Those are opposite instructions, and the reward puts them 1.1 points apart.',
        },
        {
          heading: 'The next real experiment',
          body: 'The next step is not more searching. It is fixing the measurement. I plan to blend deterministic concept recall into the judge score, then run the sabotage tests again and check whether the gutted pipeline finally separates from the baseline. The current test set is spent, because anything tuned against those numbers is no longer held out, so getting a clean answer also means collecting fresh transcripts.',
        },
      ],
    },
    {
      slug: 'legallease',
      title: 'LegalLease',
      tagline:
        'Hierarchical RAG over lease documents, plus a Qwen2.5-3B model I fine-tuned on clauses I pulled from real leases.',
      year: 'Apr 2026 to Present',
      featured: true,
      status: 'Shipped',
      problem:
        'Legal documents break simple RAG setups. Clauses reference each other, definitions sit pages away from where they are used, and a wrong answer is worse than no answer at all. Standard top-k retrieval kept missing the clause that actually mattered. Once I fixed retrieval, a stock 3B model still could not read a clause and answer the question correctly.',
      solution:
        'I built hierarchical FAISS retrieval that goes from document to section to chunk, added BM25 hybrid recall and cross-encoder reranking, routed generation across OpenAI, Anthropic, and a local llama.cpp model, and fine-tuned Qwen2.5-3B with LoRA on 961 lease question and answer pairs that I built from real lease clauses. All of it is graded by an evaluation harness that I wrote before any of the optimization.',
      impact: [
        'Fine-tuning lifted QA accuracy from ~35% to ~55% on the held-out question set',
        '99% retrieval recall across 112 questions on 12 lease documents',
        'The red flag scanner drops any finding whose quote is not word for word in the lease, so a hallucinated legal finding cannot reach the report',
        'New legal checks are added as YAML entries, with no code changes required',
        'The local 3B model runs offline through llama.cpp, so there is no per query API cost',
      ],
      tech: [
        'Python',
        'PyTorch',
        'Unsloth',
        'LoRA / SFT',
        'Qwen2.5-3B',
        'FAISS',
        'BM25',
        'Cross-encoder rerank',
        'pgvector',
        'FastAPI',
        'llama.cpp',
        'OpenAI API',
        'Anthropic API',
        'RAGAS',
        'YAML rule engine',
      ],
      architecture: {
        title: 'Hierarchical retrieval + a fine-tuned local generator',
        nodes: [
          { label: 'Ingest', detail: 'Lease PDF → structure-aware chunking → hierarchical FAISS + Supabase pgvector' },
          { label: 'Recall', detail: 'Doc → section → chunk search, hybrid dense + BM25, MMR dedup' },
          { label: 'Rerank', detail: 'ms-marco cross-encoder over the candidate set' },
          { label: 'Assemble', detail: 'Context stitching under a strict char budget (3B degrades badly on long prompts)' },
          { label: 'Training data', detail: 'GPT-4o teacher distillation + synthetic clause Q&A → 961 SFT conversations' },
          { label: 'Fine-tune', detail: 'Unsloth LoRA r=16 / α=16, 4-bit Qwen2.5-3B-Instruct, 3 epochs, lr 2e-4, seq 4096' },
          { label: 'Export', detail: 'Merge to fp16 → convert to Q4_K_M GGUF for llama.cpp' },
          { label: 'Generate', detail: 'Fine-tuned Qwen via llama.cpp, or OpenAI / Anthropic through the same router' },
          { label: 'Red-flag scan', detail: 'YAML taxonomy → retrieval per check → LLM detector proposes candidate flags' },
          { label: 'Verify', detail: 'Deterministic grounding (quote must be verbatim, else dropped) + second LLM relevance pass' },
          { label: 'Law matcher', detail: 'Links each flag to a curated Maryland statute with citation and as-of date' },
          { label: 'Evaluate', detail: 'Fact coverage, quote verification, numeric exact match, abstention · 112 questions' },
        ],
      },
      links: { github: 'https://github.com/jav359003/Legallease' },
      caseStudy: [
        {
          heading: 'The problem with top-k on legal text',
          body: 'Answering a question about a lease usually requires three things at the same time. You need the clause itself, the definition it references, and the exhibit it points to. A single embedding search returns whichever of those happens to look most similar to the question, which is often none of them. My first baseline looked fine when I demoed it and then fell apart as soon as I sat down and wrote out real questions.',
        },
        {
          heading: 'Measuring before optimizing',
          body: 'I wrote the evaluation harness before doing any optimization. It started at 35 questions and grew to 112, across 12 real Maryland lease and tenant rights documents, and each question is annotated with the facts a correct answer has to contain. It scores fact coverage, quote verification, numeric exact match, and abstention separately, which lets me tell whether a bad answer came from failing to find the clause or from mangling a clause it did find. I log almost every run, and the evaluation directory now holds around seventy of them.',
        },
        {
          heading: 'Fixing retrieval got me to the real problem',
          body: 'Hierarchical FAISS retrieval, going from document to section to chunk, combined with BM25 hybrid recall and cross-encoder reranking, brought retrieval recall to 99% on the 112 question set. That was both good news and bad news. The right clause was now in the context window almost every time, and the local 3B model was still getting about a third of the answers wrong. Retrieval had stopped being the bottleneck, and generation had become the bottleneck instead.',
        },
        {
          heading: 'So I fine-tuned the model',
          body: 'I built the training set from my own corpus instead of downloading one. It came to 961 conversations, created by running GPT-4o over the exact retrieved context that production uses, and then augmented with synthetic question and answer pairs generated from sampled lease clauses. For training I used LoRA with rank 16, alpha 16, and no dropout, applied to all seven attention and MLP projections of a 4-bit Qwen2.5-3B-Instruct through Unsloth. That ran for 3 epochs at a learning rate of 2e-4, with an effective batch size of 8, 4096 token sequences, and adamw_8bit, on a single Colab GPU. I then merged it to fp16 and converted it to Q4_K_M GGUF so it runs under llama.cpp on my laptop. Accuracy on the held out questions went from about 35% to about 55%. What the model actually learned was to quote the clause word for word and to abstain instead of inventing a number.',
        },
        {
          heading: 'What the failures taught me',
          body: 'The most useful thing I learned had nothing to do with the model weights. A 3B model degrades badly on long prompts. The same question scored 26.7% with 12K characters of context and 62.9% with 1.2K characters. At this model size, retrieval quality and context budget matter more than parameter count, which is why the assembly stage enforces a hard character limit. The weak spot that is still open is false abstention, where 17 of the 112 answers abstain even though the evidence was there.',
        },
        {
          heading: 'Making a hallucinated legal claim structurally impossible',
          body: 'Answering a question is one thing. Telling someone that their lease is illegal is a different thing, and being confidently wrong about that can actually hurt them. So the scanner never trusts the model on its own. An LLM detector proposes candidate flags, and then every candidate has to pass two independent checks. The first is a deterministic grounding test that requires the quoted clause to appear word for word in the lease. The second is another LLM pass on whether that quote actually demonstrates the problem. Failing the grounding test is a hard drop rather than a warning, which is what makes it impossible for a fabricated quote to reach the report. If a flag passes grounding but fails relevance, it stays in the report and gets marked uncertain.',
        },
        {
          heading: 'Legal knowledge as curated data, never generated',
          body: 'Each flag links by id into a Maryland statute file that I curated by hand. Every entry has the rule in plain language, the real citation, such as Md. Code, Real Property section 8-208(d)(3) for the 5% cap on late fees, and an as of date, because the law changes and a stale rule is just a wrong rule. None of the legal content is generated at scan time. Adding a new check means adding a YAML entry with a retrieval query, a severity, the law references, and a detection instruction. The code stays the same.',
        },
        {
          heading: 'Why multi-provider',
          body: 'A single router sits in front of OpenAI, Anthropic, and the local llama.cpp path. That let me evaluate the fine-tuned 3B against frontier models using identical retrieval, it means a provider outage degrades quality instead of taking the system down, and it means the whole thing can run offline at no marginal cost when privacy matters more than accuracy.',
        },
      ],
    },
    {
      slug: 'tetherboard',
      title: 'Tetherboard',
      tagline:
        'A collaborative knowledge platform where boards link to each other, built at Bitcamp 2025. I built the Gemini assistant that can answer questions about your whole workspace.',
      year: 'Apr 2025',
      status: 'Shipped',
      problem:
        'People learn by connecting ideas to each other, but most note tools store notes as a flat list and most collaborative editors have no idea what is in the rest of your workspace. So you end up with a pile of documents that do not know about each other, and no way to ask a question across all of them.',
      solution:
        'Tetherboard is a collaborative platform where teams build boards holding images, symbols, markdown, syntax-highlighted code, and LaTeX, edit them together with live updates, and link boards to each other with connections we called tethers. The whole workspace can then be viewed as an interactive graph called a Tethermap. My piece was the chatbot: a Gemini assistant that receives the current board plus every other board in the workspace as context, so a question can be answered across the entire workspace rather than one document at a time.',
      impact: [
        'Built and demoed in one hackathon weekend by a team of four',
        'I owned the Gemini assistant, which answers with the full workspace as context',
        'Live multi-user editing on boards with markdown, code highlighting, and LaTeX',
        'Tethermap renders the whole workspace as a navigable graph',
      ],
      tech: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'shadcn/ui', 'Firebase', 'Gemini API'],
      architecture: {
        title: 'Boards, tethers, and a workspace-aware assistant',
        nodes: [
          { label: 'Client', detail: 'React, TypeScript, Vite, TailwindCSS, shadcn/ui' },
          { label: 'Board editor', detail: 'Images, symbols, markdown, code highlighting, LaTeX' },
          { label: 'Live collaboration', detail: 'Firebase keeps simultaneous editors in sync' },
          { label: 'Tethers', detail: 'Typed links between boards' },
          { label: 'Tethermap', detail: 'The workspace rendered as an interactive graph' },
          { label: 'Gemini assistant', detail: 'The part I built. Current board plus all workspace boards go in as context' },
        ],
      },
      links: {
        github: 'https://github.com/jav359003/Tetherboard',
        writeup: 'https://devpost.com/software/tetherboard',
      },
      caseStudy: [
        {
          heading: 'The part I owned',
          body: 'I built the chatbot. The interesting problem was not calling the Gemini API, it was deciding what the assistant should be allowed to see. A board-scoped assistant is close to useless, because the question you actually want to ask usually spans several boards. So the assistant receives the board you are currently on along with every other board in the workspace, which is what makes it able to answer questions about the workspace as a whole rather than whatever document happens to be open.',
        },
        {
          heading: 'Why linking boards was the point',
          body: 'The idea behind the product is that people learn by building connections between ideas, so the tool should store those connections instead of throwing them away. Tethers make the link between two boards a real object, and the Tethermap turns the whole workspace into a graph you can navigate. That also happens to be what makes the assistant useful, because the structure gives it something to reason over.',
        },
        {
          heading: 'What a weekend actually costs you',
          body: 'The hard parts were not the features we planned. Board editing had interaction bugs we kept having to chase, live collaboration needed performance work before it was reliable with several people editing at once, and rendering markdown together with code, images, and math correctly took longer than expected. We got all of it working and demoed at the end, across 95 commits and four people.',
        },
      ],
    },
    {
      slug: 'ai-image-detector',
      title: 'AI-Generated Image Detector',
      tagline: 'A CNN with the convolution layer written from scratch in NumPy.',
      year: '2026',
      status: 'In development',
      problem:
        'Detectors that score well on one generator collapse on the next. The question is not "can you classify?" but "does the signal generalize across generators?"',
      solution:
        'A CNN whose convolution layer is implemented from scratch in NumPy and verified with gradient checking, used as a controlled testbed for cross-generator generalization.',
      impact: [
        'Convolution forward/backward verified by gradient checking',
        'Cross-generator generalization framed as the core empirical question',
        'No framework autograd, so every gradient is accounted for',
      ],
      tech: ['Python', 'NumPy'],
      architecture: {
        title: 'From-scratch CNN with gradient verification',
        nodes: [
          { label: 'Data', detail: 'Real vs generated images, split by generator' },
          { label: 'Conv layer (NumPy)', detail: 'Hand-written forward + backward pass' },
          { label: 'Gradient check', detail: 'Numerical vs analytical gradient agreement' },
          { label: 'Train loop', detail: 'Manual backprop, no autograd' },
          { label: 'Held-out generator eval', detail: 'Generalization measured across generators' },
        ],
      },
      links: {}, // No public repo yet
      caseStudy: [
        {
          heading: 'Why write convolution by hand',
          body: 'Calling Conv2d teaches you the API. Writing the backward pass yourself and validating it against numerical gradients teaches you where the signal actually comes from, which matters when the question you care about is which features transfer to a new generator.',
        },
        {
          heading: 'The generalization trap',
          body: 'Training and testing on the same generator produces flattering numbers driven by generator-specific artifacts. Evaluation is split by generator, so held-out performance measures the thing that would matter in deployment.',
        },
      ],
    },
    {
      slug: 'dqn-pacman',
      title: 'DQN Pac-Man Agent',
      tagline: 'Deep Q-Network learning Pac-Man from raw state, with a PPO comparison planned.',
      year: '2026',
      status: 'In development',
      problem: 'Pac-Man punishes greedy policies: reward is sparse, ghosts make the environment non-stationary, and naive Q-learning oscillates.',
      solution:
        'A Deep Q-Network with replay buffer, target network, and epsilon-greedy scheduling learning from raw state, set up so a PPO baseline can be compared under identical conditions.',
      impact: [
        'Replay buffer + target network for stability',
        'Epsilon-greedy schedule tuned for sparse reward',
        'PPO comparison planned against the DQN baseline',
      ],
      tech: ['Python', 'PyTorch', 'Reinforcement Learning'],
      architecture: {
        title: 'DQN training loop',
        nodes: [
          { label: 'Environment', detail: 'Pac-Man, raw state observations' },
          { label: 'Replay buffer', detail: 'Decorrelates sequential experience' },
          { label: 'Q-network', detail: 'PyTorch value estimator' },
          { label: 'Target network', detail: 'Periodically synced, stabilizes bootstrapping' },
          { label: 'Epsilon-greedy', detail: 'Scheduled exploration decay' },
          { label: 'PPO baseline', detail: 'Planned side-by-side comparison' },
        ],
      },
      links: {}, // No public repo yet
      caseStudy: [
        {
          heading: 'Stability before score',
          body: 'The first runs diverged, as DQN usually does without help. The replay buffer and a periodically-synced target network are the two changes that turned a noisy value function into one that trends.',
        },
        {
          heading: 'Why add PPO',
          body: 'A value-based and a policy-gradient method failing differently on the same environment is more informative than one method scoring well. The comparison runs under identical reward shaping and wall-clock budget.',
        },
      ],
    },
  ] as Project[],

  /* ----------------------------------------------------------------- education */
  education: [
    {
      school: 'University of Maryland',
      initials: 'UM',
      degree: 'B.S. Computer Science',
      concentration: 'Machine Learning Concentration',
      location: 'College Park, MD',
      start: 'Aug 2023',
      end: 'May 2027',
      gpa: '', // TODO: add if it helps you (3.5+)
      coursework: [
        'Machine Learning',
        'Data Structures & Algorithms',
        'Computer Systems (CMSC216)',
        'Algorithms (CMSC351)',
        'Object-Oriented Programming',
        'Discrete Structures',
        'Linear Algebra',
        'Statistics & Probability',
        'Game Development (CMSC425)',
        'Human-Computer Interaction (CMSC434)',
      ],
      achievements: [
        'Machine Learning concentration within the CS major',
        'App Dev Club, doing client engineering with Booz Allen Hamilton',
        'Smith Financial Wellness Team, where I shipped software to 5,000+ students',
      ],
    },
  ],

  /* ------------------------------------------------------------ certifications
   * TODO: replace with your real certifications, or delete the array entirely
   * and the section disappears from the site and the nav. */
  certifications: [
    {
      name: 'Supervised Machine Learning: Regression and Classification',
      issuer: 'DeepLearning.AI and Stanford University',
      initials: 'DL',
      date: 'Jan 2024',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/LBUFQRNR2VWA',
      skills: ['Linear regression', 'Logistic regression', 'Gradient descent'],
    },
    {
      name: 'Advanced Learning Algorithms',
      issuer: 'DeepLearning.AI and Stanford University',
      initials: 'DL',
      date: 'Apr 2024',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/VE7QPVJHW7NH',
      skills: ['Neural networks', 'Decision trees', 'Model evaluation'],
    },
  ] as Certification[],

  /* --------------------------------------------------------------- achievements
   * TODO: replace placeholders with real awards / hackathons / talks. */
  achievements: [
    {
      kind: 'Leadership',
      title: 'Backend Engineer, App Dev Club',
      org: 'University of Maryland × Booz Allen Hamilton',
      date: 'Jan 2026 to May 2026',
      detail: 'Selected for a client engineering team delivering a video-processing service to Booz Allen Hamilton.',
    },
    {
      kind: 'Leadership',
      title: 'Founding Engineer',
      org: 'Peptide AI',
      date: 'May 2026 to Present',
      detail: 'First engineering hire; own retrieval, agents, and the cross-platform client releases.',
    },
    {
      kind: 'Hackathon',
      title: 'Tetherboard, built at Bitcamp 2025',
      org: 'Bitcamp, University of Maryland',
      date: 'Apr 2025',
      detail:
        'Machine learning engineer on a four-person team that designed and shipped a collaborative editor with a network view over one hackathon weekend.',
      href: 'https://github.com/jav359003/Tetherboard',
    },
  ] as Achievement[],

  /* --------------------------------------------------------------- testimonials
   * TODO: ask a manager or teammate for two sentences. Real names carry weight;
   * delete the array to hide the section until you have them. */
  testimonials: [
    {
      quote:
        'Javin played an integral role during our product launch, contributing meaningfully to the development and deployment of our platform. He always kept the larger product goals in mind, which is rare in someone so early in their career.',
      name: 'Lori Selsberg',
      role: 'Co-Founder and CEO',
      company: 'DocuGuardian',
      initials: 'LS',
    },
  ] as Testimonial[],

  /* ------------------------------------------------------------------- writing
   * Optional. Delete the array to hide the section. */
  posts: [
    {
      title: 'Evaluating agent trajectories, not final answers',
      excerpt:
        'Final-output scoring hides the failures that matter. Here is the harness I use: claim-level grounding, tool-trace correctness, and negative-control abstention.',
      date: '2026-06-14',
      readingTime: '7 min',
      tags: ['Agents', 'Evaluation'],
      href: '#', // TODO: link to the real post
    },
    {
      title: 'A privacy-safe semantic cache that cut latency 70%',
      excerpt:
        'How a pgvector nearest-neighbor cache, scoped per user and guarded by negative controls, took p50 responses from 9 seconds to under 3 at zero marginal cost.',
      date: '2026-05-02',
      readingTime: '9 min',
      tags: ['RAG', 'Performance'],
      href: '#',
    },
    {
      title: 'Hybrid retrieval beat my embeddings',
      excerpt:
        'Dense search kept missing clause numbers. Adding BM25 back in, and then reranking the combined results with a cross-encoder, moved retrieval recall to 99%.',
      date: '2026-03-21',
      readingTime: '6 min',
      tags: ['RAG', 'Search'],
      href: '#',
    },
  ] as Post[],

  /* ------------------------------------------------------------------ contact */
  contact: {
    heading: 'Let’s talk.',
    body: 'I reply to every message within a day. If you are hiring for applied AI, infrastructure, or full-stack work, tell me what you are building and I will tell you exactly how I would help.',
    /**
     * Formspree endpoint. Set NEXT_PUBLIC_FORMSPREE_ID in .env.local (or in the
     * host's env vars) to the form ID from your Formspree dashboard — the
     * `xanbqkpv` part of https://formspree.io/f/xanbqkpv. Unset falls back to a
     * mailto: handoff so the form is never a dead end.
     */
    formEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ID
      ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
      : '',
  },
};

export type Portfolio = typeof portfolio;

/** Section registry. Drives the nav, command palette, and sitemap. */
export const sections = [
  { id: 'work', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'more', label: 'More' },
  { id: 'contact', label: 'Contact' },
] as const;
