import { env } from '@/libs/const';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  appUrl: env.APP_URL,
  name: 'Admin: Battle of AI Agents',
  description: 'Admin: Battle of AI Agents',
  url: env.APP_URL,
  ogImage: `${env.APP_URL}/images/logo-no-desc.svg`,
  imageType: 'image/svg+xml',
  manifestSite: `${env.APP_URL}/site.webmanifest`,
  manifest: `${env.APP_URL}/manifest.json`,
};
