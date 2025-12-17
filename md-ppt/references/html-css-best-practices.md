# HTML/CSS 最佳实践指南

## 标准概述

本指南基于现代Web开发最佳实践，结合W3C标准和MDN文档建议，为企业级HTML/CSS开发提供权威参考。

## HTML最佳实践

### 1. 语义化HTML

#### 基础语义标签
```html
<!-- 文档结构 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题 - 网站名称</title>
</head>
<body>
    <!-- 主要内容区域 -->
    <header>
        <nav>
            <ul>
                <li><a href="#">导航项</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <h1>文章标题</h1>
            <section>
                <h2>章节标题</h2>
                <p>段落内容</p>
            </section>
        </article>
        
        <aside>
            <!-- 侧边栏内容 -->
        </aside>
    </main>
    
    <footer>
        <!-- 页脚内容 -->
    </footer>
</body>
</html>
```

#### 内容分组标签
```html
<!-- 使用语义化标签进行内容分组 -->
<section class="presentation-slides">
    <header class="section-header">
        <h2>演示文稿章节</h2>
    </header>
    
    <article class="slide" id="slide-1">
        <header class="slide-header">
            <h1>幻灯片标题</h1>
        </header>
        <div class="slide-content">
            <!-- 幻灯片内容 -->
        </div>
    </article>
</section>
```

### 2. 可访问性 (WCAG 2.1 AA)

#### ARIA属性使用
```html
<!-- 为交互元素添加适当的ARIA属性 -->
<button 
    aria-label="上一页幻灯片" 
    aria-describedby="slide-counter"
    id="prev-btn">
    ←
</button>

<div 
    role="region" 
    aria-label="幻灯片内容"
    aria-live="polite"
    class="slide-container">
    <!-- 幻灯片内容 -->
</div>

<!-- 为图表添加描述 -->
<div 
    role="img" 
    aria-labelledby="chart-title chart-desc"
    class="chart-container">
    <div id="chart-title">销售趋势图</div>
    <div id="chart-desc" class="sr-only">
        2023年销售数据显示Q1增长15%，Q2增长8%，Q3增长12%，Q4增长10%
    </div>
</div>
```

#### 键盘导航支持
```html
<!-- 确保所有交互元素可通过键盘访问 -->
<nav class="slide-navigation" role="navigation" aria-label="幻灯片导航">
    <button 
        type="button"
        tabindex="0"
        aria-keyshortcuts="ArrowLeft"
        onclick="previousSlide()">
        上一页
    </button>
    
    <span 
        id="slide-indicator" 
        aria-live="polite"
        aria-atomic="true">
        第 <span id="current-slide">1</span> 页，共 <span id="total-slides">10</span> 页
    </span>
    
    <button 
        type="button"
        tabindex="0"
        aria-keyshortcuts="ArrowRight"
        onclick="nextSlide()">
        下一页
    </button>
</nav>
```

### 3. 表单最佳实践

```html
<form class="presentation-settings" novalidate>
    <fieldset>
        <legend>演示设置</legend>
        
        <div class="form-group">
            <label for="slide-duration">
                幻灯片时长 <span class="required" aria-label="必填">*</span>
            </label>
            <input 
                type="number" 
                id="slide-duration"
                name="slideDuration"
                min="1" 
                max="300"
                required
                aria-describedby="duration-help"
                aria-invalid="false">
            <small id="duration-help">建议每页5-10秒</small>
        </div>
        
        <div class="form-group">
            <label for="transition-effect">
                过渡效果
            </label>
            <select id="transition-effect" name="transitionEffect">
                <option value="fade">淡入淡出</option>
                <option value="slide">滑动</option>
                <option value="none">无效果</option>
            </select>
        </div>
    </fieldset>
</form>
```

### 4. 图像和媒体

```html
<!-- 响应式图片 -->
<picture>
    <source 
        media="(min-width: 1200px)"
        srcset="image-large.webp"
        type="image/webp">
    <source 
        media="(min-width: 768px)"
        srcset="image-medium.webp"
        type="image/webp">
    <img 
        src="image-small.jpg"
        alt="描述性文字说明图片内容"
        loading="lazy"
        decoding="async"
        width="800"
        height="600">
</picture>

<!-- 视频内容 -->
<video 
    controls
    preload="metadata"
    poster="video-poster.jpg"
    aria-describedby="video-description">
    <source src="video.webm" type="video/webm">
    <source src="video.mp4" type="video/mp4">
    <track 
        label="中文字幕" 
        kind="subtitles" 
        srclang="zh" 
        src="subtitles-zh.vtt">
    <p>
        您的浏览器不支持视频播放。
        <a href="video.mp4">下载视频文件</a>
    </p>
</video>
<div id="video-description" class="sr-only">
    视频内容描述：展示产品使用流程和关键功能
</div>
```

