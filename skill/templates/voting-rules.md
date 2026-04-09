# 投票规则配置

## 投票类型

### 1. 简单多数（Simple Majority）

**定义**：获得最多票数的选项胜出

**适用场景**：
- 头脑风暴结果排序
- 非关键决策
- 快速意向收集

**配置**：
```json
{
  "votingType": "simple-majority",
  "complexity": "simple",
  "windowSeconds": 180
}
```

**平局处理**：
- 两个选项平局 → 延长讨论后重新投票
- 多选项平局 → 运行决胜轮或请求用户裁决

### 2. 绝对多数（Absolute Majority）

**定义**：胜出选项需获得超过半数票

**适用场景**：
- 重要决议
- 需要明确共识的决策

**配置**：
```json
{
  "votingType": "absolute-majority",
  "complexity": "moderate",
  "windowSeconds": 300,
  "requireQuorum": true
}
```

**未达绝对多数处理**：
- 进入决胜轮（取前两名再投）
- 或降低为简单多数规则

### 3. 共识决策（Consensus）

**定义**：所有参会者同意或有保留同意

**适用场景**：
- 重大架构决策
- 团队核心共识
- 项目启动确认

**配置**：
```json
{
  "votingType": "consensus",
  "complexity": "complex",
  "windowSeconds": 600,
  "allowAbstain": true
}
```

**非共识处理**：
- 记录反对意见
- 尝试修改方案
- 若仍无法达成共识，上报用户

### 4. 加权投票（Weighted）

**定义**：不同投票者权重不同

**适用场景**：
- 专家意见权重更高
- 利益相关方权重调整

**配置**：
```json
{
  "votingType": "weighted",
  "complexity": "moderate",
  "windowSeconds": 300,
  "weights": {
    "tech-lead": 2.0,
    "architect": 1.5,
    "default": 1.0
  }
}
```

### 5. 排名投票（Ranked Choice）

**定义**：投票者对选项进行排名，按排名计分

**适用场景**：
- 方案优选
- 多选项排序

**配置**：
```json
{
  "votingType": "ranked-choice",
  "complexity": "moderate",
  "windowSeconds": 300,
  "scoring": {
    "first": 3,
    "second": 2,
    "third": 1
  }
}
```

## 投票窗口配置

### 默认窗口时间

| 复杂度 | 窗口时长 | 适用场景 |
|--------|----------|----------|
| simple | 3分钟 | 快速意向、命名投票 |
| moderate | 5分钟 | 需求评审、技术评审 |
| complex | 10分钟 | 重大决策、共识表决 |

### 自定义窗口

```json
{
  "votingWindows": {
    "simple": 180,
    "moderate": 300,
    "complex": 600
  }
}
```

### 延长规则

- **自动延长**：投票率<50%时自动延长50%
- **手动延长**：主Agent可手动延长一次
- **最大延长**：原窗口的150%

## 平局处理策略

### 策略一：决胜轮

```
平局 → 取前两名选项 → 重新投票
```

### 策略二：讨论后重投

```
平局 → 延长讨论5分钟 → 重新投票
```

### 策略三：用户裁决

```
平局 → 上报人类用户 → 接受用户决定
```

### 策略四：默认行动

```
平局 → 执行预设默认选项（如"维持现状"）
```

**配置示例**：
```json
{
  "tieBreaker": {
    "strategy": "runoff",
    "maxRounds": 2,
    "fallback": "user-decision"
  }
}
```

## 弃权处理

| 场景 | 处理方式 |
|------|----------|
| 主动弃权 | 不计入总票数 |
| 超时未投 | 视为弃权，不影响结果 |
| 缺席投票 | 不计入投票总数 |

**配置**：
```json
{
  "abstentionHandling": {
    "timeoutAsAbstain": true,
    "absentNotCounted": true,
    "quorumRequirement": 0.6
  }
}
```

## 法定人数（Quorum）

**定义**：会议有效所需的最少参会人数

### 配置规则

```json
{
  "quorum": {
    "type": "percentage",  // 或 "fixed"
    "value": 0.6,           // 60% 参会率
    "enforceForVoting": true
  }
}
```

### 未达法定人数处理

1. 推迟会议
2. 调整投票规则（降低为简单多数）
3. 异步投票

## 投票结果展示

### 实时展示

```
投票进行中（3/5 已投票）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

选项A ████████████░░░░░ 60% (3票)
选项B ██████░░░░░░░░░░░ 40% (2票)

剩余时间：2:15
```

### 结果宣布

```
✅ 投票结果

胜出：选项A
得票：3票 (60%)

投票详情：
- Agent1: 选项A
- Agent2: 选项B
- Agent3: 选项A
- Agent4: 选项A
- Agent5: 选项B
```

## 场景化配置

### 头脑风暴投票

```json
{
  "type": "brainstorm",
  "voting": {
    "type": "simple-majority",
    "complexity": "simple",
    "multiSelect": true,
    "maxSelections": 3
  }
}
```

### 需求评审决策

```json
{
  "type": "requirement-review",
  "voting": {
    "type": "absolute-majority",
    "complexity": "moderate",
    "requireQuorum": true,
    "tieBreaker": "discussion-then-revote"
  }
}
```

### 技术评审决议

```json
{
  "type": "technical-review",
  "voting": {
    "type": "weighted",
    "complexity": "moderate",
    "weights": {
      "architect": 2.0,
      "tech-lead": 1.5
    },
    "tieBreaker": "user-decision"
  }
}
```

### 项目启动确认

```json
{
  "type": "project-kickoff",
  "voting": {
    "type": "consensus",
    "complexity": "complex",
    "allowAbstain": true,
    "requireAllPresent": true
  }
}
```

## 投票超时策略

| 阶段 | 超时处理 |
|------|----------|
| 窗口关闭后未投 | 标记弃权 |
| 首轮投票后平局 | 自动延长或决胜轮 |
| 决胜轮后仍平局 | 上报用户 |
| 用户未响应 | 24小时后执行默认选项 |

```json
{
  "timeoutHandling": {
    "votingWindowExtensions": 1,
    "userDecisionTimeout": 86400,
    "defaultAction": "maintain-status-quo"
  }
}
```
