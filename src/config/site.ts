/**
 * Single place for every site-wide setting.
 * Replace the placeholder values below before launch.
 */
export const site = {
  name: 'R. Veera Manoharan',
  role: 'Product manager',
  /** Custom domain, served from the root. Also written to the CNAME file at build. */
  domain: 'example.com',
  email: 'hello@example.com',
  linkedin: 'https://www.linkedin.com/in/your-handle/',
  description:
    'Product manager. I find real user problems, make the hard calls, and ship AI products end to end.',
  /** Open Graph image, relative to /public. */
  ogImage: '/og.png',
  resumes: {
    b2b: { label: 'Resume · B2B-led', file: '/resume-b2b.pdf' },
    devices: { label: 'Resume · Devices-led', file: '/resume-devices.pdf' },
  },
  /**
   * Privacy-friendly analytics, no cookies.
   * provider: 'goatcounter' uses `code` as the GoatCounter site code (code.goatcounter.com).
   * provider: 'plausible' uses `code` as the domain registered in Plausible.
   * provider: 'none' disables analytics.
   */
  analytics: {
    provider: 'goatcounter' as 'goatcounter' | 'plausible' | 'none',
    code: 'your-site-code',
  },
  /** Order in which case cards appear on the landing page. Cases not listed follow by number. */
  caseOrder: [1, 5, 4, 2, 3, 6],
} as const;

export const siteUrl = `https://${site.domain}`;
