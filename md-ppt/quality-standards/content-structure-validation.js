/**
 * 内容结构验证模块
 * 确保Markdown和HTML内容结构的完整性和一致性
 */

class ContentStructureValidator {
    constructor(options = {}) {
        this.options = {
            strictMode: options.strictMode || false,
            maxTitleLength: options.maxTitleLength || 60,
            maxContentLength: options.maxContentLength || 500,
            minSlideContrast: options.minSlideContrast || 4.5,
            requiredAltText: options.requiredAltText !== false,
            ...options
        };
        
        this.validationRules = this.initializeValidationRules();
        this.errorCategories = ['critical', 'warning', 'info'];
        this.stats = {
            totalChecks: 0,
            passedChecks: 0,
            failedChecks: 0,
            warnings: 0
        };
    }

    /**
     * 初始化验证规则
     */
    initializeValidationRules() {
        return {
            // 标题验证规则
            title: {
                required: true,
                maxLength: this.options.maxTitleLength,
                minLength: 1,
                pattern: /^.+\S.+$/, // 不能全是空白字符
                disallowedChars: ['<', '>', '&', '"', "'"],
                levelLimits: {
                    h1: { min: 1, max: 1 },    // 只能有一个H1
                    h2: { min: 0, max: 20 },   // H2数量限制
                    h3: { min: 0, max: 50 }    // H3数量限制
                }
            },
            
            // 内容验证规则
            content: {
                required: true,
                maxLength: this.options.maxContentLength,
                minLength: 10,
                mustHaveStructure: true,       // 必须有结构化内容
                noEmptyParagraphs: true,       // 不能有空段落
                maxNestingLevel: 6             // 最大嵌套层级
            },
            
            // 列表验证规则
            list: {
                consistentStyle: true,          // 列表样式必须一致
                minItems: 1,                   // 最少1个项目
                maxItems: 10,                  // 最多10个项目
                maxNesting: 3                  // 最大嵌套深度
            },
            
            // 表格验证规则
            table: {
                requiredHeaders: true,         // 必须有表头
                consistentColumns: true,       // 列数必须一致
                maxColumns: 8,                 // 最多8列
                maxRows: 20,                   // 最多20行
                noEmptyCells: false            // 允许空单元格
            },
            
            // 链接验证规则
            link: {
                validURL: true,                // URL必须有效
                hasText: true,                 // 链接必须有文本
                noBrokenLinks: true,           // 不能有失效链接
                maxExternalLinks: 10           // 最多10个外部链接
            },
            
            // 图片验证规则
            image: {
                hasAltText: this.options.requiredAltText,  // 必须有alt文本
                validFormat: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
                maxSize: '5MB',                // 最大文件大小
                hasDimensions: false           // 可以没有尺寸
            },
            
            // 代码块验证规则
            code: {
                hasLanguage: true,             // 建议有语言标识
                maxLength: 1000,               // 最大长度
                mustBeEscaped: true            // HTML必须转义
            },
            
            // 结构验证规则
            structure: {
                hasTableOfContents: false,     // 可选目录
                logicalFlow: true,             // 必须有逻辑流
                consistentHierarchy: true,     // 层次必须一致
                noOrphanedContent: true       // 不能有孤立内容
            }
        };
    }

    /**
     * 验证内容结构
     * @param {string|Object} content - 输入内容(Markdown或HTML)
     * @param {string} contentType - 内容类型 ('markdown' | 'html')
     * @returns {Object} 验证结果
     */
    async validate(content, contentType = 'markdown') {
        const validationResult = {
            isValid: true,
            score: 100,
            errors: [],
            warnings: [],
            info: [],
            metadata: {
                contentType,
                validationTime: new Date().toISOString(),
                stats: { ...this.stats }
            },
            details: {}
        };

        try {
            // 1. 预处理内容
            const processedContent = this.preprocessContent(content, contentType);
            validationResult.metadata.processedContent = processedContent;

            // 2. 基础结构检查
            await this.validateBasicStructure(processedContent, validationResult);

            // 3. 标题层次检查
            await this.validateHeadingStructure(processedContent, validationResult);

            // 4. 内容元素检查
            await this.validateContentElements(processedContent, validationResult);

            // 5. 语义化检查
            await this.validateSemanticStructure(processedContent, validationResult);

            // 6. 可访问性检查
            await this.validateAccessibility(processedContent, validationResult);

            // 7. 逻辑流检查
            await this.validateLogicalFlow(processedContent, validationResult);

            // 8. 计算最终得分
            validationResult.score = this.calculateValidationScore(validationResult);
            validationResult.isValid = validationResult.errors.length === 0;

            return validationResult;

        } catch (error) {
            validationResult.errors.push({
                category: 'critical',
                type: 'validation_error',
                message: `验证过程出错: ${error.message}`,
                line: null,
                suggestion: '检查内容格式和验证器配置'
            });
            
            validationResult.isValid = false;
            validationResult.score = 0;
            
            return validationResult;
        }
    }

