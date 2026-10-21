import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const option = z.object({
  title: z.string(),
  detail: z.string(),
});

const decision = z.object({
  question: z.string(),
  optionA: option,
  optionB: option,
  chosen: z.enum(['A', 'B']),
  reason: z.string(),
});

const shipped = z.object({
  kind: z.enum(['image', 'video', 'artifact']),
  /** Path under /public. Leave empty to show a labelled placeholder block. */
  src: z.string().optional(),
  alt: z.string(),
  caption: z.string().optional(),
});

const cases = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/cases' }),
  schema: z
    .object({
      number: z.number().int().min(1),
      slug: z.string().regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and hyphens'),
      title: z.string(),
      /** Short label for the hero layer drawing. Falls back to the title. */
      short: z.string().max(24).optional(),
      problem: z.string(),
      type: z.string(),
      year: z.string(),
      status: z.enum(['live', 'coming-soon']),
      tags: z.array(z.string()).default([]),
      result: z.string().default(''),
      thumbnail: z.object({ src: z.string(), alt: z.string() }).optional(),
      summary: z
        .object({
          problem: z.string(),
          role: z.string(),
          timeline: z.string(),
          team: z.string(),
          result: z.string(),
        })
        .optional(),
      insight: z.string().optional(),
      decisions: z.array(decision).default([]),
      shipped: z.array(shipped).default([]),
      outcome: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      next: z.string().optional(),
    })
    .superRefine((c, ctx) => {
      if (c.status !== 'live') return;
      const need = (ok: boolean, path: string, message: string) =>
        ok || ctx.addIssue({ code: 'custom', path: [path], message });
      need(!!c.summary, 'summary', 'Live cases need a summary block');
      need(!!c.insight, 'insight', 'Live cases need an insight');
      need(c.decisions.length >= 3 && c.decisions.length <= 5, 'decisions', 'Live cases need 3 to 5 decisions');
      need(c.shipped.length > 0, 'shipped', 'Live cases need at least one shipped item');
      need(c.outcome.length > 0, 'outcome', 'Live cases need at least one outcome');
      need(!!c.next, 'next', 'Live cases need a "next" note');
    }),
});

const skills = defineCollection({
  loader: file('./src/content/skills.json'),
  schema: z.object({
    number: z.number().int().min(1),
    name: z.string(),
    proof: z.string(),
    /** Case number that proves this skill. Rendered as plain text if that case is not live. */
    case: z.number().int().min(1),
  }),
});

const testimonials = defineCollection({
  loader: file('./src/content/testimonials.json'),
  schema: z.object({
    quote: z.string().refine((q) => q.trim().split(/\s+/).length <= 40, 'Quote must be 40 words or fewer'),
    name: z.string(),
    role: z.string(),
    organisation: z.string(),
    linkedin: z.url().optional(),
  }),
});

const lab = defineCollection({
  loader: file('./src/content/lab.json'),
  schema: z.object({
    title: z.string(),
    learning: z.string(),
    url: z.url(),
  }),
});

export const collections = { cases, skills, testimonials, lab };
