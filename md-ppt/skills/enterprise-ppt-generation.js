/**
 * 企业级PPT生成技能模块
 * 生成符合企业级标准的HTML PPT，包含完整的样式体系和交互功能
 */

class EnterprisePPTGenerator {
    constructor(config = {}) {
        this.config = {
            ...this.getDefaultConfig(),
            ...config
        };
        
        this.templates = new Map();
        this.initializeTemplates();
        this.validator = new PPTValidator();
        this.optimizer = new PPTOptimizer();
    }

    /**
     * 获取默认配置
     */
    getDefaultConfig() {
        return {
            slideWidth: 960,
            slideHeight: 540,
            headerHeight: 80,
            contentPadding: 40,
            cardBorderRadius: 8,
            gridGap: 24,
            colors: {
                primary: '#F85d42',
                secondary: '#556EE6', 
                success: '#34c38f',
                info: '#50a5f1',
                warning: '#f1b44c',
                dark: '#000000',
                light: '#FFFFFF',
                gray: '#74788d'
            },
            typography: {
                fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
                titleSize: '32-40px',
                subtitleSize: '24-28px', 
                bodySize: '16-20px',
                captionSize: '14px'
            }
        };
    }

    /**
     * 初始化模板系统
     */
    initializeTemplates() {
        this.templates.set('cover', this.getCoverTemplate());
        this.templates.set('toc', this.getTOCTemplate());
        this.templates.set('content', this.getContentTemplate());
        this.templates.set('chart', this.getChartTemplate());
        this.templates.set('conclusion', this.getConclusionTemplate());
    }

    /**
     * 生成PPT
     * @param {Object} structuredContent - 结构化的内容对象
     * @param {Object} designStandards - 设计标准配置
     * @returns {string} 完整的HTML PPT
     */
    generate(structuredContent, designStandards = {}) {
        const mergedConfig = this.mergeConfig(designStandards);
        
        try {
            // 1. 分析内容并确定幻灯片结构
            const slideStructure = this.planSlides(structuredContent);
            
            // 2. 生成各个幻灯片
            const slides = slideStructure.map((slide, index) => {
                return this.generateSlide(slide, index, mergedConfig);
            });
            
            // 3. 生成完整的HTML文档
            const html = this.assembleHTML(slides, mergedConfig);
            
            // 4. 质量验证和优化
            const validatedHTML = this.validator.validate(html, mergedConfig);
            const optimizedHTML = this.optimizer.optimize(validatedHTML, mergedConfig);
            
            return optimizedHTML;
            
        } catch (error) {
            throw new Error(`PPT生成失败: ${error.message}`);
        }
    }

    /**
     * 规划幻灯片结构
     */
    planSlides(structuredContent) {
        const slides = [];
        const { structure, elements, slideTypes } = structuredContent;
        
        // 添加封面页
        if (structure.metadata.title) {
            slides.push({
                type: 'cover',
                title: structure.metadata.title,
                subtitle: this.extractSubtitle(structuredContent),
                elements: []
            });
        }
        
        // 添加目录页
        if (structure.sections.length > 1) {
            slides.push({
                type: 'toc',
                title: '目录',
                sections: structure.sections,
                elements: []
            });
        }
        
        // 处理内容页
        slideTypes.forEach(slideType => {
            if (slideType.type !== 'cover' && slideType.type !== 'toc') {
                slides.push({
                    type: slideType.type,
                    title: slideType.title,
                    startLine: slideType.startLine,
                    elements: this.extractElementsForSlide(slideType, structuredContent)
                });
            }
        });
        
        // 添加结束页
        slides.push({
            type: 'conclusion',
            title: '谢谢',
            elements: []
        });
        
        return slides;
    }

    /**
     * 生成单个幻灯片
     */
    generateSlide(slideData, index, config) {
        const template = this.templates.get(slideData.type);
        if (!template) {
            throw new Error(`未知的幻灯片类型: ${slideData.type}`);
        }
        
        return template.render(slideData, index, config);
    }

