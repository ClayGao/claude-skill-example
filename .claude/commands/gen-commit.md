---
description: 生成符合 Conventional Commits 規範的 commit message
allowed-tools: Task
---

# 生成 Commit Message

根據 staged changes 生成符合規範的 commit message。

## 使用方式

```bash
/gen-commit
```

---

## 執行流程

啟動 **commit-specialist** Agent 執行以下任務：

1. 獲取 staged changes
2. 分析變更內容和影響範圍
3. 使用 `commit-conventions` Skill 生成規範的 commit message
4. 輸出建議的 commit message
