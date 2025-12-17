/**
 * Markdown内容分析技能模块
 * 深度解析Markdown结构，智能识别标题层级、列表类型、表格数据等
 */

class MarkdownContentAnalyzer {
    constructor() {
        this.analysisRules = {
            headers: {
                patterns: [
                    /^#{1,6}\s+(.+)$/gm,  // 标题模式
                    /^#{1}$/m,            // H1
                    /^#{2}$/m,            // H2
                    /^#{3}$/m             // H3
                ]
            },
            lists: {
                unordered: /^[-*+]\s+(.+)$/gm,
                ordered: /^\d+\.\s+(.+)$/gm,
                nested: /^(\s{2,})[-*+]\s+(.+)$/gm
            },
            tables: {
                pattern: /^\|(.+)\|$/gm,
                separator: /^\|[-\s\|:]+\|$/m,
                headers: /^\|(.+)\|\n\|[-\s\|:]+\|/m
            },
            emphasis: {
                bold: /\*\*(.+?)\*\*/g,
                italic: /\*(.+?)\*/g,
                code: /`(.+?)`/g,
                code_block: /```[\s\S]*?```/g
            },
            links: /\[([^\]]+)\]\(([^)]+)\)/g,
            images: /!\[([^\]]*)\]\(([^)]+)\)/g
        };
        
        this.structureTypes = {
            cover: ['h1'],
            toc: ['h2', 'ul'],
            content: ['h2', 'h3', 'p', 'ul', 'ol', 'table'],
            chart: ['table', 'h3'],
            conclusion: ['h1', 'h2']
        };
    }

    /**
     * 分析Markdown内容并提取结构信息
     * @param {string} markdownContent - 原始Markdown内容
     * @returns {Object} 分析结果
     */
    analyze(markdownContent) {
        const analysis = {
            metadata: this.extractMetadata(markdownContent),
            structure: this.analyzeStructure(markdownContent),
            elements: this.extractElements(markdownContent),
            statistics: this.calculateStatistics(markdownContent),
            slideTypes: this.determineSlideTypes(markdownContent),
            recommendations: this.generateRecommendations(markdownContent)
        };

        // 验证分析结果
        return this.validateAnalysis(analysis);
    }

    /**
     * 提取元数据信息
     */
    extractMetadata(content) {
        const metadata = {
            wordCount: content.split(/\s+/).length,
            lineCount: content.split('\n').length,
            charCount: content.length,
            hasFrontMatter: /^---[\s\S]*?---/.test(content)
        };

        // 提取标题
        const titleMatch = content.match(/^#\s+(.+)$/m);
        if (titleMatch) {
            metadata.title = titleMatch[1].trim();
        }

        return metadata;
    }

    /**
     * 分析文档结构
     */
    analyzeStructure(content) {
        const structure = {
            hierarchy: [],
            sections: [],
            navigation: []
        };

        // 分析标题层级
        const headerMatches = [...content.matchAll(/^(#{1,6})\s+(.+)$/gm)];
        
        headerMatches.forEach((match, index) => {
            const level = match[1].length;
            const text = match[2].trim();
            
            structure.hierarchy.push({
                level,
                text,
                index,
                type: `h${level}`,
                id: `section-${index}`
            });

            // 构建章节结构
            if (level === 2) {
                structure.sections.push({
                    title: text,
                    id: `section-${index}`,
                    subsections: []
                });
            } else if (level === 3 && structure.sections.length > 0) {
                structure.sections[structure.sections.length - 1].subsections.push({
                    title: text,
                    id: `section-${index}`
                });
            }
        });

        return structure;
    }

    /**
     * 提取所有内容元素
     */
    extractElements(content) {
        const elements = {
            headers: this.extractHeaders(content),
            lists: this.extractLists(content),
            tables: this.extractTables(content),
            emphasis: this.extractEmphasis(content),
            links: this.extractLinks(content),
            images: this.extractImages(content),
            codeBlocks: this.extractCodeBlocks(content)
        };

        return elements;
    }

    /**
     * 提取标题
     */
    extractHeaders(content) {
        const headers = [];
        const matches = [...content.matchAll(/^(#{1,6})\s+(.+)$/gm)];
        
        matches.forEach((match, index) => {
            headers.push({
                level: match[1].length,
                text: match[2].trim(),
                id: `header-${index}`,
                type: `h${match[1].length}`
            });
        });

        return headers;
    }

    /**
     * 提取列表
     */
    extractLists(content) {
        const lists = [];
        const lines = content.split('\n');
        let currentList = null;

        lines.forEach((line, lineIndex) => {
            const unorderedMatch = line.match(/^(\s*)[-*+]\s+(.+)$/);
            const orderedMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
            
            if (unorderedMatch || orderedMatch) {
                const indent = unorderedMatch ? unorderedMatch[1] : orderedMatch[1];
                const text = unorderedMatch ? unorderedMatch[2] : orderedMatch[2];
                const type = unorderedMatch ? 'unordered' : 'ordered';
                
                if (!currentList || currentList.type !== type || currentList.indent !== indent) {
                    currentList = {
                        type,
                        indent,
                        items: [],
                        startLine: lineIndex
                    };
                    lists.push(currentList);
                }
                
                currentList.items.push({
                    text: text.trim(),
                    indent: indent.length,
                    line: lineIndex
                });
            } else if (currentList && line.trim() === '') {
                currentList = null;
            }
        });

        return lists;
    }

    /**
     * 提取表格
     */
    extractTables(content) {
        const tables = [];
        const lines = content.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('|')) {
                const table = this.parseTable(lines, i);
                if (table) {
                    tables.push(table);
                    i += table.lines - 1; // 跳过已处理的表格行
                }
            }
        }

        return tables;
    }

    /**
     * 解析表格
     */
    parseTable(lines, startLine) {
        const table = {
            headers: [],
            rows: [],
            lines: 0
        };

        let currentLine = startLine;
        let hasSeparator = false;

        while (currentLine < lines.length && lines[currentLine].startsWith('|')) {
            const line = lines[currentLine];
            const cells = line.split('|').slice(1, -1).map(cell => cell.trim());
            
            if (currentLine === startLine) {
                table.headers = cells;
            } else if (cells.some(cell => /^[-\s:]+$/.test(cell))) {
                hasSeparator = true;
            } else {
                table.rows.push(cells);
            }
            
            currentLine++;
            table.lines++;
        }

        return hasSeparator && table.headers.length > 0 ? table : null;
    }

    /**
     * 提取强调文本
     */
    extractEmphasis(content) {
        return {
            bold: [...content.matchAll(/\*\*(.+?)\*\*/g)].map(m => m[1]),
            italic: [...content.matchAll(/\*(.+?)\*/g)].map(m => m[1]),
            code: [...content.matchAll(/`(.+?)`/g)].map(m => m[1])
        };
    }

    /**
     * 提取链接
     */
    extractLinks(content) {
        return [...content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(match => ({
            text: match[1],
            url: match[2]
        }));
    }

    /**
     * 提取图片
     */
    extractImages(content) {
        return [...content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map(match => ({
            alt: match[1],
            src: match[2]
        }));
    }

    /**
     * 提取代码块
     */
    extractCodeBlocks(content) {
        return [...content.matchAll(/```(\w+)?\n([\s\S]*?)```/g)].map(match => ({
            language: match[1] || 'text',
            code: match[2]
        }));
    }

    /**
     * 计算统计信息
     */
    calculateStatistics(content) {
        return {
            totalElements: {
                headers: (content.match(/^#+\s+/gm) || []).length,
                lists: (content.match(/^[-*+]\s+/gm) || []).length,
                tables: (content.match(/^\|.*\|$/gm) || []).length,
                links: (content.match(/\[.*\]\(.*\)/g) || []).length,
                images: (content.match(/!\[.*\]\(.*\)/g) || []).length
            },
            complexity: this.calculateComplexity(content),
            estimatedSlides: this.estimateSlideCount(content)
        };
    }

    /**
     * 计算内容复杂度
     */
    calculateComplexity(content) {
        const factors = {
            headerDepth: this.getMaxHeaderLevel(content),
            listNesting: this.getMaxListNesting(content),
            tableComplexity: this.calculateTableComplexity(content),
            mixedContent: this.hasMixedContent(content)
        };

        return {
            score: Object.values(factors).reduce((sum, val) => sum + (typeof val === 'number' ? val : val ? 1 : 0), 0),
            factors
        };
    }

    /**
     * 获取最大标题级别
     */
    getMaxHeaderLevel(content) {
        const matches = content.match(/^#{1,6}/gm);
        return matches ? Math.max(...matches.map(m => m.length)) : 0;
    }

    /**
     * 获取最大列表嵌套深度
     */
    getMaxListNesting(content) {
        const listLines = content.match(/^(\s*)[-*+]\s+/gm);
        if (!listLines) return 0;
        
        return Math.max(...listLines.map(line => {
            const indent = line.match(/^(\s*)/)[1].length;
            return Math.floor(indent / 2);
        }));
    }

    /**
     * 计算表格复杂度
     */
    calculateTableComplexity(content) {
        const tables = this.extractTables(content);
        return tables.reduce((complexity, table) => {
            return complexity + (table.headers.length * table.rows.length);
        }, 0);
    }

    /**
     * 检查是否有混合内容
     */
    hasMixedContent(content) {
        const types = [
            content.match(/#{2,}/), // H2+标题
            content.match(/[-*+]\s+/), // 列表
            content.match(/\|.*\|/), // 表格
            content.match(/```/), // 代码块
            content.match(/!\[.*\]/) // 图片
        ];
        
        return types.filter(Boolean).length > 2;
    }

    /**
     * 估算幻灯片数量
     */
    estimateSlideCount(content) {
        const h2Count = (content.match(/^##\s+/gm) || []).length;
        const h1Count = (content.match(/^#\s+/gm) || []).length;
        const complexSections = (content.match(/#{3,}/gm) || []).length;
        
        return Math.max(1, h1Count + Math.ceil(h2Count / 2) + Math.ceil(complexSections / 3));
    }

    /**
     * 确定幻灯片类型
     */
    determineSlideTypes(content) {
        const slideTypes = [];
        const lines = content.split('\n');
        
        let currentSlide = null;
        
        lines.forEach((line, index) => {
            if (line.startsWith('# ')) {
                if (currentSlide) slideTypes.push(currentSlide);
                currentSlide = { type: 'cover', title: line.substring(2).trim(), startLine: index };
            } else if (line.startsWith('## 目录') || line.startsWith('## TOC')) {
                if (currentSlide) slideTypes.push(currentSlide);
                currentSlide = { type: 'toc', title: '目录', startLine: index };
            } else if (line.startsWith('## ')) {
                if (currentSlide) slideTypes.push(currentSlide);
                currentSlide = { type: 'content', title: line.substring(3).trim(), startLine: index };
            } else if (line.includes('|')) {
                if (currentSlide) currentSlide.type = 'chart';
            }
        });
        
        if (currentSlide) slideTypes.push(currentSlide);
        
        return slideTypes;
    }

    /**
     * 生成优化建议
     */
    generateRecommendations(content) {
        const recommendations = [];
        const stats = this.calculateStatistics(content);
        
        if (stats.complexity.score > 5) {
            recommendations.push({
                type: 'complexity',
                message: '内容复杂度较高，建议拆分为更多幻灯片',
                priority: 'high'
            });
        }
        
        if (stats.estimatedSlides > 15) {
            recommendations.push({
                type: 'length',
                message: '预计幻灯片数量较多，考虑精简内容或创建摘要版本',
                priority: 'medium'
            });
        }
        
        const hasImages = stats.totalElements.images > 0;
        if (!hasImages) {
            recommendations.push({
                type: 'visual',
                message: '建议添加图片或图表增强视觉效果',
                priority: 'low'
            });
        }
        
        return recommendations;
    }

    /**
     * 验证分析结果
     */
    validateAnalysis(analysis) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: []
        };

        // 检查必需字段
        if (!analysis.metadata.title) {
            validation.warnings.push('缺少主标题');
        }

        if (analysis.structure.hierarchy.length === 0) {
            validation.errors.push('未检测到任何标题结构');
            validation.isValid = false;
        }

        if (analysis.elements.headers.length === 0) {
            validation.warnings.push('文档缺少标题层次结构');
        }

        // 检查内容完整性
        if (analysis.metadata.wordCount < 10) {
            validation.warnings.push('内容过于简短');
        }

        return {
            ...analysis,
            validation
        };
    }
}

// 导出模块
module.exports = MarkdownContentAnalyzer;
if (typeof window !== 'undefined') {
    window.MarkdownContentAnalyzer = MarkdownContentAnalyzer;
}