# AstroPaper Local Admin

A local writing and site-settings admin for [AstroPaper](https://github.com/satnaing/astro-paper).

It adds a `/admin` page for editing Markdown blog posts and a local-only API for
saving changes during `astro dev`.

## Features

- Browse, search, edit, preview, and save Markdown posts in `src/data/blog`.
- Create new draft posts.
- Edit common site settings from a visual panel:
  - `SITE.title`, `SITE.author`, `SITE.website`, `SITE.profile`, `SITE.desc`
  - homepage heading and intro copy
  - social link label and social links
  - About page title and body
- Runs only in Astro dev mode through a Vite middleware.

## Installation

From an AstroPaper project root:

```bash
npx astropaper-local-admin install
```

For local development from this repository:

```bash
node ./bin/install.mjs /path/to/your/astropaper-site
```

Then start AstroPaper:

```bash
corepack pnpm run dev --host 127.0.0.1
```

Open:

```text
http://127.0.0.1:4321/admin
```

## What The Installer Changes

The installer copies:

- `templates/src/pages/admin.astro` to `src/pages/admin.astro`
- `templates/src/utils/adminDevServer.ts` to `src/utils/adminDevServer.ts`

It also updates `astro.config.ts` to import `adminDevServer` and include it in
`vite.plugins`.

## Homepage Settings Markers

To edit homepage intro paragraphs from the Settings panel, add markers around
the editable blocks in `src/pages/index.astro`:

```astro
<p>
  <!-- ADMIN:home-intro:start -->
  Your homepage intro.
  <!-- ADMIN:home-intro:end -->
</p>

<p class="mt-2">
  <!-- ADMIN:home-secondary:start -->
  Your secondary homepage paragraph.
  <!-- ADMIN:home-secondary:end -->
</p>
```

Without these markers, post editing still works, and the Settings panel can
still edit `src/config.ts`, social links, and About content.

## Safety Model

This project is intentionally local-first. The write API is available only when
the Astro dev server is running. Do not deploy it as a public CMS.

Read [SECURITY.md](./SECURITY.md) before using it on shared networks.

## Status

This is an early extraction from a real AstroPaper writing workflow. The current
goal is to keep it small, readable, and easy to upstream or adapt.
