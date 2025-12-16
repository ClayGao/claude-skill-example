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
| 介面 | PascalCase (I prefix optional) | `UserProps`, `IUserService` |
| 私有屬性 | _camelCase | `_internalState`, `_cache` |
| 環境變數 | UPPER_SNAKE_CASE | `DATABASE_URL`, `API_KEY` |

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
| `init` / `setup` | 初始化 | `initApp`, `setupDatabase` |
| `load` / `save` | 載入/儲存 | `loadConfig`, `savePreferences` |
| `show` / `hide` | 顯示/隱藏 | `showModal`, `hideTooltip` |
| `enable` / `disable` | 啟用/停用 | `enableFeature`, `disableButton` |
| `add` / `remove` | 增加/移除 | `addToCart`, `removeFromList` |
| `open` / `close` | 開啟/關閉 | `openConnection`, `closeDialog` |
| `start` / `stop` | 開始/停止 | `startTimer`, `stopPolling` |
| `subscribe` / `unsubscribe` | 訂閱/取消 | `subscribeToEvents`, `unsubscribe` |

### 函數命名模式

```
<動詞><名詞>[修飾詞]

範例：
getUserById       - get + User + ById
calculateCartTotal - calculate + Cart + Total
handleFormSubmit  - handle + Form + Submit
validateEmailFormat - validate + Email + Format
```

---

## 變數命名

### 布林變數

| 前綴 | 使用時機 | 範例 |
|------|---------|------|
| `is` | 狀態 | `isActive`, `isLoading`, `isVisible` |
| `has` | 擁有 | `hasError`, `hasChildren`, `hasPermission` |
| `can` | 能力 | `canEdit`, `canDelete`, `canSubmit` |
| `should` | 應該 | `shouldUpdate`, `shouldRender` |
| `will` | 將要 | `willChange`, `willRedirect` |
| `did` | 已經 | `didMount`, `didUpdate` |

### 集合變數

| 後綴 | 使用時機 | 範例 |
|------|---------|------|
| `-s` (複數) | 陣列 | `users`, `items`, `orders` |
| `-List` | 陣列（強調） | `userList`, `itemList` |
| `-Map` | 字典/映射 | `userMap`, `idToNameMap` |
| `-Set` | 集合 | `selectedIdSet`, `tagSet` |
| `-Queue` | 佇列 | `taskQueue`, `messageQueue` |
| `-Stack` | 堆疊 | `historyStack`, `undoStack` |

### 數值變數

| 後綴 | 使用時機 | 範例 |
|------|---------|------|
| `-Count` | 數量 | `itemCount`, `retryCount` |
| `-Index` | 索引 | `currentIndex`, `selectedIndex` |
| `-Size` / `-Length` | 大小 | `pageSize`, `maxLength` |
| `-Total` | 總計 | `orderTotal`, `grandTotal` |
| `-Min` / `-Max` | 最小/最大 | `minPrice`, `maxRetry` |
| `-Id` | 識別碼 | `userId`, `orderId` |

---

## 命名原則

### DO ✅

1. **清晰優於簡短**
   - `calculateUserCartTotal` 優於 `calcTotal`
   - `numberOfItems` 優於 `n`

2. **使用完整單字**
   - `button` 優於 `btn`
   - `message` 優於 `msg`
   - `configuration` 優於 `config`（視情況）

3. **使用領域術語**
   - 電商：`cart`, `checkout`, `inventory`
   - 金融：`transaction`, `balance`, `ledger`

4. **保持一致性**
   - 同專案用相同命名習慣
   - `getUser` 和 `fetchUser` 選一個用到底

5. **表達意圖**
   - `remainingAttempts` 優於 `count`
   - `activeUserCount` 優於 `num`

### DON'T ❌

1. **避免無意義命名**
   - ❌ `data`, `info`, `temp`, `foo`, `bar`
   - ✅ `userData`, `sessionInfo`, `cachedResult`

2. **避免數字後綴**
   - ❌ `user1`, `user2`
   - ✅ `primaryUser`, `secondaryUser`

3. **避免過度縮寫**
   - ❌ `usrMgr`, `btnClk`
   - ✅ `userManager`, `buttonClick`

4. **避免否定布林**
   - ❌ `isNotValid`, `hasNoError`
   - ✅ `isInvalid`, `isErrorFree`

5. **避免型別標註（除非必要）**
   - ❌ `userArray`, `nameString`
   - ✅ `users`, `name`

---

## 常見情境範例

### API 相關
```
fetchUserProfile
createNewOrder
updateShippingAddress
deletePaymentMethod
```

### UI 相關
```
handleButtonClick
showLoadingSpinner
hideErrorMessage
toggleSidebar
```

### 狀態相關
```
isModalOpen
hasUnsavedChanges
canUserEdit
shouldRefreshData
```

### 資料處理
```
parseResponseData
formatDisplayDate
validateUserInput
transformApiResponse
```
