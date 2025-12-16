---
description: 生成符合 Conventional Commits 規範的 commit message
allowed-tools: Bash(git:*), Skill
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
2. 使用 `commit-conventions` Skill 的規範分析變更
3. 生成 commit message

---

## 輸出格式

```
建議的 Commit Message:

<生成的 commit message>
```
