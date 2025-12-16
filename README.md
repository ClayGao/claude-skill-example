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

### 主題：命名建議器 `/suggest-name`

每個分支都有相同的 `src/data-processor.js`，包含需要改名的程式碼：

```javascript
// 這些命名都不好，可以詢問建議
function calc(items) { ... }     // 計算總價的函數
function apply(total, discount)  // 套用折扣的函數
const d = 0.1;                   // 折扣率
const data = [...];              // 商品列表
const flag = true;               // 是否已套用折扣
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
    └── suggest-name.md    # 100 行，包含所有命名規範
```

### Demo 方式

```bash
# 執行命令
/suggest-name 計算購物車總價的函數

# 或指著程式碼問
/suggest-name 這個 calc 函數應該叫什麼名字？
```

### 特點
- 所有命名規範都寫在 Command 中
- 每次執行都載入完整規範（~500 tokens）
- 適合簡單、一次性任務

---

## 分支二：Command + Skill

```bash
git checkout demo/2-command-skill
```

### 結構
```
.claude/
├── commands/
│   └── suggest-name.md           # 44 行，只有觸發邏輯
└── skills/
    └── naming-conventions/
        └── SKILL.md              # 185 行，完整命名規範
```

### Demo 方式

```bash
# 同樣的命令，不同的架構
/suggest-name 儲存折扣比例的變數

# 觀察：Command 精簡，規範在 Skill 中
```

### 特點
- Command 只負責觸發
- 規範抽取到 Skill，可跨專案共享
- 重複執行時 Skill 已在 context（~300 tokens）

### 對比展示

打開兩個檔案給觀眾看：
1. `commands/suggest-name.md` - 只有 44 行
2. `skills/naming-conventions/SKILL.md` - 完整規範

---

## 分支三：Command + Agent + Skill

```bash
git checkout demo/3-command-agent-skill
```

### 結構
```
.claude/
├── commands/
│   └── suggest-name.md           # 26 行，編排邏輯
├── agents/
│   └── naming-specialist.md      # 99 行，專業執行者
└── skills/
    └── naming-conventions/
        └── SKILL.md              # 100 行，領域知識
```

### Demo 方式

```bash
# 同樣的命令，最專業的輸出
/suggest-name 這個 flag 變數應該怎麼改名？

# 觀察輸出差異：
# - 有詳細的命名分析
# - 有多個建議和比較
# - 有推薦理由
```

### 特點
- Command 編排流程
- Agent 負責專業分析
- Skill 提供領域知識
- 輸出最專業、最一致

### 對比展示

打開三個檔案：
1. `commands/suggest-name.md` - 編排
2. `agents/naming-specialist.md` - 執行
3. `skills/naming-conventions/SKILL.md` - 知識

---

## 三種架構比較

| 架構 | 檔案數 | Token 消耗 | 輸出品質 | 適用場景 |
|------|-------|-----------|---------|---------|
| Command Only | 1 | ~500/次 | 基本 | 簡單任務 |
| Command + Skill | 2 | ~300/次* | 標準 | 需要規範的任務 |
| Command + Agent + Skill | 3 | ~400/次* | 專業 | 複雜任務 |

> *重複執行時，Skill 已在 context 中

---

## Demo 建議流程

### 1. 漸進式展示（10 分鐘）

```bash
# Step 1: 展示 Command Only
git checkout demo/1-command-only
/suggest-name 計算總價的函數
# → 打開 command 給觀眾看（100 行）

# Step 2: 展示 Command + Skill
git checkout demo/2-command-skill
/suggest-name 計算總價的函數
# → 打開 command（44 行）和 skill（185 行）

# Step 3: 展示 Command + Agent + Skill
git checkout demo/3-command-agent-skill
/suggest-name 計算總價的函數
# → 展示更專業的輸出格式
```

### 2. 對比展示（5 分鐘）

在三個分支執行相同指令，比較：
- 程式碼量差異
- 輸出品質差異
- 可維護性差異

### 3. 互動展示（隨時）

讓觀眾提問題，現場展示：
```bash
/suggest-name <觀眾提的描述>
```

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

## 官方資源

- [Anthropic Skills Repository](https://github.com/anthropics/skills) - 官方 Skills 範例
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code) - 官方文檔
- [Skills Blog Post](https://www.anthropic.com/engineering/claude-code-skills) - Skills 設計理念

---

## 授權

MIT License

---

**版本**: 2.0.0
**維護者**: PG F2E Team
