# Beginner Guide - React App Store

Hướng dẫn chi tiết để hiểu và sử dụng dự án React App Store, được tái tạo từ Apple App Store web (Svelte) với React và áp dụng các tư duy kiến trúc tương tự.

## 📚 Mục Lục

1. [Giới Thiệu](#giới-thiệu)
2. [Kiến Trúc Tổng Quan](#kiến-trúc-tổng-quan)
3. [Các Khái Niệm Cốt Lõi](#các-khái-niệm-cốt-lõi)
4. [Luồng Hoạt Động](#luồng-hoạt-động)
5. [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
6. [Ví Dụ Thực Tế](#ví-dụ-thực-tế)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Giới Thiệu

### Dự án này là gì?

React App Store là một ứng dụng web được xây dựng dựa trên kiến trúc của Apple App Store web. Thay vì sử dụng Svelte như bản gốc, dự án này được tái tạo lại với React và TypeScript, giữ nguyên các nguyên tắc thiết kế và tư duy kiến trúc.

### Tại sao kiến trúc này?

1. **Clear Architecture**: Tách biệt rõ ràng giữa business logic và UI
2. **Testability**: Logic có thể test độc lập không cần UI
3. **Maintainability**: Dễ bảo trì và mở rộng
4. **Intent-Based**: Mọi request đều thông qua Intent, dễ trace và debug

---

## Kiến Trúc Tổng Quan

### 4 Layers của Clear Architecture

```
┌─────────────────────────────────────┐
│  Presentation Layer (React)         │
│  - Components, Hooks, Context       │
│  - UI rendering, user interactions  │
└─────────────────────────────────────┘
           ↓ (dispatch intents)
┌─────────────────────────────────────┐
│  Application Layer (Jet Framework)  │
│  - Intents, Actions, Controllers    │
│  - Routing, state coordination      │
└─────────────────────────────────────┘
           ↓ (business logic)
┌─────────────────────────────────────┐
│  Domain Layer                       │
│  - Models, Business Rules           │
│  - Page types, data structures      │
└─────────────────────────────────────┘
           ↓ (data access)
┌─────────────────────────────────────┐
│  Infrastructure Layer               │
│  - API Clients, Storage             │
│  - External services                │
└─────────────────────────────────────┘
```

### Quy Tắc Dependency

- **Presentation** → **Application** → **Domain** ← **Infrastructure**
- Layers chỉ phụ thuộc vào layers bên trong (vào trong)
- Business logic không phụ thuộc vào framework (React)

---

## Các Khái Niệm Cốt Lõi

### 1. Intent (Ý Định)

**Intent là gì?**
Intent đại diện cho một **request** (yêu cầu) để lấy dữ liệu hoặc thực hiện một hành động. Intent KHÔNG phải là action của user, mà là **message** để request data hoặc operation.

**Cấu trúc:**
```typescript
interface Intent {
  $kind: string;        // Loại intent (ví dụ: 'RouteUrlIntent', 'GetProductIntent')
  [key: string]: unknown; // Các tham số khác
}
```

**Ví dụ:**
```typescript
// Intent để route một URL
const routeIntent = {
  $kind: 'RouteUrlIntent',
  url: '/app/123'
};

// Intent để lấy thông tin product
const productIntent = {
  $kind: 'GetProductIntent',
  productId: '123'
};
```

**Khi nào dùng Intent?**
- ✅ Khi cần fetch data từ server
- ✅ Khi cần navigate (route URL)
- ✅ Khi cần thực hiện một operation (không phải user interaction trực tiếp)

### 2. Action (Hành Động)

**Action là gì?**
Action đại diện cho **user interaction** (tương tác của người dùng) như click, navigate, submit form, etc.

**Cấu trúc:**
```typescript
interface Action {
  $kind: string;        // Loại action (ví dụ: 'ClickAction', 'NavigateAction')
  [key: string]: unknown; // Các tham số khác
}
```

**Ví dụ:**
```typescript
// User click vào một app
const clickAction = {
  $kind: 'ClickAction',
  target: 'app-card',
  appId: '123'
};

// User navigate
const navigateAction = {
  $kind: 'NavigateAction',
  destination: '/app/123'
};
```

**Khi nào dùng Action?**
- ✅ Khi user click button/link
- ✅ Khi user submit form
- ✅ Khi user thực hiện bất kỳ interaction nào

**Sự khác biệt Intent vs Action:**
- **Intent**: "Tôi muốn lấy dữ liệu X" (request data)
- **Action**: "User đã click vào Y" (user interaction)

### 3. Controller (Bộ Điều Khiển)

**Controller là gì?**
Controller là nơi xử lý Intent. Mỗi Intent type sẽ có một Controller tương ứng để xử lý logic và trả về data.

**Cấu trúc:**
```typescript
class MyController {
  async handle(intent: Intent): Promise<SomeData> {
    // Xử lý intent
    // Fetch data, tính toán, etc.
    return data;
  }
}
```

**Ví dụ:**
```typescript
class RouteUrlController {
  async handle(intent: Intent): Promise<RouterResponse | null> {
    if (!isRouteUrlIntent(intent)) {
      return null;
    }
    
    // Parse URL và trả về routing response
    const url = new URL(intent.url);
    // ... routing logic
    
    return {
      intent: { $kind: 'ProductPageIntent', appId: '123' },
      action: { $kind: 'FlowAction', ... },
      storefront: 'vn',
      language: 'vi-VN'
    };
  }
}
```

**Luồng xử lý:**
1. Component dispatch Intent
2. Jet framework tìm Controller phù hợp
3. Controller xử lý và trả về data
4. Component nhận data và render

### 4. Page (Trang)

**Page là gì?**
Page là data model đại diện cho một trang trong ứng dụng. Mỗi page có type và data riêng.

**Cấu trúc:**
```typescript
interface Page {
  canonicalURL?: string;    // URL của trang
  pageType?: string;        // Loại trang (product, home, search, etc.)
  [key: string]: unknown;    // Các field khác tùy loại page
}
```

**Ví dụ:**
```typescript
// Product page
const productPage: Page = {
  canonicalURL: '/app/123',
  pageType: 'product',
  product: {
    id: '123',
    name: 'My App',
    // ...
  }
};

// Home page
const homePage: Page = {
  canonicalURL: '/',
  pageType: 'home',
  shelves: [...]
};
```

### 5. Jet Framework

**Jet là gì?**
Jet là framework core quản lý routing và state coordination. Nó đóng vai trò trung gian giữa UI (React) và business logic.

**Các method chính:**
```typescript
class Jet {
  // Dispatch một intent để lấy data
  async dispatch(intent: Intent): Promise<unknown>
  
  // Perform một action (user interaction)
  async perform(action: Action): Promise<ActionOutcome>
  
  // Route URL thành intent và trả về RouterResponse
  async routeUrl(url: string): Promise<RouterResponse | null>
  
  // Đăng ký intent handler
  onIntent(kind: string, handler: Function): void
  
  // Đăng ký action handler
  onAction(kind: string, handler: Function): void
}
```

---

## Luồng Hoạt Động

### 1. Application Bootstrap (Khởi Tạo Ứng Dụng)

**Khi app khởi động:**

```
1. main.tsx renders App component
   ↓
2. App.tsx calls useBootstrap()
   ↓
3. useBootstrap() calls bootstrap()
   ↓
4. bootstrap() function:
   - Tạo Jet instance
   - Đăng ký các Controllers (bootstrapJet)
   - Route initial URL
   - Tạo AppContext với dependencies
   ↓
5. AppContext được provide cho toàn bộ app
   ↓
6. PageResolver render page dựa trên routing result
```

**Code flow:**
```typescript
// src/App.tsx
function App() {
  const { bootstrapResult, isInitialized, error } = useBootstrap();
  // ...
  return (
    <AppProvider context={bootstrapResult.context}>
      <PageResolver />
    </AppProvider>
  );
}

// src/jet/hooks/useJet.ts
export function useBootstrap() {
  useEffect(() => {
    const result = await bootstrap({
      initialUrl: window.location.href,
      fetch: window.fetch.bind(window),
    });
    // ...
  }, []);
}
```

### 2. Routing Flow (Luồng Điều Hướng)

**Khi user navigate hoặc app load:**

```
1. URL được parse (ví dụ: /app/123)
   ↓
2. Jet.routeUrl(url) được gọi
   ↓
3. RouteUrlIntent được tạo và dispatch
   ↓
4. RouteUrlController.handle() được gọi
   ↓
5. Controller parse URL và trả về RouterResponse:
   {
     intent: ProductPageIntent,
     action: FlowAction,
     storefront: 'vn',
     language: 'vi-VN'
   }
   ↓
6. RouterResponse được trả về cho PageResolver
   ↓
7. PageResolver dispatch ProductPageIntent để lấy page data
   ↓
8. Page component render với data
```

**Code example:**
```typescript
// User navigates to /app/123
const routing = await jet.routeUrl('/app/123');

// Routing returns:
{
  intent: { $kind: 'ProductPageIntent', appId: '123' },
  action: { $kind: 'FlowAction', destination: {...} },
  storefront: 'vn',
  language: 'vi-VN'
}

// Then dispatch ProductPageIntent to get page data
const pageData = await jet.dispatch({
  $kind: 'ProductPageIntent',
  appId: '123'
});
```

### 3. Data Fetching Flow (Luồng Lấy Dữ Liệu)

**Khi component cần data:**

```
1. Component gọi jet.dispatch(intent)
   ↓
2. Jet tìm Controller phù hợp với intent.$kind
   ↓
3. Controller.handle(intent) được gọi
   ↓
4. Controller có thể:
   - Fetch từ API
   - Tính toán
   - Lấy từ cache
   - Combine nhiều sources
   ↓
5. Controller trả về data
   ↓
6. Component nhận data và update state
   ↓
7. Component re-render với data mới
```

**Code example:**
```typescript
// In a component
const { context } = useAppContext();
const jet = context.jet;

useEffect(() => {
  async function loadData() {
    try {
      const data = await jet.dispatch({
        $kind: 'GetProductIntent',
        productId: '123'
      });
      setProduct(data);
    } catch (error) {
      setError(error);
    }
  }
  loadData();
}, []);
```

### 4. User Interaction Flow (Luồng Tương Tác Người Dùng)

**Khi user click/interact:**

```
1. User click button/link
   ↓
2. Event handler tạo Action
   ↓
3. Component gọi jet.perform(action)
   ↓
4. Jet tìm Action handler phù hợp
   ↓
5. Action handler có thể:
   - Dispatch Intent để lấy data mới
   - Update state
   - Navigate (tạo RouteUrlIntent)
   ↓
6. Action handler trả về 'performed' hoặc 'unsupported'
   ↓
7. Component có thể update UI dựa trên kết quả
```

**Code example:**
```typescript
// In a component
const handleClick = async () => {
  const outcome = await jet.perform({
    $kind: 'ClickAction',
    target: 'app-card',
    appId: '123'
  });
  
  if (outcome === 'performed') {
    // Action was handled successfully
    // Maybe navigate or update UI
  }
};
```

---

## Hướng Dẫn Sử Dụng

### 1. Tạo Intent Mới

**Bước 1: Định nghĩa Intent type**

Tạo file `src/jet/intents/GetProductIntent.ts`:
```typescript
import type { Intent } from '../types';

export interface GetProductIntent extends Intent {
  $kind: 'GetProductIntent';
  productId: string;
}

export function isGetProductIntent(intent: Intent): intent is GetProductIntent {
  return intent.$kind === 'GetProductIntent';
}

export function makeGetProductIntent(productId: string): GetProductIntent {
  return {
    $kind: 'GetProductIntent',
    productId,
  };
}
```

**Bước 2: Tạo Controller**

Tạo file `src/jet/controllers/GetProductController.ts`:
```typescript
import type { Intent } from '../types';
import { isGetProductIntent } from '../intents/GetProductIntent';

export class GetProductController {
  async handle(intent: Intent): Promise<Product | null> {
    if (!isGetProductIntent(intent)) {
      return null;
    }
    
    // Fetch product data (from API, cache, etc.)
    const product = await fetchProduct(intent.productId);
    return product;
  }
}

async function fetchProduct(id: string): Promise<Product> {
  // Your API call here
  const response = await fetch(`/api/products/${id}`);
  return response.json();
}
```

**Bước 3: Đăng ký Controller**

Trong `src/jet/bootstrap.ts`:
```typescript
import { GetProductController } from './controllers/GetProductController';

export function bootstrapJet(jet: Jet): void {
  // ... existing controllers
  
  const getProductController = new GetProductController();
  
  jet.onIntent('GetProductIntent', async (intent) => {
    return getProductController.handle(intent);
  });
}
```

**Bước 4: Sử dụng trong Component**

```typescript
import { useJet } from '../context/AppContext';

function ProductComponent({ productId }: { productId: string }) {
  const jet = useJet();
  const [product, setProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    async function loadProduct() {
      const data = await jet.dispatch({
        $kind: 'GetProductIntent',
        productId,
      });
      setProduct(data as Product);
    }
    loadProduct();
  }, [productId, jet]);
  
  if (!product) return <LoadingSpinner />;
  
  return <div>{product.name}</div>;
}
```

### 2. Tạo Action Mới

**Bước 1: Định nghĩa Action type**

Tạo file `src/jet/actions/ClickAppAction.ts`:
```typescript
import type { Action } from '../types';

export interface ClickAppAction extends Action {
  $kind: 'ClickAppAction';
  appId: string;
}

export function makeClickAppAction(appId: string): ClickAppAction {
  return {
    $kind: 'ClickAppAction',
    appId,
  };
}
```

**Bước 2: Tạo Action Handler**

Trong `src/jet/bootstrap.ts`:
```typescript
export function bootstrapJet(jet: Jet): void {
  // ... existing handlers
  
  jet.onAction('ClickAppAction', async (action) => {
    const { appId } = action as ClickAppAction;
    
    // Navigate to product page
    const routing = await jet.routeUrl(`/app/${appId}`);
    
    // Or dispatch intent to load data
    // const product = await jet.dispatch({
    //   $kind: 'GetProductIntent',
    //   productId: appId
    // });
    
    return 'performed';
  });
}
```

**Bước 3: Sử dụng trong Component**

```typescript
import { useJet } from '../context/AppContext';

function AppCard({ appId }: { appId: string }) {
  const jet = useJet();
  
  const handleClick = async () => {
    await jet.perform({
      $kind: 'ClickAppAction',
      appId,
    });
  };
  
  return (
    <div onClick={handleClick}>
      {/* App card content */}
    </div>
  );
}
```

### 3. Tạo Page Type Mới

**Bước 1: Định nghĩa Page type**

Tạo file `src/types/pages.ts`:
```typescript
import type { Page } from '../jet/types';

export interface ProductPage extends Page {
  pageType: 'product';
  product: {
    id: string;
    name: string;
    description: string;
    // ...
  };
}

export function isProductPage(page: Page): page is ProductPage {
  return page.pageType === 'product';
}
```

**Bước 2: Tạo Page Component**

Tạo file `src/components/pages/ProductPage.tsx`:
```typescript
import type { Page } from '../../jet/types';
import { isProductPage } from '../../types/pages';

interface ProductPageProps {
  page: Page;
}

export default function ProductPage({ page }: ProductPageProps) {
  if (!isProductPage(page)) {
    return <ErrorPage error={new Error('Invalid page type')} />;
  }
  
  return (
    <div>
      <h1>{page.product.name}</h1>
      <p>{page.product.description}</p>
      {/* ... */}
    </div>
  );
}
```

**Bước 3: Update PageResolver**

Trong `src/components/PageResolver.tsx`:
```typescript
import ProductPage from './pages/ProductPage';
import DefaultPage from './pages/DefaultPage';

export default function PageResolver() {
  const { context } = useAppContext();
  const jet = useJet();
  const [page, setPage] = useState<Page | null>(null);
  
  useEffect(() => {
    async function loadPage() {
      // Dispatch intent to get page data
      const pageData = await jet.dispatch({
        $kind: 'GetProductPageIntent',
        url: window.location.href,
      });
      setPage(pageData as Page);
    }
    loadPage();
  }, [jet, context]);
  
  if (!page) return <LoadingSpinner />;
  
  // Route to appropriate page component
  switch (page.pageType) {
    case 'product':
      return <ProductPage page={page} />;
    default:
      return <DefaultPage page={page} />;
  }
}
```

### 4. Sử Dụng Context (AppContext)

**Access Context trong Component:**

```typescript
import { useAppContext, useJet } from '../context/AppContext';

function MyComponent() {
  // Get full context
  const { context } = useAppContext();
  
  // Access specific values
  const { jet, logger, i18n, storefront, language } = context;
  
  // Or use convenience hook
  const jet = useJet();
  
  // Use logger
  logger.info('Component mounted');
  
  // Use i18n
  const text = i18n.translate('welcome.message', { name: 'User' });
  
  // Use jet
  const data = await jet.dispatch({ $kind: 'SomeIntent' });
}
```

### 5. Error Handling

**Error Boundary:**

App đã có `ErrorBoundary` wrapper. Bất kỳ error nào trong React component tree sẽ được catch:

```typescript
// src/App.tsx
<ErrorBoundary>
  <AppProvider context={context}>
    {/* Your components */}
  </AppProvider>
</ErrorBoundary>
```

**Error trong Intent:**

```typescript
// In Controller
export class MyController {
  async handle(intent: Intent): Promise<Data> {
    try {
      // Your logic
      return data;
    } catch (error) {
      // Log error
      logger.error('Error in MyController', error);
      // Re-throw để component có thể handle
      throw error;
    }
  }
}

// In Component
useEffect(() => {
  async function loadData() {
    try {
      const data = await jet.dispatch({ $kind: 'MyIntent' });
      setData(data);
    } catch (error) {
      // Handle error
      setError(error);
    }
  }
  loadData();
}, []);
```

---

## Ví Dụ Thực Tế

### Ví Dụ 1: Tạo Search Feature

**1. Intent:**
```typescript
// src/jet/intents/SearchIntent.ts
export interface SearchIntent extends Intent {
  $kind: 'SearchIntent';
  query: string;
}
```

**2. Controller:**
```typescript
// src/jet/controllers/SearchController.ts
export class SearchController {
  async handle(intent: Intent): Promise<SearchResults> {
    if (!isSearchIntent(intent)) return null;
    
    // Search logic
    const results = await searchAPI(intent.query);
    return results;
  }
}
```

**3. Component:**
```typescript
function SearchPage() {
  const jet = useJet();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  
  const handleSearch = async () => {
    const results = await jet.dispatch({
      $kind: 'SearchIntent',
      query,
    });
    setResults(results as SearchResults);
  };
  
  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {/* Display results */}
    </div>
  );
}
```

### Ví Dụ 2: Navigation với Action

```typescript
function NavigationLink({ to, children }: { to: string; children: ReactNode }) {
  const jet = useJet();
  
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    await jet.perform({
      $kind: 'NavigateAction',
      destination: to,
    });
    
    // Or directly route
    const routing = await jet.routeUrl(to);
    // Handle routing result
  };
  
  return <a href={to} onClick={handleClick}>{children}</a>;
}
```

---

## Best Practices

### 1. Intent vs Action

**✅ Dùng Intent khi:**
- Cần fetch data
- Cần thực hiện operation (không phải user interaction)
- Cần route URL

**✅ Dùng Action khi:**
- User click/interact
- User submit form
- User navigate (từ UI)

### 2. Controller Design

**✅ DO:**
- Mỗi Controller chỉ handle một loại Intent
- Sử dụng type guards (`isXxxIntent`)
- Throw error thay vì return null khi có lỗi
- Log đầy đủ thông tin

**❌ DON'T:**
- Mix nhiều logic trong một Controller
- Return null khi có lỗi (throw error thay vào đó)
- Access UI trực tiếp từ Controller

### 3. Component Design

**✅ DO:**
- Sử dụng `useJet()` để access Jet
- Sử dụng `useAppContext()` để access context
- Handle errors properly
- Use loading states

**❌ DON'T:**
- Tạo Jet instance mới trong component
- Access dependencies trực tiếp (luôn qua context)
- Ignore errors

### 4. Type Safety

**✅ DO:**
- Sử dụng type guards
- Define interfaces cho Intent/Action
- Use TypeScript strict mode

**❌ DON'T:**
- Use `any` type
- Skip type checking

### 5. Error Handling

**✅ DO:**
- Wrap components với ErrorBoundary
- Try-catch trong async functions
- Log errors properly
- Show user-friendly error messages

**❌ DON'T:**
- Ignore errors
- Show technical errors to users

---

## Troubleshooting

### Lỗi: "No handler registered for intent: XxxIntent"

**Nguyên nhân:** Intent chưa được đăng ký trong `bootstrapJet()`.

**Giải pháp:**
1. Kiểm tra `src/jet/bootstrap.ts`
2. Đảm bảo đã đăng ký handler:
```typescript
jet.onIntent('XxxIntent', async (intent) => {
  return controller.handle(intent);
});
```

### Lỗi: "useAppContext must be used within AppProvider"

**Nguyên nhân:** Component đang sử dụng `useAppContext()` bên ngoài `AppProvider`.

**Giải pháp:**
Đảm bảo component nằm trong `<AppProvider>`:
```typescript
<AppProvider context={context}>
  <YourComponent /> {/* OK */}
</AppProvider>

<YourComponent /> {/* ERROR - outside AppProvider */}
```

### Lỗi: "Intent handler already registered"

**Nguyên nhân:** Đăng ký handler nhiều lần cho cùng một Intent.

**Giải pháp:**
Kiểm tra `bootstrapJet()` - chỉ đăng ký một lần.

### Component không re-render sau khi dispatch Intent

**Nguyên nhân:** State không được update sau khi nhận data.

**Giải pháp:**
```typescript
// ❌ WRONG
const data = await jet.dispatch(intent);
// Component không re-render

// ✅ CORRECT
const [data, setData] = useState(null);
useEffect(() => {
  async function load() {
    const result = await jet.dispatch(intent);
    setData(result); // Update state
  }
  load();
}, []);
```

### Type errors với Intent/Action

**Nguyên nhân:** Type không match.

**Giải pháp:**
Sử dụng type guards và factory functions:
```typescript
// ✅ GOOD
const intent = makeGetProductIntent('123');
if (isGetProductIntent(intent)) {
  // Type-safe here
}

// ❌ BAD
const intent: Intent = { $kind: 'GetProductIntent', productId: '123' };
// No type safety
```

---

## Tóm Tắt

### Quy Tắc Vàng

1. **Intent cho data, Action cho interaction**
2. **Luôn dispatch Intent qua Jet, không gọi API trực tiếp**
3. **Controller xử lý logic, Component chỉ render**
4. **Sử dụng Context để access dependencies**
5. **Type safety everywhere**

### Workflow Phát Triển

1. **Define Intent/Action type** → Tạo file trong `intents/` hoặc `actions/`
2. **Create Controller** → Tạo file trong `controllers/`
3. **Register handler** → Thêm vào `bootstrapJet()`
4. **Use in Component** → Dispatch Intent hoặc perform Action
5. **Test** → Verify flow hoạt động đúng

### Tài Liệu Tham Khảo

- `ARCHITECTURE.md` - Chi tiết về kiến trúc
- `PROJECT_STRUCTURE.md` - Cấu trúc dự án
- Source code trong `src/jet/` - Implementation examples

---

**Chúc bạn code vui vẻ! 🚀**

Nếu có câu hỏi, hãy xem code examples trong `src/jet/` hoặc đọc `ARCHITECTURE.md` để hiểu sâu hơn.

