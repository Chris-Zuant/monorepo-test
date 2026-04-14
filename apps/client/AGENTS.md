# Client AI Coding Rules

This file is the working agreement for coding in `apps/client`.

It should be read before making changes in this project area.

## Required Workflow

Before writing client code:

1. Read this file
2. Look at the surrounding feature structure before introducing a new pattern
3. Reuse an existing shared primitive or feature pattern if one already solves the problem
4. Check whether the change introduces new user-facing copy, routes, server state, or shared app state
5. Validate the result with `pnpm --filter client build`

If a change touches auth, routing, shared UI primitives, or layout shell behavior, treat it as a higher-risk change and validate the nearest realistic user flow as well.

## Goals

- Prefer consistency over cleverness
- Reuse shared primitives before creating new abstractions
- Keep UI code easy to scan, easy to test, and easy to translate
- Match existing feature structure unless there is a strong reason not to
- Build interfaces that are clear to experienced users and still approachable for less experienced users

## Stack

- React + TypeScript
- Tailwind CSS
- shadcn/ui primitives
- Redux Toolkit for shared client/application state
- TanStack Query for server state
- `react-i18next` for translations
- React Router for navigation

## Non-Negotiable Rules

- All user-facing copy must go through i18n
- Prefer shadcn/ui components for interactive UI
- Do not create thin wrapper components unless they add clear reusable value
- Keep state in the correct layer:
  - TanStack Query for server state
  - Redux for shared client/editor/application state
- Do not introduce hardcoded English UI strings in new code unless explicitly migrating incrementally
- Do not edit generated files unless the task is specifically about generated output
- Do not introduce duplicate patterns when an accepted pattern already exists in the same feature or shared layer

## UI Rules

- Always prefer shared shadcn primitives from `@/core/shadcn/components/ui`
- Prefer composing:
  - `Button`
  - `Input`
  - `Textarea`
  - `Tabs`
  - `Card`
  - `Dialog`
  - `Select`
  - `Badge`
  before building custom UI
- Use `lucide-react` for icons
- Keep interaction patterns visually consistent with existing account, integrations, and devtools screens
- If an existing shared primitive already solves the problem, use it instead of inventing a parallel pattern
- Prefer shadcn primitives over custom markup for:
  - dialogs
  - cards
  - tabs
  - buttons
  - inputs
  - selects
  - badges
  - dropdown content
- If a page needs a new interaction pattern, first check whether an equivalent pattern already exists elsewhere in the client

## Styling Rules

- Tailwind first
- Avoid inline styles unless there is no practical Tailwind alternative
- Prefer semantic design-token classes such as:
  - `bg-background`
  - `text-foreground`
  - `border-border`
  - `text-muted-foreground`
- Use shared shadcn variants before inventing one-off class combinations
- Prefer shadcn `Card` over custom bordered containers
- Prefer token-driven colors over ad hoc `gray`, `blue`, or other one-off palettes
- Styling should resemble well-established, powerful web apps rather than marketing sites
- Prioritize clarity and self-service UX over decorative complexity
- Avoid one-off spacing, radius, and color treatments when a nearby screen already establishes the visual pattern
- Use inline styles only for values that are inherently runtime-driven, such as:
  - React Flow geometry
  - computed positioning
  - dynamic transforms that are not practical in Tailwind

## Component Rules

- Keep components focused and modular
- Prefer extracting sections into feature components when a page becomes large or mixes multiple workflows
- Aim to keep files under 300 lines where practical
- If a page contains multiple distinct workflows, split them into child components
- Keep presentational components light and move business logic into hooks, services, or container components where appropriate
- If a component grows because it owns two separate workflows, split by workflow before introducing generic helper abstractions
- Prefer local feature components over prematurely shared abstractions

## State Rules

Use the right tool for the right kind of state.

- Use TanStack Query for:
  - fetches
  - mutations
  - loading/error states
  - cache invalidation
- Use Redux Toolkit for:
  - editor state
  - integration graph state
  - shared modal/panel state when needed
  - devtools state
  - other non-server shared app state
- Do not mirror server state into Redux without a clear product reason
- When a value originates from the backend and is fetched or mutated over HTTP, default to TanStack Query unless there is a strong reason not to
- When a value is primarily UI/editor/session state within the client, default to Redux or local component state

## API Rules

- Feature APIs live in feature folders
- Feature hooks should wrap feature API calls
- Prefer the flow:
  - `api/*.api.ts`
  - `hooks/*.ts` or `hooks/*.hook.ts`
  - page/component usage
- Use `authClient` for Better Auth client-side flows
- Use feature API modules plus TanStack Query for app APIs
- Do not scatter raw `fetch` or `axios` calls directly through pages when a feature API module is the established pattern
- If a feature already has an API file and query hook pattern, continue using that same shape

## Routing Rules

- Keep routes inside the relevant feature route file
- Prefer route params over parsing URLs manually
- Public and guarded routes should be handled intentionally
- If a new route is meant to be public, make sure the app shell/guard logic is updated too
- If a route is added for a distinct auth flow, ensure both route registration and guard/layout exceptions are updated in the same change

