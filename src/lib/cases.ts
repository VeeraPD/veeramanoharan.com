import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../config/site';

export type Case = CollectionEntry<'cases'>;

/** Zero-padded case number, e.g. 1 -> "01". */
export const pad = (n: number) => String(n).padStart(2, '0');

export const casePath = (c: Case) => `/work/${c.data.slug}/`;

/** All cases in display order: site.caseOrder first, any others after by number. */
export async function getOrderedCases(): Promise<Case[]> {
  const all = await getCollection('cases');
  const rank = (n: number) => {
    const i = (site.caseOrder as readonly number[]).indexOf(n);
    return i === -1 ? 1000 + n : i;
  };
  return all.sort((a, b) => rank(a.data.number) - rank(b.data.number));
}

export async function getLiveCases(): Promise<Case[]> {
  return (await getOrderedCases()).filter((c) => c.data.status === 'live');
}

/** Previous and next live cases around the given one. Coming-soon cases are skipped. */
export async function getNeighbours(current: Case) {
  const live = await getLiveCases();
  const i = live.findIndex((c) => c.id === current.id);
  return { prev: i > 0 ? live[i - 1] : undefined, next: i >= 0 && i < live.length - 1 ? live[i + 1] : undefined };
}
