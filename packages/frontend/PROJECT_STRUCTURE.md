# Cấu Trúc Dự Án

## Cây Thư Mục

```
react-app-store/
├── .cursor/                    # Cấu hình Cursor IDE
│   ├── rules.md               # Quy tắc coding
│   ├── architecture.md        # Chi tiết kiến trúc
│   ├── mcp.json              # Cấu hình MCP
│   └── README.md              # Tài liệu cấu hình Cursor
├── public/                     # Tài nguyên tĩnh
│   └── vite.svg              # Logo Vite
├── shared/                     # Modules dùng chung
│   ├── logger/               # Tiện ích logging
│   │   └── src/
│   │       └── Logger.ts     # Logger interface và implementation
│   ├── localization/         # Hỗ trợ đa ngôn ngữ (i18n)
│   │   └── src/
│   │       └── i18n.ts      # I18N class và translation
│   └── utils/                # Hàm tiện ích
│       └── src/
│           ├── url.ts       # Tiện ích xử lý URL
│           └── optional.ts  # Type Optional và utilities
├── src/                        # Mã nguồn chính
│   ├── components/           # React components
│   │   ├── pages/           # Components cho các trang
│   │   │   ├── DefaultPage.tsx    # Trang mặc định
│   │   │   └── ErrorPage.tsx     # Trang lỗi
│   │   ├── App.css          # Styles cho components (Tailwind)
│   │   ├── LoadingSpinner.tsx    # Component loading spinner
│   │   └── PageResolver.tsx       # Component resolve và render pages
│   ├── config/              # File cấu hình
│   │   └── components/
│   │       └── artwork.ts   # Cấu hình artwork profiles
│   ├── constants/           # Hằng số ứng dụng
│   │   └── storefront.ts   # Mã storefront và ngôn ngữ
│   ├── context/             # React context providers
│   │   └── AppContext.tsx   # Context cho Jet và app state
│   ├── jet/                 # Jet framework
│   │   ├── controllers/     # Intent controllers
│   │   │   └── RouteUrlController.ts  # Controller xử lý routing
│   │   ├── hooks/          # React hooks cho Jet
│   │   │   └── useJet.ts   # Hook để sử dụng Jet framework
│   │   ├── intents/        # Định nghĩa intents
│   │   │   └── RouteUrlIntent.ts     # Intent cho routing URL
│   │   ├── bootstrap.ts    # Khởi tạo Jet framework
│   │   ├── Jet.ts          # Class Jet chính
│   │   └── types.ts        # Định nghĩa types
│   ├── App.tsx              # Component gốc
│   ├── App.css              # Styles cho App (Tailwind)
│   ├── bootstrap.ts         # Khởi tạo ứng dụng
│   ├── index.css            # Styles toàn cục (Tailwind directives)
│   └── main.tsx             # Điểm vào ứng dụng
├── .eslintrc.cjs            # Cấu hình ESLint
├── .gitignore               # Quy tắc ignore Git
├── ARCHITECTURE.md          # Tài liệu kiến trúc
├── index.html               # HTML entry point
├── package.json             # Dependencies và scripts
├── postcss.config.js        # Cấu hình PostCSS (cho Tailwind)
├── PROJECT_STRUCTURE.md     # File này
├── README.md                 # Tổng quan dự án
├── SETUP.md                  # Hướng dẫn setup
├── tailwind.config.js       # Cấu hình Tailwind CSS
├── tsconfig.json            # Cấu hình TypeScript
├── tsconfig.node.json       # Cấu hình TypeScript cho Node
└── vite.config.ts           # Cấu hình Vite
```

## Các Thư Mục Chính

### `src/` - Mã Nguồn Chính

Thư mục chứa toàn bộ mã nguồn của ứng dụng.

