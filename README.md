# AstroPaper Local Admin

A local writing and site-settings admin for [AstroPaper](https://github.com/satnaing/astro-paper).

It adds a `/admin` page for editing Markdown blog posts and a local-only API for
saving changes during `astro dev`.

## Features

- Browse, search, edit, preview, and save Markdown posts in `src/data/blog`.
- Create and delete draft or published posts.
- Chinese interface with Blog posts, Personal profile, and Site settings navigation.
- Write/preview modes with shared typography; single newlines are preserved.
- Edit common site settings from a visual panel:
  - `SITE.title`, `SITE.author`, `SITE.website`, `SITE.profile`, `SITE.desc`
  - homepage heading and intro copy
  - social link label and social links
  - About page title and body
- Runs only in Astro dev mode through a Vite middleware.

## Installation

From an AstroPaper project root:

```bash
git clone https://github.com/allensucre/astropaper-local-admin.git
node ./astropaper-local-admin/bin/install.mjs /path/to/your/astropaper-site
```

For local development from this repository:

```bash
node ./bin/install.mjs /path/to/your/astropaper-site
```

The installer overwrites existing admin template files. Commit or back up local customizations first. npm registry publication is not part of this release.

In the target blog, install runtime dependencies:

```bash
corepack pnpm add marked@^18 dompurify@^3 remark-breaks@^4
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
- `templates/src/styles/admin-typography.css` to `src/styles/admin-typography.css`

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

## Markdown and Compatibility

Validated in an AstroPaper 5.5.1-derived blog running Astro 7.3.2, with Node 22. Use Node 22.14 or newer for the documented dependency versions. This is not a claim of compatibility with every upstream version.

The preview uses Marked with GFM and hard line breaks. To preserve the same single-newline behavior on the public site, import `remarkBreaks` from `remark-breaks` and append it to your existing remark plugins. With Astro 7 and `@astrojs/markdown-remark`, put it in `unified({ remarkPlugins: [remarkBreaks, ...existingPlugins] })`. With an older Astro configuration, put it in `markdown.remarkPlugins`. Do not replace your other plugins or upgrade Astro solely to install this admin.

The admin includes article typography. For the public site, use the same list styling in your existing article stylesheet; keep list markers and padding enabled. The two parsers are not identical: custom remark plugins and syntax highlighting can still differ.

## Publishing Workflow

Save locally, review the Git diff, commit and push your blog repository. Vercel deploys the public static site through its GitHub integration. The write API is not available on Vercel. Personal content stays in the blog repository, not in this package.
