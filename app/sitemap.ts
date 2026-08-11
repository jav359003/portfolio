import type { MetadataRoute } from 'next';
import { portfolio } from '@/content/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: portfolio.site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...portfolio.projects.map((p) => ({
      url: `${portfolio.site.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}
