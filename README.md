# Molin Docs Control Plane

Molin is a lightweight documentation governance package. It validates a YAML task registry, checks that referenced paths exist in a static build, audits stale entries, and uses a small demo shop as a concrete validation target.

## Requirements

- Node.js 18+

## Install

```powershell
npm install
```

## Commands

```powershell
npm run validate:schema
$env:DOCS_BUILD_DIR="./shop"; npm run validate:paths
npm run audit:staleness
```

## Repository Layout

```text
.github/workflows/   CI and scheduled audits
docs/tasks.yaml      Canonical task registry
docs/config.yaml     Staleness thresholds
scripts/             Validators and auditors
shop/                Static demo catalog
tasks.schema.json    Registry contract
```

## Deployment

The static site is ready for Netlify. `netlify.toml` publishes the `shop/` directory directly.
