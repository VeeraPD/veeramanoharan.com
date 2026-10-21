# R. Veera Manoharan · PM portfolio

Live at https://veeramanoharan.com. The live site is the static `prototype/` folder (plain HTML, CSS and JS). Case pages are generated: edit `prototype/build-cases.mjs`, then run `node prototype/build-cases.mjs`. Every push to `main` publishes it through `.github/workflows/deploy.yml`.

The Astro project below (`src/`) is an earlier build and is not deployed.

## Architecture

- `src/config/site.ts` holds every site-wide setting: domain, email, LinkedIn, analytics, resumes, card order.
- `src/content/cases/*.mdx` is one file per case study, validated by `src/content.config.ts`.
- `src/content/{skills,lab,testimonials}.json` feed the landing page sections.
- `src/pages/` has `index`, `about`, `work/[slug]` (pages only for `status: live`) and `404`.
- The build writes `dist/CNAME` from `site.domain`. GitHub Actions builds and deploys on every push to `main`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # type and content check
npm run build      # static output in dist/
npm run preview    # serve dist/
```

Needs Node 22 or newer.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this folder to the `main` branch.
2. In the repository go to Settings, Pages, and set Source to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes.

## Connect the custom domain

1. Set `domain` in `src/config/site.ts` to your real domain and push. The build writes the CNAME file.
2. At your DNS provider add these records for the apex domain:
   - `A` to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` to `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
3. For `www` add a `CNAME` record pointing to `<your-github-username>.github.io`.
4. In Settings, Pages, enter the custom domain and, once the certificate is ready, tick **Enforce HTTPS**.

GitHub publishes these addresses at docs.github.com/pages. Check them there before you set DNS.

## Analytics

GoatCounter by default. Create a free site at goatcounter.com and put its code in `site.analytics.code`. To switch to Plausible, set `provider: 'plausible'` and `code` to your domain. Set `provider: 'none'` to turn analytics off.

Events fired from `data-track` attributes: `case-open/<label>`, `resume-download/b2b`, `resume-download/devices`, `email-click`, `linkedin-click`.

## Content guide

**Add a case.** Copy an existing live file in `src/content/cases/`, rename it, and change `number`, `slug`, `title` and the rest. Set `status: live`. The card, the page, the hero layer and the previous/next links appear with no code changes. A live case needs a `summary`, an `insight`, 3 to 5 `decisions`, at least one `shipped` item, one `outcome` and a `next` note, or the build fails with a clear message. The text below the frontmatter is the "Context and user" section. For images, put files in `public/images/` and set `thumbnail: { src: /images/x.png, alt: "..." }`.

**Publish a coming-soon case.** Change `status` to `live` and fill in the fields above. To take one down, set it back to `coming-soon`. Its card becomes unclickable and it leaves the previous/next links.

**Add a testimonial.** Add an object to `src/content/testimonials.json` with `id`, `quote` (40 words or fewer), `name`, `role`, `organisation` and optional `linkedin`. The section appears once there are 3 or more.

**Add a skill.** Add an object to `src/content/skills.json` with `id`, `number`, `name`, `proof` and `case` (the case number that proves it). If that case is not live the link shows as plain text.

**Add an AI Lab tile.** Add an object to `src/content/lab.json` with `id`, `title`, `learning` and `url`. Four to six tiles work best.

**Resumes and share image.** Replace `public/resume-b2b.pdf` and `public/resume-devices.pdf` with your real files, keeping the names. `node scripts/generate-assets.mjs` recreates the placeholders and `public/og.png`.
