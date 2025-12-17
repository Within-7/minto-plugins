/**
 * 工作流程管理模块
 * 管理PPT生成的完整工作流程，包括步骤协调、状态跟踪和异常处理
 */

class WorkflowManager {
    constructor(options = {}) {
        this.options = {
            enableLogging: options.enableLogging !== false,
            enableRetry: options.enableRetry !== false,
            maxRetries: options.maxRetries || 3,
            timeout: options.timeout || 30000, // 30秒
            parallelSteps: options.parallelSteps || false,
            ...options
        };
        
        this.steps = new Map();
        this.workflow = null;
        this.executionState = {
            status: 'idle',           // idle, running, completed, failed, cancelled
            currentStep: null,
            completedSteps: [],
            failedSteps: [],
            startTime: null,
            endTime: null,
            retryCount: 0,
            logs: []
        };
        
        this.eventListeners = new Map();
        this.logger = new WorkflowLogger(this.options.enableLogging);
        this.retryManager = new RetryManager(this.options);
        this.stepCoordinator = new StepCoordinator(this.options.parallelSteps);
        
        this.initializeDefaultWorkflow();
    }

    /**
     * 初始化默认工作流程
     */
    initializeDefaultWorkflow() {
        // 注册默认步骤
        this.registerStep('content_analysis', {
            name: '内容分析',
            description: '分析输入的Markdown内容和结构',
            handler: this.handleContentAnalysis.bind(this),
            dependencies: [],
            timeout: 10000,
            retryable: true,
            critical: true
        });

        this.registerStep('design_planning', {
            name: '设计规划',
            description: '根据内容类型规划PPT结构和页面布局',
            handler: this.handleDesignPlanning.bind(this),
            dependencies: ['content_analysis'],
            timeout: 5000,
            retryable: true,
            critical: true
        });

        this.registerStep('html_generation', {
            name: 'HTML生成',
            description: '生成HTML PPT内容和样式',
            handler: this.handleHTMLGeneration.bind(this),
            dependencies: ['design_planning'],
            timeout: 20000,
            retryable: true,
            critical: true
        });

        this.registerStep('quality_validation', {
            name: '质量验证',
            description: '执行质量检查和优化建议',
            handler: this.handleQualityValidation.bind(this),
            dependencies: ['html_generation'],
            timeout: 15000,
            retryable: false,
            critical: false
        });

        this.registerStep('final_output', {
            name: '最终输出',
            description: '交付最终优化的HTML PPT文件',
            handler: this.handleFinalOutput.bind(this),
            dependencies: ['quality_validation'],
            timeout: 5000,
            retryable: true,
            critical: false
        });

        // 定义默认工作流程
        this.workflow = {
            name: 'md-to-html-ppt',
            description: 'Markdown转HTML PPT标准工作流程',
            steps: [
                'content_analysis',
                'design_planning', 
                'html_generation',
                'quality_validation',
                'final_output'
            ],
            context: {},
            metadata: {
                version: '1.0.0',
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString()
            }
        };
    }

    /**
     * 注册工作流程步骤
     * @param {string} stepId - 步骤ID
     * @param {Object} stepConfig - 步骤配置
     */
    registerStep(stepId, stepConfig) {
        this.steps.set(stepId, {
            id: stepId,
            status: 'idle',
            result: null,
            error: null,
            startTime: null,
            endTime: null,
            duration: null,
            ...stepConfig
        });
        
        this.logger.log(`注册步骤: ${stepId} - ${stepConfig.name}`, 'info');
    }