    /**
     * 预处理内容
     */
    preprocessContent(content, contentType) {
        const processed = {
            original: content,
            type: contentType,
            lines: [],
            elements: {},
            stats: {}
        };

        if (contentType === 'markdown') {
            return this.preprocessMarkdown(content, processed);
        } else if (contentType === 'html') {
            return this.preprocessHTML(content, processed);
        }

        throw new Error(`不支持的内容类型: ${contentType}`);
    }

    /**
     * 预处理Markdown内容
     */
    preprocessMarkdown(content, processed) {
        const lines = content.split('\n');
        processed.lines = lines;

        // 提取各种元素
        processed.elements = {
            headings: this.extractMarkdownHeadings(lines),
            lists: this.extractMarkdownLists(lines),
            tables: this.extractMarkdownTables(lines),
            links: this.extractMarkdownLinks(content),
            images: this.extractMarkdownImages(content),
            codeBlocks: this.extractMarkdownCodeBlocks(content),
            paragraphs: this.extractMarkdownParagraphs(lines)
        };

        // 统计信息
        processed.stats = {
            totalLines: lines.length,
            totalWords: content.split(/\s+/).length,
            totalCharacters: content.length,
            ...Object.keys(processed.elements).reduce((acc, key) => {
                acc[`${key}Count`] = processed.elements[key].length;
                return acc;
            }, {})
        };

        return processed;
    }

    /**
     * 预处理HTML内容
     */
    preprocessHTML(content, processed) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        
        processed.dom = doc;
        processed.lines = content.split('\n');

        // 提取HTML元素
        processed.elements = {
            headings: this.extractHTMLHeadings(doc),
            lists: this.extractHTMLLists(doc),
            tables: this.extractHTMLTables(doc),
            links: this.extractHTMLLinks(doc),
            images: this.extractHTMLImages(doc),
            codeBlocks: this.extractHTMLCodeBlocks(doc),
            paragraphs: this.extractHTMLParagraphs(doc)
        };

        // 统计信息
        processed.stats = {
            totalLines: processed.lines.length,
            totalWords: content.split(/\s+/).length,
            totalCharacters: content.length,
            ...Object.keys(processed.elements).reduce((acc, key) => {
                acc[`${key}Count`] = processed.elements[key].length;
                return acc;
            }, {})
        };

