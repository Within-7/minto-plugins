/**
 * 质量保证验证技能模块
 * 多维度质量检查，确保输出符合专业标准
 */

class QualityAssuranceValidator {
    constructor() {
        this.validationRules = this.initializeValidationRules();
        this.checkers = new Map();
        this.initializeCheckers();
        
        this.qualityMetrics = {
            accessibility: 0,
            performance: 0,
            maintainability: 0,
            compliance: 0,
            usability: 0
        };
    }

    /**
     * 初始化验证规则
     */
    initializeValidationRules() {
        return {
            // 内容结构验证规则
            content_structure: {
                required_elements: ['title', 'header', 'content'],
                max_title_length: 60,
                max_content_per_slide: 500,
                min_slide_contrast: 4.5,
                required_alt_text: true
            },
            
            // 视觉设计验证规则
            visual_design: {
                color_contrast_min: 4.5,
                font_scale_consistency: true,
                spacing_consistency: true,
                brand_color_usage: true,
                grid_alignment: true
            },
            
            // 技术实现验证规则
            technical_implementation: {
                html5_semantic: true,
                css_modular: true,
                responsive_design: true,
                cross_browser: true,
                accessibility_wcag: 'AA'
            },
            
            // 性能验证规则
            performance: {
                max_file_size: '2MB',
                max_load_time: '3s',
                image_optimization: true,
                css_minification: true,
                js_optimization: true
            }
        };
    }

    /**
     * 初始化检查器
     */
    initializeCheckers() {
        this.checkers.set('structure', new StructureChecker());
        this.checkers.set('accessibility', new AccessibilityChecker());
        this.checkers.set('performance', new PerformanceChecker());
        this.checkers.set('visual', new VisualDesignChecker());
        this.checkers.set('compatibility', new CompatibilityChecker());
    }

    /**
     * 执行质量验证
     * @param {string} generatedHTML - 生成的HTML内容
     * @param {Array} validationRules - 验证规则数组
     * @returns {Object} 验证报告
     */
    async validate(generatedHTML, validationRules = []) {
        const report = {
            timestamp: new Date().toISOString(),
            overall_score: 0,
            status: 'pending',
            categories: {},
            issues: {
                errors: [],
                warnings: [],
                suggestions: []
            },
            metrics: { ...this.qualityMetrics },
            improvement_actions: []
        };

        try {
            // 1. 解析HTML内容
            const parsedContent = this.parseContent(generatedHTML);
            
            // 2. 执行各类检查
            const checks = validationRules.length > 0 ? validationRules : ['structure', 'accessibility', 'performance', 'visual', 'compatibility'];
            
            for (const checkType of checks) {
                const checker = this.checkers.get(checkType);
                if (checker) {
                    const categoryReport = await checker.check(parsedContent, this.validationRules);
                    report.categories[checkType] = categoryReport;
                    
                    // 聚合问题
                    this.aggregateIssues(report, categoryReport, checkType);
                    
                    // 更新质量指标
                    this.updateMetrics(report, categoryReport, checkType);
                }
            }
            
            // 3. 计算综合评分
            report.overall_score = this.calculateOverallScore(report.metrics);
            
            // 4. 确定状态
            report.status = this.determineStatus(report);
            
            // 5. 生成改进建议
            report.improvement_actions = this.generateImprovementActions(report);
            
            return report;
            
        } catch (error) {
            throw new Error(`质量验证失败: ${error.message}`);
        }
    }

    /**
     * 解析内容
     */
    parseContent(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        return {
            html: html,
            dom: doc,
            slides: Array.from(doc.querySelectorAll('.ppt-slide')),
            styles: Array.from(doc.querySelectorAll('style')).map(style => style.textContent),
            scripts: Array.from(doc.querySelectorAll('script')).map(script => script.textContent),
            metadata: this.extractMetadata(doc)
        };
    }

    /**
     * 提取元数据
     */
    extractMetadata(doc) {
        return {
            title: doc.querySelector('title')?.textContent || '',
            slide_count: doc.querySelectorAll('.ppt-slide').length,
            has_navigation: !!doc.querySelector('.navigation-controls'),
            has_download: !!document.getElementById('downloadBtn'),
            uses_external_library: doc.querySelector('script[src*="html2canvas"]') !== null
        };
    }

