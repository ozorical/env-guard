# env-guard

Fail-fast environment variable validation for Node.js and TypeScript.

`env-guard` validates your environment variables at runtime and stops your app from starting if something is wrong. No silent failures. No guessing why production broke.

---

## Why

- `process.env` is untyped
- TypeScript does not validate environment variables at runtime
- Missing or invalid env vars cause late, painful failures

`env-guard` fails early with clear, readable errors.

---

## Install

```bash
npm install env-guard
