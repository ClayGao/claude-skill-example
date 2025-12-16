---
description: 根據描述生成符合命名規範的變數、函數或類別名稱
---

# 命名建議器

根據用戶描述，生成符合命名規範的名稱建議。

## 使用方式

```bash
/suggest-name <描述>
```

**範例**：
```bash
/suggest-name 計算使用者購物車總金額的函數
/suggest-name 儲存用戶登入狀態的變數
/suggest-name 處理 API 錯誤的類別
```

---

## 命名規範

### 命名風格

| 類型 | 風格 | 範例 |
|------|------|------|
| 變數 | camelCase | `userName`, `isLoading`, `cartItems` |
| 函數 | camelCase | `getUserName`, `calculateTotal` |
| 常數 | UPPER_SNAKE_CASE | `MAX_RETRY`, `API_BASE_URL` |
| 類別 | PascalCase | `UserService`, `ShoppingCart` |
| 私有屬性 | _camelCase | `_internalState`, `_cache` |

### 動詞選擇（函數）

| 動詞 | 使用時機 | 範例 |
|------|---------|------|
| `get` | 取得資料 | `getUserById`, `getCartTotal` |
| `set` | 設定資料 | `setUserName`, `setTheme` |
| `is` / `has` | 布林判斷 | `isValid`, `hasPermission` |
| `calculate` | 計算 | `calculateDiscount`, `calculateTax` |
| `fetch` | 非同步取得 | `fetchUsers`, `fetchOrderHistory` |
| `handle` | 處理事件 | `handleClick`, `handleSubmit` |
| `validate` | 驗證 | `validateEmail`, `validateForm` |
| `format` | 格式化 | `formatDate`, `formatCurrency` |
| `parse` | 解析 | `parseJSON`, `parseQueryString` |
| `convert` | 轉換 | `convertToUSD`, `convertTimezone` |

### 名詞選擇（變數）

| 前綴/後綴 | 使用時機 | 範例 |
|----------|---------|------|
| `is-` | 布林值 | `isActive`, `isLoading` |
| `has-` | 布林值（擁有） | `hasError`, `hasChildren` |
| `can-` | 布林值（能力） | `canEdit`, `canDelete` |
| `-List` / `-Array` | 陣列 | `userList`, `itemArray` |
| `-Map` / `-Dict` | 字典 | `userMap`, `configDict` |
| `-Count` | 數量 | `itemCount`, `retryCount` |
| `-Index` | 索引 | `currentIndex`, `selectedIndex` |

### 命名原則

1. **清晰優於簡短** - `calculateUserCartTotal` 優於 `calcTotal`
2. **避免縮寫** - `button` 優於 `btn`，`message` 優於 `msg`
3. **使用領域術語** - 業務相關詞彙讓程式碼更易讀
4. **保持一致性** - 同專案使用相同命名習慣
5. **避免數字後綴** - `primaryUser` 優於 `user1`

### 常見反模式

| 不好 | 較好 | 原因 |
|------|------|------|
| `data` | `userData` | 太籠統 |
| `temp` | `cachedResult` | 語意不明 |
| `flag` | `isEnabled` | 不知道 flag 代表什麼 |
| `process()` | `validateAndSubmit()` | 太模糊 |
| `doStuff()` | `syncUserData()` | 無意義 |

---

## 輸出格式

```
## 命名建議

**描述**: <用戶輸入的描述>
**類型**: 函數 / 變數 / 類別 / 常數

### 建議名稱

1. `suggestedName1` - 說明
2. `suggestedName2` - 說明
3. `suggestedName3` - 說明

### 推薦

`推薦的名稱` - 推薦原因
```