    /**
     * 聚合问题
     */
    aggregateIssues(report, categoryReport, category) {
        if (categoryReport.errors) {
            report.issues.errors.push(...categoryReport.errors.map(err => ({
                category,
                ...err
            })));
        }
        
        if (categoryReport.warnings) {
            report.issues.warnings.push(...categoryReport.warnings.map(warn => ({
                category,
                ...warn
            })));
        }
        
        if (categoryReport.suggestions) {
            report.issues.suggestions.push(...categoryReport.suggestions.map(sug => ({
                category,
                ...sug
            })));
        }
    }

    /**
     * 更新质量指标
     */
    updateMetrics(report, categoryReport, category) {
        if (categoryReport.score) {
            switch (category) {
                case 'accessibility':
                    report.metrics.accessibility = categoryReport.score;
                    break;
                case 'performance':
                    report.metrics.performance = categoryReport.score;
                    break;
                case 'visual':
                    report.metrics.usability = categoryReport.score;
                    break;
                case 'structure':
                    report.metrics.maintainability = categoryReport.score;
                    break;
                case 'compatibility':
                    report.metrics.compliance = categoryReport.score;
                    break;
            }
        }
    }

    /**
     * 计算综合评分
     */
    calculateOverallScore(metrics) {
        const scores = Object.values(metrics).filter(score => score > 0);
        if (scores.length === 0) return 0;
        
        const sum = scores.reduce((total, score) => total + score, 0);
        return Math.round(sum / scores.length);
    }

    /**
     * 确定状态
     */
    determineStatus(report) {
        if (report.issues.errors.length > 0) {
            return 'failed';
        } else if (report.overall_score >= 90) {
            return 'excellent';
        } else if (report.overall_score >= 80) {
            return 'good';
        } else if (report.overall_score >= 70) {
            return 'acceptable';
        } else {
            return 'needs_improvement';
        }
    }

    /**
     * 生成改进建议
     */
    generateImprovementActions(report) {
        const actions = [];
        
        // 基于错误生成修复建议
        report.issues.errors.forEach(error => {
            actions.push({
                priority: 'high',
                type: 'fix',
                description: `修复${error.category}类错误: ${error.message}`,
                category: error.category,
                impact: 'critical'
            });
        });
        
        // 基于警告生成优化建议
        report.issues.warnings.forEach(warning => {
            actions.push({
                priority: 'medium',
                type: 'improve',
                description: `优化${warning.category}类警告: ${warning.message}`,
                category: warning.category,
                impact: 'significant'
            });
        });
        
        // 基于建议生成增强建议
        report.issues.suggestions.forEach(suggestion => {
            actions.push({
                priority: 'low',
                type: 'enhance',
                description: `增强${suggestion.category}: ${suggestion.message}`,
                category: suggestion.category,
                impact: 'minor'
            });
        });
        
        // 按优先级排序
        return actions.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }

    /**
     * 生成详细报告
     */
    generateDetailedReport(validationReport) {
        return `
# 质量验证报告

## 概览
- **综合评分**: ${validationReport.overall_score}/100
- **验证状态**: ${validationReport.status}
- **验证时间**: ${validationReport.timestamp}
- **幻灯片数量**: ${validationReport.metrics.slide_count}

## 质量指标
- **可访问性**: ${validationReport.metrics.accessibility}/100
- **性能**: ${validationReport.metrics.performance}/100
- **可维护性**: ${validationReport.metrics.maintainability}/100
- **合规性**: ${validationReport.metrics.compliance}/100
- **可用性**: ${validationReport.metrics.usability}/100

## 问题汇总
### 错误 (${validationReport.issues.errors.length})
${validationReport.issues.errors.map(error => `- **${error.category}**: ${error.message}`).join('\n')}

### 警告 (${validationReport.issues.warnings.length})
${validationReport.issues.warnings.map(warning => `- **${warning.category}**: ${warning.message}`).join('\n')}

### 建议 (${validationReport.issues.suggestions.length})
${validationReport.issues.suggestions.map(suggestion => `- **${suggestion.category}**: ${suggestion.message}`).join('\n')}

## 改进计划
${validationReport.improvement_actions.slice(0, 5).map(action => 
    `1. [${action.priority.toUpperCase()}] ${action.description}`
).join('\n')}
`;
    }
}

