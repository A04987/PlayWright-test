# 🔍 Test Files Inconsistency Report

## ❌ พบปัญหา 3 ข้อ

### 1️⃣ **Missing baseURL Configuration**
**File:** `playwright.config.ts` (line 28)

**ปัญหา:** `baseURL` ถูก comment ไว้ แต่ Test ต้องใช้มันในการ navigate ไปที่ `/sales-area`

```typescript
// ❌ ปัจจุบัน (commented):
// baseURL: 'http://127.0.0.1:3000',

// ✅ ต้องเปิด uncomment ให้:
baseURL: 'http://127.0.0.1:3000',
```

**ผลกระทบ:**
- ทำให้ `page.goto('/sales-area')` ใช้ไม่ได้
- API requests ใน `sales-area.api.spec.ts` จะใช้ไม่ได้ด้วย
- E2E tests ล้มเหลว

---

### 2️⃣ **Frontend Application Missing**
**Test Files Affected:**
- `example.spec.ts`
- `sales-area.e2e.spec.ts`
- `sales-area.ui.spec.ts`

**ปัญหา:** Tests ต้องการหน้า UI ตรงตามนี้:

```
GET /sales-area          → List page with "สร้าง" button
GET /sales-area/create   → Form page with:
  - Input placeholder: "กรุณาระบุชื่อเขตขาย"
  - Input placeholder: "กรุณาระบุรหัสเขตขาย"
  - Button: "สร้าง" (initially disabled)
  - Button: "ยกเลิก"
  - Switch: for status
  - Success message: "สร้างเขตขายสำเร็จ"
```

**ปัจจุบันมี:**
- ✅ Backend API at `/api/sales-area`
- ❌ **ไม่มี Frontend Application**

**ต้องสร้าง:**
```
frontend/
  ├── pages/
  │   ├── sales-area/
  │   │   ├── index.html       (List page)
  │   │   └── create.html      (Create page)
  │   └── ...
  └── ...
```

---

### 3️⃣ **API Test Configuration Missing**
**File:** `sales-area.api.spec.ts` (lines 7-21)

**ปัญหา:** API tests ต้อง baseURL สำหรับ request

```typescript
// ❌ ปัจจุบัน ไม่มี baseURL
const res = await request.post('/api/sales-area', { ... })

// ✅ ต้องมี baseURL ใน playwright.config.ts
```

**ต้องแก้:**
```typescript
// playwright.config.ts
use: {
  baseURL: 'http://localhost:3000',  // ← Add this
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
},
```

---

## 📋 ข้อมูลที่ใช้ใน Tests

### Input Placeholders (ต้องตรงกับ HTML):
- ✏️ `กรุณาระบุชื่อเขตขาย`
- ✏️ `กรุณาระบุรหัสเขตขาย`

### Button Names (ต้องตรงกับ HTML):
- 🔘 `สร้าง` (Create button)
- 🔘 `ยกเลิก` (Cancel button)

### Other Elements:
- 🔘 `<switch>` element for status toggle
- ✅ Success message: `สร้างเขตขายสำเร็จ`

### API Expectations:
- 📊 POST `/api/sales-area` → Status 201
- 📊 Missing name/code → Status 400
- 📊 Response contains: `{ id, name, code, status }`

---

## ✅ Checklist to Fix

- [ ] Enable baseURL in `playwright.config.ts`
- [ ] Create Frontend Application with HTML pages
- [ ] Implement `/sales-area` list page
- [ ] Implement `/sales-area/create` form page
- [ ] Match all HTML selectors with test expectations
- [ ] Implement success message display
- [ ] Add "ยกเลิก" button functionality
- [ ] Add status switch/toggle
- [ ] Run tests to validate all connections

---

## 🚀 Recommended Action

**Priority 1:** Fix baseURL in `playwright.config.ts` (quick fix)
**Priority 2:** Create Frontend Application to match test expectations
**Priority 3:** Verify all test selectors match HTML elements
