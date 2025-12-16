---
description: 生成符合 Conventional Commits 規範的 commit message
allowed-tools: Bash(git:*)
---

# 生成 Commit Message

根據 staged changes 生成符合規範的 commit message。

## 使用方式

```bash
/gen-commit
```

---

## 執行步驟

1. 執行 `git diff --cached` 獲取 staged changes
2. 分析變更內容
3. 生成 commit message

---

## Commit Message 規範

### 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 類型

| Type | 說明 | 範例 |
|------|------|------|
| `feat` | 新功能 | feat(auth): add login page |
| `fix` | Bug 修復 | fix(cart): resolve quantity update issue |
| `docs` | 文檔變更 | docs(readme): update installation guide |
| `style` | 格式調整（不影響程式碼邏輯） | style(button): fix indentation |
| `refactor` | 重構（不是新功能也不是修復） | refactor(utils): simplify date formatting |
| `test` | 測試相關 | test(api): add unit tests for user service |
| `chore` | 建構/工具變更 | chore(deps): update dependencies |

### Scope 規則

- 使用小寫
- 簡短描述影響範圍
- 可選，但建議填寫
- 範例：`auth`, `cart`, `api`, `ui`

### Subject 規則

- 使用動詞開頭（add, fix, update, remove）
- 不超過 50 字元
- 不以句號結尾
- 使用現在式（add 而非 added）

### Body 規則

- 說明「為什麼」而非「做了什麼」
- 每行不超過 72 字元
- 可選

### Footer 規則

- Breaking Changes 以 `BREAKING CHANGE:` 開頭
- 關聯 Issue 以 `Closes #123` 格式
- 可選

---

## 範例

### 簡單變更

```
feat(button): add loading state
```

### 複雜變更

```
feat(checkout): implement multi-currency support

Add support for EUR, GBP, and JPY currencies in the checkout flow.
This enables international customers to see prices in their local currency.

BREAKING CHANGE: price field now requires currency code
Closes #456
```

---

## 輸出格式

分析完成後，直接輸出建議的 commit message：

```
建議的 Commit Message:

feat(scope): subject line here

Optional body explaining the why.

Optional footer with references.
```