/**
 * 结构检查器
 */
class StructureChecker {
    async check(content, rules) {
        const report = {
            score: 0,
            errors: [],
            warnings: [],
            suggestions: []
        };

        try {
            // 检查HTML结构
            if (!content.html.includes('<!DOCTYPE html>')) {
                report.errors.push({
                    message: '缺少DOCTYPE声明',
                    element: 'html',
                    fix: '添加<!DOCTYPE html>'
                });
            }

            // 检查幻灯片结构
            if (content.slides.length === 0) {
                report.errors.push({
                    message: '未找到幻灯片元素',
                    element: '.ppt-slide',
                    fix: '添加幻灯片容器'
                });
            } else {
                content.slides.forEach((slide, index) => {
                    const hasHeader = slide.querySelector('.slide-header');
                    const hasContent = slide.querySelector('.slide-content');
                    
                    if (!hasHeader) {
                        report.warnings.push({
                            message: `第${index + 1}页缺少标题区域`,
                            element: `.slide-${index} .slide-header`,
                            fix: '添加slide-header区域'
                        });
                    }
                    
                    if (!hasContent) {
                        report.warnings.push({
                            message: `第${index + 1}页缺少内容区域`,
                            element: `.slide-${index} .slide-content`,
                            fix: '添加slide-content区域'
                        });
                    }
                });
            }

            // 检查导航控件
            if (!content.metadata.has_navigation) {
                report.suggestions.push({
                    message: '建议添加导航控件',
                    element: '.navigation-controls',
                    fix: '添加上一页/下一页导航按钮'
                });
            }

            // 计算结构评分
            report.score = this.calculateStructureScore(report);

        } catch (error) {
            report.errors.push({
                message: `结构检查失败: ${error.message}`,
                element: 'structure',
                fix: '检查HTML结构完整性'
            });
        }

        return report;
    }

    calculateStructureScore(report) {
        let score = 100;
        score -= report.errors.length * 20;
        score -= report.warnings.length * 10;
        score -= report.suggestions.length * 5;
        return Math.max(0, score);
    }
}

/**
 * 可访问性检查器
 */
class AccessibilityChecker {
    async check(content, rules) {
        const report = {
            score: 0,
            errors: [],
            warnings: [],
            suggestions: []
        };

        try {
            // 检查颜色对比度
            this.checkColorContrast(content, report);
            
            // 检查语义化标签
            this.checkSemanticTags(content, report);
            
            // 检查可访问性属性
            this.checkAriaAttributes(content, report);
            
            // 检查键盘导航
            this.checkKeyboardNavigation(content, report);
            
            // 计算可访问性评分
            report.score = this.calculateAccessibilityScore(report);

        } catch (error) {
            report.errors.push({
                message: `可访问性检查失败: ${error.message}`,
                element: 'accessibility',
                fix: '检查可访问性标准实现'
            });
        }

        return report;
    }

    checkColorContrast(content, report) {
        // 模拟颜色对比度检查
        const hasDarkText = content.html.includes('color: #000') || content.html.includes('color: #333');
        const hasLightBackground = content.html.includes('background: #fff') || content.html.includes('background: #FFFFFF');
        
        if (!hasDarkText || !hasLightBackground) {
            report.warnings.push({
                message: '文本和背景可能缺乏足够对比度',
                element: 'color-contrast',
                fix: '确保文本颜色与背景色对比度至少为4.5:1'
            });
        }
    }

    checkSemanticTags(content, report) {
        const hasSemanticHeaders = content.html.includes('<h1>') || content.html.includes('<h2>');
        const hasNavElements = content.html.includes('<nav>');
        
        if (!hasSemanticHeaders) {
            report.errors.push({
                message: '缺少语义化标题标签',
                element: 'semantic-headers',
                fix: '使用h1, h2等语义化标题标签'
            });
        }
        
        if (!hasNavElements) {
            report.suggestions.push({
                message: '建议使用nav标签包裹导航元素',
                element: 'nav-element',
                fix: '使用<nav>标签包裹导航控件'
            });
        }
    }

