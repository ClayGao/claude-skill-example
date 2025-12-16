---
description: 根據描述生成符合命名規範的變數、函數或類別名稱
allowed-tools: Task
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

## 執行流程

啟動 **naming-specialist** Agent 執行以下任務：

1. 分析用戶描述，判斷類型（函數/變數/類別/常數）
2. 使用 `naming-conventions` Skill 生成符合規範的名稱
3. 提供專業分析和推薦理由
