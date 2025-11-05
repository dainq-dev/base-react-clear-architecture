# Architecture Documentation

## Overview

This document describes the architecture of the React App Store application, which is based on Apple's App Store web implementation using Clear Architecture principles.

## Architecture Principles

### 1. Clear Architecture

The application follows Clear Architecture principles with clear separation of concerns:

- **Independence of Frameworks**: The business logic is independent of React
- **Testability**: Business logic can be tested without UI
- **Independence of UI**: UI can be changed without affecting business logic
- **Independence of Database**: Business rules don't depend on external data sources

### 2. Layers

```
┌─────────────────────────────────────┐
│     Presentation Layer (React)       │
│  - Components, Hooks, Context       │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│     Application Layer (Jet)         │
│  - Intents, Actions, Controllers     │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│     Domain Layer                    │
│  - Models, Business Logic           │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│     Infrastructure Layer            │
│  - API Clients, Storage, Services   │
└─────────────────────────────────────┘
```

## Jet Framework

### Core Concepts

#### Intents

An Intent represents a request for data or an action. Intents are dispatched to controllers that handle them.

```typescript
interface Intent<T = unknown> {
  $kind: string;
  [key: string]: unknown;
}
```

Example:
```typescript
const intent = {
  $kind: 'RouteUrlIntent',
  url: '/app/123'
};
```

#### Actions

Actions represent user interactions (clicks, navigation, etc.). They are performed and may trigger intents.

```typescript
interface Action {
  $kind: string;
  [key: string]: unknown;
}
```

#### Controllers

Controllers handle intents and return data. They are registered with the Jet framework.

```typescript
jet.onIntent('RouteUrlIntent', async (intent) => {
  // Handle routing logic
  return routerResponse;
});
```

### Routing Flow

1. User navigates to a URL
2. URL is routed using `jet.routeUrl()`
3. Route resolves to an Intent
4. Intent is dispatched to a Controller
5. Controller returns page data
6. Page data is rendered by React components

### State Management

State is managed through:
- **Jet Framework**: For routing and navigation state
- **React Context**: For application-wide state
- **Component State**: For local component state

## Dependency Injection

Dependencies are managed through an Object Graph pattern:

```typescript
interface Dependencies {
  logger: Logger;
  client: ApiClient;
  storage: Storage;
  // ... other dependencies
}
```

Dependencies are injected at bootstrap time and available throughout the application.

## Component Structure

### Page Components

Page components render different page types based on the page model:

```typescript
interface Page {
  canonicalURL?: string;
  pageType?: string;
  // ... page-specific fields
}
```

### Shared Components

Shared components are reusable UI components:
- Navigation
- Buttons
- Artwork/Images
- Shelves
- Modals

## Shared Modules

### Logger

Centralized logging system with different log levels.

```typescript
const logger = loggerFactory.loggerFor('MyComponent');
logger.info('Message', data);
```

### Localization (i18n)

Internationalization support with translation keys.

```typescript
const i18n = new I18N(locale, translations);
const text = i18n.translate('welcome.message', { name: 'User' });
```

### Utils

Common utility functions:
- URL manipulation
- Optional type handling
- Platform detection

## Configuration

### Artwork Configuration

Defines artwork profiles for different image sizes and aspect ratios:

```typescript
ArtworkConfig.set({
  PROFILES: new Map([
    ['app-icon', [[48], 1, 'bb']],
    ['card', [[525, 525, 490], 3/4, 'sr']],
  ])
});
```

### Constants

Application-wide constants:
- Storefront codes
- Default values
- Feature flags

## Data Flow

### Navigation Flow

```
User Action
    ↓
Action Handler
    ↓
Jet.perform(action)
    ↓
Intent Dispatch
    ↓
Controller
    ↓
Page Data
    ↓
React Component
    ↓
UI Update
```

### Data Fetching

```
Component
    ↓
Jet.dispatch(intent)
    ↓
Controller
    ↓
API Client
    ↓
Response
    ↓
Page Model
    ↓
Component Update
```

## Best Practices

1. **Use Intents for Data**: Always use intents when fetching data
2. **Use Actions for Interactions**: Use actions for user interactions
3. **Type Safety**: Leverage TypeScript for type safety
4. **Dependency Injection**: Inject dependencies, don't create them
5. **Separation of Concerns**: Keep business logic separate from UI

## Extension Points

### Adding a New Page Type

1. Define the page model type
2. Create a page component
3. Register intent controller
4. Add routing logic

### Adding a New Intent

1. Define the intent interface
2. Create intent controller
3. Register with Jet framework
4. Use in components

### Adding a New Action

1. Define the action interface
2. Create action handler
3. Register with Jet framework
4. Trigger from UI

