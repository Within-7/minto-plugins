---
name: retaildive-report
description: "构建高风险分析报告的引擎。针对于 Retail Dive 相关的数据，当 Agent 需要将分析结果格式化为专业的交付物时调用此技能。提供行业标准的 Markdown 模版和质量保证。"
---

# 零售报告架构师 (Retail Report Architect)

## 1. 模版选择逻辑

### A. 高管战略与财务场景
*   **触发条件:** 用户询问库存危机、合规风险、并购影响或整体市场逆风。
*   **适用 Agent:** 零售合规Agent, 库存管理Agent, 零售商策略Agent (宏观层面)。
*   **行动:** 加载 `templates/executive_strategy.md`。

### B. 竞品与市场战术场景
*   **触发条件:** 用户询问特定对手（如 Walmart vs Target）、促销价格战、开店/关店策略。
*   **适用 Agent:** 零售商策略Agent, 促销策略Agent, 零售营销Agent。
*   **行动:** 加载 `templates/retail_competitor_audit.md`。

### C. 趋势与创新场景
*   **触发条件:** 用户询问新趋势、消费者行为变化、新技术应用 (AI/Web3)。
*   **适用 Agent:** 零售趋势Agent, 购物行为Agent, 零售创新Agent。
*   **行动:** 加载 `templates/trend_innovation_brief.md`。

## 2. 认知风格
*   **数据驱动:** 引用 Retail Dive 的具体文章标题或发布日期。
*   **商业洞察:** 不只罗列新闻，要分析 "So What?" (这对业务意味着什么)。

# Report Architect Skill

本 Skill 旨在将碎片化的调研信息重组为结构严谨、逻辑闭环、数据详实的战略咨询报告。

## 核心能力
1.  **深度扩写:** 将简短的观察扩展为包含背景、动因、影响的深度段落。
2.  **框架应用:** 自动应用 SWOT, PESTEL, Porter's 5 Forces 等分析框架。
3.  **数据可视化:** 将文本数据转化为 Markdown 表格，便于对比分析。

## 使用原则
*   **禁止废话:** 每一句话都必须包含信息增量。
*   **强制结构:** 必须严格遵循模版结构，不得随意删减章节。
*   **数据优先:** 任何定性描述后必须紧跟定量数据支撑。