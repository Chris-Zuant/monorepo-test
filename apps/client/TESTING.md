# Testing Guide

This project uses **Vitest** for unit and integration testing, with **React Testing Library** for component testing.

## Setup

All testing dependencies have been installed:
- `vitest` - Fast unit test framework
- `@vitest/ui` - UI for test results
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom jest matchers
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM environment for tests

## Configuration

- **vitest.config.ts** - Main vitest configuration with path aliases
- **vitest.setup.ts** - Test environment setup including mocks

## Test Structure

### Unit Tests
Located alongside components with `.test.tsx` or `.test.ts` suffix:

- `src/core/components/shadcn/Button.component.test.tsx` - Button component tests
- `src/core/components/shadcn/Input.component.test.tsx` - Input component tests
- `src/app/providers/theme/hooks/useTheme.hook.test.ts` - Theme hook tests
- `src/app/layout/header/components/Header.component.test.tsx` - Header component tests
- `src/app/layout/devtools/components/DevTools.component.test.tsx` - DevTools component tests
- `src/app/layout/devtools/components/ThemeSwitcher.component.test.tsx` - ThemeSwitcher component tests
- `src/features/users/components/UserCard.component.test.tsx` - UserCard component tests

### Integration Tests
Located in feature folders with `.integration.test.tsx` suffix:

- `src/features/users/users.integration.test.tsx` - Users feature integration tests
- `src/features/form-builder/form-builder.integration.test.tsx` - Form Builder feature integration tests
- `src/features/integrations/integrations.integration.test.tsx` - Integrations feature integration tests

## Running Tests

```bash
# Run all tests once
npm test -- --run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test Coverage

The configuration excludes:
- Type definition files (`*.types.ts`)
- Route configuration files (`*.routes.tsx`)
- Config files (`*.config.tsx`)
- Declaration files (`*.d.ts`)
- Index files (`index.ts`)

## Mocking Strategy

### API Mocks
API calls are mocked using vitest mocks:
```typescript
vi.mock('@features/users/api/user.api', () => ({
  fetchUser: vi.fn(),
}));
```

### Provider Wrapping
Components requiring Redux/i18n are wrapped:
```typescript
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    </Provider>
  );
};
```

### localStorage & Browser APIs
Mocked in vitest.setup.ts to prevent errors in test environment.

## Best Practices

1. **Unit Tests** - Test individual components/functions in isolation
2. **Integration Tests** - Test feature workflows with multiple components
3. **User Events** - Use `userEvent` for realistic user interactions
4. **Async Handling** - Use `waitFor` for async operations
5. **Cleanup** - Tests automatically clean up after each case

## Requirements

- **Node.js** >= 20.0.0 (current: v16.15.0 - may need upgrade to run tests)
- All tests are written and configured, ready to run on compatible Node version
