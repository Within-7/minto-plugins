---
name: Bloomberg-WritingBrandValueReport
description: 基于 Bloomberg 终端数据的结构化品牌价值分析规范，用于系统量化品牌资产、评估营销投资回报效率、链接消费者行为与品牌健康度、识别品牌协同杠杆、监测 ESG 与声誉风险，并预判前瞻性品牌 ROI 情景，为企业营销、战略、财务及投资团队提供可验证、可操作的品牌决策依据。  
version: 1.0.0  
---

# 品牌价值分析 Skill 规范

## 适用范围
- **仅处理明确基于 Bloomberg 数据源的品牌价值或营销活动分析**  
- **必须包含**：具体品牌名称、企业主体、Bloomberg 引用来源（如 BI Analyst Note、10-Q Filing、BLP Social、ECST Consumer Survey、M&A Deal Rationale 等）  
- **排除项**：  
  - 引用非 Bloomberg 品牌榜单（如 Interbrand、Kantar、BrandZ）  
  - 使用外部消费者调研、政府统计或第三方媒体（如 Reuters、WSJ）作为事实依据  
  - 无具体支出金额、情绪得分、ASP 溢价或时间范围的模糊描述（如“品牌影响力增强”）

## 核心原则
1. **Bloomberg 唯一事实源**：所有 ASP、营销费用、NPS、情绪得分、授权收入、商誉减值等必须标注 Bloomberg 来源（例：`BI: “LVMH Brand Premium Analysis”, 2025-06-18` 或 `10-Q Filing, Segment Revenue`）  
2. **无数据即缺失**：若 Bloomberg 未提供某项信息（如 CAC/LTV、品牌延伸 ROI），必须写：“输入文档中未提供相关信息”  
3. **区分品牌层级**：优先采用**具体品牌**（如 “Nike Air Max”）而非笼统表述（如 “运动品牌”）  
4. **聚焦可行动洞察**：不分析短期舆情噪音，除非 Bloomberg 明确指出其对销售或估值的持续影响  
5. **前瞻性必须有 Bloomberg 支撑**：所有“未来 ROI”需基于 Equity Research Forecast、Management Guidance 或 SRFV 情景工具  
6. **逻辑驱动**：合理推理需建立在文档事实链上，避免无依据预测
7. **图表精准**：仅在数据满足触发条件时插入图表，图表必须紧随文字分析  

---

## 一、品牌资产量化与市场认知变动（Brand Equity Quantification & Market Perception Shift）

**任务**：通过财务与资本市场信号客观衡量品牌价值  
**必须分析**：  
- **品牌溢价证据**（ASP 或毛利率 vs. 同行）  
- **分析师对品牌护城河的评价**  
- **新闻/社交媒体情绪变化**  
- **财报中品牌相关无形资产变动**

> 若无 ASP、毛利率对比或分析师评价，写：“输入文档中未提供相关信息”。  
> **本节不插入图表**

---

## 二、营销支出结构与效率追踪（Marketing Spend Structure & Efficiency Tracking）

**任务**：解析营销预算分配并评估财务转化效率  
**必须分析**：  
- **营销费用绝对值与营收占比**  
- **渠道拆分**（数字/传统/促销等）  
- **ROI 代理指标**（ΔRevenue/ΔMarketing、CAC/LTV、营销弹性）

> 若无 SG&A 细项或 ROI 计算，写：“输入文档中未提供相关信息”。  

> **营销渠道效率表**（因含渠道、支出占比、ROI 而触发）：

| 渠道 | 占营销支出 | ROI (Rev/$) | 数据源 |
|------|-----------|------------|--------|
| 社交媒体 | 45% | 1:4.2 | Earnings Call |
| 电视广告 | 30% | 1:1.8 | Analyst Model |
| KOL合作 | 25% | 1:3.5 | Management Guidance |

---

## 三、品牌健康度与消费者行为关联（Brand Health ↔ Consumer Behavior Linkage）

**任务**：验证品牌认知是否转化为真实消费行为  
**必须分析**：  
- **Bloomberg 消费者情绪指标**（NPS、考虑度、忠诚度）  
- **声量与销量相关性**  
- **高端化能力**（ASP 提升与定位升级）  
- **危机恢复速度**

> 若无 Consumer Pulse 或零售销量联动，写：“输入文档中未提供相关信息”。  
> **本节不插入图表**

---

