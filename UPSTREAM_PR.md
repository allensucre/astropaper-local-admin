# Proposed AstroPaper Upstream PR

## Title

Add optional local writing admin for Markdown posts and site settings

## Summary

This PR adds an optional local-only admin workspace for AstroPaper writers.
It provides a `/admin` page during local development, backed by a Vite middleware
that can read and write Markdown posts in `src/data/blog`.

The goal is to make AstroPaper friendlier for writers who prefer a visual
editing surface while preserving the current Markdown-first workflow.

## What It Adds

- `/admin` writing workspace
- Post list with search and draft/published filtering
- Markdown editor with write/preview modes and consistent single-line breaks
- Draft creation and post deletion
- Separate personal profile editor
- Chinese labels and status messages
- Local settings editor for common site identity fields and social links
- Dev-only middleware mounted under `/api/admin/*`

## Safety Notes

- The admin API is intended for `astro dev` only.
- It should not be exposed as a production CMS.
- The middleware uses path checks to keep post edits inside `src/data/blog`.
- The feature can be kept optional or documented as a local writer tool.

## Suggested Upstream Shape

For AstroPaper core, this could be introduced as one of:

1. An optional built-in local admin route.
2. A documented recipe that links to this standalone package.
3. A separate official integration if maintainers prefer keeping the theme lean.

The standalone repository keeps the proposal reviewable before any upstream
maintainer decision.

## Review Status

Proposal only: no upstream PR has been submitted. User approval is required before submission. Before opening a PR, port this feature to a fresh fork of the current upstream, verify installation and browser interactions there, and review the local write API security model. Do not include personal content or the personal blog dependency upgrade.