    /**
     * 执行工作流程
     * @param {Object} input - 输入数据
     * @param {Object} options - 执行选项
     * @returns {Promise<Object>} 执行结果
     */
    async execute(input, options = {}) {
        if (this.executionState.status === 'running') {
            throw new Error('工作流程正在执行中，无法同时执行多个实例');
        }

        // 重置执行状态
        this.resetExecutionState();
        this.executionState.status = 'running';
        this.executionState.startTime = new Date();
        
        this.emit('workflow:started', { input, options });
        this.logger.log('开始执行工作流程', 'info');

        try {
            // 验证工作流程配置
            this.validateWorkflow();
            
            // 初始化工作流程上下文
            const context = {
                input,
                options,
                ...this.workflow.context,
                startTime: new Date().toISOString()
            };

            // 执行步骤
            const executionPlan = this.createExecutionPlan();
            const results = await this.stepCoordinator.execute(executionPlan, context);
            
            // 处理执行结果
            const finalResult = await this.processExecutionResults(results, context);
            
            // 标记完成
            this.executionState.status = 'completed';
            this.executionState.endTime = new Date();
            this.executionState.context = context;
            
            this.emit('workflow:completed', { result: finalResult, context });
            this.logger.log('工作流程执行完成', 'info');
            
            return finalResult;

        } catch (error) {
            this.executionState.status = 'failed';
            this.executionState.endTime = new Date();
            this.executionState.error = error;
            
            this.emit('workflow:failed', { error });
            this.logger.log(`工作流程执行失败: ${error.message}`, 'error');
            
            throw error;
        }
    }

    /**
     * 验证工作流程配置
     */
    validateWorkflow() {
        if (!this.workflow) {
            throw new Error('未定义工作流程');
        }

        if (!this.workflow.steps || this.workflow.steps.length === 0) {
            throw new Error('工作流程未定义任何步骤');
        }

        // 验证步骤依赖关系
        const stepIds = this.workflow.steps;
        for (const stepId of stepIds) {
            const step = this.steps.get(stepId);
            if (!step) {
                throw new Error(`未找到步骤: ${stepId}`);
            }

            // 检查依赖是否存在
            for (const dep of step.dependencies) {
                if (!stepIds.includes(dep)) {
                    throw new Error(`步骤 ${stepId} 的依赖 ${dep} 不在工作流程中`);
                }
            }
        }

        // 检查循环依赖
        this.checkCircularDependencies();
    }

    /**
     * 检查循环依赖
     */
    checkCircularDependencies() {
        const visited = new Set();
        const recursionStack = new Set();

        const hasCycle = (stepId) => {
            if (recursionStack.has(stepId)) {
                return true;
            }

            if (visited.has(stepId)) {
                return false;
            }

            visited.add(stepId);
            recursionStack.add(stepId);

            const step = this.steps.get(stepId);
            for (const dep of step.dependencies) {
                if (hasCycle(dep)) {
                    return true;
                }
            }

            recursionStack.delete(stepId);
            return false;
        };

        for (const stepId of this.workflow.steps) {
            if (hasCycle(stepId)) {
                throw new Error(`检测到循环依赖，涉及步骤: ${stepId}`);
            }
        }
    }

    /**
     * 创建执行计划
     */
    createExecutionPlan() {
        const plan = [];
        const completed = new Set();
        
        const addStep = (stepId) => {
            if (completed.has(stepId)) {
                return;
            }

            const step = this.steps.get(stepId);
            
            // 先添加依赖步骤
            for (const dep of step.dependencies) {
                addStep(dep);
            }

            // 添加当前步骤
            plan.push(step);
            completed.add(stepId);
        };

        for (const stepId of this.workflow.steps) {
            addStep(stepId);
        }

        return plan;
    }

    /**
     * 处理执行结果
     */
    async processExecutionResults(results, context) {
        const finalResult = {
            success: true,
            data: {},
            metadata: {
                executionTime: this.executionState.endTime - this.executionState.startTime,
                steps: results.map(r => ({
                    id: r.id,
                    name: r.name,
                    status: r.status,
                    duration: r.duration,
                    retryCount: r.retryCount || 0
                })),
                workflow: this.workflow.metadata
            },
            logs: this.executionState.logs
        };

        // 收集所有步骤的结果
        for (const result of results) {
            finalResult.data[result.id] = result.result;
            
            if (result.status === 'failed') {
                finalResult.success = false;
                finalResult.error = result.error;
            }
        }

        return finalResult;
    }