        return processed;
    }

    /**
     * 验证基础结构
     */
    async validateBasicStructure(processed, result) {
        const { elements, stats } = processed;

        // 检查内容是否为空
        if (stats.totalWords === 0) {
            result.errors.push({
                category: 'critical',
                type: 'empty_content',
                message: '内容不能为空',
                line: 1,
                suggestion: '添加一些内容'
            });
        }

        // 检查是否有标题
        if (elements.headings.length === 0) {
            result.warnings.push({
                category: 'warning',
                type: 'no_headings',
                message: '建议添加标题来组织内容',
                line: 1,
                suggestion: '使用#、##、###等标记添加标题'
            });
        }

        // 检查内容长度
        if (stats.totalWords > 1000) {
            result.warnings.push({
                category: 'warning',
                type: 'content_too_long',
                message: `内容过长 (${stats.totalWords}词)，建议拆分为多个幻灯片`,
                line: 1,
                suggestion: '考虑将内容分解为更小的部分'
            });
        }
    }

    /**
     * 验证标题结构
     */
    async validateHeadingStructure(processed, result) {
        const { headings } = processed.elements;
        const rules = this.validationRules.title;

        // 统计各级标题数量
        const headingCounts = headings.reduce((acc, heading) => {
            acc[heading.level] = (acc[heading.level] || 0) + 1;
            return acc;
        }, {});

        // 检查H1标题数量
        if (headingCounts[1] > rules.levelLimits.h1.max) {
            result.errors.push({
                category: 'critical',
                type: 'multiple_h1',
                message: `只能有一个H1标题，当前有${headingCounts[1]}个`,
                line: headings.filter(h => h.level === 1).map(h => h.line).join(', '),
                suggestion: '将多余的H1改为H2或其他级别标题'
            });
        }

        // 检查标题层级跳跃
        const sortedHeadings = headings.sort((a, b) => a.line - b.line);
        for (let i = 1; i < sortedHeadings.length; i++) {
            const current = sortedHeadings[i];
            const previous = sortedHeadings[i - 1];
            
            if (current.level > previous.level + 1) {
                result.warnings.push({
                    category: 'warning',
                    type: 'heading_level_skip',
                    message: `标题层级跳跃过大: H${previous.level} → H${current.level}`,
                    line: current.line,
                    suggestion: '考虑使用渐进式的标题层级'
                });
            }
        }

        // 检查标题长度
        headings.forEach(heading => {
            if (heading.text.length > rules.maxLength) {
                result.warnings.push({
                    category: 'warning',
                    type: 'title_too_long',
                    message: `标题过长 (${heading.text.length}字符)，建议不超过${rules.maxLength}字符`,
                    line: heading.line,
                    suggestion: '缩短标题或改用副标题'
                });
            }

            // 检查标题内容
            if (!rules.pattern.test(heading.text)) {
                result.warnings.push({
                    category: 'warning',
                    type: 'invalid_title_content',
                    message: '标题内容不应为空或全是空白字符',
                    line: heading.line,
                    suggestion: '添加有意义的标题内容'
                });
            }
        });
    }

    /**
     * 验证内容元素
     */
    async validateContentElements(processed, result) {
        const { elements } = processed;

        // 验证列表
        await this.validateLists(elements.lists, result);
        
        // 验证表格
        await this.validateTables(elements.tables, result);
        
        // 验证链接
        await this.validateLinks(elements.links, result);
        
        // 验证图片
        await this.validateImages(elements.images, result);
        
        // 验证代码块
        await this.validateCodeBlocks(elements.codeBlocks, result);
    }

    /**
     * 验证列表
     */
    async validateLists(lists, result) {
        const rules = this.validationRules.list;

        lists.forEach((list, index) => {
            // 检查列表项数量
            if (list.items.length < rules.minItems) {
                result.info.push({
                    category: 'info',
                    type: 'list_too_short',
                    message: `列表项目较少 (${list.items.length}个)`,
                    line: list.line,
                    suggestion: '考虑是否需要更多列表项或改用段落'
                });
            }

            if (list.items.length > rules.maxItems) {
                result.warnings.push({
                    category: 'warning',
                    type: 'list_too_long',
                    message: `列表项目过多 (${list.items.length}个)，建议不超过${rules.maxItems}个`,
                    line: list.line,
                    suggestion: '拆分为多个列表或使用表格'
                });
            }

            // 检查嵌套深度
            const maxNesting = Math.max(...list.items.map(item => item.indent || 0));
            if (maxNesting > rules.maxNesting) {
                result.warnings.push({
                    category: 'warning',
                    type: 'list_nesting_too_deep',
                    message: `列表嵌套过深 (级别${maxNesting})，建议不超过${rules.maxNesting}级`,
                    line: list.line,
                    suggestion: '简化嵌套结构'
                });
            }
        });
    }

    /**
     * 验证表格
     */
    async validateTables(tables, result) {
        const rules = this.validationRules.table;

        tables.forEach((table, index) => {
            // 检查表头
            if (rules.requiredHeaders && table.headers.length === 0) {
                result.warnings.push({
                    category: 'warning',
                    type: 'table_no_headers',
                    message: '表格缺少表头',
                    line: table.line,
                    suggestion: '添加表格表头行'
                });
            }

            // 检查列数一致性
            if (rules.consistentColumns && table.headers.length > 0) {
                const inconsistentRows = table.rows.filter(
                    row => row.length !== table.headers.length
                );
                
                if (inconsistentRows.length > 0) {
                    result.errors.push({
                        category: 'critical',
                        type: 'table_inconsistent_columns',
                        message: `表格列数不一致，表头有${table.headers.length}列，但${inconsistentRows.length}行数据不匹配`,
                        line: table.line,
                        suggestion: '确保所有行的列数与表头一致'
                    });
                }
            }

            // 检查表格大小
            if (table.headers.length > rules.maxColumns) {
                result.warnings.push({
                    category: 'warning',
                    type: 'table_too_wide',
                    message: `表格列数过多 (${table.headers.length}列)，建议不超过${rules.maxColumns}列`,
                    line: table.line,
                    suggestion: '简化表格或拆分为多个表格'
                });
            }

            if (table.rows.length > rules.maxRows) {
                result.warnings.push({
                    category: 'warning',
                    type: 'table_too_long',
                    message: `表格行数过多 (${table.rows.length}行)，建议不超过${rules.maxRows}行`,
                    line: table.line,
                    suggestion: '拆分长表格或分页显示'
                });
            }
        });
    }

    /**
     * 验证链接
     */
    async validateLinks(links, result) {
        const rules = this.validationRules.link;
        let externalLinkCount = 0;

        links.forEach(link => {
            // 检查链接文本
            if (rules.hasText && !link.text.trim()) {
                result.errors.push({
                    category: 'critical',
                    type: 'link_no_text',
                    message: '链接缺少描述文本',
                    line: link.line,
                    suggestion: '为链接添加有意义的描述文本'
                });
            }

            // 检查URL格式
            if (rules.validURL && !this.isValidURL(link.url)) {
                result.warnings.push({
                    category: 'warning',
                    type: 'link_invalid_url',
                    message: `链接URL格式可能无效: ${link.url}`,
                    line: link.line,
                    suggestion: '检查URL格式是否正确'
                });
            }

            // 统计外部链接
            if (this.isExternalLink(link.url)) {
                externalLinkCount++;
            }
        });

        // 检查外部链接数量
        if (externalLinkCount > rules.maxExternalLinks) {
            result.warnings.push({
                category: 'warning',
                type: 'too_many_external_links',
                message: `外部链接过多 (${externalLinkCount}个)，建议不超过${rules.maxExternalLinks}个`,
                line: 1,
                suggestion: '减少外部链接或使用内部链接'
            });
        }
    }

    /**
     * 验证图片
     */
    async validateImages(images, result) {
        const rules = this.validationRules.image;

        images.forEach(image => {
            // 检查alt文本
            if (rules.hasAltText && !image.alt) {
                result.errors.push({
                    category: 'critical',
                    type: 'image_no_alt',
                    message: '图片缺少alt属性',
                    line: image.line,
                    suggestion: '为图片添加描述性的alt文本'
                });
            }

            // 检查图片格式
            const extension = image.src.split('.').pop().toLowerCase();
            if (rules.validFormat && !rules.validFormat.includes(extension)) {
                result.warnings.push({
                    category: 'warning',
                    type: 'image_invalid_format',
                    message: `图片格式不支持: ${extension}，建议使用${rules.validFormat.join(', ')}`,
                    line: image.line,
                    suggestion: '转换为支持的图片格式'
                });
            }
        });
    }

    /**
     * 验证代码块
     */
    async validateCodeBlocks(codeBlocks, result) {
        const rules = this.validationRules.code;

        codeBlocks.forEach(codeBlock => {
            // 检查语言标识
            if (rules.hasLanguage && !codeBlock.language) {
                result.info.push({
                    category: 'info',
                    type: 'code_no_language',
                    message: '代码块缺少语言标识',
                    line: codeBlock.line,
                    suggestion: '添加语言标识以启用语法高亮'
                });
            }

            // 检查代码长度
            if (codeBlock.code.length > rules.maxLength) {
                result.warnings.push({
                    category: 'warning',
                    type: 'code_too_long',
                    message: `代码块过长 (${codeBlock.code.length}字符)，考虑简化或拆分`,
                    line: codeBlock.line,
                    suggestion: '只保留关键代码部分'
                });
            }
        });
    }

    /**
     * 验证语义化结构
     */
    async validateSemanticStructure(processed, result) {
        const { elements } = processed;

        // 检查是否合理使用标题层次
        const hasH1 = elements.headings.some(h => h.level === 1);
        if (!hasH1 && elements.headings.length > 0) {
            result.warnings.push({
                category: 'warning',
                type: 'no_main_heading',
                message: '缺少主标题(H1)',
                line: 1,
                suggestion: '添加H1标题作为主要内容标题'
            });
        }

        // 检查内容组织
        if (elements.headings.length === 0 && elements.paragraphs.length > 3) {
            result.warnings.push({
                category: 'warning',
                type: 'unorganized_content',
                message: '内容较多但缺少标题组织',
                line: 1,
                suggestion: '使用标题来组织内容结构'
            });
        }
    }

    /**
     * 验证可访问性
     */
    async validateAccessibility(processed, result) {
        // 检查图片alt文本（已在validateImages中处理）
        // 检查链接描述（已在validateLinks中处理）
        
        // 检查内容结构是否清晰
        const { headings } = processed.elements;
        if (headings.length > 0) {
            // 检查标题是否提供了良好的导航结构
            const hasLogicalFlow = headings.every((heading, index) => {
                if (index === 0) return true;
                const prevHeading = headings[index - 1];
                return heading.level <= prevHeading.level + 1;
            });

            if (!hasLogicalFlow) {
                result.info.push({
                    category: 'info',
                    type: 'accessibility_structure',
                    message: '标题层次结构可能影响屏幕阅读器用户的理解',
                    line: 1,
                    suggestion: '使用更渐进的标题层级'
                });
            }
        }
    }

    /**
     * 验证逻辑流
     */
    async validateLogicalFlow(processed, result) {
        const { headings, paragraphs, lists, tables } = processed.elements;

        // 简单的逻辑流检查
        let hasStructure = headings.length > 0 || lists.length > 0 || tables.length > 0;
        
        if (paragraphs.length > 5 && !hasStructure) {
            result.warnings.push({
                category: 'warning',
                type: 'poor_logical_flow',
                message: '内容较多但缺乏结构化组织',
                line: 1,
                suggestion: '使用标题、列表或表格来改善内容的逻辑流'
            });
        }

        // 检查是否有孤立的内容块
        if (headings.length > 1) {
            const sortedHeadings = headings.sort((a, b) => a.line - b.line);
            
            for (let i = 1; i < sortedHeadings.length; i++) {
                const prevHeading = sortedHeadings[i - 1];
                const currentHeading = sortedHeadings[i];
                const contentBetween = currentHeading.line - prevHeading.line;
                
                if (contentBetween < 3) {
                    result.info.push({
                        category: 'info',
                        type: 'orphaned_heading',
                        message: `标题${currentHeading.text}可能缺少足够的内容支持`,
                        line: currentHeading.line,
                        suggestion: '为标题添加更多内容或调整结构'
                    });
                }
            }
        }
    }

    /**
     * 计算验证得分
     */
    calculateValidationScore(result) {
        let score = 100;
        
        // 错误扣分
        score -= result.errors.length * 20;
        
        // 警告扣分
        score -= result.warnings.length * 10;
        
        // 信息提示轻微扣分
        score -= result.info.length * 5;
        
        return Math.max(0, score);
    }

    // 辅助方法
    extractMarkdownHeadings(lines) {
        const headings = [];
        lines.forEach((line, index) => {
            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
                headings.push({
                    level: match[1].length,
                    text: match[2].trim(),
                    line: index + 1
                });
            }
        });
        return headings;
    }

    extractMarkdownLists(lines) {
        const lists = [];
        let currentList = null;
        
        lines.forEach((line, index) => {
            const unorderedMatch = line.match(/^(\s*)[-*+]\s+(.+)$/);
            const orderedMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
            
            if (unorderedMatch || orderedMatch) {
                const indent = unorderedMatch ? unorderedMatch[1] : orderedMatch[1];
                const text = unorderedMatch ? unorderedMatch[2] : orderedMatch[2];
                const type = unorderedMatch ? 'unordered' : 'ordered';
                
                if (!currentList || currentList.type !== type) {
                    currentList = {
                        type,
                        items: [],
                        line: index + 1
                    };
                    lists.push(currentList);
                }
                
                currentList.items.push({
                    text: text.trim(),
                    indent: indent.length
                });
            } else if (currentList && line.trim() === '') {
                currentList = null;
            }
        });
        
        return lists;
    }

    extractMarkdownTables(lines) {
        const tables = [];
        let currentTable = null;
        
        lines.forEach((line, index) => {
            if (line.startsWith('|')) {
                if (!currentTable) {
                    currentTable = {
                        headers: [],
                        rows: [],
                        line: index + 1
                    };
                    tables.push(currentTable);
                }
                
                const cells = line.split('|').slice(1, -1).map(cell => cell.trim());
                
                if (currentTable.headers.length === 0) {
                    currentTable.headers = cells;
                } else if (!cells.every(cell => /^[-\s:]+$/.test(cell))) {
                    currentTable.rows.push(cells);
                }
            } else if (currentTable && !line.trim()) {
                currentTable = null;
            }
        });
        
        return tables;
    }

    extractMarkdownLinks(content) {
        const links = [];
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        
        while ((match = regex.exec(content)) !== null) {
            links.push({
                text: match[1],
                url: match[2],
                line: this.getLineNumber(content, match.index)
            });
        }
        
        return links;
    }

    extractMarkdownImages(content) {
        const images = [];
        const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
        let match;
        
        while ((match = regex.exec(content)) !== null) {
            images.push({
                alt: match[1],
                src: match[2],
                line: this.getLineNumber(content, match.index)
            });
        }
        
        return images;
    }

    extractMarkdownCodeBlocks(content) {
        const codeBlocks = [];
        const regex = /```(\w+)?\n([\s\S]*?)```/g;
        let match;
        
        while ((match = regex.exec(content)) !== null) {
            codeBlocks.push({
                language: match[1] || null,
                code: match[2],
                line: this.getLineNumber(content, match.index)
            });
        }
        
        return codeBlocks;
    }

    extractMarkdownParagraphs(lines) {
        const paragraphs = [];
        let currentParagraph = [];
        
        lines.forEach((line, index) => {
            const trimmed = line.trim();
            
            if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('|') && 
                !trimmed.startsWith('-') && !trimmed.startsWith('*') && 
                !trimmed.match(/^\d+\./) && !trimmed.startsWith('```')) {
                
                currentParagraph.push(trimmed);
            } else if (currentParagraph.length > 0) {
                paragraphs.push({
                    text: currentParagraph.join(' '),
                    line: index - currentParagraph.length + 2
                });
                currentParagraph = [];
            }
        });
        
        if (currentParagraph.length > 0) {
            paragraphs.push({
                text: currentParagraph.join(' '),
                line: lines.length - currentParagraph.length + 2
            });
        }
        
        return paragraphs;
    }

    // HTML元素提取方法（简化实现）
    extractHTMLHeadings(doc) {
        const headings = [];
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
            doc.querySelectorAll(tag).forEach(element => {
                headings.push({
                    level: parseInt(tag[1]),
                    text: element.textContent.trim(),
                    line: this.getElementLine(element)
                });
            });
        });
        return headings;
    }

    extractHTMLLists(doc) {
        const lists = [];
        doc.querySelectorAll('ul, ol').forEach(list => {
            lists.push({
                type: list.tagName.toLowerCase(),
                items: Array.from(list.querySelectorAll('li')).map(li => ({
                    text: li.textContent.trim(),
                    indent: this.getIndentLevel(li)
                })),
                line: this.getElementLine(list)
            });
        });
        return lists;
    }

    extractHTMLTables(doc) {
        const tables = [];
        doc.querySelectorAll('table').forEach(table => {
            const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());
            const rows = Array.from(table.querySelectorAll('tr')).slice(1).map(tr => 
                Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim())
            );
            
            tables.push({
                headers,
                rows,
                line: this.getElementLine(table)
            });
        });
        return tables;
    }

    extractHTMLLinks(doc) {
        const links = [];
        doc.querySelectorAll('a[href]').forEach(link => {
            links.push({
                text: link.textContent.trim(),
                url: link.getAttribute('href'),
                line: this.getElementLine(link)
            });
        });
        return links;
    }

    extractHTMLImages(doc) {
        const images = [];
        doc.querySelectorAll('img').forEach(img => {
            images.push({
                alt: img.getAttribute('alt') || '',
                src: img.getAttribute('src'),
                line: this.getElementLine(img)
            });
        });
        return images;
    }

    extractHTMLCodeBlocks(doc) {
        const codeBlocks = [];
        doc.querySelectorAll('pre code').forEach(code => {
            codeBlocks.push({
                language: code.className.replace(/language-/, '') || null,
                code: code.textContent.trim(),
                line: this.getElementLine(code)
            });
        });
        return codeBlocks;
    }

    extractHTMLParagraphs(doc) {
        const paragraphs = [];
        doc.querySelectorAll('p').forEach(p => {
            paragraphs.push({
                text: p.textContent.trim(),
                line: this.getElementLine(p)
            });
        });
        return paragraphs;
    }

    // 工具方法
    getLineNumber(content, index) {
        const before = content.substring(0, index);
        return before.split('\n').length;
    }

    getElementLine(element) {
        // 简化实现，实际应该从DOM计算
        return 1;
    }

    getIndentLevel(element) {
        let level = 0;
        let parent = element.parentElement;
        while (parent && parent.tagName === 'LI') {
            level++;
            parent = parent.parentElement;
        }
        return level;
    }

    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    isExternalLink(url) {
        try {
            const urlObj = new URL(url, window.location.href);
            return urlObj.origin !== window.location.origin;
        } catch {
            return false;
        }
    }
}

// 导出模块
module.exports = ContentStructureValidator;
if (typeof window !== 'undefined') {
    window.ContentStructureValidator = ContentStructureValidator;
}