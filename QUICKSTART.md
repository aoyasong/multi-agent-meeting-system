# 项目快速启动指南

**执行此文件可快速恢复项目上下文**

---

## 项目基本信息

| 项目 | 值 |
|------|-----|
| 名称 | 多Agent协同会议系统 |
| 代号 | meeting-system |
| 周期 | 4周 |
| 当前阶段 | 开发准备 |
| 当前进度 | 0% |

---

## 关键文件路径

```
# 产品需求
PRD: /root/.openclaw/team-workspace/multi-agent-meeting-system-v1.md

# 技术方案
TRD: /root/.openclaw/team-workspace/multi-agent-meeting-system-TRD.md

# 进度跟踪
PROGRESS: /root/.openclaw/team-workspace/project/multi-agent-meeting-system/PROGRESS.md

# 今日笔记
DIARY: /root/.openclaw/team-workspace/project/multi-agent-meeting-system/diary/2026-04-08.md

# 代码目录
SRC: /root/.openclaw/team-workspace/project/multi-agent-meeting-system/src/
```

---

## 当前任务（最高优先级）

### 待开始
1. 项目初始化
   - [ ] 创建 package.json
   - [ ] 创建 openclaw.plugin.json
   - [ ] 创建 tsconfig.json
   - [ ] 创建目录结构

2. 类型定义
   - [ ] src/types/meeting.ts
   - [ ] src/types/agenda.ts
   - [ ] src/types/speaking.ts
   - [ ] src/types/voting.ts
   - [ ] src/types/recording.ts

3. 第一个工具
   - [ ] src/tools/meeting-create.ts
   - [ ] src/modules/meeting/storage.ts
   - [ ] src/utils/id-generator.ts

---

## 核心技术决策速查

### 通信机制
```
方案: OpenClaw Sessions工具
轮询: 5秒
同步: 议题级别 + 发言流式
```

### 消息结构化
```
执行方: 主Agent
方法: LLM批量提取 + 关键词捷径
类型: statement/question/vote/insight/action
```

### 投票窗口
```
简单决策: 3分钟
中等复杂: 5分钟
复杂决策: 10分钟
平局处理: 延长讨论 → 用户裁决
```

### 中断机制
```
/meeting pause   → 暂停，可恢复
/meeting abort   → 终止，生成不完整纪要
/meeting takeover → 用户接管，主Agent转观察员
```

---

## OpenClaw Plugin开发速查

### 入口文件模板
```typescript
import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { Type } from "@sinclair/typebox";

export default definePluginEntry({
  id: "meeting",
  name: "Multi-Agent Meeting Plugin",
  register(api) {
    api.registerTool({
      name: "meeting_create",
      parameters: Type.Object({
        theme: Type.String(),
        // ...
      }),
      execute: async (_toolCallId, params) => {
        // ...
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      },
    });
  },
});
```

### Manifest模板
```json
{
  "id": "meeting",
  "configSchema": {
    "type": "object",
    "additionalProperties": false,
    "properties": {}
  }
}
```

### Package模板
```json
{
  "name": "@openclaw/meeting-plugin",
  "type": "module",
  "openclaw": {
    "extensions": ["./dist/index.js"]
  }
}
```

---

## 风险追踪

| ID | 风险 | 状态 | 应对 |
|----|------|------|------|
| R1 | LLM延迟 | 监控 | 批量处理+捷径 |
| R2 | Agent无响应 | 待验证 | 30秒超时+跳过 |
| R3 | 会议质量 | 待验证 | 模板+确认机制 |

---

## 每日工作检查清单

**开始工作时**:
- [ ] 阅读本文件
- [ ] 阅读PROGRESS.md
- [ ] 继续当前任务

**结束工作时**:
- [ ] 更新PROGRESS.md
- [ ] 更新diary
- [ ] 更新本文件的"当前任务"

**遇到问题时**:
- [ ] 记录到PROGRESS.md的Risks表
- [ ] 创建decisions/*.md记录决策过程