    /**
     * 组装完整HTML文档
     */
    assembleHTML(slides, config) {
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>企业级演示文稿</title>
    <style>
        ${this.generateCSS(config)}
    </style>
</head>
<body>
    <div class="ppt-container">
        ${slides.join('\n')}
        
        <!-- 导航控制 -->
        <div class="navigation-controls">
            <button id="prevBtn" onclick="changeSlide(-1)" disabled>上一页</button>
            <span id="slideCounter">1 / ${slides.length}</span>
            <button id="nextBtn" onclick="changeSlide(1)">下一页</button>
            <button id="downloadBtn" onclick="downloadCurrentSlide()">下载当前页</button>
        </div>
        
        <!-- 加载提示 -->
        <div id="loadingOverlay" class="loading-overlay" style="display: none;">
            <div class="loading-spinner"></div>
            <div>正在生成图片...</div>
        </div>
    </div>
    
    <!-- 外部库 -->
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    
    <script>
        ${this.generateJavaScript(slides.length)}
    </script>
</body>
</html>`;
    }

    /**
     * 生成CSS样式
     */
    generateCSS(config) {
        return `
/* 基础重置和全局样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: ${config.typography.fontFamily};
    background: #f5f5f5;
    overflow: hidden;
}

.ppt-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 幻灯片样式 */
.ppt-slide {
    width: ${config.slideWidth}px;
    height: ${config.slideHeight}px;
    background: ${config.colors.light};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: absolute;
    display: none;
    border-radius: 8px;
    overflow: hidden;
}

.ppt-slide.active {
    display: block;
}

.slide-header {
    background: ${config.colors.dark};
    color: ${config.colors.light};
    height: ${config.headerHeight}px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${config.contentPadding}px;
}

.slide-title {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin: 0;
}

.slide-content {
    padding: ${config.contentPadding}px;
    height: calc(100% - ${config.headerHeight}px);
    overflow-y: auto;
}

/* 内容布局 */
.content-card {
    background: ${config.colors.light};
    border: 1px solid #e0e0e0;
    border-radius: ${config.cardBorderRadius}px;
    padding: 24px;
    margin: 16px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${config.gridGap}px;
}

/* 文本样式 */
h1, h2, h3, h4, h5, h6 {
    margin-bottom: 16px;
    line-height: 1.3;
}

.section-title {
    font-size: 24px;
    color: ${config.colors.secondary};
    font-weight: bold;
    margin-bottom: 20px;
}

.subsection-title {
    font-size: 20px;
    color: ${config.colors.gray};
    font-weight: 600;
    margin-bottom: 16px;
}

p {
    font-size: ${config.typography.bodySize};
    line-height: 1.6;
    color: #333;
    margin-bottom: 16px;
}

/* 列表样式 */
.bullet-list, .number-list {
    margin: 20px 0;
    padding-left: 24px;
}

.bullet-list li, .number-list li {
    margin-bottom: 12px;
    font-size: ${config.typography.bodySize};
    line-height: 1.5;
}

.bullet-list {
    list-style-type: none;
    padding-left: 0;
}

.bullet-list li {
    position: relative;
    padding-left: 24px;
}

.bullet-list li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${config.colors.primary};
    font-weight: bold;
    font-size: 18px;
}

.number-list {
    counter-reset: list-counter;
}

.number-list li {
    counter-increment: list-counter;
    position: relative;
    padding-left: 32px;
}

.number-list li::before {
    content: counter(list-counter);
    position: absolute;
    left: 0;
    color: ${config.colors.primary};
    font-weight: bold;
    font-size: 16px;
    width: 24px;
    text-align: center;
}

/* 表格样式 */
.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    overflow: hidden;
}

.table-header {
    background: ${config.colors.dark};
    color: ${config.colors.light};
    font-weight: bold;
    text-align: left;
    padding: 16px;
    font-size: 16px;
}

