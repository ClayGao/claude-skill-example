---
description: 從 Jira 票號生成 SDD 規格文件
allowed-tools: Task
---

# Jira to SDD Generator

從指定的 Jira 票號取得需求，並生成 SDD 規格文件。

## 使用方式

```bash
/jira-to-sdd <ticket-id>
```

## 執行

啟動 `sdd-specialist` Agent 處理此任務。

Agent 會：
1. 從 Jira 取得票資訊
2. 分析需求並生成 SDD
3. 儲存到 `docs/sdd/{TICKET-ID}.md`
