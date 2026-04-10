# Client AI Coding Rules

This file is the working agreement for coding in `apps/client`.

It reflects both the intended frontend standards and the patterns already established in the codebase.

## Goals

- Prefer consistency over cleverness
- Reuse shared primitives before creating new abstractions
- Keep UI code easy to scan, easy to test, and easy to translate
- Match existing feature structure unless there is a strong reason not to

## Stack

- React + TypeScript
- Tailwind CSS
- shadcn/ui primitives
- Redux Toolkit for all multi-component app state (e.g. like with the editor feature)
- TanStack Query for server state
- `react-i18next` for translations
- React Router for navigation

## UI Rules

- Always prefer shadcn/ui components for interactive UI
- Import shared UI primitives from `@/core/shadcn/components/ui` when possible
- Prefer extending shared primitives with composition rather than creating custom replacements
- If a component is just a thin wrapper over a shadcn primitive, prefer removing the wrapper unless it provides real reusable value
- Use icons from `lucide-react`
- Keep interaction patterns visually consistent with existing account, integrations, and devtools screens

## Styling Rules

- Tailwind first
- Avoid inline styles unless there is no practical Tailwind alternative
- For theming use design tokens and semantic classes that orginate from the theme.slice which are based on shadcn classes such as:
  - `bg-background`
  - `text-foreground`
  - `border-border`
  - `text-muted-foreground`
- Use shared shadcn variants before inventing one-off class combinations
- When styling cards, prefer shadcn `Card` over custom bordered containers
- Overall styling should match well extablished standards on other similar websites designed as powerful web apps such as AWS or n8n
- Self service is very important and the UI should be easy to understand even for un-experienced users

## Component Rules

- Keep components modular and focused
- Prefer extracting sections into feature components when a page becomes large or mixes multiple concerns
- Aim to keep files under 300 lines where practical
- If a page has multiple distinct workflows, split them into child components
- Keep business logic out of presentational components when possible
- Try to keep components to less than 300 lines

## State Rules

Use the right tool for the right kind of state.

- Use TanStack Query for server-backed data:
  - fetches
  - mutations
  - loading/error states
  - cache invalidation
- Use Redux Toolkit for client/application state:
  - editor state
  - open panels/modals if shared
  - workflow graph state
  - devtools state
- Do not duplicate server state in Redux unless there is a clear product reason

## API Rules

- Feature APIs live in feature folders
- Feature query hooks should wrap feature APIs
- Prefer a consistent flow:
  - `api/*.api.ts`
  - `hooks/*.hook.ts` or `hooks/*.ts`
  - page/component usage
- For Better Auth client-side auth/org/SSO interactions, use the configured `authClient`
- For non-auth app APIs, use the feature API layer and TanStack hooks

## Routing Rules

- Keep routes inside the relevant feature route file
- Follow the existing route structure rather than scattering route config across unrelated files
- Prefer route params over parsing location strings manually

## i18n Rules

- All user-facing copy should go through `react-i18next`
- Follow the existing namespace structure:
  - app-wide text in `app/providers/i18n/locales`
  - feature-specific text in `features/<feature>/locales`
- Use the feature namespace when inside a feature
- Use `defaultValue` only when needed during migration or when adding keys incrementally
- Do not leave new user-facing button labels, headings, placeholders, tooltips, or empty states hardcoded in English

### Important i18n note

Some config-style objects, especially integration node definitions, currently contain user-facing labels and descriptions outside React components.

If editing those:
- prefer moving toward translation keys
- avoid introducing new hardcoded strings
- preserve compatibility with any persisted data shape that depends on labels

## Feature Structure Rules

Follow existing feature layout where applicable:

- `api/`
- `components/`
- `hooks/`
- `locales/`
- `pages/`
- `store/`
- `*.routes.tsx`

Do not create new top-level patterns if an existing feature already demonstrates the intended shape.

## Account Feature Rules

- Keep auth-related client code in `app/providers/auth` when it is app-level
- Keep account screens and account-specific UI inside `features/account`
- Organization and SSO management belong to the account feature
- Better Auth flows should use:
  - `authClient.useSession()`
  - `authClient.useListOrganizations()`
  - `authClient.useActiveOrganization()`
  - `authClient.$fetch(...)`
  as appropriate

## Integrations Feature Rules

- Treat graph editor state as Redux state
- Treat backend fetch/run/sync operations as TanStack/API concerns
- Node, edge, modal, and sidebar UI should remain split into focused components
- Prefer shared node definition objects for editor behavior, but keep rendering components small
- Keep frontend graph behavior aligned with shared package/backend types

## Forms and Inputs

- Use shared `Input`, `Textarea`, `Button`, `Tabs`, `Card`, etc.
- When adding labels/placeholders/help text, localize them
- Use semantic button variants:
  - `default`
  - `outline`
  - `ghost`
  - `destructive`
  rather than custom ad hoc button styling

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

## Refactoring Rules

- Prefer small, directional refactors
- When replacing old abstractions with shared primitives, remove the obsolete abstraction rather than leaving dead wrappers behind
- If a refactor changes visible UI behavior, keep it aligned with existing theme/tokens and translation rules

## Accessibility Rules

- Use semantic buttons for clickable actions
- Keep `aria-label`, `title`, and keyboard interaction in place when needed
- Do not break keyboard navigation in dropdowns, dialogs, tabs, or graph controls

## Import Rules

- Prefer existing aliases such as:
  - `@/`
  - `@app/`
  - `@features/`
- Keep imports consistent with surrounding files
- Prefer importing from shared ui barrels where that improves readability and does not create circularity

## When Unsure

If there are two plausible approaches, prefer the one that:

1. uses existing shadcn/shared primitives
2. follows the current feature structure
3. keeps user-facing text in i18n
4. uses TanStack for server state and Redux for all multi-component app state (e.g. like with the editor feature)
5. reduces custom abstractions instead of increasing them
