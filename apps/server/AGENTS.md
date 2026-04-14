# Server AI Coding Rules

This file is the working agreement for coding in `apps/server`.

It is the server-side equivalent of the client `AGENTS.md` and should be read before making changes in this project area.

## Required Workflow

Before writing server code:

1. Read this file
2. Inspect the existing feature/app structure before introducing a new pattern
3. Decide which layer owns the change:
   - `app`
   - `routeHandlers`
   - `services`
   - `repo`
   - `temporal`
4. Prefer the smallest explicit fix that matches the current architecture
5. Validate the result with `pnpm --filter server build`

If a change touches auth, request bridging, cookies, CORS, SAML/OIDC, or workflow execution, treat it as a higher-risk change and leave a clear trail through comments and file placement.

## Goals

- Prefer consistency over cleverness
- Keep server code easy to scan, easy to test, and easy to debug
- Match existing feature structure unless there is a strong reason not to
- Keep auth, persistence, workflow logic, and route handling clearly separated
- Favor fixes that are durable and explicit over hidden workarounds

## Stack

- TypeScript
- Better Auth
- Fastify
- MongoDB
- Mongoose / Mongo adapters
- Temporal

## Non-Negotiable Rules

- Never change code inside the `node_modules` folder
- All fixes to third-party package issues must be implemented externally in our own code
- Leave concise comments above implemented code when the reasoning is not obvious from the code itself
- Do not add silent workarounds that future developers cannot discover from reading the app code
- Do not weaken security behavior globally when a development-only fix is sufficient
- Do not mix transport logic, persistence logic, and domain orchestration into one file unless the code is genuinely trivial
- Try to keep code to one line, only wrap code or comments if you excede 150 cols/ chars

## Project Structure Rules

Follow the existing server structure where applicable:

- `src/app/`
- `src/features/<feature>/`
- `routeHandlers/`
- `services/`
- `repo/`
- `temporal/`
- `nodes/`

Prefer keeping responsibilities split like this:

- route handlers:
  - request parsing
  - auth/session access
  - response shaping
- services:
  - orchestration
  - domain logic
  - workflow execution
- repo:
  - database access only
  - no HTTP concerns
- app:
  - framework/bootstrap/config/auth glue

Do not collapse these layers unless the code is genuinely trivial.

When deciding where code belongs:

- put framework/bootstrap/auth glue in `src/app`
- put request/response behavior in `routeHandlers`
- put orchestration and business flow in `services`
- put database access in `repo`
- put workflow/activity concerns in `temporal`

## Auth Rules

- Keep Better Auth setup inside `src/app/auth`
- Prefer fixing auth integration issues in:
  - auth bootstrap
  - request bridging
  - compatibility shims
  rather than patching package files
- If Better Auth or SSO behavior needs adaptation for this repo, add app-owned compatibility code in `src/app/auth`
- Development-only auth relaxations must be explicitly scoped to development
- If a security check is bypassed in development, leave a short comment explaining:
  - why it is needed
  - why it is scoped to development
- If an auth issue is caused by transport or framework integration, prefer fixing the bridge/bootstrap layer instead of adding feature-level hacks
- Keep client-facing redirect behavior separate from provider/ACS configuration when working on SAML/OIDC flows

## Route Rules

- Keep route declarations thin
- Put behavior in `routeHandlers`
- Keep Fastify bootstrap concerns in `src/index.ts` or `src/app/*`
- If a route needs custom content-type or transport handling, document why with a concise comment
- Return predictable JSON shapes from app routes unless the route intentionally serves redirects, files, or HTML
- If a route exists only to support auth/webhook/protocol transport, keep the special-case handling as close to bootstrap or the owning feature as possible

## Database Rules

- Database collection naming should stay consistent with the existing convention:
  - `app_*`
  - `auth_*`
- Do not mix persistence logic into route handlers
- Repo functions should be small and explicit
- Prefer deterministic query helpers over ad hoc inline Mongo access
- If supporting legacy and new shapes at the same time, isolate that compatibility logic in repo or normalization helpers
- Prefer repo methods with clear names over “generic” helpers that hide which collection or shape is being queried

## Temporal and Workflow Rules

- Keep workflow/activity concerns under the `temporal/` area
- Only action nodes should be Temporal activities if that is the current architecture
- Trigger and relationship orchestration should stay outside activities unless the architecture changes deliberately
- Workflow execution code should be explicit about:
  - what runs locally
  - what runs as a Temporal activity
  - what state is passed forward
- Avoid hiding workflow behavior behind overly abstract helpers when the explicit flow is clearer
- If integrating external callbacks into workflows, be explicit about whether the behavior is:
  - workflow runtime logic
  - activity behavior
  - transport glue

## Service Rules

- Services should orchestrate domain behavior, not own transport or database plumbing details
- If a switch statement becomes large and node-specific, prefer moving the logic into per-node modules
- Keep helper functions near the area that owns the behavior unless they are genuinely shared
- Prefer narrow, named helper functions over large generic utility files
- If a service starts accumulating feature-specific branching, prefer extracting per-node or per-capability modules rather than growing a monolith

## Compatibility and Third-Party Rules

- If a third-party library has a runtime mismatch, prefer:
  - an app-owned compatibility shim
  - bootstrap-time adaptation
  - wrapper code around the package
- Do not “fix” third-party code by editing files in `node_modules`
- When adding compatibility code, explain the package/runtime mismatch in a short comment
- Keep compatibility code as small and local as possible
- Compatibility shims should live in app-owned code with names that make the intent discoverable
- Prefer bootstrap-time adaptation over scattered defensive checks across multiple features

## Comments and Documentation Rules

- Comments should explain reasoning, not narrate obvious code
- Add comments above code when:
  - a workaround exists
  - a security behavior is intentionally relaxed in development
  - a transport/auth integration is non-obvious
  - a package compatibility shim is required
- Do not add repetitive or low-value comments
- Comments should help a future developer understand the constraint, not the syntax

## Validation Rules

- After meaningful server changes, run:
  - `pnpm --filter server build`
- If auth, routing, or workflow behavior changes, prefer validating the closest realistic path
- If a runtime issue cannot be fully tested locally, say so clearly

## Review Checklist

Before finishing server work, check:

1. Is the code in the correct layer?
2. Did I avoid touching `node_modules`?
3. If this is a third-party compatibility fix, is it implemented externally and clearly commented?
4. If this changes auth/security behavior, is it scoped to development only where appropriate?
5. If this changes routing or transport behavior, is the reason documented near the code?
6. Did I run `pnpm --filter server build`?

## Refactoring Rules

- Prefer small, directional refactors
- Remove obsolete code paths when replacing them, unless compatibility requires a temporary bridge
- Do not leave duplicate implementations active without a clear reason
- Preserve behavior unless the requested change is intentionally behavioral

## Safety Rules

- Prefer development-only switches over global weakening of auth/security behavior
- Be explicit when changing:
  - cookie/state behavior
  - CORS behavior
  - auth flow behavior
  - SAML/OIDC verification behavior
- If a change affects production risk, structure it so development and production can differ safely

## When Unsure

If there are two plausible approaches, prefer the one that:

1. keeps the fix outside third-party package files
2. matches the existing feature/app structure
3. keeps route, service, and repo responsibilities separated
4. scopes risky auth behavior to development only
5. leaves future developers a clear trail through comments and file placement
