---
description: 從 Jira 票號生成 SDD 規格文件
---

# Jira to SDD Generator

從指定的 Jira 票號取得需求，並生成 SDD (Spec-Driven Development) 規格文件。

## 使用方式

```bash
/jira-to-sdd <ticket-id>
```

**範例**：
```bash
/jira-to-sdd OSK-1234
/jira-to-sdd PROJ-567
```

---

## 執行步驟

### Step 1: 取得 Jira 票資訊

使用 Jira MCP 取得票的完整資訊：

```
mcp__mcp-atlassian__jira_get_issue
- issue_key: <使用者提供的 ticket-id>
- fields: summary,description,status,assignee,reporter,labels,priority,issuetype,components
- comment_limit: 5
```

需要解析的欄位：
- `summary`: 標題
- `description`: 需求描述（通常包含 AC）
- `labels`: 標籤（判斷前後端）
- `components`: 元件（影響範圍）
- `priority`: 優先級
- `issuetype`: 類型（Story, Task, Bug 等）

### Step 2: 分析需求

從 description 中提取：
1. **需求背景** - Why
2. **功能描述** - What
3. **驗收標準 (AC)** - 通常以 checkbox 或列表形式存在
4. **相關連結** - Figma, PRD 等

### Step 3: 生成 SDD 文件

使用以下模板生成 SDD：

---

## SDD 模板

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

```
[METHOD] /api/endpoint
Request: { ... }
Response: { ... }
```

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

## Step 4: 儲存文件

將生成的 SDD 存到：
```
docs/sdd/{TICKET-ID}.md
```

如果 `docs/sdd/` 目錄不存在，先創建。

---

## 輸出格式

完成後輸出：

```
✅ SDD 已生成

📄 檔案: docs/sdd/{TICKET-ID}.md
📝 標題: {標題}
🏷️  類型: {Story/Task/Bug}
⚡ 優先級: {High/Medium/Low}

---
[顯示完整 SDD 內容]
```

---

## 錯誤處理

1. **票號不存在**: 提示使用者確認票號
2. **無法連接 Jira**: 提示檢查 MCP 設定
3. **缺少必要欄位**: 標記為「待補充」

---

## 注意事項

- 如果 description 中沒有明確的 AC，從需求描述推導
- 技術規格需要根據 labels/components 判斷影響範圍
- 優先保持格式一致性