    /**
     * 取消工作流程执行
     */
    async cancel() {
        if (this.executionState.status !== 'running') {
            return;
        }

        this.executionState.status = 'cancelled';
        this.executionState.endTime = new Date();
        
        this.stepCoordinator.cancel();
        
        this.emit('workflow:cancelled');
        this.logger.log('工作流程已取消', 'warning');
    }

    /**
     * 重置执行状态
     */
    resetExecutionState() {
        this.executionState = {
            status: 'idle',
            currentStep: null,
            completedSteps: [],
            failedSteps: [],
            startTime: null,
            endTime: null,
            retryCount: 0,
            logs: [],
            context: {}
        };

        // 重置所有步骤状态
        for (const step of this.steps.values()) {
            step.status = 'idle';
            step.result = null;
            step.error = null;
            step.startTime = null;
            step.endTime = null;
            step.duration = null;
        }
    }

    /**
     * 步骤处理器
     */
    async handleContentAnalysis(context) {
        this.emit('step:started', { step: 'content_analysis', context });
        this.logger.log('开始内容分析', 'info');

        try {
            const analyzer = new MarkdownContentAnalyzer();
            const analysisResult = analyzer.analyze(context.input);
            
            this.logger.log('内容分析完成', 'info');
            this.emit('step:completed', { step: 'content_analysis', result: analysisResult });
            
            return {
                success: true,
                data: analysisResult,
                metadata: {
                    processingTime: Date.now() - Date.parse(context.startTime)
                }
            };
        } catch (error) {
            this.logger.log(`内容分析失败: ${error.message}`, 'error');
            this.emit('step:failed', { step: 'content_analysis', error });
            throw error;
        }
    }

    async handleDesignPlanning(context) {
        this.emit('step:started', { step: 'design_planning', context });
        this.logger.log('开始设计规划', 'info');

        try {
            const contentAnalysis = context.results.content_analysis.data;
            const designPlan = this.createDesignPlan(contentAnalysis);
            
            this.logger.log('设计规划完成', 'info');
            this.emit('step:completed', { step: 'design_planning', result: designPlan });
            
            return {
                success: true,
                data: designPlan,
                metadata: {
                    slideCount: designPlan.slides.length,
                    estimatedDuration: designPlan.slides.length * 30 // 假设每页30秒
                }
            };
        } catch (error) {
            this.logger.log(`设计规划失败: ${error.message}`, 'error');
            this.emit('step:failed', { step: 'design_planning', error });
            throw error;
        }
    }

    async handleHTMLGeneration(context) {
        this.emit('step:started', { step: 'html_generation', context });
        this.logger.log('开始HTML生成', 'info');

        try {
            const designPlan = context.results.design_planning.data;
            const generator = new EnterprisePPTGenerator(context.options.designStandards);
            const htmlResult = generator.generate(designPlan, context.options.designStandards);
            
            this.logger.log('HTML生成完成', 'info');
            this.emit('step:completed', { step: 'html_generation', result: htmlResult });
            
            return {
                success: true,
                data: {
                    html: htmlResult,
                    metadata: {
                        fileSize: new Blob([htmlResult]).size,
                        slideCount: (htmlResult.match(/class="ppt-slide"/g) || []).length
                    }
                }
            };
        } catch (error) {
            this.logger.log(`HTML生成失败: ${error.message}`, 'error');
            this.emit('step:failed', { step: 'html_generation', error });
            throw error;
        }
    }

    async handleQualityValidation(context) {
        this.emit('step:started', { step: 'quality_validation', context });
        this.logger.log('开始质量验证', 'info');

        try {
            const htmlResult = context.results.html_generation.data.html;
            const validator = new QualityAssuranceValidator();
            const validationRules = ['structure', 'accessibility', 'performance', 'visual'];
            const validationResult = await validator.validate(htmlResult, validationRules);
            
            this.logger.log('质量验证完成', 'info');
            this.emit('step:completed', { step: 'quality_validation', result: validationResult });
            
            return {
                success: true,
                data: validationResult,
                metadata: {
                    score: validationResult.overall_score,
                    issues: validationResult.issues.errors.length + validationResult.issues.warnings.length
                }
            };
        } catch (error) {
            this.logger.log(`质量验证失败: ${error.message}`, 'error');
            this.emit('step:failed', { step: 'quality_validation', error });
            throw error;
        }
    }

