# React App Store - Monorepo

Monorepo structure cho React App Store với Gateway và Backend services, được tái tạo từ Apple App Store web (Svelte) với React và áp dụng các tư duy kiến trúc tương tự.

## 📚 Mục Lục

- [Quick Start](#quick-start) ⚡
- [Giới Thiệu](#giới-thiệu)
- [Cấu Trúc Monorepo](#cấu-trúc-monorepo)
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt & Setup](#cài-đặt--setup)
- [Chạy Dự Án](#chạy-dự-án)
- [Cấu Trúc Packages](#cấu-trúc-packages)
- [Kiến Trúc](#kiến-trúc)
- [Intent-Based API](#intent-based-api)
- [Workflow Development](#workflow-development)
- [Scripts Reference](#scripts-reference)
- [Troubleshooting](#troubleshooting)
- [Tài Liệu Tham Khảo](#tài-liệu-tham-khảo)

---

## Quick Start ⚡

### 1. Install Dependencies

```bash
# Install pnpm nếu chưa có
npm install -g pnpm

# Install dependencies cho tất cả packages
pnpm install
```

### 2. Build Shared Package

```bash
pnpm --filter shared build
```

### 3. Setup Environment (Optional)

```bash
# Gateway
cp packages/gateway/.env.example packages/gateway/.env

# Backend
cp packages/backend/.env.example packages/backend/.env
```

### 4. Start All Services

```bash
pnpm dev:all
```

Hoặc start từng service riêng:

```bash
# Terminal 1
pnpm dev:gateway

# Terminal 2
pnpm dev:backend

# Terminal 3
pnpm dev:frontend
```

### 5. Access Services

- **Frontend**: http://localhost:3000
- **Gateway**: http://localhost:3001/api
- **Backend**: http://localhost:3002/api

**Xong! Bạn đã sẵn sàng để phát triển.** 🎉

---

## Giới Thiệu

### Dự án này là gì?

React App Store là một ứng dụng web được xây dựng dựa trên kiến trúc của Apple App Store web. Thay vì sử dụng Svelte như bản gốc, dự án này được tái tạo lại với React và TypeScript, giữ nguyên các nguyên tắc thiết kế và tư duy kiến trúc.

### Đặc Điểm

- ✅ **Clear Architecture** - Tách biệt rõ ràng giữa business logic và UI
- ✅ **Intent-Based Routing** - Single endpoint `/api/intents` cho tất cả requests
- ✅ **Monorepo Structure** - Tổ chức code với pnpm workspaces
- ✅ **Type Safety** - TypeScript end-to-end với shared types
- ✅ **Jet Framework** - Custom framework cho routing và state management

---

## Cấu Trúc Monorepo

```
react-app-store/
├── packages/
│   ├── frontend/          # React application với Jet framework
│   │   ├── src/
│   │   │   ├── jet/       # Jet framework (Intent-based routing)
│   │   │   ├── components/
│   │   │   ├── context/
│   │   │   └── ...
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   ├── gateway/           # API Gateway (NestJS)
│   │   ├── src/
│   │   │   ├── intents/   # Intent controller & router
│   │   │   ├── guards/    # Authentication guards
│   │   │   └── interceptors/
│   │   ├── package.json
│   │   └── nest-cli.json
│   │
│   ├── backend/           # Backend services (NestJS)
│   │   ├── src/
│   │   │   ├── modules/   # Business logic modules
│   │   │   └── ...
│   │   ├── package.json
│   │   └── nest-cli.json
│   │
│   └── shared/            # Shared types & utilities
│       ├── src/
│       │   ├── types/     # Intent types, Response types
│       │   ├── logger/    # Logger implementation
│       │   ├── localization/ # i18n support
│       │   └── utils/      # Common utilities
│       ├── package.json
│       └── tsconfig.json
│
├── pnpm-workspace.yaml    # PNPM workspace configuration
├── package.json           # Root package với scripts
├── tsconfig.json          # Root TypeScript config
└── README.md              # File này
```

---

## Yêu Cầu Hệ Thống

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (recommended) hoặc npm/yarn

### Cài đặt pnpm

```bash
npm install -g pnpm
```

---

## Cài Đặt & Setup

### Bước 1: Clone Repository

```bash
git clone <repository-url>
cd react-app-store
```

### Bước 2: Install Dependencies

```bash
# Install dependencies cho tất cả packages
pnpm install
```

### Bước 3: Build Shared Package

Shared package cần được build trước vì các packages khác phụ thuộc vào nó:

```bash
pnpm --filter shared build
```

### Bước 4: Setup Environment Variables

#### Gateway Environment

```bash
cd packages/gateway
cp .env.example .env
```

Edit `packages/gateway/.env`:

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
BACKEND_SERVICE_URL=http://localhost:3002
```

#### Backend Environment

```bash
cd packages/backend
cp .env.example .env
```

Edit `packages/backend/.env`:

```env
PORT=3002
NODE_ENV=development
GATEWAY_URL=http://localhost:3001
```

### Bước 5: Verify Setup

```bash
# Type check tất cả packages
pnpm type-check

# Build shared package để verify
pnpm --filter shared build
```

---

## Chạy Dự Án

### Option 1: Start Tất Cả Services (Recommended)

```bash
pnpm dev:all
```

Lệnh này sẽ start tất cả services trong parallel mode.

### Option 2: Start Từng Service Riêng

**Terminal 1 - Gateway:**
```bash
pnpm dev:gateway
# hoặc
pnpm --filter gateway start:dev
```

**Terminal 2 - Backend:**
```bash
pnpm dev:backend
# hoặc
pnpm --filter backend start:dev
```

**Terminal 3 - Frontend:**
```bash
pnpm dev:frontend
# hoặc
pnpm --filter frontend dev
```

### Services URLs

Sau khi start, các services sẽ chạy tại:

- **Frontend**: http://localhost:3000
- **Gateway**: http://localhost:3001/api
- **Backend**: http://localhost:3002/api

### Verify Services

```bash
# Test Gateway
curl http://localhost:3001/api/intents

# Test Backend
curl http://localhost:3002/api
```

---

## Cấu Trúc Packages

### 📱 Frontend (`@react-app-store/frontend`)

React application với Jet framework cho Intent-based routing.

**Tech Stack:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Jet Framework (custom routing)

**Key Files:**
- `src/jet/Jet.ts` - Core Jet framework
- `src/jet/controllers/` - Intent controllers
- `src/jet/intents/` - Intent definitions
- `src/components/` - React components
- `src/bootstrap.ts` - Application bootstrap

**Scripts:**
```bash
pnpm --filter frontend dev          # Development server
pnpm --filter frontend build       # Production build
pnpm --filter frontend type-check  # Type checking
```

### 🚪 Gateway (`@react-app-store/gateway`)

API Gateway - single endpoint `/api/intents` cho tất cả requests.

**Tech Stack:**
- NestJS (Node.js framework)
- Intent-based routing
- Authentication & Authorization
- Request logging

**Key Files:**
- `src/intents/intents.controller.ts` - Main endpoint controller
- `src/intents/intent.mapper.ts` - Map Intent → module + function
- `src/intents/intent.router.ts` - Route to backend services
- `src/guards/auth.guard.ts` - Authentication guard

**Scripts:**
```bash
pnpm --filter gateway start:dev     # Development server
pnpm --filter gateway build         # Production build
pnpm --filter gateway start:prod    # Production server
```

**API Endpoint:**
```
POST /api/intents
GET  /api/intents?$kind=...&...
PUT  /api/intents
PATCH /api/intents
DELETE /api/intents
```

### 🔧 Backend (`@react-app-store/backend`)

Backend services - xử lý business logic.

**Tech Stack:**
- NestJS (Node.js framework)
- Module-based architecture
- TypeScript

**Key Files:**
- `src/modules/` - Business logic modules (product, search, etc.)
- `src/app.module.ts` - Main application module

**Scripts:**
```bash
pnpm --filter backend start:dev     # Development server
pnpm --filter backend build         # Production build
pnpm --filter backend start:prod    # Production server
```

**Module Structure:**
```
src/modules/
├── product/
│   ├── product.controller.ts
│   ├── product.service.ts
│   └── product.module.ts
└── search/
    ├── search.controller.ts
    ├── search.service.ts
    └── search.module.ts
```

### 📦 Shared (`@react-app-store/shared`)

Shared types và utilities được sử dụng bởi tất cả packages.

**Contents:**
- **Types**: Intent types, Response types
- **Logger**: Console logger implementation
- **Localization**: i18n support
- **Utils**: URL utilities, Optional types

**Usage:**
```typescript
import { Intent, Logger, I18N, ConsoleLoggerFactory } from '@react-app-store/shared';
```

**Scripts:**
```bash
pnpm --filter shared build          # Build package
pnpm --filter shared type-check     # Type checking
```

---

## Kiến Trúc

### Architecture Overview

```
┌─────────────────────────────────────┐
│  Frontend (React)                    │
│  - Components, Hooks, Context        │
│  - Jet Framework (Intent dispatch)   │
└─────────────────────────────────────┘
           ↓ HTTP Request
           ↓ POST /api/intents
┌─────────────────────────────────────┐
│  Gateway (NestJS)                    │
│  - Single endpoint /api/intents     │
│  - Authentication & Authorization    │
│  - Intent mapping & routing          │
└─────────────────────────────────────┘
           ↓ HTTP Request
           ↓ POST /api/{module}/{function}
┌─────────────────────────────────────┐
│  Backend (NestJS)                    │
│  - Business logic modules           │
│  - Database access                   │
│  - External API calls                │
└─────────────────────────────────────┘
```

### 4 Layers của Clear Architecture

1. **Presentation Layer** (Frontend)
   - React components
   - User interactions
   - UI rendering

2. **Application Layer** (Gateway)
   - Intent handling
   - Request routing
   - State coordination

3. **Domain Layer** (Backend)
   - Business logic
   - Models & entities
   - Business rules

4. **Infrastructure Layer** (Backend)
   - Database access
   - External services
   - API clients

### Jet Framework

Jet framework là core của frontend, xử lý Intent-based routing:

**Core Concepts:**
- **Intent**: Request để lấy data hoặc thực hiện operation
- **Action**: User interaction (click, submit, etc.)
- **Controller**: Xử lý Intent và trả về data
- **Page**: Data model đại diện cho một trang

**Flow:**
```
User Action → Action → Intent → Controller → API Gateway → Backend → Response
```

---

## Intent-Based API

### Khái Niệm

Tất cả requests đều thông qua single endpoint `/api/intents` với Intent pattern.

### Request Format

```typescript
// Frontend dispatch Intent
const response = await apiClient.dispatch({
  $kind: 'GetProductIntent',
  productId: '123',
  storefront: 'vn',
  language: 'vi-VN'
});
```

### Gateway Processing

Gateway sẽ:
1. Nhận Intent từ frontend
2. Map `$kind` → `module` + `function` (ví dụ: `GetProductIntent` → `product` + `getProduct`)
3. Route đến backend service: `POST /api/product/getProduct`
4. Wrap response và trả về frontend

### Response Format

```typescript
// Success Response
{
  success: true,
  data: { ... },
  meta: {
    module: 'product',
    function: 'getProduct',
    intent: 'GetProductIntent',
    timestamp: '2024-01-01T00:00:00.000Z'
  }
}

// Error Response
{
  success: false,
  error: {
    code: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
    module: 'product',
    function: 'getProduct'
  }
}
```

### HTTP Methods

- **GET**: Cho read-only intents (query params)
- **POST**: Cho mutations và data fetching
- **PUT/PATCH/DELETE**: Cho specific operations

### Example: Complete Flow

```typescript
// 1. Frontend - Dispatch Intent
const apiClient = new ApiClient('/api');
const response = await apiClient.dispatch({
  $kind: 'GetProductIntent',
  productId: '123'
});

// 2. Gateway - Map & Route
// IntentMapper.mapIntentToRoute() → { module: 'product', function: 'getProduct' }
// IntentRouter.dispatch() → POST http://localhost:3002/api/product/getProduct

// 3. Backend - Process
// ProductController.getProduct() → ProductService.getProduct()
// → Return product data

// 4. Gateway - Wrap Response
// Return { success: true, data: {...}, meta: {...} }

// 5. Frontend - Receive & Render
// Component receives data và update UI
```

---

## Workflow Development

### 1. Tạo Intent Mới

**Bước 1: Định nghĩa Intent type trong shared package**

```typescript
// packages/shared/src/types/intents.ts
export interface GetProductIntent extends Intent {
  $kind: 'GetProductIntent';
  productId: string;
  storefront?: string;
  language?: string;
}
```

**Bước 2: Register trong Gateway mapper**

```typescript
// packages/gateway/src/intents/intent.mapper.ts
this.routing.set('GetProductIntent', {
  module: 'product',
  function: 'getProduct'
});
```

**Bước 3: Implement Backend handler**

```typescript
// packages/backend/src/modules/product/product.controller.ts
@Post('getProduct')
async getProduct(@Body() dto: GetProductDto) {
  return this.productService.getProduct(dto);
}
```

**Bước 4: Sử dụng trong Frontend**

```typescript
// packages/frontend/src/components/ProductComponent.tsx
const response = await apiClient.dispatch({
  $kind: 'GetProductIntent',
  productId: '123'
});
```

### 2. Tạo Backend Module Mới

**Bước 1: Tạo module structure**

```bash
packages/backend/src/modules/
└── my-module/
    ├── my-module.controller.ts
    ├── my-module.service.ts
    ├── my-module.module.ts
    └── dto/
        └── my-action.dto.ts
```

**Bước 2: Implement module**

```typescript
// my-module.module.ts
@Module({
  controllers: [MyModuleController],
  providers: [MyModuleService],
})
export class MyModuleModule {}
```

**Bước 3: Register trong app.module.ts**

```typescript
// packages/backend/src/app.module.ts
@Module({
  imports: [
    // ... existing modules
    MyModuleModule,
  ],
})
```

**Bước 4: Update Gateway mapper**

```typescript
// packages/gateway/src/intents/intent.mapper.ts
this.routing.set('MyIntent', {
  module: 'my-module',
  function: 'myFunction'
});
```

### 3. Sử Dụng Shared Package

**Import từ shared package:**

```typescript
// ✅ Correct
import { Intent, Logger, I18N } from '@react-app-store/shared';

// ❌ Wrong
import { Intent } from '../shared/types/intents';
```

**Tạo Intent:**

```typescript
import { makeGetProductIntent } from '@react-app-store/shared';

const intent = makeGetProductIntent('123', {
  storefront: 'vn',
  language: 'vi-VN'
});
```

---

## Scripts Reference

### Root Level Scripts

Tất cả scripts có thể chạy từ root directory:

#### Development
```bash
pnpm dev                    # Start frontend only (default)
pnpm dev:frontend          # Start frontend development server
pnpm dev:gateway           # Start gateway development server
pnpm dev:backend           # Start backend development server
pnpm dev:all               # Start all services in parallel
```

#### Build
```bash
pnpm build                 # Build all packages
pnpm build:frontend        # Build frontend only
pnpm build:gateway         # Build gateway only
pnpm build:backend         # Build backend only
```

#### Quality Checks
```bash
pnpm lint                  # Lint all packages
pnpm type-check            # Type check all packages
```

#### Cleanup
```bash
pnpm clean                 # Remove all node_modules and dist folders
```

### Package-Specific Scripts

Chạy script của một package cụ thể:

```bash
# Syntax: pnpm --filter <package-name> <script>

# Frontend
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend type-check

# Gateway
pnpm --filter gateway start:dev
pnpm --filter gateway build
pnpm --filter gateway start:prod

# Backend
pnpm --filter backend start:dev
pnpm --filter backend build
pnpm --filter backend start:prod

# Shared
pnpm --filter shared build
pnpm --filter shared type-check
```

---

### Root Scripts

```bash
# Development
pnpm dev                    # Start frontend only
pnpm dev:frontend          # Start frontend
pnpm dev:gateway           # Start gateway
pnpm dev:backend           # Start backend
pnpm dev:all               # Start all services in parallel

# Build
pnpm build                 # Build all packages
pnpm build:frontend        # Build frontend only
pnpm build:gateway         # Build gateway only
pnpm build:backend         # Build backend only

# Lint & Type Check
pnpm lint                  # Lint all packages
pnpm type-check            # Type check all packages

# Clean
pnpm clean                 # Clean all node_modules and dist folders
```

### Package Scripts

```bash
# Frontend
pnpm --filter frontend dev
pnpm --filter frontend build
pnpm --filter frontend type-check

# Gateway
pnpm --filter gateway start:dev
pnpm --filter gateway build

# Backend
pnpm --filter backend start:dev
pnpm --filter backend build

# Shared
pnpm --filter shared build
pnpm --filter shared type-check
```

---

## Troubleshooting

### Lỗi: "Cannot find module '@react-app-store/shared'"

**Nguyên nhân:** Shared package chưa được build.

**Giải pháp:**
```bash
# Build shared package
pnpm --filter shared build

# Hoặc reinstall dependencies
pnpm install
```

### Lỗi: Port already in use

**Giải pháp:**
- Đổi port trong `.env` file của gateway/backend
- Hoặc kill process đang sử dụng port:
  ```bash
  # Windows
  netstat -ano | findstr :3001
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:3001 | xargs kill
  ```

### Lỗi: Type errors

**Giải pháp:**
```bash
# Type check tất cả packages
pnpm type-check

# Hoặc type check từng package
pnpm --filter frontend type-check
pnpm --filter gateway type-check
pnpm --filter backend type-check
pnpm --filter shared type-check
```

### Lỗi: Build shared package fails

**Nguyên nhân:** TypeScript config issues.

**Giải pháp:**
```bash
# Verify root tsconfig.json exists
ls tsconfig.json

# Rebuild shared package
cd packages/shared
pnpm build
```

### Lỗi: Gateway không connect được với Backend

**Giải pháp:**
1. Kiểm tra Backend đã chạy chưa
2. Kiểm tra `BACKEND_SERVICE_URL` trong `packages/gateway/.env`
3. Kiểm tra CORS settings trong Backend

### Lỗi: Frontend không connect được với Gateway

**Giải pháp:**
1. Kiểm tra Gateway đã chạy chưa
2. Kiểm tra proxy config trong `packages/frontend/vite.config.ts`
3. Kiểm tra CORS settings trong Gateway

---

## Cấu Hình Chi Tiết

### TypeScript Configuration

**Root `tsconfig.json`:**
- Project references cho tất cả packages
- Base compiler options

**Package `tsconfig.json`:**
- Extends root config
- Package-specific settings (lib, paths, etc.)

### Path Aliases

**Frontend:**
```typescript
// vite.config.ts
alias: {
  '~': './src',
  '@react-app-store/shared': '../shared/src'
}

// tsconfig.json
paths: {
  "~/*": ["./src/*"],
  "@react-app-store/shared": ["../shared/src"]
}
```

**Usage:**
```typescript
import { Intent } from '@react-app-store/shared';
import Component from '~/components/Component';
```

### Environment Variables

**Gateway (`packages/gateway/.env`):**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
BACKEND_SERVICE_URL=http://localhost:3002

# Authentication (optional)
JWT_SECRET=your-secret-key
AUTH_ENABLED=false
```

**Backend (`packages/backend/.env`):**
```env
PORT=3002
NODE_ENV=development
GATEWAY_URL=http://localhost:3001

# Database (when implementing)
# DATABASE_URL=postgresql://user:password@localhost:5432/appstore
```

---

## Best Practices

### 1. Intent Design

✅ **DO:**
- Use descriptive `$kind` names (e.g., `GetProductIntent`, `SearchIntent`)
- Include all necessary parameters
- Use shared Intent types from `@react-app-store/shared`

❌ **DON'T:**
- Use generic names (e.g., `GetIntent`, `PostIntent`)
- Mix concerns trong một Intent
- Create Intent types locally (use shared package)

### 2. Controller Design

✅ **DO:**
- Mỗi Controller chỉ handle một loại Intent
- Use type guards (`isXxxIntent`)
- Throw errors thay vì return null khi có lỗi
- Log đầy đủ thông tin

❌ **DON'T:**
- Mix nhiều logic trong một Controller
- Return null khi có lỗi (throw error)
- Access UI trực tiếp từ Controller

### 3. Module Organization

✅ **DO:**
- Organize by feature (product, search, user, etc.)
- Keep modules independent
- Use DTOs cho validation
- Follow NestJS conventions

❌ **DON'T:**
- Mix multiple features trong một module
- Access database trực tiếp từ controller
- Skip validation

### 4. Shared Package Usage

✅ **DO:**
- Import từ `@react-app-store/shared`
- Use shared types cho Intent definitions
- Reuse logger, i18n, utils

❌ **DON'T:**
- Duplicate code giữa packages
- Create local implementations của shared utilities
- Import bằng relative paths

---

## Tài Liệu Tham Khảo

### Architecture Documentation

- **Frontend Architecture**: [packages/frontend/ARCHITECTURE.md](./packages/frontend/ARCHITECTURE.md) - Chi tiết về kiến trúc frontend và Jet framework
- **Project Structure**: [packages/frontend/PROJECT_STRUCTURE.md](./packages/frontend/PROJECT_STRUCTURE.md) - Cấu trúc dự án chi tiết

### External Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [pnpm Workspaces](https://pnpm.io/workspaces)

---

## Roadmap

### Completed ✅
- [x] Monorepo structure setup
- [x] Frontend với Jet framework
- [x] Gateway với Intent-based API
- [x] Backend base structure
- [x] Shared package consolidation
- [x] Type safety optimization

### In Progress 🚧
- [ ] Backend modules implementation
- [ ] Authentication & Authorization
- [ ] Database integration
- [ ] API client integration trong frontend controllers

### Planned 📋
- [ ] Testing setup (Jest, Vitest)
- [ ] CI/CD pipeline
- [ ] Documentation cho từng package
- [ ] Performance optimization
- [ ] Error handling improvements

---

## License

Private project - React App Store

---

## Contributing

1. Follow the architecture principles
2. Use Intent-based pattern cho data fetching
3. Keep business logic separate from UI
4. Write type-safe code
5. Update documentation when adding features

---

**Happy Coding! 🚀**

