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

### 1. CSS架构和组织

#### 文件结构
```
styles/
├── base/
│   ├── reset.css          # CSS重置
│   ├── typography.css     # 字体基础
│   └── variables.css      # CSS变量
├── components/
│   ├── buttons.css        # 按钮组件
│   ├── slides.css         # 幻灯片组件
│   └── navigation.css     # 导航组件
├── layout/
│   ├── grid.css           # 网格系统
│   ├── header.css         # 页头布局
│   └── footer.css         # 页脚布局
├── utilities/
│   ├── spacing.css        # 间距工具类
│   ├── colors.css         # 颜色工具类
│   └── accessibility.css  # 可访问性工具
└── main.css               # 主样式文件
```

#### CSS自定义属性 (变量)
```css
/* :root 中定义全局变量 */
:root {
  /* 颜色系统 */
  --color-primary: #F85d42;
  --color-primary-dark: #e54d32;
  --color-primary-light: #fa7d65;
  
  --color-secondary: #556EE6;
  --color-success: #34c38f;
  --color-warning: #f1b44c;
  --color-danger: #f46a6a;
  
  --color-dark: #000000;
  --color-light: #ffffff;
  --color-gray-100: #f8f9fa;
  --color-gray-500: #74788d;
  --color-gray-900: #212529;
  
  /* 字体系统 */
  --font-family-primary: 'Arial', 'Helvetica Neue', sans-serif;
  --font-family-mono: 'SF Mono', Monaco, Consolas, monospace;
  
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  
  /* 间距系统 */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  
  /* 布局系统 */
  --container-max-width: 1200px;
  --slide-width: 960px;
  --slide-height: 540px;
  --header-height: 80px;
  
  /* 阴影系统 */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* 动画系统 */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
  
  /* Z-index 系统 */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

### 2. 响应式设计

#### 移动优先的媒体查询
```css
/* 移动设备优先 (默认样式) */
.slide-container {
  width: 100%;
  padding: var(--spacing-md);
}

/* 平板设备 */
@media (min-width: 768px) {
  .slide-container {
    max-width: 720px;
    margin: 0 auto;
    padding: var(--spacing-lg);
  }
}

/* 桌面设备 */
@media (min-width: 1024px) {
  .slide-container {
    max-width: var(--container-max-width);
    padding: var(--spacing-xl);
  }
}

/* 大屏设备 */
@media (min-width: 1440px) {
  .slide-container {
    max-width: 1400px;
  }
}
```

#### 容器查询 (现代浏览器)
```css
.slide-card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .slide-card__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
  }
}

@container (min-width: 600px) {
  .slide-card__content {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 3. 现代CSS特性

#### CSS Grid 布局
```css
.slide-grid {
  display: grid;
  gap: var(--spacing-lg);
  /* 自动列数 */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* 或固定列数 */
  grid-template-columns: repeat(12, 1fr);
}

.slide-grid__item {
  /* 跨列 */
  grid-column: span 4;
  
  /* 跨行 */
  grid-row: span 2;
  
  /* 命名网格线 */
  grid-column: main-start / main-end;
}

/* 复杂布局示例 */
.slide-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav content aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.slide-header { grid-area: header; }
.slide-nav { grid-area: nav; }
.slide-content { grid-area: content; }
.slide-aside { grid-area: aside; }
.slide-footer { grid-area: footer; }
```

#### Flexbox 布局
```css
.flex-container {
  display: flex;
  gap: var(--spacing-md);
}

/* 水平居中 */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 垂直布局 */
.flex-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* 响应式 Flexbox */
.flex-responsive {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.flex-responsive > * {
  flex: 1 1 300px; /* 基础宽度300px，可伸缩 */
}
```

#### CSS 自定义属性动态应用
```css
/* 主题切换 */
.theme-dark {
  --color-bg-primary: #1a1a1a;
  --color-bg-secondary: #2d2d2d;
  --color-text-primary: #ffffff;
  --color-text-secondary: #cccccc;
}

.theme-light {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-text-primary: #212529;
  --color-text-secondary: #6c757d;
}

.slide {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  transition: background var(--transition-normal);
}
```

### 4. 性能优化

#### CSS 优化技巧
```css
/* 使用 transform 而不是改变位置属性 */
.slide-transition {
  /* 避免 left/top/margin */
  transform: translateX(100px);
  transition: transform var(--transition-normal);
}

/* 使用 opacity 和 transform 进行动画 */
.slide-fade {
  opacity: 0;
  transform: translateY(20px);
  transition: 
    opacity var(--transition-normal),
    transform var(--transition-normal);
}

.slide-fade.active {
  opacity: 1;
  transform: translateY(0);
}

/* contain 属性优化 */
.slide-item {
  contain: layout style paint;
  /* 或使用更具体的 */
  contain: content;
}

/* will-change 优化 */
.slide-animated {
  will-change: transform, opacity;
}

/* 使用 GPU 加速 */
.gpu-accelerated {
  transform: translateZ(0);
  /* 或 */
  backface-visibility: hidden;
}
```

#### 关键CSS内联
```css
/* 首屏关键样式 */
.critical-above-the-fold {
  /* 首屏必需的样式 */
  
  .slide-header {
    background: var(--color-primary);
    color: white;
    padding: var(--spacing-md);
    text-align: center;
  }
  
  .slide-title {
    font-size: var(--font-size-2xl);
    font-weight: bold;
    margin: 0;
  }
}
```

### 5. 可维护性和可扩展性

#### BEM 命名约定
```css
/* Block */
.slide {}

/* Element */
.slide__header {}
.slide__content {}
.slide__footer {}

/* Modifier */
.slide--fullscreen {}
.slide--with-sidebar {}
.slide--dark-theme {}

/* 复杂示例 */
.presentation {}
.presentation__slide {}
.presentation__slide--active {}
.presentation__slide--transitioning {}

.presentation__controls {}
.presentation__controls--disabled {}

.presentation__button {}
.presentation__button--primary {}
.presentation__button--large {}
```

#### 组件化CSS
```css
/* 按钮组件 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: 4px;
  font-size: var(--font-size-base);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  min-height: 44px; /* 触摸友好 */
}

.btn:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--primary:hover {
  background: var(--color-primary-dark);
}

.btn--secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.btn--large {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

.btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

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