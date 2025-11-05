# Cursor Rules

## Architecture Guidelines

### Clear Architecture

This project follows Clear Architecture principles:

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Dependency Rule**: Dependencies point inward (UI → Application → Domain → Infrastructure)
3. **Independence**: Business logic is independent of frameworks and UI

### Code Organization

- **Components**: Presentational components in `src/components/`
- **Business Logic**: In `src/jet/` (intents, actions, controllers)
- **Shared Code**: In `shared/` directory
- **Configuration**: In `src/config/`

### Naming Conventions

- **Components**: PascalCase (e.g., `PageResolver.tsx`)
- **Files**: Match component/export name
- **Hooks**: Start with `use` (e.g., `useJet.ts`)
- **Types**: PascalCase interfaces/types
- **Constants**: UPPER_SNAKE_CASE

### TypeScript Guidelines

1. **Always use types**: Avoid `any`, use `unknown` for truly unknown types
2. **Strict mode**: Enabled - ensure all code is type-safe
3. **Interfaces over types**: Prefer interfaces for object shapes
4. **Optional properties**: Use `?` for optional properties

### Jet Framework Usage

1. **Intents for Data**: Use `jet.dispatch(intent)` for fetching data
2. **Actions for Interactions**: Use `jet.perform(action)` for user interactions
3. **Register Handlers**: Always register intent/action handlers in bootstrap

### Component Guidelines

1. **Functional Components**: Use functional components with hooks
2. **Custom Hooks**: Extract reusable logic into custom hooks
3. **Context**: Use React Context for application-wide state
4. **Props**: Define props interfaces above component

### File Structure

```
ComponentName/
├── ComponentName.tsx      # Main component
├── ComponentName.types.ts # Types (if complex)
├── ComponentName.test.tsx # Tests (if needed)
└── index.ts              # Export
```

### Error Handling

1. **Error Boundaries**: Use React Error Boundaries for component errors
2. **Try-Catch**: Use try-catch in async functions
3. **Logging**: Always log errors with context

### Performance

1. **Memoization**: Use `React.memo` for expensive components
2. **useMemo/useCallback**: For expensive computations/functions
3. **Lazy Loading**: Use React.lazy for code splitting

### Testing

1. **Unit Tests**: Test business logic and utilities
2. **Component Tests**: Test component behavior
3. **Integration Tests**: Test user flows

### Documentation

1. **JSDoc**: Document public APIs
2. **Comments**: Explain "why", not "what"
3. **README**: Keep README updated

