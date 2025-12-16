# Skills 深入解析

> 進階指南：如何設計高效的 Claude Code Skills

---

## Skills 運作原理

### 載入機制

```
用戶輸入 → Claude 分析意圖 → 匹配 Skill description → 載入相關 Skill → 執行任務
```

**關鍵**：`description` 是 Claude 判斷是否載入 Skill 的唯一依據。

### 載入時機

| 情況 | 是否載入 |
|------|---------|
| description 匹配用戶意圖 | ✅ 自動載入 |
| 被 Command 明確引用 | ✅ 載入 |
| 被 Agent 使用 Skill tool 調用 | ✅ 載入 |
| description 不匹配 | ❌ 不載入 |

---

## Description 最佳實踐

### 好的 Description

```yaml
---
description: 生成符合 Conventional Commits 規範的 commit message。當用戶需要生成 commit message、撰寫 git commit、或討論 commit 規範時使用。
---
```

**為什麼好**：
- 明確說明功能
- 列出觸發關鍵字
- 涵蓋相關使用場景

### 不好的 Description

```yaml
---
description: Commit 相關
---
```

**為什麼不好**：
- 太模糊
- 缺乏觸發關鍵字
- Claude 難以判斷何時載入

---

## Skills 設計模式

### 模式 1: 規範型 Skill

**用途**: 提供標準和規範

**結構**:
```markdown
---
description: ...
---

# 規範名稱

## 格式規範
## 範例
## 常見錯誤
```

**適用場景**: Commit 規範、程式碼風格、API 設計

### 模式 2: 模板型 Skill

**用途**: 提供可填充的模板

**結構**:
```markdown
---
description: ...
---

# 模板名稱

## 模板
\`\`\`
[模板內容，含佔位符]
\`\`\`

## 欄位說明
## 填寫範例
```

**適用場景**: PR 描述、Issue 模板、文檔結構

### 模式 3: 決策型 Skill

**用途**: 提供決策指引

**結構**:
```markdown
---
description: ...
---

# 決策指引

## 決策樹
## 情況 A → 方案 A
## 情況 B → 方案 B
## 邊界案例
```

**適用場景**: 技術選型、架構決策、錯誤處理策略

### 模式 4: 知識型 Skill

**用途**: 提供領域知識

**結構**:
```markdown
---
description: ...
---

# 領域知識

## 核心概念
## 術語解釋
## 常見問題
## 參考資源
```

**適用場景**: 框架使用、API 整合、業務邏輯

---

## Token 優化策略

### 策略 1: 精簡內容

**Before** (高 Token):
```markdown
## 說明
Conventional Commits 是一種 commit message 的規範。這個規範的目的是為了讓 commit message 更加清晰易懂，方便團隊協作和自動化工具處理。使用這個規範可以讓你的 commit 歷史更加整潔...
```

**After** (低 Token):
```markdown
## Conventional Commits 規範
標準化 commit message 格式，提升可讀性和自動化支援。
```

### 策略 2: 使用表格

**Before** (高 Token):
```markdown
feat 表示新功能，用於添加新的功能或能力。
fix 表示 Bug 修復，用於修正錯誤行為。
docs 表示文檔變更，只涉及文檔的修改。
```

**After** (低 Token):
```markdown
| Type | 說明 |
|------|------|
| feat | 新功能 |
| fix | Bug 修復 |
| docs | 文檔變更 |
```

### 策略 3: 按需拆分

將大型 Skill 拆分為多個小 Skill：

```
skills/
├── commit-conventions/      # 基礎規範
├── commit-examples/         # 進階範例（按需載入）
└── commit-troubleshooting/  # 常見問題（按需載入）
```

---

## Skills vs 其他元件

### Skills vs CLAUDE.md

| 比較 | Skills | CLAUDE.md |
|------|--------|-----------|
| 載入時機 | 按需 | 總是 |
| 範圍 | 特定任務 | 全域設定 |
| 可分享 | 是 | 通常不 |
| Token 影響 | 低 | 中 |

**指引**：
- 全域規則 → CLAUDE.md
- 特定任務知識 → Skills

### Skills vs Agents

| 比較 | Skills | Agents |
|------|--------|--------|
| 角色 | 知識提供者 | 任務執行者 |
| 主動性 | 被動 | 主動 |
| 複雜度 | 低 | 高 |
| Token 消耗 | 中 | 高 |

**指引**：
- 提供規範/模板 → Skills
- 執行複雜任務 → Agents
- 兩者可配合使用

### Skills vs Commands

| 比較 | Skills | Commands |
|------|--------|----------|
| 觸發方式 | 自動/被調用 | 明確觸發 |
| 用途 | 提供知識 | 定義任務 |
| 結構 | SKILL.md | command.md |

**指引**：
- 定義「做什麼」→ Commands
- 提供「怎麼做的知識」→ Skills

---

## 常見問題

### Q: Skill 沒有被載入？

**可能原因**：
1. description 不夠明確
2. 用戶意圖與 description 不匹配
3. 檔案位置不正確

**解決方案**：
1. 優化 description，加入更多觸發關鍵字
2. 在 Command 或 Agent 中明確引用 Skill

### Q: Skill 內容太長？

**解決方案**：
1. 拆分為多個 Skill
2. 使用表格替代長文
3. 移除冗餘說明

### Q: 多個 Skill 衝突？

**解決方案**：
1. 確保 description 區分明確
2. 使用更具體的觸發條件
3. 考慮合併相關 Skill

---

## 進階技巧

### 技巧 1: 條件式內容

```markdown
## 根據專案類型選擇

### 如果是 Frontend 專案
- scope 使用: components, pages, hooks, utils

### 如果是 Backend 專案
- scope 使用: api, services, models, middleware
```

### 技巧 2: 引用外部資源

```markdown
## 參考資源

- [官方規範](https://www.conventionalcommits.org/)
- 專案特定規則：參考 `.commitlintrc.js`
```

### 技巧 3: 可執行範例

```markdown
## 驗證 Commit Message

執行以下命令驗證格式：
\`\`\`bash
echo "feat(auth): add login" | npx commitlint
\`\`\`
```

---

## 總結

| 要點 | 說明 |
|------|------|
| Description 是關鍵 | 決定 Skill 是否被載入 |
| 保持精簡 | 減少 Token 消耗 |
| 專注單一任務 | 提高重用性 |
| 提供具體範例 | 比抽象描述更有效 |
| 配合其他元件 | Skills + Commands + Agents |
