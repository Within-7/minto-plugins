---
name: generate-ppt
description: Generate professional HTML PPT from Markdown content with McKinsey/BCG-level design standards
---

# 🎯 Generate PPT Command

## Usage
```
/generate-ppt [markdown_content] [options]
```

## Examples

### Basic usage
```
/generate-ppt
# 项目汇报

## 概述
- 项目进度：80%
- 预算使用：90%
- 团队规模：15人

## 技术架构
### 前端技术栈
- React 18 + TypeScript
- Ant Design组件库
- Webpack构建工具
```

### With title
```
/generate-ppt --title "2024年度技术架构演进汇报"
# 技术架构演进

## 现状分析
我们的技术架构经历了三个阶段的演进...
```

### With output file
```
/generate-ppt --output "architecture-report.html"
[markdown content]
```

## Options
- `--title`: Set presentation title (default: "PPT Presentation")
- `--output`: Output filename (default: "presentation.html")
- `--theme`: Color theme (default: "professional", options: "professional", "modern", "minimal")
- `--slides`: Maximum slides (default: 50)

## Features
- ✅ Professional McKinsey/BCG-level design
- ✅ Fixed 960x540px slide dimensions
- ✅ Built-in download functionality
- ✅ Keyboard navigation (Arrow keys, D for download)
- ✅ Responsive navigation controls
- ✅ Professional color scheme (#F85d42 orange, #556EE6 blue)

## Output
Generates a complete HTML file with:
- Professional slide styling
- Navigation controls
- Download buttons for each slide
- Keyboard shortcuts
- High-quality image export using html2canvas