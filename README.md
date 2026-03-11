# Molin Docs Control Plane

Molin is a lightweight documentation governance package for teams that want documentation quality enforced in CI, not managed by convention alone.

It provides:

- a single source of truth for documentation tasks in `docs/tasks.yaml`
- JSON Schema validation for task metadata
- path validation against built documentation output
- staleness auditing based on `last_verified`
- a small static demo shop used as a real integration target

## Why Molin

Documentation usually fails in predictable ways:

- ownership is unclear
- pages drift out of date
- links break after deploys
- metadata becomes inconsistent
- docs quality is reviewed manually, if at all

Molin turns those concerns into executable checks.

## What Is In This Repo

```text
.github/workflows/   CI validation and scheduled audits
docs/tasks.yaml      Canonical docs task registry
docs/config.yaml     Staleness thresholds and audit config
scripts/             Validation and audit scripts
shop/                Static demo catalog used for path checks
tasks.schema.json    JSON Schema contract for the registry
netlify.toml         Netlify publish configuration
```

## Requirements

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Local Usage

Validate the task registry schema:

```bash
npm run validate:schema
```

Validate that published task paths exist in the built site:

```powershell
$env:DOCS_BUILD_DIR="./shop"; npm run validate:paths
```

Audit freshness of published tasks:

```bash
npm run audit:staleness
```

## Data Model

The canonical registry is `docs/tasks.yaml`.

Each task represents a documentation target and includes metadata such as:

- `id`
- `title`
- `description`
- `category`
- `status`
- `last_verified`
- `path`
- `related`
- `roles`
- `pitfalls`

Validation rules are enforced by `tasks.schema.json`.

## CI Behavior

GitHub Actions validates the repo on pushes and pull requests to `main`.

The docs workflow currently runs:

- `npm ci`
- `npm run validate:schema`
- `DOCS_BUILD_DIR=./shop npm run validate:paths`

The scheduled workflow runs:

- `npm ci`
- `npm run audit:staleness`

## Demo Shop

The `shop/` directory is a static site used as a practical validation target. It gives the path validator real files to verify instead of synthetic examples.

Current pages include:

- `/`
- `/products/product-1`
- `/products/product-2`

## Netlify Deployment

The repo is prepared for Netlify. `netlify.toml` publishes the `shop/` directory directly.

Typical production deploy:

```bash
npx netlify deploy --prod --dir shop --no-build
```

## GitHub And npm Documentation

This `README.md` is the primary documentation surface for both:

- GitHub repository landing page
- npm package page, if the package is published later

That means this file should stay high signal, installation-oriented, and accurate.

## Roadmap

- expand `docs/tasks.yaml` beyond the demo task
- add richer reporting in GitHub Actions summaries
- optionally open issues for stale documentation
- link deploy previews to governance checks