## 四、品牌协同与资产杠杆效应（Brand Synergy & Asset Leverage）

**任务**：评估品牌作为可复用资产的战略价值  
**必须分析**：  
- **品牌延伸案例与效果**  
- **授权收入披露**  
- **并购中的品牌协同预期**  
- **多品牌架构效率**

> 若无 licensing revenue 或 M&A 品牌逻辑，写：“输入文档中未提供相关信息”。  

> **品牌杠杆效应表**（因含延伸、授权、协同而触发）：

| 杠杆类型 | 案例 | 财务影响 | 数据源 |
|----------|------|--------|--------|
| 品牌延伸 | Apple → Services | 服务毛利率 72% | 10-K Segment |
| 授权变现 | LVMH 香水授权 | €1.2B 收入 | Filing |
| 并购协同 | Estée Lauder 收购 TOM FORD | “强化高端矩阵” | M&A Rationale |

---

## 五、ESG 与声誉风险对品牌价值的影响（ESG & Reputational Risk Impact on Brand Equity）

**任务**：量化非财务因素对品牌资产的侵蚀或增强  
**必须分析**：  
- **ESG 争议事件与舆情下滑**  
- **正面 ESG 行动与偏好提升**  
- **SASB 披露质量与信任度关联**  
- **监管处罚引发的声誉冲击**

> 若无 ESG Controversy Score 或 News 情绪变化，写：“输入文档中未提供相关信息”。  

> **品牌声誉风险分类表**（因含风险类型、事件、影响而触发）：

| 风险类型 | 事件 | 情绪得分变化 | 数据源 |
|----------|------|------------|--------|
| 供应链 | 印尼镍矿劳工问题 | -22pts | News / ESG Feed |
| 沟通失误 | CEO 文化言论 | -35pts | BLP Social |
| 治理缺陷 | ESG 披露不完整 | 评级下调 | SASB Disclosure |

---

## 六、前瞻性品牌投资回报情景（Forward-Looking Brand ROI Scenarios）

**任务**：基于 Bloomberg 模型预判未来品牌投入的回报路径  
**必须分析（如适用）**：  
- **分析师对未来 ROI 的预测**  
- **管理层品牌投资优先级**  
- **盈亏平衡点测算**  
- **尾部风险监控指标**

> 若无 Forecast、Guidance 或盈亏模型，写：“输入文档中未提供相关信息”。  

> **品牌 ROI 情景表**（因含预测、盈亏平衡、风险而触发）：

| 情景 | 营销 ROI | 盈亏平衡用户数 | 尾部风险 | 数据源 |
|------|--------|--------------|--------|--------|
| 基准 | 1:4.2 | 2.0M | 低 | Equity Research |
| 上行 | 1:5.0 | 1.5M | 中 | Management Guidance |
| 下行 | 1:2.8 | 3.5M | 高（AI伦理争议） | SRFV Tool |

---

## 严格禁止行为（Agent 执行底线）

| 禁止类型 | 示例 | 合规改写 |
|----------|------|----------|
| 引用 Interbrand 排名 | “品牌价值第5名” | “输入文档中未提供相关信息” |
| 混淆品牌层级 | “快消品牌表现好” | “Coca-Cola Classic Q2 ASP +8%” |
| 虚构 ROI | “通常 ROI 为 1:3” | “输入文档中未提供相关信息” |
| 无依据预测 | “品牌将受益于 AI” | “Bloomberg Analyst 预测 DTC ROI 提升至 1:4.5” |
| 为制表而制表 | 在单点描述强行插入表格 | 仅在多维度对比场景插入 |

> **Agent 强制内部效验清单（不输出）**：  
1. 所有 ASP/毛利率对比是否有 Transcript 或 BI 支撑？  
2. 所有消费者情绪是否来自 Bloomberg Consumer Survey 或 BLP Social？  
3. 所有前瞻性 ROI 是否有 Equity Research 或 Management Guidance 支撑？  
4. 是否杜绝“我们认为”“通常”“有望”等表述？  
5. 所有表格是否由前文分析自然引出并标注触发原因？

> **关键保证**：  
- **六大维度必须完整输出**（即使内容缺失）  
- **无数据章节必须使用固定保底句**  
- **绝不允许空章节、跳过章节、虚构内容**  
- **分析先行，图表后置**：表格仅为高密度信息的可视化补充，绝不能替代文字推理