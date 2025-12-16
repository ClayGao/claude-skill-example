# Claude Skill Example

> 展示 Claude Code Skills 的最佳實踐與三種架構比較

---

## 專案目的

這個專案展示 Claude Code 的三種架構模式，幫助團隊理解：

1. **Token 消耗差異** - 不同架構的 Token 使用量
2. **最佳使用時機** - 什麼情況用什麼架構
3. **Skills 的威力** - 如何用 Skills 減少重複 prompt

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

## Skills 最佳實踐

### 1. 結構規範

```
skills/
└── skill-name/
    ├── SKILL.md          # 必需：Skill 定義
    ├── references/       # 可選：參考文件
    │   ├── example-1.md
    │   └── example-2.md
    └── assets/           # 可選：靜態資源
        └── template.txt
```

### 2. SKILL.md 格式

```markdown
---
description: 簡短描述這個 Skill 做什麼（會顯示在 Skill 列表中）
---

# Skill 名稱

## 使用時機
描述什麼情況下會觸發這個 Skill

## 核心原則
列出關鍵原則和規則

## 模板/範例
提供可直接使用的模板
```

### 3. 設計原則

#### DO ✅

- **專注單一任務** - 一個 Skill 解決一個問題
- **提供具體範例** - 範例比抽象描述更有效
- **使用 Frontmatter** - 正確設置 `description`
- **包含邊界案例** - 處理特殊情況的指引

#### DON'T ❌

- **不要過於龐大** - 大 Skill 應拆分
- **不要重複 Agent 職責** - Skill 是知識，不是執行者
- **不要硬編碼路徑** - 保持可移植性
- **不要忽略 description** - 這是 Claude 判斷是否載入的依據

### 4. 觸發機制

Skills 透過 `description` 自動觸發：

```markdown
---
description: 生成符合 Conventional Commits 規範的 commit message
---
```

當用戶說「幫我寫 commit message」時，Claude 會自動載入此 Skill。

---

## 三種架構比較

本專案提供三個範例，主題為 **Commit Message Generator**：

### 範例 1: 只有 Command

**路徑**: `examples/1-command-only/`

```
commands/
└── gen-commit.md
```

**特點**:
- 所有 prompt 寫在 Command 中
- 每次執行都消耗完整 Token
- 適合簡單、一次性任務

### 範例 2: Command + Skill

**路徑**: `examples/2-command-skill/`

```
commands/
└── gen-commit.md
skills/
└── commit-conventions/
    └── SKILL.md
```

**特點**:
- Command 觸發，Skill 提供知識
- Skill 按需載入
- 適合需要標準化的任務

### 範例 3: Command + Agent + Skill

**路徑**: `examples/3-command-agent-skill/`

```
commands/
└── gen-commit.md
agents/
└── commit-specialist.md
skills/
└── commit-conventions/
    └── SKILL.md
```

**特點**:
- Command 編排，Agent 執行，Skill 提供知識
- 最高的專業度和一致性
- 適合複雜、需要專業判斷的任務

---

## 快速開始

### 安裝

```bash
# 複製範例到你的專案
cp -r examples/2-command-skill/.claude/* your-project/.claude/
```

### 使用

```bash
# 在你的專案中執行
/gen-commit
```

---

## Token 消耗比較

| 架構 | 首次執行 | 重複執行 | 適用場景 |
|------|---------|---------|---------|
| Command Only | ~500 tokens | ~500 tokens | 簡單任務 |
| Command + Skill | ~800 tokens | ~300 tokens* | 標準化任務 |
| Command + Agent + Skill | ~1200 tokens | ~400 tokens* | 複雜任務 |

> *重複執行時，Skill 可能已在 context 中，減少載入成本

### 為什麼 Skill 能節省 Token？

1. **按需載入** - 只有相關 Skill 會被載入
2. **Context 共享** - 同一 session 內 Skill 只載入一次
3. **精簡設計** - Skill 只包含必要知識

---

## 目錄結構

```
claude-skill-example/
├── README.md                          # 本文件
├── examples/
│   ├── 1-command-only/               # 範例 1
│   │   └── .claude/
│   │       └── commands/
│   │           └── gen-commit.md
│   ├── 2-command-skill/              # 範例 2
│   │   └── .claude/
│   │       ├── commands/
│   │       │   └── gen-commit.md
│   │       └── skills/
│   │           └── commit-conventions/
│   │               └── SKILL.md
│   └── 3-command-agent-skill/        # 範例 3
│       └── .claude/
│           ├── commands/
│           │   └── gen-commit.md
│           ├── agents/
│           │   └── commit-specialist.md
│           └── skills/
│               └── commit-conventions/
│                   └── SKILL.md
└── docs/
    └── skills-deep-dive.md           # 進階說明
```

---

## 官方資源

- [Anthropic Skills Repository](https://github.com/anthropics/skills) - 官方 Skills 範例
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code) - 官方文檔
- [Skills Blog Post](https://www.anthropic.com/engineering/claude-code-skills) - Skills 設計理念

---

## 授權

MIT License

---

**版本**: 1.0.0
**維護者**: PG F2E Team
