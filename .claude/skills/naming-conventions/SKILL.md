---
description: 提供程式碼命名規範。當用戶需要命名建議、討論命名規範、或檢查命名是否符合標準時使用。
---

# Naming Conventions

提供程式碼命名的完整規範指南。

---

## 命名風格

| 類型 | 風格 | 範例 |
|------|------|------|
| 變數 | camelCase | `userName`, `isLoading`, `cartItems` |
| 函數 | camelCase | `getUserName`, `calculateTotal` |
| 常數 | UPPER_SNAKE_CASE | `MAX_RETRY`, `API_BASE_URL` |
| 類別 | PascalCase | `UserService`, `ShoppingCart` |
| 介面 | PascalCase | `UserProps`, `IUserService` |
| 私有屬性 | _camelCase | `_internalState`, `_cache` |

---

## 函數命名

### 動詞選擇

| 動詞 | 使用時機 | 範例 |
|------|---------|------|
| `get` | 同步取得資料 | `getUserById`, `getCartTotal` |
| `set` | 設定資料 | `setUserName`, `setTheme` |
| `fetch` | 非同步取得 | `fetchUsers`, `fetchOrderHistory` |
| `create` | 建立新物件 | `createUser`, `createOrder` |
| `update` | 更新現有資料 | `updateProfile`, `updateCart` |
| `delete` / `remove` | 刪除資料 | `deleteUser`, `removeItem` |
| `is` / `has` / `can` | 布林判斷 | `isValid`, `hasPermission`, `canEdit` |
| `calculate` / `compute` | 計算 | `calculateDiscount`, `computeHash` |
| `handle` | 處理事件 | `handleClick`, `handleSubmit` |
| `validate` | 驗證 | `validateEmail`, `validateForm` |
| `format` | 格式化 | `formatDate`, `formatCurrency` |
| `parse` | 解析 | `parseJSON`, `parseQueryString` |
| `convert` / `transform` | 轉換 | `convertToUSD`, `transformData` |

---

## 變數命名

### 布林變數

| 前綴 | 使用時機 | 範例 |
|------|---------|------|
| `is` | 狀態 | `isActive`, `isLoading`, `isVisible` |
| `has` | 擁有 | `hasError`, `hasChildren`, `hasPermission` |
| `can` | 能力 | `canEdit`, `canDelete`, `canSubmit` |
| `should` | 應該 | `shouldUpdate`, `shouldRender` |

### 集合變數

| 後綴 | 使用時機 | 範例 |
|------|---------|------|
| `-s` (複數) | 陣列 | `users`, `items`, `orders` |
| `-List` | 陣列（強調） | `userList`, `itemList` |
| `-Map` | 字典/映射 | `userMap`, `idToNameMap` |

### 數值變數

| 後綴 | 使用時機 | 範例 |
|------|---------|------|
| `-Count` | 數量 | `itemCount`, `retryCount` |
| `-Total` | 總計 | `orderTotal`, `grandTotal` |
| `-Index` | 索引 | `currentIndex`, `selectedIndex` |

---

## 命名原則

### DO ✅

1. **清晰優於簡短** - `calculateUserCartTotal` 優於 `calcTotal`
2. **使用完整單字** - `button` 優於 `btn`
3. **使用領域術語** - 電商用 `cart`, `checkout`
4. **保持一致性** - 同專案用相同命名習慣

### DON'T ❌

1. **避免無意義命名** - ❌ `data`, `temp`, `foo`
2. **避免數字後綴** - ❌ `user1`, `user2`
3. **避免過度縮寫** - ❌ `usrMgr`, `btnClk`
4. **避免否定布林** - ❌ `isNotValid`
