import type { Metadata, Viewport } from 'next';
import './globals.css';
import { portfolio } from '@/content/portfolio';
import { themeScript } from '@/components/ThemeToggle';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { AnimatedCursor, BackToTop, LoadingScreen, ScrollProgress } from '@/components/Chrome';

const title = `${portfolio.name}, ${portfolio.title}`;
const description = portfolio.valueProp;

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.site.url),
  title: { default: title, template: `%s · ${portfolio.name}` },
  description,
  applicationName: `${portfolio.name} · Portfolio`,
  authors: [{ name: portfolio.name, url: portfolio.site.url }],
  creator: portfolio.name,
  keywords: [
    portfolio.name,
    'AI engineer',
    'software engineer',
    'RAG',
    'agentic systems',
    'machine learning',
    'TypeScript',
    'Python',
    'University of Maryland',
    ...portfolio.skills.flatMap((g) => g.skills.slice(0, 4).map((s) => s.name)),
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: portfolio.site.locale,
    url: portfolio.site.url,
    siteName: `${portfolio.name} Portfolio`,
    title,
    description,
    // The card image comes from app/opengraph-image.tsx (generated at build time).
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#060709' },
    { media: '(prefers-color-scheme: light)', color: '#fbfbfc' },
  ],
};

/** schema.org Person + WebSite, generated from portfolio.ts. */
function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${portfolio.site.url}/#person`,
        name: portfolio.name,
        jobTitle: portfolio.title,
        description: portfolio.about.lede,
        email: `mailto:${portfolio.email}`,
        telephone: portfolio.phone,
        url: portfolio.site.url,
        image: `${portfolio.site.url}${portfolio.headshot || '/opengraph-image'}`,
        sameAs: portfolio.socials.filter((s) => s.href.startsWith('http')).map((s) => s.href),
        knowsAbout: portfolio.skills.flatMap((g) => g.skills.map((s) => s.name)),
        alumniOf: portfolio.education.map((e) => ({
          '@type': 'CollegeOrUniversity',
          name: e.school,
        })),
        worksFor: {
          '@type': 'Organization',
          name: portfolio.experience[0].company,
        },
        address: { '@type': 'PostalAddress', addressLocality: 'College Park', addressRegion: 'MD', addressCountry: 'US' },
      },
      {
        '@type': 'WebSite',
        '@id': `${portfolio.site.url}/#website`,
        url: portfolio.site.url,
        name: `${portfolio.name} Portfolio`,
        description,
        publisher: { '@id': `${portfolio.site.url}/#person` },
        inLanguage: 'en-US',
      },
      ...portfolio.projects.map((p) => ({
        '@type': 'CreativeWork',
        name: p.title,
        description: p.tagline,
        url: `${portfolio.site.url}/projects/${p.slug}`,
        author: { '@id': `${portfolio.site.url}/#person` },
        keywords: p.tech.join(', '),
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Static, generated from local content, so no user input is involved.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Paints the persisted theme before first render, which prevents a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData />
      </head>
      <body>
        <LoadingScreen />
        <ScrollProgress />
        <AnimatedCursor />
        <CommandPalette />
        <Nav />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
