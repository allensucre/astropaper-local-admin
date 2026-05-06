# Security

`astropaper-local-admin` is designed for local writing workflows only.

The admin API can read and write Markdown posts and selected site files inside
your AstroPaper project. Do not expose it to the public internet.

## Intended Use

- Run it with Astro's local development server.
- Bind the dev server to `127.0.0.1` when writing locally.
- Review generated file changes before committing or deploying.

## Do Not

- Do not deploy `/api/admin/*` endpoints to production.
- Do not run the dev server on a public host or shared network without
  additional authentication and access controls.
- Do not use this as a multi-user CMS.

## Reporting Issues

Please open a GitHub issue with a clear reproduction. If the issue involves
private content or file paths, remove sensitive details before posting.
