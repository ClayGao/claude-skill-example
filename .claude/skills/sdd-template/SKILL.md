---
description: SDD (Spec-Driven Development) 規格文件模板。當需要從 Jira 票生成技術規格、撰寫 SDD 文件、或需要標準化規格格式時使用。
---

# SDD Template

提供 SDD (Spec-Driven Development) 規格文件的標準模板和生成規則。

---

## Jira 票解析規則

從 Jira 票擷取以下資訊：

| 欄位 | 用途 | 對應 SDD 區塊 |
|------|------|--------------|
| `summary` | 標題 | 文件標題 |
| `description` | 需求描述 | 需求概述 |
| `issuetype` | 類型 | 來源資訊 |
| `priority` | 優先級 | 來源資訊 |
| `assignee` | 負責人 | 來源資訊 |
| `labels` | 標籤 | 影響範圍判斷 |
| `components` | 元件 | 影響範圍判斷 |

### 驗收標準 (AC) 提取

從 `description` 中尋找：
- 以 `- [ ]` 開頭的項目
- 以 `AC:` 或 `驗收標準` 開頭的段落
- 數字列表 `1.`, `2.`, `3.`

---

## SDD 文件模板

```markdown
# [TICKET-ID] - [標題]

> 自動生成於 YYYY-MM-DD

## 需求概述

### 來源
- **Jira 票號**: [TICKET-ID]
- **類型**: [Story/Task/Bug]
- **優先級**: [High/Medium/Low]
- **負責人**: [Assignee]

### 需求描述
[從 Jira description 提取的需求說明]

### 驗收標準 (AC)
- [ ] AC1
- [ ] AC2
- [ ] AC3

---

## 技術規格

### 影響範圍

| 層級 | 影響 | 說明 |
|------|------|------|
| 前端 | ✅/❌ | [具體影響] |
| 後端 | ✅/❌ | [具體影響] |
| API  | ✅/❌ | [新增/修改的 API] |
| DB   | ✅/❌ | [Schema 變更] |

### 實作要點

#### 前端
- [ ] 要點 1
- [ ] 要點 2

#### 後端
- [ ] 要點 1
- [ ] 要點 2

### API 規格 (如適用)

\`\`\`
[METHOD] /api/endpoint
Request: { ... }
Response: { ... }
\`\`\`

---

## 測試計畫

### 單元測試
- [ ] 測試案例 1
- [ ] 測試案例 2

### 整合測試
- [ ] 測試案例 1
- [ ] 測試案例 2

### E2E 測試
- [ ] 測試案例 1
- [ ] 測試案例 2

---

## 備註
[其他需要注意的事項]
```

---

## 影響範圍判斷規則

根據 labels/components 判斷：

| 標籤/元件 | 影響範圍 |
|-----------|---------|
| `frontend`, `fe`, `ui` | 前端 ✅ |
| `backend`, `be`, `api` | 後端 ✅ |
| `database`, `db`, `schema` | DB ✅ |
| `full-stack` | 前端 ✅ 後端 ✅ |

---

## 輸出規則

1. **檔案位置**: `docs/sdd/{TICKET-ID}.md`
2. **日期格式**: `YYYY-MM-DD`
3. **缺少資訊**: 標記為 `[待補充]`
4. **編碼**: UTF-8
