# Architecture Details

## System Overview

The React App Store application is built using Clear Architecture principles, adapted from Apple's App Store web implementation.

## Core Architecture

### Jet Framework

The Jet framework is the core of the application, handling:
- Routing (URL → Intent → Controller → Page)
- State management (Actions → Intents → State updates)
- Dependency injection (Object Graph pattern)

### Component Hierarchy

```
App
├── AppProvider (Context)
├── Navigation
└── PageResolver
    ├── LoadingSpinner
    ├── ErrorPage
    └── Page Components
        ├── DefaultPage
        ├── ProductPage
        ├── SearchPage
        └── ...
```

### Data Flow

```
User Action
    ↓
Action Handler (jet.perform)
    ↓
Intent Dispatch (jet.dispatch)
    ↓
Intent Controller
    ↓
API/Data Source
    ↓
Page Model
    ↓
React Component
    ↓
UI Update
```

## Layers

### Presentation Layer

**Location**: `src/components/`

**Responsibilities**:
- Rendering UI
- User interactions
- Displaying data

**Technologies**: React, TypeScript, CSS

### Application Layer

**Location**: `src/jet/`

**Responsibilities**:
- Intent handling
- Action processing
- Routing logic
- State coordination

**Technologies**: TypeScript, Custom framework

### Domain Layer

**Location**: `src/jet/models/`, `src/types/`

**Responsibilities**:
- Business models
- Domain logic
- Type definitions

**Technologies**: TypeScript

### Infrastructure Layer

**Location**: `shared/`, `src/config/`

**Responsibilities**:
- API clients
- Storage
- Logging
- Localization

**Technologies**: TypeScript, Fetch API

## Key Patterns

### Intent Pattern

Intents represent requests for data or actions:

```typescript
interface Intent<T> {
  $kind: string;
  // Intent-specific data
}
```

### Action Pattern

Actions represent user interactions:

```typescript
interface Action {
  $kind: string;
  // Action-specific data
}
```

### Controller Pattern

Controllers handle intents and return data:

```typescript
class IntentController {
  async handle(intent: Intent): Promise<Data> {
    // Handle intent logic
  }
}
```

### Dependency Injection Pattern

Dependencies are injected via Object Graph:

```typescript
interface Dependencies {
  logger: Logger;
  client: ApiClient;
  // ... other dependencies
}
```

## Module Organization

### Shared Modules

**Logger** (`shared/logger/`):
- Console logger
- Logger factory
- Log levels

**Localization** (`shared/localization/`):
- i18n implementation
- Translation loading
- Locale management

**Utils** (`shared/utils/`):
- URL utilities
- Optional types
- Common helpers

### Application Modules

**Jet** (`src/jet/`):
- Core framework
- Intent/action system
- Routing

**Components** (`src/components/`):
- React components
- Page components
- Shared UI

**Config** (`src/config/`):
- Artwork configuration
- Feature flags
- App settings

## Extension Points

### Adding a New Page Type

1. Define page model in `src/jet/models/`
2. Create page component in `src/components/pages/`
3. Add type guard in `src/jet/models/page.ts`
4. Update `PageResolver` to handle new type

### Adding a New Intent

1. Define intent interface
2. Create intent controller
3. Register in `src/jet/bootstrap.ts`
4. Use `jet.dispatch()` to trigger

### Adding a New Action

1. Define action interface
2. Create action handler
3. Register in `src/jet/action-handlers/`
4. Use `jet.perform()` to trigger

## Best Practices

1. **Single Responsibility**: Each module/component has one job
2. **Dependency Inversion**: Depend on abstractions, not concretions
3. **Type Safety**: Use TypeScript types throughout
4. **Error Handling**: Handle errors gracefully at boundaries
5. **Testing**: Test business logic independently of UI

## Future Enhancements

- [ ] Server-side rendering (SSR)
- [ ] State persistence
- [ ] Advanced caching
- [ ] Performance monitoring
- [ ] Analytics integration

