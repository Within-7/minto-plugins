---
name: markdown-ppt-converter
description: Convert Markdown text to professional HTML PPT presentations with McKinsey/BCG-level design quality. Use when you need to create presentations from markdown content with specific styling requirements including 960x540px slide dimensions, professional color schemes, and download functionality.
allowed-tools: [Read, Write, Bash]
---

# Markdown to HTML PPT Converter Skill

## Purpose
Transform Markdown content into professional HTML presentations with:
- McKinsey/BCG-level design standards
- Fixed 960x540px slide dimensions
- Professional color scheme (#F85d42 orange, #556EE6 blue, etc.)
- Built-in download functionality using html2canvas
- Responsive design with navigation controls

## Activation Triggers
This skill activates when users request:
- "Convert markdown to PPT"
- "Generate HTML presentation"
- "Create slides from markdown"
- "Make presentation from [markdown content]"

## Conversion Rules

### 1. Content Analysis
- Identify markdown structure (headers, lists, tables, etc.)
- Determine slide boundaries based on content sections
- Extract title/subtitle information from first section

### 2. Slide Generation Process
```html
<!-- Standard slide structure -->
<div class="ppt-slide" id="slide-[number]">
  <div class="slide-header">
    <h1 class="slide-title">[Title]</h1>
  </div>
  <div class="slide-content">
    <div class="content-card">[Content]</div>
  </div>
</div>
```

### 3. Color Scheme Application
- **Primary Background**: #FFFFFF (white)
- **Title Bar Background**: #000000 (black)
- **Primary Emphasis**: #F85d42 (orange)
- **Secondary Colors**:
  - #556EE6 (deep blue)
  - #34c38f (green)
  - #50a5f1 (light blue)
  - #f1b44c (yellow)

### 4. Typography Standards
- **Slide Titles**: 32-40px, bold, white (on black background)
- **Section Headers**: 24-28px, bold, using emphasis colors
- **Body Text**: 16-20px, regular weight, black/dark gray
- **Emphasis Text**: #F85d42 orange or bold weight

## HTML Template Structure

### Complete PPT HTML Template
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[PPT_TITLE]</title>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <style>
        /* Core slide dimensions and layout */
        .ppt-slide {
            width: 960px;
            height: 540px;
            background: #FFFFFF;
            font-family: 'Arial', 'Microsoft YaHei', sans-serif;
            margin: 0 auto;
            position: relative;
            display: none;
        }
        
        .ppt-slide.active {
            display: block;
        }
        
        /* Header styling */
        .slide-header {
            background: #000000;
            color: #FFFFFF;
            padding: 20px;
            text-align: center;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .slide-title {
            font-size: 36px;
            font-weight: bold;
            margin: 0;
            color: #FFFFFF;
        }
        
        /* Content area */
        .slide-content {
            padding: 40px;
            height: calc(540px - 80px);
            overflow: hidden;
        }
        
        /* Card-based layout */
        .content-card {
            background: #FFFFFF;
            border: 1px solid #E0E0E0;
            border-radius: 8px;
            padding: 24px;
            margin: 16px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* Typography hierarchy */
        .slide-subtitle {
            font-size: 28px;
            font-weight: bold;
            color: #556EE6;
            margin-bottom: 20px;
        }
        
        .slide-text {
            font-size: 18px;
            line-height: 1.6;
            color: #333333;
            margin-bottom: 16px;
        }
        
        /* Emphasis and highlighting */
        .highlight {
            color: #F85d42;
            font-weight: bold;
        }
        
        .key-data {
            color: #F85d42;
            font-size: 24px;
            font-weight: bold;
        }
        
        /* List styling */
        .bullet-list {
            list-style: none;
            padding-left: 0;
        }
        
        .bullet-list li {
            position: relative;
            padding-left: 24px;
            margin-bottom: 12px;
            font-size: 18px;
            line-height: 1.5;
        }
        
        .bullet-list li::before {
            content: "•";
            color: #F85d42;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        /* Table styling */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 16px;
        }
        
        .data-table th {
            background: #000000;
            color: #FFFFFF;
            padding: 12px;
            text-align: left;
            font-weight: bold;
        }
        
        .data-table td {
            padding: 12px;
            border-bottom: 1px solid #E0E0E0;
        }
        
        .data-table tr:nth-child(even) {
            background: #F8F9FA;
        }
        
        /* Navigation controls */
        .ppt-controls {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            padding: 15px;
            border-radius: 25px;
            display: flex;
            gap: 10px;
            z-index: 1000;
        }
        
        .ppt-btn {
            background: #F85d42;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: background 0.3s;
        }
        
        .ppt-btn:hover {
            background: #D73C2B;
        }
        
        .ppt-btn:disabled {
            background: #666666;
            cursor: not-allowed;
        }
        
        #slideCounter {
            color: white;
            display: flex;
            align-items: center;
            font-size: 14px;
            min-width: 60px;
            justify-content: center;
        }
        
        /* Loading overlay */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .loading-spinner {
            color: white;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <!-- Slides will be inserted here -->
    
    <!-- Navigation Controls -->
    <div class="ppt-controls">
        <button id="prevBtn" class="ppt-btn" onclick="changeSlide(-1)">← 上一页</button>
        <span id="slideCounter">1 / 1</span>
        <button id="nextBtn" class="ppt-btn" onclick="changeSlide(1)">下一页 →</button>
        <button id="downloadBtn" class="ppt-btn" onclick="downloadCurrentSlide()">📥 下载当前页</button>
    </div>
    
    <!-- Loading Overlay -->
    <div id="loadingOverlay" class="loading-overlay">
        <div class="loading-spinner">正在生成图片...</div>
    </div>

    <script>
        // Navigation and download functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.ppt-slide');
        const totalSlides = slides.length;

        function showSlide(n) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (n + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
            
            // Update navigation buttons and counter
            document.getElementById('prevBtn').disabled = currentSlide === 0;
            document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
            document.getElementById('slideCounter').textContent = `${currentSlide + 1} / ${totalSlides}`;
        }

        function changeSlide(direction) {
            showSlide(currentSlide + direction);
        }

        // Download current slide as image - optimized for 960x540
        async function downloadCurrentSlide() {
            const downloadBtn = document.getElementById('downloadBtn');
            const loadingOverlay = document.getElementById('loadingOverlay');
            
            try {
                // Show loading state
                downloadBtn.disabled = true;
                downloadBtn.textContent = '生成中...';
                loadingOverlay.style.display = 'flex';

                // Get current active slide
                const currentSlideElement = slides[currentSlide];
                
                // Use html2canvas to generate image - strictly 960x540 dimensions
                const canvas = await html2canvas(currentSlideElement, {
                    scale: 2, // High quality
                    backgroundColor: '#FFFFFF',
                    width: 960,
                    height: 540,
                    useCORS: true,
                    allowTaint: true,
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: 960,
                    windowHeight: 540
                });

                // Convert canvas to image
                const imageData = canvas.toDataURL('image/png', 1.0);
                
                // Create download link
                const link = document.createElement('a');
                link.download = `PPT_第${currentSlide + 1}页_960x540.png`;
                link.href = imageData;
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show success feedback
                showDownloadSuccess();

            } catch (error) {
                console.error('下载失败:', error);
                alert('下载失败，请重试。错误信息: ' + error.message);
            } finally {
                // Hide loading state
                loadingOverlay.style.display = 'none';
                downloadBtn.disabled = false;
                downloadBtn.textContent = '📥 下载当前页';
            }
        }

        function showDownloadSuccess() {
            const downloadBtn = document.getElementById('downloadBtn');
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = '✅ 下载成功！';
            downloadBtn.style.background = '#34c38f';
            
            setTimeout(() => {
                downloadBtn.textContent = originalText;
                downloadBtn.style.background = '#F85d42';
            }, 2000);
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (event.key === 'ArrowRight') {
                changeSlide(1);
            } else if (event.key === 'd' || event.key === 'D') {
                downloadCurrentSlide();
            }
        });

        // Initialize
        showSlide(0);

        // Check html2canvas availability
        window.addEventListener('load', function() {
            if (typeof html2canvas === 'undefined') {
                console.error('html2canvas库加载失败，下载功能将无法使用');
                document.getElementById('downloadBtn').disabled = true;
                document.getElementById('downloadBtn').textContent = '下载功能不可用';
            }
        });
    </script>
</body>
</html>
```

## Usage Instructions

1. **Test locally first:**
   ```bash
   /plugin marketplace add ./markdown-ppt-generator
   /plugin install markdown-ppt-generator@markdown-ppt-tools
   ```

2. **Then use the skill:**
   ```
   Convert this markdown to a PPT presentation:
   
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
   
   ### 后端技术栈
   - Node.js + Express
   - MongoDB数据库
   - Redis缓存
   ```

3. **The skill will generate a complete HTML file with:**
   - Professional styling matching your specifications
   - 960x540px slide dimensions
   - Download functionality for each slide
   - Navigation controls
   - McKinsey/BCG-level design quality

This plugin follows Claude Code best practices and provides a complete solution for your markdown-to-PPT conversion needs. You can extend it further by adding more slide templates, animations, or additional styling options.