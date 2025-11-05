# Setup Guide

## Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher (or yarn/pnpm)
- **Git**: For version control

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-app-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=React App Store
```

### 4. Tailwind CSS

Tailwind CSS is already configured. The configuration files are:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

You can customize Tailwind by editing `tailwind.config.js`.

## Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## TypeScript Configuration

The project uses TypeScript with strict mode enabled. Key configurations:

- **Path Aliases**: `~/*` for `src/*`, `@shared/*` for `shared/*`
- **Strict Mode**: Enabled for type safety
- **JSX**: React JSX transform

## Project Structure

```
react-app-store/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── config/            # Configuration
│   ├── constants/         # Constants
│   ├── context/           # React context
│   ├── jet/               # Jet framework
│   └── ...
├── shared/                 # Shared modules
│   ├── logger/           # Logging
│   ├── localization/      # i18n
│   └── utils/            # Utilities
├── .cursor/               # Cursor IDE configuration
├── public/                # Static assets
└── ...
```

## IDE Setup

### VS Code / Cursor

The project includes `.cursor` folder with:
- Architecture rules
- Code generation templates
- MCP configuration

### Recommended Extensions

- ESLint
- Prettier
- TypeScript
- React snippets

## Configuration Files

### TypeScript (`tsconfig.json`)

Configured with:
- Strict type checking
- Path aliases
- React JSX support

### Vite (`vite.config.ts`)

Configured with:
- React plugin
- Path aliases
- Dev server settings

### ESLint (`.eslintrc.cjs`)

Configured for:
- TypeScript
- React
- React Hooks

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, modify `vite.config.ts`:

```typescript
server: {
  port: 3001, // Change to available port
}
```

### Module Resolution Issues

Ensure path aliases are correctly configured in:
- `tsconfig.json`
- `vite.config.ts`

### Type Errors

Run type checking:

```bash
npm run type-check
```

## Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for architecture details
2. Check [README.md](./README.md) for overview
3. Explore `.cursor/rules.md` for coding guidelines