    checkAriaAttributes(content, report) {
        const hasAriaLabels = content.html.includes('aria-') || content.html.includes('role=');
        
        if (!hasAriaLabels) {
            report.suggestions.push({
                message: '建议添加ARIA属性提升可访问性',
                element: 'aria-attributes',
                fix: '添加适当的aria-label和role属性'
            });
        }
    }

    checkKeyboardNavigation(content, report) {
        const hasKeyboardEvent = content.html.includes('keydown') || content.html.includes('addEventListener');
        
        if (!hasKeyboardEvent) {
            report.warnings.push({
                message: '缺少键盘导航支持',
                element: 'keyboard-navigation',
                fix: '添加键盘事件监听器支持方向键导航'
            });
        }
    }

    calculateAccessibilityScore(report) {
        let score = 100;
        score -= report.errors.length * 25;
        score -= report.warnings.length * 15;
        score -= report.suggestions.length * 10;
        return Math.max(0, score);
    }
}

/**
 * 性能检查器
 */
class PerformanceChecker {
    async check(content, rules) {
        const report = {
            score: 0,
            errors: [],
            warnings: [],
            suggestions: []
        };

        try {
            // 检查文件大小
            this.checkFileSize(content, report);
            
            // 检查CSS优化
            this.checkCSSOptimization(content, report);
            
            // 检查图片优化
            this.checkImageOptimization(content, report);
            
            // 检查外部库使用
            this.checkExternalLibraries(content, report);
            
            // 计算性能评分
            report.score = this.calculatePerformanceScore(report);

        } catch (error) {
            report.errors.push({
                message: `性能检查失败: ${error.message}`,
                element: 'performance',
                fix: '检查性能优化实现'
            });
        }

        return report;
    }

    checkFileSize(content, report) {
        const estimatedSize = new Blob([content.html]).size;
        const maxSizeKB = 2048; // 2MB
        
        if (estimatedSize > maxSizeKB * 1024) {
            report.warnings.push({
                message: `文件大小过大: ${Math.round(estimatedSize / 1024)}KB`,
                element: 'file-size',
                fix: '压缩CSS和JavaScript，优化图片资源'
            });
        }
    }

    checkCSSOptimization(content, report) {
        const hasMinifiedCSS = !content.html.includes(/\s+/g) || !content.html.includes(/;\s*}/g);
        
        if (!hasMinifiedCSS) {
            report.suggestions.push({
                message: '建议压缩CSS以减小文件大小',
                element: 'css-minification',
                fix: '移除CSS中的多余空白字符和注释'
            });
        }
    }

    checkImageOptimization(content, report) {
        const hasImages = content.html.includes('<img');
        
        if (hasImages) {
            // 检查是否有响应式图片
            const hasResponsiveImages = content.html.includes('srcset') || content.html.includes('sizes');
            
            if (!hasResponsiveImages) {
                report.suggestions.push({
                    message: '建议使用响应式图片优化加载性能',
                    element: 'responsive-images',
                    fix: '添加srcset和sizes属性'
                });
            }
        }
    }

    checkExternalLibraries(content, report) {
        const externalLibraries = content.dom.querySelectorAll('script[src]');
        
        if (externalLibraries.length > 0) {
            report.suggestions.push({
                message: `使用了${externalLibraries.length}个外部库，可能影响加载性能`,
                element: 'external-libraries',
                fix: '评估是否所有外部库都是必需的'
            });
        }
    }

    calculatePerformanceScore(report) {
        let score = 100;
        score -= report.errors.length * 20;
        score -= report.warnings.length * 10;
        score -= report.suggestions.length * 5;
        return Math.max(0, score);
    }
}

/**
 * 视觉设计检查器
 */
class VisualDesignChecker {
    async check(content, rules) {
        const report = {
            score: 0,
            errors: [],
            warnings: [],
            suggestions: []
        };

        try {
            // 检查设计一致性
            this.checkDesignConsistency(content, report);
            
            // 检查响应式设计
            this.checkResponsiveDesign(content, report);
            
            // 检查字体使用
            this.checkTypography(content, report);
            
            // 计算设计评分
            report.score = this.calculateDesignScore(report);

        } catch (error) {
            report.errors.push({
                message: `视觉设计检查失败: ${error.message}`,
                element: 'visual-design',
                fix: '检查视觉设计实现'
            });
        }

        return report;
    }

