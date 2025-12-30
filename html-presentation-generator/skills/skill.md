---
name: within7-ppt-sop
description: "构建专业的within7公司的标准格式html的幻灯片工具"
---

# HTML Presentation Generator

## Description
生成符合严格专业标准的高质量单文件HTML演示文稿，支持多幻灯片导航和居中展示。

## Capabilities

### 1. 幻灯片生成
- 生成单文件HTML，包含所有幻灯片
- 支持多种页面类型：封面页、目录页、内容页、总结页、结束页
- 内置导航控制：上一页、下一页按钮
- 支持键盘导航（左右方向键）
- 居中展示在页面中央
- 自动应用设计系统，确保视觉一致性

### 2. 模板使用
- `templates/base-template.html` - 基础模板
- `templates/cover.html` - 封面页模板
- `templates/toc.html` - 目录页模板
- `templates/content.html` - 内容页模板
- `templates/summary.html` - 总结页模板
- `templates/end.html` - 结束页模板

### 3. 组件库
- 表格组件（带总数行、数字右对齐）
- 图表组件（柱状图、雷达图、折线图）
- 图标组件（线性风格SVG）
- 卡片组件

## Design Standards

### 核心约束
- 画布尺寸：1280×720px（16:9）
- 安全边距：四周40px
- 响应式：仅使用`transform:scale(...)`，禁止重排
- 单文件HTML，零外部依赖

### 设计系统变量
```css
--bg-main: #FFFFFF
--bg-header: #000000
--accent: #F85d42
--gray: #74788d
--aux1: #556EE6
--aux2: #34c38f
--aux3: #50a5f1
--aux4: #f1b44c
--gray-light: #F5F5F5
```

### 布局规范
- 12列网格系统（60px列宽，20px间距）
- 卡片：8px圆角，20px内边距
- Header：60px高度，黑色背景

## Usage Examples

### Example 1: 生成完整演示文稿
```
User: 帮我生成一个关于"2024年度销售报告"的幻灯片，包含：
- 封面页
- 目录页
- 3个内容页（销售数据、产品分析、市场趋势）
- 总结页
- 结束页
```

### Example 2: 创建特定页面类型
```
User: 创建一个目录页，包含以下章节：
1. 销售概览
2. 产品分析
3. 市场趋势
4. 未来规划
```

### Example 3: 添加数据可视化
```
User: 在内容页中添加一个柱状图，展示Q1-Q4的销售数据：
Q1: 120万，Q2: 150万，Q3: 180万，Q4: 200万
```

## Output Format
- **首选**：单个HTML文件（如`presentation.html`），包含所有幻灯片和导航
- **备选**：多个HTML文件，命名为`slide-01.html`、`slide-02.html`等（仅用户明确要求时）
- 每个文件都是独立的单文件HTML
- 所有样式内联，无外部依赖
- 页面灰色背景，幻灯片居中显示