    async handleFinalOutput(context) {
        this.emit('step:started', { step: 'final_output', context });
        this.logger.log('开始最终输出处理', 'info');

        try {
            const htmlResult = context.results.html_generation.data;
            const validationResult = context.results.quality_validation.data;
            
            // 如果验证通过，直接返回HTML
            // 如果有问题，但不是错误，也返回HTML但附带改进建议
            let finalHTML = htmlResult.html;
            
            if (validationResult.improvement_actions.length > 0) {
                this.logger.log(`发现${validationResult.improvement_actions.length}个改进建议`, 'warning');
            }
            
            const finalResult = {
                html: finalHTML,
                validation: validationResult,
                metadata: {
                    generatedAt: new Date().toISOString(),
                    workflowVersion: this.workflow.metadata.version,
                    processingTime: Date.now() - new Date(context.startTime).getTime()
                }
            };
            
            this.logger.log('最终输出处理完成', 'info');
            this.emit('step:completed', { step: 'final_output', result: finalResult });
            
            return {
                success: true,
                data: finalResult,
                metadata: {
                    readyForDelivery: true
                }
            };
        } catch (error) {
            this.logger.log(`最终输出处理失败: ${error.message}`, 'error');
            this.emit('step:failed', { step: 'final_output', error });
            throw error;
        }
    }

    /**
     * 创建设计计划
     */
    createDesignPlan(contentAnalysis) {
        const plan = {
            slides: [],
            metadata: {
                estimatedDuration: 0,
                complexity: contentAnalysis.statistics.complexity.score
            }
        };

        const { structure, elements, slideTypes } = contentAnalysis;

        // 根据内容类型创建幻灯片
        slideTypes.forEach((slideType, index) => {
            const slide = {
                id: `slide-${index + 1}`,
                type: slideType.type,
                title: slideType.title,
                order: index + 1,
                elements: this.extractSlideElements(slideType, contentAnalysis),
                estimatedDuration: this.estimateSlideDuration(slideType)
            };

            plan.slides.push(slide);
            plan.metadata.estimatedDuration += slide.estimatedDuration;
        });

        return plan;
    }

    /**
     * 提取幻灯片元素
     */
    extractSlideElements(slideType, contentAnalysis) {
        // 简化实现，实际应该根据slideType提取对应的元素
        return {
            headers: contentAnalysis.elements.headers.filter(h => 
                h.text === slideType.title
            ),
            paragraphs: [],
            lists: [],
            tables: contentAnalysis.elements.tables.slice(0, 2), // 最多2个表格
            images: contentAnalysis.elements.images.slice(0, 3)  // 最多3张图片
        };
    }

    /**
     * 估算幻灯片时长
     */
    estimateSlideDuration(slideType) {
        const baseDurations = {
            cover: 5,      // 5秒
            toc: 10,       // 10秒
            content: 30,   // 30秒
            chart: 25,     // 25秒
            conclusion: 8  // 8秒
        };

        return baseDurations[slideType.type] || 30;
    }

    /**
     * 事件处理
     */
    on(event, listener) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(listener);
    }

    emit(event, data) {
        const listeners = this.eventListeners.get(event);
        if (listeners) {
            listeners.forEach(listener => {
                try {
                    listener(data);
                } catch (error) {
                    this.logger.log(`事件监听器错误: ${error.message}`, 'error');
                }
            });
        }
    }

    /**
     * 获取执行状态
     */
    getExecutionStatus() {
        return {
            ...this.executionState,
            steps: Array.from(this.steps.values()).map(step => ({
                id: step.id,
                name: step.name,
                status: step.status,
                duration: step.duration,
                hasResult: step.result !== null,
                hasError: step.error !== null
            })),
            workflow: this.workflow
        };
    }
}