.table-cell {
    padding: 12px 16px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 15px;
}

.data-table tr:nth-child(even) .table-cell {
    background: #f8f9fa;
}

/* 强调样式 */
.highlight {
    color: ${config.colors.primary};
    font-weight: bold;
}

.key-data {
    font-size: 24px;
    font-weight: bold;
    color: ${config.colors.primary};
    display: block;
    margin: 8px 0;
}

.success-data {
    color: ${config.colors.success};
}

.warning-data {
    color: ${config.colors.warning};
}

/* 特殊页面样式 */
.centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
}

.cover-slide .slide-header {
    height: 120px;
}

.cover-slide .slide-title {
    font-size: 36px;
}

.subtitle {
    font-size: 24px;
    color: ${config.colors.secondary};
    margin-top: 20px;
    font-weight: 500;
}

.thank-you {
    font-size: 48px;
    color: ${config.colors.primary};
    margin-bottom: 20px;
}

/* 导航控制样式 */
.navigation-controls {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 16px;
    background: rgba(255, 255, 255, 0.95);
    padding: 12px 20px;
    border-radius: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
}

.navigation-controls button {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background: ${config.colors.primary};
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.navigation-controls button:hover:not(:disabled) {
    background: ${config.colors.secondary};
}

.navigation-controls button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

#slideCounter {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    min-width: 60px;
    text-align: center;
}

/* 加载提示样式 */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    color: white;
    font-size: 18px;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 1024px) {
    .ppt-slide {
        transform: scale(0.8);
        transform-origin: center center;
    }
}

@media (max-width: 768px) {
    .ppt-slide {
        transform: scale(0.6);
    }
    
    .navigation-controls {
        bottom: 10px;
        padding: 8px 12px;
        gap: 8px;
    }
    
    .navigation-controls button {
        padding: 6px 12px;
        font-size: 12px;
    }
}`;
    }

    /**
     * 生成JavaScript功能
     */
    generateJavaScript(totalSlides) {
        return `