    checkDesignConsistency(content, report) {
        // 检查颜色使用一致性
        const colorMatches = content.html.match(/#[0-9a-fA-F]{6}/g) || [];
        const uniqueColors = new Set(colorMatches);
        
        if (uniqueColors.size > 8) {
            report.warnings.push({
                message: `使用了${uniqueColors.size}种不同颜色，建议精简色板`,
                element: 'color-consistency',
                fix: '建立统一的颜色规范，限制颜色数量'
            });
        }
    }

    checkResponsiveDesign(content, report) {
        const hasMediaQueries = content.html.includes('@media');
        const hasViewportMeta = content.html.includes('viewport');
        
        if (!hasMediaQueries) {
            report.errors.push({
                message: '缺少响应式设计支持',
                element: 'responsive-design',
                fix: '添加@media查询适配不同屏幕尺寸'
            });
        }
        
        if (!hasViewportMeta) {
            report.errors.push({
                message: '缺少viewport meta标签',
                element: 'viewport-meta',
                fix: '添加<meta name="viewport">标签'
            });
        }
    }

    checkTypography(content, report) {
        const fontFamilies = content.html.match(/font-family:[^;]+/g) || [];
        const uniqueFonts = new Set(fontFamilies);
        
        if (uniqueFonts.size > 3) {
            report.suggestions.push({
                message: `使用了${uniqueFonts.size}种不同字体，建议精简字体族`,
                element: 'typography',
                fix: '建立统一的字体规范，限制字体种类'
            });
        }
    }

    calculateDesignScore(report) {
        let score = 100;
        score -= report.errors.length * 15;
        score -= report.warnings.length * 8;
        score -= report.suggestions.length * 4;
        return Math.max(0, score);
    }
}

/**
 * 兼容性检查器
 */
class CompatibilityChecker {
    async check(content, rules) {
        const report = {
            score: 0,
            errors: [],
            warnings: [],
            suggestions: []
        };

        try {
            // 检查HTML5兼容性
            this.checkHTML5Compatibility(content, report);
            
            // 检查CSS兼容性
            this.checkCSSCompatibility(content, report);
            
            // 检查JavaScript兼容性
            this.checkJavaScriptCompatibility(content, report);
            
            // 计算兼容性评分
            report.score = this.calculateCompatibilityScore(report);

        } catch (error) {
            report.errors.push({
                message: `兼容性检查失败: ${error.message}`,
                element: 'compatibility',
                fix: '检查跨浏览器兼容性'
            });
        }

        return report;
    }

    checkHTML5Compatibility(content, report) {
        // 检查是否使用了过时的HTML标签
        const deprecatedTags = ['font', 'center', 'marquee'];
        
        deprecatedTags.forEach(tag => {
            if (content.html.includes(`<${tag}`)) {
                report.warnings.push({
                    message: `使用了过时的HTML标签: ${tag}`,
                    element: tag,
                    fix: `使用CSS替代${tag}标签`
                });
            }
        });
    }

    checkCSSCompatibility(content, report) {
        // 检查CSS属性的浏览器兼容性
        const modernCSS = ['grid', 'flexbox', 'var(', 'calc('];
        
        modernCSS.forEach(feature => {
            if (content.html.includes(feature)) {
                report.suggestions.push({
                    message: `使用了现代CSS特性: ${feature}`,
                    element: 'css-compatibility',
                    fix: '确保目标浏览器支持或添加前缀'
                });
            }
        });
    }

    checkJavaScriptCompatibility(content, report) {
        const modernJS = ['const ', 'let ', '=>', 'async/', 'await '];
        
        modernJS.forEach(feature => {
            if (content.html.includes(feature)) {
                report.suggestions.push({
                    message: `使用了现代JavaScript特性: ${feature}`,
                    element: 'js-compatibility',
                    fix: '考虑目标浏览器兼容性或使用Babel转译'
                });
            }
        });
    }

    calculateCompatibilityScore(report) {
        let score = 100;
        score -= report.errors.length * 15;
        score -= report.warnings.length * 8;
        score -= report.suggestions.length * 3;
        return Math.max(0, score);
    }
}

// 导出模块
module.exports = QualityAssuranceValidator;
if (typeof window !== 'undefined') {
    window.QualityAssuranceValidator = QualityAssuranceValidator;
}