## CSS最佳实践
以下是根据你提供的设计背景和视觉规范，**全面修改和优化后的 CSS 最佳实践 Prompt**，严格遵循你的配色方案、字体层级、布局结构和整体风格要求，适用于创建具有专业商务演示风格（如 McKinsey、BCG）的幻灯片或 Web 页面：

---

## CSS最佳实践（商务演示风格）

### 1. CSS架构和组织

#### CSS自定义属性（变量）——严格遵循设计规范
```css
:root {
  /* === 核心配色（来自设计规范） === */
  --color-bg-primary: #FFFFFF;        /* 主背景色 */
  --color-header-bg: #000000;         /* 标题栏背景 */
  --color-primary: #F85D42;           /* 主要强调色（橙色） */
  --color-primary-dark: #E54D32;      /* 橙色深色变体（用于 hover） */
  --color-primary-light: #FA7D65;     /* 橙色浅色变体 */

  --color-gray-500: #74788d;          /* 辅助灰色 */
  --color-gray-700: #4A4E5A;          /* 正文深灰 */
  --color-gray-900: #212529;          /* 深黑色文本 */
  --color-white: #FFFFFF;

  /* === 辅助色系（用于图表、状态、图标等） === */
  --color-brand-blue: #556EE6;        /* 深蓝色 */
  --color-success: #34C38F;           /* 绿色 */
  --color-info: #50A5F1;              /* 蓝色 */
  --color-warning: #F1B44C;           /* 黄色 */

  /* === 字体系统（语义化命名） === */
  --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;

  --font-size-xs: 0.75rem;    /* 12px - 图表标签 */
  --font-size-sm: 0.875rem;   /* 14px - 正文小字、辅助信息 */
  --font-size-base: 1rem;     /* 16px - 正文默认 */
  --font-size-lg: 1.125rem;   /* 18px - 副标题 */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px - 小标题 */
  --font-size-3xl: 1.875rem;  /* 30px - 大标题 */
  --font-size-4xl: 2.25rem;   /* 36px - 封面主标题 */

  /* === 间距系统（基于 8px 基准） === */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */

  /* === 布局尺寸 === */
  --header-height: 60px;              /* 标题栏高度 */
  --slide-max-width: 960px;           /* 内容区域最大宽度 */
  --card-border-radius: 8px;          /* 卡片圆角 */

  /* === 阴影（用于卡片、强调框） === */
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-emphasis: 0 4px 12px rgba(248, 93, 66, 0.15); /* 橙色强调框 */

  /* === 过渡与动画 === */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;

  /* === Z-index 层级 === */
  --z-header: 100;
  --z-overlay: 1000;
}
```

---

### 2. 响应式设计（适配演示与阅读）

#### 移动优先布局（适配投影与桌面）
```css
.slide-container {
  background: var(--color-bg-primary);
  max-width: var(--slide-max-width);
  margin: 0 auto;
  padding: var(--spacing-lg);
}

/* 平板及以上：增加留白 */
@media (min-width: 768px) {
  .slide-container {
    padding: var(--spacing-xl);
  }
}

/* 封面页居中 */
.slide-cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  text-align: center;
}

.slide-cover__title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--color-header-bg); /* 黑色文字 */
  margin: 0;
}
```

---

### 3. 现代CSS特性应用（符合布局与视觉层次）

#### 标题栏（黑色横条）
```css
.page-header {
  background: var(--color-header-bg);
  color: var(--color-white);
  height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
  position: sticky;
  top: 0;
  z-index: var(--z-header);
}

.page-header__title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin: 0;
}
```

#### 卡片式内容分区
```css
.content-card {
  background: var(--color-bg-primary);
  border-radius: var(--card-border-radius);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-card);
}

.content-card--highlight {
  border-left: 4px solid var(--color-primary);
  box-shadow: var(--shadow-emphasis);
}
```

