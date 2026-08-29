# Src

## Purpose

Contains the production implementation of PCB Component Finder: command handling, domain rules, storage, reports, and local serving as applicable.

## Contents

- `cli.mjs` — Implements PCB Component Finder's command-line interface and coordinates validation, persistence, report generation, and local serving.
- `demo.mjs` — Builds deterministic synthetic records used to demonstrate PCB Component Finder without accessing private or live data.
- `model.mjs` — Defines PCB Component Finder's domain model, validation rules, calculations, and aggregation helpers.
- `render.mjs` — Generates and serves PCB Component Finder's demonstration report through a deployment-friendly HTTP host.
- `report.mjs` — Builds PCB Component Finder's self-contained report artifacts and browser-side interactions from validated data.

## Responsibilities

Production behavior belongs here. Generated reports, user data, and repository documentation should remain outside this folder.

## Important Notes

- This folder is part of **PCB Component Finder** and should be kept consistent with the commands and architecture documented in the root README.
- Paths and file roles listed above reflect the current repository implementation.