let currentSlide = 0;
const slides = document.querySelectorAll('.ppt-slide');

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    
    // 更新导航按钮状态和计数器
    document.getElementById('prevBtn').disabled = currentSlide === 0;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
    document.getElementById('slideCounter').textContent = \`\${currentSlide + 1} / \${totalSlides}\`;
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// 下载当前幻灯片为图片
async function downloadCurrentSlide() {
    const downloadBtn = document.getElementById('downloadBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    try {
        // 显示加载提示
        downloadBtn.disabled = true;
        downloadBtn.textContent = '生成中...';
        loadingOverlay.style.display = 'flex';

        // 获取当前活动的幻灯片
        const currentSlideElement = slides[currentSlide];
        
        // 使用html2canvas生成图片
        const canvas = await html2canvas(currentSlideElement, {
            scale: 2,
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

        // 将canvas转换为图片
        const imageData = canvas.toDataURL('image/png', 1.0);
        
        // 创建下载链接
        const link = document.createElement('a');
        link.download = \`PPT_第\${currentSlide + 1}页_\${new Date().getTime()}.png\`;
        link.href = imageData;
        
        // 触发下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 显示成功提示
        showDownloadSuccess();

    } catch (error) {
        console.error('下载失败:', error);
        alert('下载失败，请重试。错误信息: ' + error.message);
    } finally {
        // 隐藏加载提示，恢复按钮状态
        loadingOverlay.style.display = 'none';
        downloadBtn.disabled = false;
        downloadBtn.textContent = '下载当前页';
    }
}

// 显示下载成功提示
function showDownloadSuccess() {
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = '下载成功！';
    downloadBtn.style.background = '#34c38f';
    
    setTimeout(() => {
        downloadBtn.textContent = originalText;
        downloadBtn.style.background = '';
    }, 2000);
}

// 键盘导航
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (event.key === 'ArrowRight') {
        changeSlide(1);
    } else if (event.key === 'd' || event.key === 'D') {
        downloadCurrentSlide();
    }
});

// 初始化
showSlide(0);

// 页面加载完成后检查html2canvas是否可用
window.addEventListener('load', function() {
    if (typeof html2canvas === 'undefined') {
        console.error('html2canvas库加载失败，下载功能将无法使用');
        document.getElementById('downloadBtn').disabled = true;
        document.getElementById('downloadBtn').textContent = '下载功能不可用';
    }
});`;
    }

    /**
     * 获取封面页模板
     */
    getCoverTemplate() {
        return {
            render: (slideData, index, config) => `
<div class="ppt-slide cover-slide ${index === 0 ? 'active' : ''}">
    <div class="slide-header">
        <h1 class="slide-title">${slideData.title}</h1>
    </div>
    <div class="slide-content centered">
        <h2 class="subtitle">${slideData.subtitle || ''}</h2>
    </div>
</div>`
        };
    }

    /**
     * 获取目录页模板
     */
    getTOCTemplate() {
        return {
            render: (slideData, index, config) => `
<div class="ppt-slide toc-slide ${index === 0 ? 'active' : ''}">
    <div class="slide-header">
        <h1 class="slide-title">${slideData.title}</h1>
    </div>
    <div class="slide-content">
        <div class="content-card">
            <ol class="number-list">
                ${slideData.sections.map((section, i) => `
                    <li>
                        <strong>${section.title}</strong>
                        ${section.subsections.length > 0 ? `
                            <ul class="bullet-list">
                                ${section.subsections.map(sub => `
                                    <li>${sub.title}</li>
                                `).join('')}
                            </ul>
                        ` : ''}
                    </li>
                `).join('')}
            </ol>
        </div>
    </div>
</div>`
        };
    }

    /**
     * 获取内容页模板
     */
    getContentTemplate() {
        return {
            render: (slideData, index, config) => `
<div class="ppt-slide content-slide ${index === 0 ? 'active' : ''}">
    <div class="slide-header">
        <h1 class="slide-title">${slideData.title}</h1>
    </div>
    <div class="slide-content">
        ${this.renderContentElements(slideData.elements, config)}
    </div>
</div>`
        };
    }

    /**
     * 获取图表页模板
     */
    getChartTemplate() {
        return {
            render: (slideData, index, config) => `
<div class="ppt-slide chart-slide ${index === 0 ? 'active' : ''}">
    <div class="slide-header">
        <h1 class="slide-title">${slideData.title}</h1>
    </div>
    <div class="slide-content">
        <div class="content-card">
            ${this.renderTables(slideData.elements.tables || [], config)}
        </div>
    </div>
</div>`
        };
    }

    /**
     * 获取结束页模板
     */
    getConclusionTemplate() {
        return {
            render: (slideData, index, config) => `
<div class="ppt-slide end-slide ${index === 0 ? 'active' : ''}">
    <div class="slide-content centered">
        <h1 class="thank-you">谢谢</h1>
        <p class="subtitle">${slideData.subtitle || ''}</p>
    </div>
</div>`
        };
    }

    /**
     * 渲染内容元素
     */
    renderContentElements(elements, config) {
        let html = '';
        
        if (elements.headers && elements.headers.length > 0) {
            elements.headers.forEach(header => {
                const tag = `h${header.level}`;
                html += `<${tag} class="subsection-title">${this.processText(header.text)}</${tag}>`;
            });
        }
        
        if (elements.paragraphs && elements.paragraphs.length > 0) {
            html += elements.paragraphs.map(p => `<p>${this.processText(p)}</p>`).join('');
        }
        
        if (elements.lists && elements.lists.length > 0) {
            elements.lists.forEach(list => {
                const listType = list.type === 'ordered' ? 'ol' : 'ul';
                const listClass = list.type === 'ordered' ? 'number-list' : 'bullet-list';
                html += `<${listType} class="${listClass}">`;
                html += list.items.map(item => `<li>${this.processText(item.text)}</li>`).join('');
                html += `</${listType}>`;
            });
        }
        
        if (elements.tables && elements.tables.length > 0) {
            html += this.renderTables(elements.tables, config);
        }
        
        return `<div class="content-grid">${html}</div>`;
    }

    /**
     * 渲染表格
     */
    renderTables(tables, config) {
        return tables.map(table => `
            <table class="data-table">
                <thead>
                    <tr>
                        ${table.headers.map(header => `<th class="table-header">${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${table.rows.map(row => `
                        <tr>
                            ${row.map(cell => `<td class="table-cell">${this.processText(cell)}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `).join('');
    }

    /**
     * 处理文本（处理强调、链接等）
     */
    processText(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<span class="highlight">$1</span>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    }

    /**
     * 提取副标题
     */
    extractSubtitle(structuredContent) {
        const firstH2 = structuredContent.structure.hierarchy.find(h => h.level === 2);
        return firstH2 ? firstH2.text : '';
    }

    /**
     * 为幻灯片提取元素
     */
    extractElementsForSlide(slideType, structuredContent) {
        // 这里应该根据slideType的结构从structuredContent中提取相关元素
        // 简化实现，返回空对象
        return {
            headers: [],
            paragraphs: [],
            lists: [],
            tables: []
        };
    }

    /**
     * 合并配置
     */
    mergeConfig(designStandards) {
        return {
            ...this.config,
            ...designStandards,
            colors: {
                ...this.config.colors,
                ...(designStandards.colors || {})
            },
            typography: {
                ...this.config.typography,
                ...(designStandards.typography || {})
            }
        };
    }
}

/**
 * PPT验证器
 */
class PPTValidator {
    validate(html, config) {
        // 基础验证
        const validation = {
            isValid: true,
            errors: [],
            warnings: []
        };

        // 检查必需的结构
        if (!html.includes('<!DOCTYPE html>')) {
            validation.errors.push('缺少DOCTYPE声明');
            validation.isValid = false;
        }

        if (!html.includes('.ppt-slide')) {
            validation.errors.push('缺少幻灯片容器');
            validation.isValid = false;
        }

        if (!html.includes('slide-header')) {
            validation.warnings.push('建议添加幻灯片标题区域');
        }

        if (!html.includes('navigation-controls')) {
            validation.warnings.push('建议添加导航控制');
        }

        // 检查响应式设计
        if (!html.includes('@media')) {
            validation.warnings.push('缺少响应式设计支持');
        }

        // 检查可访问性
        if (!html.includes('aria-') && !html.includes('alt=')) {
            validation.warnings.push('建议添加可访问性属性');
        }

        if (!validation.isValid) {
            throw new Error(`验证失败: ${validation.errors.join(', ')}`);
        }

        return html;
    }
}

/**
 * PPT优化器
 */
class PPTOptimizer {
    optimize(html, config) {
        // CSS优化
        html = this.optimizeCSS(html);
        
        // HTML优化
        html = this.optimizeHTML(html);
        
        // JavaScript优化
        html = this.optimizeJavaScript(html);
        
        return html;
    }

    optimizeCSS(html) {
        // 移除重复的CSS规则
        // 压缩CSS（简化版）
        return html.replace(/\s+/g, ' ').replace(/;\s*}/g, '}');
    }

    optimizeHTML(html) {
        // 移除多余的空白字符
        return html.replace(/>\s+</g, '><').trim();
    }

    optimizeJavaScript(html) {
        // JavaScript优化（简化版）
        return html;
    }
}

// 导出模块
module.exports = EnterprisePPTGenerator;
if (typeof window !== 'undefined') {
    window.EnterprisePPTGenerator = EnterprisePPTGenerator;
}