# Claude Skill Example

> 展示 Claude Code Skills 的最佳實踐與三種架構比較

---

## 專案目的

這個專案展示 Claude Code 的三種架構模式，幫助團隊理解：

1. **Token 消耗差異** - 不同架構的 Token 使用量
2. **最佳使用時機** - 什麼情況用什麼架構
3. **Skills 的威力** - 如何用 Skills 減少重複 prompt

---

## 快速開始

本專案使用 **三個分支** 展示不同架構：

```bash
# 複製專案
git clone https://github.com/ClayGao/claude-skill-example.git
cd claude-skill-example

# 切換到想要體驗的分支
git checkout demo/1-command-only      # 架構一
git checkout demo/2-command-skill     # 架構二
git checkout demo/3-command-agent-skill # 架構三
```

---

## Demo 指南

### 主題：Jira to SDD Generator `/jira-to-sdd`

從 Jira 票號取得需求，自動生成 SDD (Spec-Driven Development) 規格文件。

```bash
# 使用方式
/jira-to-sdd OSK-1234
```

輸出範例：
```
docs/sdd/OSK-1234.md
├── 需求概述（來源、描述、AC）
├── 技術規格（影響範圍、實作要點）
└── 測試計畫（單元/整合/E2E）
```

---

## 分支一：Command Only

```bash
git checkout demo/1-command-only
```

### 結構
```
.claude/
└── commands/
    └── jira-to-sdd.md    # ~150 行，包含完整 SDD Template
```

### 特點
- 所有邏輯都寫在 Command 中（MCP 調用 + SDD 模板）
- 每次執行都載入完整內容（~1500 tokens）
- 適合簡單、一次性任務

### Demo 重點
打開 `commands/jira-to-sdd.md` 給觀眾看，展示：
- 完整的 SDD Template 嵌入其中
- Jira MCP 調用說明
- **缺點**：每次執行都消耗大量 token

---

## 分支二：Command + Skill

```bash
git checkout demo/2-command-skill
```

### 結構
```
.claude/
├── commands/
│   └── jira-to-sdd.md           # ~25 行，只有觸發邏輯
└── skills/
    └── sdd-template/
        └── SKILL.md             # ~120 行，完整 SDD 模板
```

### 特點
- Command 只負責觸發和指定票號
- SDD 模板抽取到 Skill，可跨專案共享
- 重複執行時 Skill 已在 context（~800 tokens）

### Demo 重點
對比兩個檔案：
1. `commands/jira-to-sdd.md` - 只有 25 行
2. `skills/sdd-template/SKILL.md` - 完整模板

**重點展示**：Skill 的 `description` 如何讓 Claude 自動載入

---

## 分支三：Command + Agent + Skill

```bash
git checkout demo/3-command-agent-skill
```

### 結構
```
.claude/
├── commands/
│   └── jira-to-sdd.md           # ~20 行，最精簡
├── agents/
│   └── sdd-specialist.md        # ~80 行，SDD 專家
└── skills/
    └── sdd-template/
        └── SKILL.md             # ~120 行，SDD 模板
```

### 特點
- Command 只編排流程
- Agent 負責專業分析（知道用 Jira MCP）
- Agent **強制使用** Skill 確保格式一致
- 輸出最專業、最標準化

### Demo 重點
打開 `agents/sdd-specialist.md`，展示：
```markdown
tools:
  - mcp__mcp-atlassian__jira_get_issue
  - Skill
  - Write
```
以及 Agent 如何被指示「必須使用 sdd-template Skill」

---

## 三種架構比較

| 架構 | 檔案數 | Token 消耗 | 可維護性 | 適用場景 |
|------|-------|-----------|---------|---------|
| Command Only | 1 | ~1500/次 | 低 | 簡單任務、一次性使用 |
| Command + Skill | 2 | ~800/次* | 中 | 需要模板的任務 |
| Command + Agent + Skill | 3 | ~1000/次* | 高 | 複雜任務、需要專業判斷 |

> *重複執行時，Skill 已在 context 中，消耗更低

### 為什麼 Skill 能節省 Token？

```
┌─────────────────────────────────────────────────────────┐
│  Command Only: 每次載入完整內容                           │
│  ████████████████████████████████████ 1500 tokens      │
├─────────────────────────────────────────────────────────┤
│  Command + Skill: Skill 按需載入                         │
│  首次: ██████████████████████████ 800 tokens            │
│  重複: ████████████ 400 tokens (Skill 已在 context)     │
├─────────────────────────────────────────────────────────┤
│  Command + Agent + Skill: 職責分離                       │
│  首次: ██████████████████████████████ 1000 tokens       │
│  重複: ████████████████ 500 tokens                      │
│  優點: Agent 保證格式一致，Skill 可被強制使用              │
└─────────────────────────────────────────────────────────┘
```

---

## Demo 建議流程

### 1. 漸進式展示（10 分鐘）

```bash
# Step 1: 展示 Command Only
git checkout demo/1-command-only
# 打開 command 給觀眾看（~150 行全在裡面）

# Step 2: 展示 Command + Skill
git checkout demo/2-command-skill
# 打開 command（25 行）和 skill（120 行）
# 重點：description 如何觸發 Skill

# Step 3: 展示 Command + Agent + Skill
git checkout demo/3-command-agent-skill
# 展示 Agent 如何強制使用 Skill
```

### 2. 實際執行（5 分鐘）

```bash
# 準備一個真實的 Jira 票號
/jira-to-sdd OSK-1234

# 展示生成的 SDD 文件
cat docs/sdd/OSK-1234.md
```

### 3. 架構對比（5 分鐘）

並排展示三個分支的 `.claude/` 目錄結構：
- Branch 1: 1 個大檔案
- Branch 2: 2 個檔案，職責分離
- Branch 3: 3 個檔案，完全解耦

---

## 什麼是 Claude Code Skills？

Skills 是 **可重用的知識模組**，讓 Claude Code 在特定任務上表現更好。

### 核心特性

| 特性 | 說明 |
|------|------|
| **Composable** | 可組合多個 Skills 一起使用 |
| **Portable** | 跨專案、跨團隊分享 |
| **Efficient** | 按需載入，節省 Token |
| **Powerful** | 包含模板、範例、甚至可執行程式碼 |

### Skills vs Agents vs Commands

| 元件 | 角色 | Token 消耗 | 適用場景 |
|------|------|-----------|---------|
| **Command** | 觸發點 | 低 | 定義「做什麼」 |
| **Skill** | 知識庫 | 中 | 提供模板和最佳實踐 |
| **Agent** | 執行者 | 高 | 複雜任務的專業執行 |

---

## 關鍵學習點

### 1. Skill 的 description 很重要

```markdown
---
description: SDD 規格文件模板。當需要從 Jira 票生成技術規格時使用。
---
```

這讓 Claude 知道何時自動載入這個 Skill。

### 2. Agent 可以強制使用 Skill

```markdown
# sdd-specialist.md
**重要**: 必須使用 `sdd-template` Skill 來取得標準模板格式。
```

這確保輸出格式一致。

### 3. MCP 整合的最佳位置

- **Command Only**: MCP 調用說明寫在 Command
- **Command + Skill**: MCP 調用寫在 Skill
- **Command + Agent + Skill**: MCP 列在 Agent 的 tools

---

## 官方資源

- [Anthropic Skills Repository](https://github.com/anthropics/skills) - 官方 Skills 範例
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code) - 官方文檔
- [Skills Blog Post](https://www.anthropic.com/engineering/claude-code-skills) - Skills 設計理念

---

## 授權

MIT License

---

**版本**: 3.0.0
**維護者**: PG F2E Team