## i18n Rules

- All user-facing copy must go through `react-i18next`
- Follow the existing namespace structure:
  - app-wide text in `app/providers/i18n/locales`
  - feature-specific text in `features/<feature>/locales`
- Use the feature namespace when inside a feature
- Use `defaultValue` only when helpful during migration
- Do not leave new button labels, headings, placeholders, help text, tooltips, or empty states hardcoded in English
- When extracting a new component, move its copy into the same feature locale files as part of the extraction
- Prefer consistent translation key groupings within a feature rather than ad hoc flat keys

### Important i18n note

Some config-style objects, especially integration node definitions, contain user-facing labels outside React components.

When editing those:

- avoid introducing new hardcoded strings
- prefer moving toward translation keys when practical
- preserve compatibility with persisted data that may depend on existing labels

## Feature Structure Rules

Follow existing feature layout where applicable:

- `api/`
- `components/`
- `hooks/`
- `locales/`
- `pages/`
- `store/`
- `*.routes.tsx`

Do not introduce new top-level patterns if an existing feature already demonstrates the intended shape.

When adding a new capability to an existing feature:

- extend the existing feature first
- create a new feature only if the behavior is genuinely separate in navigation, ownership, and state boundaries

## Account Feature Rules

- Keep app-level auth code in `app/providers/auth`
- Keep account screens and account-specific UI inside `features/account`
- Organization and SSO management belong to the account feature
- Better Auth flows should use the configured client APIs and hooks rather than ad hoc fetch logic
- When auth flows are distinct, separate them into distinct screens rather than overloading a single page
- Keep account pages in the account feature even when they interact with app-level auth clients
- Prefer clear separation between:
  - login pages
  - work SSO pages
  - profile/settings pages
  - organization/SSO management pages

## Integrations Feature Rules

- Treat graph editor state as Redux state
- Treat backend fetch/run/sync operations as API/TanStack concerns
- Keep nodes, edges, modals, sidebars, and API integration UI split into focused components
- Keep frontend graph behavior aligned with shared package/backend types
- Prefer shared node definitions for editor behavior, but keep renderer components small
- When changing editor behavior, check whether the same value exists in:
  - React Flow node data
  - Redux graph state
  - shared integration types
  and keep those layers aligned

## Forms and Inputs

- Use shared `Input`, `Textarea`, `Button`, `Tabs`, `Card`, and related primitives
- Localize labels, placeholders, and help text
- Use semantic button variants:
  - `default`
  - `outline`
  - `ghost`
  - `destructive`
- Avoid custom button styling when an existing variant works
- If a form represents backend state, prefer a feature mutation/query flow rather than ad hoc submission state
- If a field’s meaning is non-obvious, add brief help text instead of relying on placeholder text alone

## Testing Rules

This project uses:

- Vitest
- React Testing Library
- `@testing-library/user-event`

Guidelines:

- Put unit tests next to the component or module as `*.test.ts(x)`
- Put higher-level feature tests in the feature as `*.integration.test.tsx`
- Mock API modules with `vi.mock(...)`
- Wrap tested components with required providers:
  - Redux
  - i18n
  - router if needed
- Prefer testing observable behavior over implementation details
- When a page depends on TanStack Query or auth providers, include the minimum realistic providers in tests rather than mocking the entire component tree away

## Refactoring Rules

- Prefer small, directional refactors
- Remove obsolete wrappers or abstractions when replacing them with shared primitives
- Avoid leaving multiple overlapping patterns active without a clear migration reason
- If a refactor changes visible behavior, keep it aligned with existing design tokens and translation rules
- Do not leave dead components or unused parallel screens behind after a completed refactor unless there is a documented temporary migration reason

## Accessibility Rules

- Use semantic buttons for clickable actions
- Preserve keyboard interaction for dialogs, tabs, dropdowns, and graph controls
- Keep `aria-label`, `title`, and focus behavior in place when needed
- Do not make a visually cleaner UI at the expense of keyboard or screen-reader usability

## Import Rules

- Prefer existing aliases such as:
  - `@/`
  - `@app/`
  - `@features/`
- Keep imports consistent with surrounding files
- Prefer shared UI barrels when they improve readability and do not create circularity

## Validation Rules

- After meaningful client changes, run:
  - `pnpm --filter client build`
- If routing, auth, or editor flows change, validate the closest realistic path
- If a change cannot be fully verified locally, say so clearly

## Review Checklist

Before finishing client work, check:

1. Is all new user-facing text in i18n?
2. Did I use shared shadcn primitives where possible?
3. Did I put server state in TanStack Query and shared client state in Redux only when appropriate?
4. If I added or changed a route, did I update guards and shell behavior if needed?
5. Did I remove obsolete patterns rather than leaving both active?
6. Did I run `pnpm --filter client build`?

## When Unsure

If there are two plausible approaches, prefer the one that:

1. uses existing shared shadcn primitives
2. follows the current feature structure
3. keeps user-facing text in i18n
4. uses TanStack for server state and Redux for shared client state
5. reduces custom abstractions instead of increasing them
