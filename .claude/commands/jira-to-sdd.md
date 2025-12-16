---
description: 從 Jira 票號生成 SDD 規格文件
allowed-tools: Skill
---

# Jira to SDD Generator

從指定的 Jira 票號取得需求，並生成 SDD 規格文件。

## 使用方式

```bash
/jira-to-sdd <ticket-id>
```

## 執行步驟

1. 使用 `mcp__mcp-atlassian__jira_get_issue` 取得 Jira 票資訊
2. 使用 `sdd-template` Skill 的規範生成 SDD 文件
3. 將 SDD 存到 `docs/sdd/{TICKET-ID}.md`

## 輸出

完成後顯示生成的 SDD 摘要和檔案路徑。