- **components/**: React components được tổ chức theo feature/page
  - `pages/`: Các component cho từng loại trang
  - `LoadingSpinner.tsx`: Component hiển thị trạng thái loading
  - `PageResolver.tsx`: Component xử lý routing và render trang phù hợp
  - `App.css`: Styles dùng chung cho components (sử dụng Tailwind)

- **jet/**: Framework Jet (routing và state management)
  - `controllers/`: Các controller xử lý intents
  - `hooks/`: React hooks để tích hợp Jet với React
  - `intents/`: Định nghĩa các intent types
  - `bootstrap.ts`: Khởi tạo Jet framework
  - `Jet.ts`: Core class của Jet framework
  - `types.ts`: Type definitions cho Jet

- **config/**: File cấu hình cho các tính năng
  - `components/artwork.ts`: Cấu hình profiles cho artwork (kích thước, aspect ratio)

- **constants/**: Hằng số toàn cục
  - `storefront.ts`: Mã storefront và ngôn ngữ mặc định

- **context/**: React context providers
  - `AppContext.tsx`: Context cung cấp Jet và app state cho toàn bộ ứng dụng

### `shared/` - Modules Dùng Chung

Các module có thể tái sử dụng và có thể được extract ra dự án khác.

- **logger/**: Tiện ích logging
  - `Logger.ts`: Interface và implementation cho logging system

- **localization/**: Hỗ trợ đa ngôn ngữ
  - `i18n.ts`: Class xử lý translation và locale

- **utils/**: Hàm tiện ích chung
  - `url.ts`: Các hàm xử lý URL (build, parse, remove query params)
  - `optional.ts`: Type Optional và các utility functions

### `.cursor/` - Cấu Hình Cursor IDE

Cấu hình cho Cursor IDE để hỗ trợ AI tốt hơn trong việc code generation.

- `rules.md`: Quy tắc coding và guidelines
- `architecture.md`: Chi tiết về kiến trúc hệ thống
- `mcp.json`: Cấu hình MCP (Model Context Protocol)
- `README.md`: Tài liệu về cấu hình Cursor

### `public/` - Tài Nguyên Tĩnh

Thư mục chứa các file tĩnh như images, icons, fonts.

## Quy Ước Đặt Tên

### Components
- **PascalCase**: Tên component (ví dụ: `PageResolver.tsx`, `DefaultPage.tsx`)
- Mỗi component có file riêng, tên file trùng với tên component

### Utilities và Hooks
- **camelCase**: Tên file và function (ví dụ: `useJet.ts`, `getBaseUrl()`)
- Hooks bắt đầu bằng `use` (ví dụ: `useJet`, `useAppContext`)

### Types và Interfaces
- **PascalCase**: Tên type/interface (ví dụ: `Intent`, `Action`, `Page`)
- File types thường đặt tên là `types.ts` hoặc `*.types.ts`

### Constants
- **UPPER_SNAKE_CASE**: Tên constant (ví dụ: `DEFAULT_STOREFRONT`, `DEFAULT_LANGUAGE_BCP47`)

### Configuration Files
- **kebab-case**: Tên file config (ví dụ: `tailwind.config.js`, `postcss.config.js`)

## Tổ Chức Module

### Jet Framework (`src/jet/`)

Jet framework là core của ứng dụng, xử lý routing và state management.

- **intents/**: Định nghĩa các intent types
  - Intent đại diện cho một request (ví dụ: route URL, fetch data)
  - Mỗi intent có `$kind` để identify type

- **controllers/**: Xử lý business logic cho intents
  - Controller nhận intent và trả về data
  - Mỗi controller implement một hoặc nhiều intent types

- **hooks/**: React hooks để tích hợp Jet với React
  - `useJet`: Hook để access Jet instance
  - Có thể tạo thêm hooks cho các tính năng cụ thể

- **bootstrap.ts**: Khởi tạo Jet framework
  - Đăng ký intent controllers
  - Setup routing và action handlers

- **Jet.ts**: Core class của Jet framework
  - `dispatch()`: Dispatch intent và nhận kết quả
  - `perform()`: Thực thi action
  - `routeUrl()`: Route URL thành intent

### Components (`src/components/`)

Components được tổ chức theo feature và tái sử dụng.

- **pages/**: Page-level components
  - Mỗi loại page có component riêng
  - `DefaultPage`: Trang mặc định
  - `ErrorPage`: Trang hiển thị lỗi

- **Shared Components**: Components dùng chung
  - `LoadingSpinner`: Spinner loading với Tailwind
  - `PageResolver`: Component resolve và render page dựa trên page type

### Shared Modules (`shared/`)

Mỗi module là self-contained với thư mục `src/` riêng.

- **Logger** (`shared/logger/`):
  - `Logger`: Interface cho logging
  - `ConsoleLogger`: Implementation sử dụng console
  - `LoggerFactory`: Factory để tạo logger instances

- **Localization** (`shared/localization/`):
  - `I18N`: Class xử lý translation
  - Hỗ trợ multiple locales
  - Translation với placeholder replacement

- **Utils** (`shared/utils/`):
  - `url.ts`: URL manipulation utilities
  - `optional.ts`: Optional type utilities

## Styling với Tailwind CSS

Dự án sử dụng Tailwind CSS cho styling.

### Configuration Files

- **`tailwind.config.js`**: 
  - Cấu hình Tailwind theme
  - Custom colors, fonts, spacing
  - Content paths cho JIT compilation

- **`postcss.config.js`**: 
  - Cấu hình PostCSS
  - Plugin Tailwind và Autoprefixer

### CSS Files

- **`src/index.css`**: 
  - Import Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
  - Base styles cho body và root
  - Dark mode support

- **`src/App.css`**: 
  - Styles cho App component
  - Sử dụng Tailwind `@apply` directive
  - Custom animations và utilities

- **`src/components/App.css`**: 
  - Component-specific utility classes
  - `.btn-primary`, `.btn-secondary`, `.card` classes

### Usage

Trong components, sử dụng Tailwind classes trực tiếp:

```tsx
<div className="flex items-center justify-center p-4 bg-white dark:bg-gray-800">
  <button className="btn-primary">Click me</button>
</div>
```

## Luồng Dữ Liệu

### 1. Khởi Tạo Ứng Dụng

```
main.tsx
  └── App.tsx
      └── bootstrap() → Jet.load()
          └── Jet.bootstrapJet() → Register controllers
```

### 2. Routing Flow

```
User navigates
  └── Jet.routeUrl(url)
      └── RouteUrlIntent
          └── RouteUrlController.handle()
              └── Return RouterResponse
                  └── PageResolver renders page
```

### 3. Component Rendering

```
App.tsx
  └── PageResolver
      └── Check page type
          └── Render appropriate Page component
              └── DefaultPage / ErrorPage / etc.
```

## Best Practices

1. **Separation of Concerns**: Mỗi file có một responsibility rõ ràng
2. **Type Safety**: Sử dụng TypeScript cho tất cả code
3. **Reusability**: Shared modules có thể tái sử dụng
4. **Consistency**: Tuân thủ naming conventions
5. **Documentation**: JSDoc comments cho public APIs

## Mở Rộng Dự Án

### Thêm Page Type Mới

1. Tạo page component trong `src/components/pages/`
2. Define page type trong `src/jet/types.ts`
3. Thêm type guard function
4. Update `PageResolver` để handle type mới

### Thêm Intent Mới

1. Define intent type trong `src/jet/intents/`
2. Tạo controller trong `src/jet/controllers/`
3. Register controller trong `src/jet/bootstrap.ts`
4. Sử dụng `jet.dispatch()` trong components

### Thêm Shared Module

1. Tạo thư mục mới trong `shared/`
2. Tạo `src/` directory với implementation
3. Export từ `index.ts` (optional)
4. Import và sử dụng trong application