#### 强调文本与关键数据
```css
.text-highlight {
  color: var(--color-primary);
  font-weight: 600;
}

.key-number {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.2;
}
```

#### 图表配色（与辅助色系对齐）
```css
.chart-bar--brand { fill: var(--color-brand-blue); }
.chart-bar--success { fill: var(--color-success); }
.chart-bar--info { fill: var(--color-info); }
.chart-bar--warning { fill: var(--color-warning); }
```

---

### 4. 性能与可访问性

#### 高效动画（避免布局抖动）
```css
.slide-item {
  opacity: 0;
  transform: translateY(10px);
  transition: 
    opacity var(--transition-normal),
    transform var(--transition-normal);
}

.slide-item.visible {
  opacity: 1;
  transform: translateY(0);
}
```

#### 可访问性（焦点与对比度）
```css
a, button {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* 确保文本对比度符合 WCAG */
.text-body {
  color: var(--color-gray-700);
  font-size: var(--font-size-base);
  line-height: 1.6;
}
```

---

### 5. 可维护性与风格一致性

#### BEM 命名（贴合商务风格）
```css
.slide {}
.slide__title {}
.slide__subtitle { color: var(--color-primary); }
.slide__content {}
.slide__footer {}

/* 页面类型修饰符 */
.slide--cover {}
.slide--summary {}
.slide--thank-you {}

/* 强调区域 */
.highlight-box {}
.highlight-box--orange { background: rgba(248, 93, 66, 0.08); }
.highlight-box--blue { background: rgba(85, 110, 230, 0.08); }
```

#### 组件示例：专业按钮（用于交互控制）
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background var(--transition-fast);
  min-height: 40px;
}

.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--primary:hover {
  background: var(--color-primary-dark);
}
```

---

### 6. 整体风格控制（确保McKinsey/BCG风格）

- **所有文本**：使用无衬线字体（如 Arial, Helvetica, system-ui）
- **标题层级**：
  - 一级标题：`font-size: var(--font-size-3xl)`, `font-weight: 700`, `color: black`
  - 二级标题：`font-size: var(--font-size-lg)`, `font-weight: 600`, `color: var(--color-primary)`
- **视觉留白**：统一使用 `--spacing-md` 及以上间距
- **无多余装饰**：避免阴影、渐变、边框过度使用，保持极简
- **色彩克制**：仅在关键数据、强调区域使用橙色，其余使用灰/黑/白

> ✅ **设计一致性检查**：所有页面必须复用相同变量、组件和间距系统，确保从封面到结束页风格统一。

---

## 工具和资源

### 代码质量工具
- **Stylelint**: CSS代码检查工具
- **Prettier**: 代码格式化工具
- **PostCSS**: CSS转换工具
- **Autoprefixer**: 自动添加浏览器前缀

### 性能分析工具
- **Lighthouse**: 性能、可访问性、最佳实践评分
- **WebPageTest**: 网页性能测试
- **Chrome DevTools**: 开发者工具性能分析

### 设计系统工具
- **Figma**: 设计协作工具
- **Storybook**: 组件开发环境
- **Pattern Lab**: 原子设计系统

## 最佳实践检查清单

### HTML检查清单
- [ ] 使用语义化HTML5标签
- [ ] 添加适当的lang属性
- [ ] 确保图片有alt属性
- [ ] 表单元素有正确的label
- [ ] 使用ARIA属性增强可访问性
- [ ] 实现键盘导航支持
- [ ] 添加viewport meta标签
- [ ] 使用响应式图片技术

### CSS检查清单
- [ ] 使用CSS自定义属性管理变量
- [ ] 实现响应式设计
- [ ] 优化动画性能
- [ ] 遵循一致的命名约定
- [ ] 使用合理的CSS架构
- [ ] 优化关键渲染路径
- [ ] 确保颜色对比度符合标准
- [ ] 测试跨浏览器兼容性

### 性能检查清单
- [ ] 压缩CSS和HTML文件
- [ ] 优化图片大小和格式
- [ ] 使用CDN加载资源
- [ ] 实现代码分割
- [ ] 优化关键渲染路径
- [ ] 使用适当的缓存策略

---

**注意**: 本指南基于当前Web标准制定，建议定期更新以跟上技术发展。