/**
 * 步骤协调器
 */
class StepCoordinator {
    constructor(parallelExecution = false) {
        this.parallelExecution = parallelExecution;
        this.executions = new Map();
        this.cancelled = false;
    }

    async execute(executionPlan, context) {
        this.cancelled = false;
        const results = [];
        
        if (this.parallelExecution) {
            return this.executeParallel(executionPlan, context);
        } else {
            return this.executeSequential(executionPlan, context);
        }
    }

    async executeSequential(executionPlan, context) {
        const results = [];
        const resultsMap = new Map();

        for (const step of executionPlan) {
            if (this.cancelled) {
                throw new Error('执行被取消');
            }

            try {
                step.status = 'running';
                step.startTime = Date.now();

                const stepContext = {
                    ...context,
                    step: step.id,
                    results: Object.fromEntries(resultsMap)
                };

                const result = await this.executeStep(step, stepContext);
                
                step.status = 'completed';
                step.endTime = Date.now();
                step.duration = step.endTime - step.startTime;
                step.result = result;

                resultsMap.set(step.id, result);
                results.push(step);

            } catch (error) {
                step.status = 'failed';
                step.endTime = Date.now();
                step.duration = step.endTime - step.startTime;
                step.error = error;

                if (step.critical) {
                    results.push(step);
                    throw new Error(`关键步骤 ${step.id} 执行失败: ${error.message}`);
                } else {
                    results.push(step);
                    // 非关键步骤失败，继续执行
                }
            }
        }

        return results;
    }

    async executeParallel(executionPlan, context) {
        // 并行执行的简化实现
        // 实际应该考虑依赖关系和资源管理
        return this.executeSequential(executionPlan, context);
    }

    async executeStep(step, context) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error(`步骤 ${step.id} 执行超时`));
            }, step.timeout || 30000);

            try {
                const result = step.handler(context);
                
                if (result instanceof Promise) {
                    result.then(resolve).catch(reject).finally(() => {
                        clearTimeout(timeout);
                    });
                } else {
                    clearTimeout(timeout);
                    resolve(result);
                }
            } catch (error) {
                clearTimeout(timeout);
                reject(error);
            }
        });
    }

    cancel() {
        this.cancelled = true;
    }
}

/**
 * 工作流程日志记录器
 */
class WorkflowLogger {
    constructor(enabled = true) {
        this.enabled = enabled;
        this.logs = [];
    }

    log(message, level = 'info') {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level,
            message
        };

        this.logs.push(logEntry);

        if (this.enabled) {
            const levelColors = {
                info: '\x1b[36m',    // 青色
                warning: '\x1b[33m', // 黄色
                error: '\x1b[31m',   // 红色
                debug: '\x1b[37m'    // 白色
            };

            const resetColor = '\x1b[0m';
            const color = levelColors[level] || levelColors.info;
            
            console.log(`${color}[${logEntry.timestamp}] ${level.toUpperCase()}: ${message}${resetColor}`);
        }
    }

    getLogs(level = null) {
        if (level) {
            return this.logs.filter(log => log.level === level);
        }
        return [...this.logs];
    }

    clear() {
        this.logs = [];
    }
}

/**
 * 重试管理器
 */
class RetryManager {
    constructor(options) {
        this.maxRetries = options.maxRetries || 3;
        this.baseDelay = options.baseDelay || 1000;
        this.maxDelay = options.maxDelay || 10000;
        this.backoffFactor = options.backoffFactor || 2;
    }

    async executeWithRetry(fn, options = {}) {
        const maxRetries = options.maxRetries || this.maxRetries;
        const baseDelay = options.baseDelay || this.baseDelay;
        
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                if (attempt === maxRetries) {
                    throw error;
                }

                const delay = Math.min(
                    baseDelay * Math.pow(this.backoffFactor, attempt),
                    this.maxDelay
                );

                await this.sleep(delay);
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 导出模块
module.exports = WorkflowManager;
if (typeof window !== 'undefined') {
    window.WorkflowManager = WorkflowManager;
}