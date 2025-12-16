---
description: 生成符合 Conventional Commits 規範的 commit message。當用戶需要生成 commit message、撰寫 git commit、或討論 commit 規範時使用。
---

# Commit Conventions

提供 Conventional Commits 規範的完整指南。

---

## Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

---

## Type 類型

| Type | 說明 | 使用時機 |
|------|------|---------|
| `feat` | 新功能 | 添加新的功能或能力 |
| `fix` | Bug 修復 | 修正錯誤行為 |
| `docs` | 文檔變更 | 只涉及文檔（README、註解等） |
| `style` | 格式調整 | 不影響程式碼邏輯（空格、格式化、分號等） |
| `refactor` | 重構 | 既不是新功能也不是修復的程式碼變更 |
| `test` | 測試相關 | 添加或修正測試 |
| `chore` | 建構/工具 | 建構流程、輔助工具、依賴管理等 |
| `perf` | 效能改進 | 提升效能的程式碼變更 |
| `ci` | CI 配置 | 持續整合相關變更 |
| `build` | 建構系統 | 影響建構系統或外部依賴 |
| `revert` | 還原 | 還原之前的 commit |

---

## Scope 規則

**定義**: 描述變更影響的範圍

**規則**:
- 使用小寫
- 簡短（1-2 個詞）
- 團隊統一使用

**常見範例**:
- 功能模組：`auth`, `cart`, `checkout`, `profile`
- 技術層面：`api`, `ui`, `db`, `config`
- 專案結構：`components`, `utils`, `hooks`, `types`

---

## Subject 規則

**定義**: commit 的簡短描述

**規則**:
1. 使用動詞開頭（祈使句）
2. 首字母小寫
3. 不超過 50 字元
4. 不以句號結尾
5. 使用現在式

**動詞選擇**:
| 動詞 | 使用時機 |
|------|---------|
| `add` | 新增功能、檔案、測試 |
| `remove` | 移除功能、檔案、程式碼 |
| `update` | 更新現有功能 |
| `fix` | 修復問題 |
| `refactor` | 重構程式碼 |
| `improve` | 改善效能或體驗 |
| `implement` | 實作新功能 |
| `rename` | 重新命名 |
| `move` | 移動檔案或程式碼 |

---

## Body 規則

**定義**: 詳細說明變更原因和內容

**規則**:
1. 與 subject 之間空一行
2. 每行不超過 72 字元
3. 說明「為什麼」而非「做了什麼」
4. 可使用列點

**模板**:
```
Why:
- 說明為什麼需要這個變更

What:
- 概述主要變更內容

Notes:
- 其他需要注意的事項
```

---

## Footer 規則

**定義**: 補充資訊（Breaking Changes、關聯 Issue）

### Breaking Changes

```
BREAKING CHANGE: <描述破壞性變更>
```

### 關聯 Issue

```
Closes #123
Fixes #456
Refs #789
```

---

## 完整範例

### 簡單變更

```
feat(auth): add remember me checkbox
```

### 標準變更

```
fix(cart): resolve quantity validation error

The quantity input was accepting negative values, causing
calculation errors in the checkout flow.

Fixes #234
```

### 複雜變更

```
feat(api): implement rate limiting for public endpoints

Why:
- Protect server from abuse
- Ensure fair usage for all users

What:
- Add rate limit middleware
- Configure limits per endpoint type
- Add rate limit headers to responses

BREAKING CHANGE: API responses now include X-RateLimit headers
Closes #567
```

### Breaking Change

```
refactor(config)!: migrate to new configuration format

The old YAML-based configuration is replaced with JSON schema
validated configuration files.

BREAKING CHANGE: config.yaml must be migrated to config.json
See migration guide: docs/migration-v2.md
```

---

## 判斷指南

### 如何選擇 Type？

```
是新增功能嗎？ → feat
是修復 bug 嗎？ → fix
只改文檔？ → docs
只改格式（不影響邏輯）？ → style
重構程式碼？ → refactor
添加/修改測試？ → test
改建構/工具/依賴？ → chore
```

### 需要 Body 嗎？

```
變更原因顯而易見？ → 不需要
變更複雜或有背景？ → 需要
有 Breaking Change？ → 需要
```

### 需要 Footer 嗎？

```
有關聯的 Issue？ → 加上 Closes/Fixes
有 Breaking Change？ → 加上 BREAKING CHANGE
都沒有？ → 不需要
```
