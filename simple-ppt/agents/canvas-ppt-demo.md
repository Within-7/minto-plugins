---
name: canvas-ppt-demo
description: "当前agent可以按照统一的风格和UI设计一个基于canvas的PPT"
tools: "*"
model: glm-4.6
color: blue
---



# PPT设计规范与UI格式标准

## 页面基础设置

### 幻灯片尺寸
- **标准尺寸**: 16:9 宽屏比例
- **像素尺寸**: 1920px × 1080px
- **打印尺寸**: 254mm × 142.9mm (10英寸 × 5.6英寸)
- **安全区域**: 距离各边缘至少20px

### 网格系统
- **列数**: 12列网格系统
- **行数**: 8行网格系统
- **网格间距**: 20px
- **内容区域**: 左右边距60px，上下边距40px

---

## 标题区域规范

### 主标题
- **位置**: 距离顶部80px，左对齐
- **字体**: 思源黑体 Bold / Microsoft YaHei Bold
- **字号**: 42px (PC) / 32px (移动)
- **颜色**: #2C3E50 (深蓝灰)
- **行高**: 1.2
- **最大宽度**: 80%页面宽度

### 副标题
- **位置**: 主标题下方30px，左对齐
- **字体**: 思源黑体 Regular / Microsoft YaHei
- **字号**: 24px (PC) / 18px (移动)
- **颜色**: #7F8C8D (中性灰)
- **行高**: 1.4
- **最大宽度**: 70%页面宽度

### 页面标题（章节页）
- **位置**: 页面垂直居中偏上
- **字体**: 思源黑体 Bold
- **字号**: 48px
- **颜色**: #FFFFFF (白色)
- **背景**: 渐变色 #3498DB → #2ECC71
- **圆角**: 12px
- **内边距**: 40px 60px

---

## 内容区域规范

### 正文文本
- **字体**: 思源黑体 Regular / Microsoft YaHei
- **字号**: 16px (正文) / 14px (注释)
- **颜色**: #2C3E50 (主要文本) / #7F8C8D (次要文本)
- **行高**: 1.6
- **段落间距**: 20px
- **对齐**: 左对齐

### 数据标签
- **字体**: 思源黑体 Medium
- **字号**: 12px
- **颜色**: #7F8C8D
- **背景**: 透明 / #F8F9FA (需要时)
- **圆角**: 4px
- **内边距**: 4px 8px

---

## 色彩系统

### 主色调
- **主蓝色**: #3498DB (Primary Blue)
- **主绿色**: #2ECC71 (Success Green)
- **深蓝灰**: #2C3E50 (Text Dark)

### 辅助色调
- **信息蓝**: #5DADE2 (Light Blue)
- **警告橙**: #F39C12 (Warning Orange)
- **危险红**: #E74C3C (Danger Red)
- **中性灰**: #95A5A6 (Neutral Gray)

### 背景色调
- **页面背景**: #FFFFFF (White)
- **卡片背景**: #FFFFFF (White)
- **分割背景**: #F8F9FA (Light Gray)
- **强调背景**: #EBF5FB (Light Blue)

### 渐变色
- **主题渐变**: #3498DB → #2ECC71 (90度线性渐变)
- **卡片渐变**: rgba(52, 152, 219, 0.1) → rgba(46, 204, 113, 0.1)

---

## 图表设计规范

### 折线图
- **线条粗细**: 3px
- **数据点大小**: 外圆6px，内圆4px
- **数据点颜色**: 白色外圈，主题色内圈
- **网格线**: 水平垂直线，1px，#ECF0F1
- **坐标轴**: 2px，#BDC3C7
- **标签字体**: 12px，#7F8C8D

### 柱状图
- **柱子宽度**: 占分类宽度的60%
- **柱子间距**: 20px
- **圆角**: 4px
- **数值标签**: 柱子上方，14px，#2C3E50

### 饼图
- **圆心位置**: 区域中心
- **外圆半径**: 80px
- **内圆半径**: 0px (非环形图) / 40px (环形图)
- **扇区间距**: 2px
- **标签线**: 1px，#BDC3C7

---

## 卡片与容器

### 标准卡片
- **背景色**: #FFFFFF
- **边框**: 1px，#ECF0F1
- **圆角**: 12px
- **阴影**: 0 4px 12px rgba(0,0,0,0.08)
- **内边距**: 24px
- **外边距**: 16px

### 数据卡片
- **背景色**: #FFFFFF
- **边框**: 3px，主题色
- **圆角**: 15px
- **内边距**: 20px
- **最小宽度**: 200px
- **最小高度**: 100px

### 状态指示器
- **成功**: #2ECC71 (绿色)
- **警告**: #F1C40F (黄色)
- **危险**: #E74C3C (红色)
- **中性**: #BDC3C7 (灰色)
- **尺寸**: 12px圆形点

---

## 按钮与交互元素

### 主要按钮
- **背景色**: #3498DB
- **悬停色**: #2980B9
- **文字颜色**: #FFFFFF
- **字体**: 思源黑体 Medium，14px
- **圆角**: 6px
- **内边距**: 12px 24px
- **阴影**: 0 2px 4px rgba(0,0,0,0.1)
- **过渡**: 0.2s ease

### 次要按钮
- **背景色**: #95A5A6
- **悬停色**: #7F8C8D
- **其他属性同主要按钮**

### 成功按钮
- **背景色**: #2ECC71
- **悬停色**: #27AE60
- **其他属性同主要按钮**

---

## 图例与标注

### 图例容器
- **位置**: 底部或右侧
- **背景色**: #F8F9FA
- **圆角**: 8px
- **内边距**: 8px 16px

### 图例项
- **布局**: 水平排列，间距8px
- **色块**: 12px × 12px，圆角2px
- **文字**: 12px，#2C3E50，左对齐
- **间距**: 色块与文字5px

### 标注框
- **背景色**: rgba(44, 62, 80, 0.95)
- **文字颜色**: #FFFFFF
- **圆角**: 6px
- **内边距**: 10px 15px
- **字体**: 12px
- **阴影**: 0 4px 12px rgba(0,0,0,0.2)

---

## 布局模板

### 两栏布局
- **比例**: 40% : 60% 或 50% : 50%
- **间距**: 中间分隔30px
- **垂直对齐**: 顶部对齐

### 三栏布局
- **比例**: 33.33% 等分
- **间距**: 栏间20px
- **最小宽度**: 200px

### 居中布局
- **水平居中**: margin: 0 auto
- **垂直居中**: flexbox justify-content: center
- **最大宽度**: 800px

---

## 动效与过渡

### 页面切换
- **效果**: 淡入淡出 0.3s ease
- **滑动效果**: 0.4s ease-out
- **避免**: 旋转、缩放等复杂效果

### 元素动画
- **悬停效果**: transform: translateY(-2px)
- **阴影过渡**: box-shadow 0.2s ease
- **颜色过渡**: color 0.2s ease

---

## 响应式设计

### 桌面端 (>1200px)
- **字体大小**: 标准100%
- **间距**: 标准20px网格
- **图片**: 最大宽度100%

### 平板端 (768px-1200px)
- **字体大小**: 90%
- **间距**: 16px网格
- **多栏布局**: 改为两栏或单栏

### 移动端 (<768px)
- **字体大小**: 80%
- **间距**: 12px网格
- **布局**: 全部单栏
- **按钮**: 增大触摸区域，最小44px高度

---

## 数据可视化标准

### 颜色映射
- **正面/增长**: #2ECC71 (绿色)
- **负面/下降**: #E74C3C (红色)
- **中性/持平**: #F39C12 (橙色)
- **数据线**: #3498DB, #E67E22, #9B59B6, #1ABC9C

### 字体规范
- **图表标题**: 18px，Bold，#2C3E50
- **坐标轴标签**: 12px，Regular，#7F8C8D
- **数据标签**: 14px，Medium，#2C3E50
- **图例文字**: 12px，Regular，#7F8C8D

---

## 导航控件

### 页面指示器
- **位置**: 底部中央
- **样式**: 水平圆点
- **活动状态**: 主题色，10px
- **非活动状态**: 灰色，6px
- **间距**: 8px

### 前进后退按钮
- **位置**: 左右两侧居中
- **样式**: 圆形，半透明背景
- **图标**: 白色箭头，20px
- **悬停**: 背景色加深
- **触摸区域**: 50px × 50px

---

## 品牌元素

### Logo位置
- **标准位置**: 左上角
- **尺寸**: 高度40px
- **边距**: 距边缘20px
- **背景**: 透明或白色

### 版权信息
- **位置**: 页面底部
- **字体**: 10px，#95A5A6
- **对齐**: 居中
- **边距**: 距底部20px

---

## 可访问性标准

### 对比度
- **正文文本**: 最低4.5:1
- **大号文本**: 最低3:1
- **图形元素**: 最低3:1

### 焦点状态
- **键盘焦点**: 2px，#3498DB外框
- **跳转链接**: 页面顶部添加
- **屏幕阅读器**: 提供alt文本

---

## 文件导出规范

### PDF导出
- **分辨率**: 300dpi
- **色彩模式**: CMYK
- **包含字体**: 嵌入所有字体
- **压缩**: 高质量

### 图片导出
- **格式**: PNG (有透明)/ JPEG (无透明)
- **分辨率**: 150dpi (屏幕)/ 300dpi (打印)
- **色彩**: sRGB
- **压缩**: 高质量 (80-90%)

---

## Canvas绘图技术规范

### Canvas基础设置
```javascript
// Canvas初始化标准
const canvas = document.getElementById('pptCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;

// 高清屏幕适配
const dpr = window.devicePixelRatio || 1;
canvas.width = 1920 * dpr;
canvas.height = 1080 * dpr;
ctx.scale(dpr, dpr);
canvas.style.width = '1920px';
canvas.style.height = '1080px';
```

### 绘图性能优化
- **离屏Canvas**: 复杂图形先绘制到offscreen canvas
- **重绘控制**: 使用requestAnimationFrame，避免重复绘制
- **图层管理**: 静态背景缓存，只重绘动态内容
- **清除操作**: 使用clearRect而非重新设置canvas宽度

### 文字渲染标准
```javascript
// 文字绘制函数
function drawText(text, x, y, options = {}) {
    const {
        font = '16px Microsoft YaHei',
        color = '#2C3E50',
        align = 'left',
        baseline = 'top',
        maxWidth = null
    } = options;
    
    ctx.save();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    
    if (maxWidth) {
        // 文字换行处理
        const words = text.split('');
        let line = '';
        let currentY = y;
        
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, currentY);
                line = words[n];
                currentY += parseInt(font) * 1.2;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, currentY);
    } else {
        ctx.fillText(text, x, y);
    }
    
    ctx.restore();
}
```

### 圆角矩形绘制
```javascript
// 圆角矩形Polyfill
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        if (typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
            const defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
            for (let side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        this.moveTo(x + radius.tl, y);
        this.lineTo(x + width - radius.tr, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        this.lineTo(x + width, y + height - radius.br);
        this.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        this.lineTo(x + radius.bl, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        this.lineTo(x, y + radius.tl);
        this.quadraticCurveTo(x, y, x + radius.tl, y);
    };
}
```

---

## 图表绘制规范

### 折线图标准
```javascript
function drawLineChart(data, config) {
    const {
        x, y, width, height,          // 图表位置和尺寸
        maxValue, minValue,           // 数据范围
        gridLines = 10,              // 网格线数量
        lineWidth = 3,               // 线条粗细
        pointRadius = 6,             // 数据点半径
        colors = ['#3498DB'],        // 线条颜色
        labels = [],                 // X轴标签
        showPoints = true            // 是否显示数据点
    } = config;
    
    // 绘制网格
    ctx.strokeStyle = '#ECF0F1';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridLines; i++) {
        const gridY = y + (i * height / gridLines);
        ctx.beginPath();
        ctx.moveTo(x, gridY);
        ctx.lineTo(x + width, gridY);
        ctx.stroke();
    }
    
    // 绘制数据线
    data.forEach((series, seriesIndex) => {
        ctx.strokeStyle = colors[seriesIndex];
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        
        series.forEach((value, index) => {
            const dataX = x + (index * width / (series.length - 1));
            const dataY = y + height - ((value - minValue) / (maxValue - minValue)) * height;
            
            if (index === 0) {
                ctx.moveTo(dataX, dataY);
            } else {
                ctx.lineTo(dataX, dataY);
            }
            
            // 存储点位置用于交互
            series.points = series.points || [];
            series.points[index] = { x: dataX, y: dataY, value, label: labels[index] };
        });
        
        ctx.stroke();
        
        // 绘制数据点
        if (showPoints) {
            series.points.forEach(point => {
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = colors[seriesIndex];
                ctx.beginPath();
                ctx.arc(point.x, point.y, pointRadius - 2, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    });
}
```

### 柱状图标准
```javascript
function drawBarChart(data, config) {
    const {
        x, y, width, height,
        barWidth = 40,
        barSpacing = 20,
        maxValue,
        colors = ['#3498DB'],
        borderRadius = 4,
        showValues = true
    } = config;
    
    const groupWidth = data.length * barWidth + (data.length - 1) * barSpacing;
    const startX = x + (width - groupWidth) / 2;
    
    data.forEach((value, index) => {
        const barX = startX + index * (barWidth + barSpacing);
        const barHeight = (value / maxValue) * height;
        const barY = y + height - barHeight;
        
        // 绘制柱子
        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.roundRect(barX, barY, barWidth, barHeight, borderRadius);
        ctx.fill();
        
        // 显示数值
        if (showValues) {
            ctx.fillStyle = '#2C3E50';
            ctx.font = '14px Microsoft YaHei';
            ctx.textAlign = 'center';
            ctx.fillText(value.toString(), barX + barWidth / 2, barY - 10);
        }
    });
}
```

### 饼图标准
```javascript
function drawPieChart(data, config) {
    const {
        centerX, centerY,
        radius = 80,
        innerRadius = 0,
        colors = ['#3498DB', '#E74C3C', '#2ECC71'],
        showLabels = true,
        labelDistance = 20
    } = config;
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = -Math.PI / 2;
    
    data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * Math.PI * 2;
        const endAngle = startAngle + sliceAngle;
        
        // 绘制扇形
        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        if (innerRadius > 0) {
            ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        }
        ctx.closePath();
        ctx.fill();
        
        // 绘制标签
        if (showLabels) {
            const labelAngle = startAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius + labelDistance);
            const labelY = centerY + Math.sin(labelAngle) * (radius + labelDistance);
            
            ctx.fillStyle = '#2C3E50';
            ctx.font = '12px Microsoft YaHei';
            ctx.textAlign = 'center';
            ctx.fillText(`${item.label}: ${item.value}%`, labelX, labelY);
        }
        
        startAngle = endAngle;
    });
}
```

---

## 表格绘制规范

### 基础表格结构
```javascript
function drawTable(data, config) {
    const {
        x, y,
        colWidths = [100, 150, 100, 100],
        rowHeight = 40,
        headerHeight = 50,
        headerBg = '#3498DB',
        headerColor = '#FFFFFF',
        cellBg = '#FFFFFF',
        borderColor = '#ECF0F1',
        textColor = '#2C3E50',
        fontSize = 14,
        borderRadius = 8
    } = config;
    
    // 绘制表头
    ctx.fillStyle = headerBg;
    ctx.beginPath();
    ctx.roundRect(x, y, colWidths.reduce((a, b) => a + b, 0), headerHeight, 
                   {tl: borderRadius, tr: borderRadius, bl: 0, br: 0});
    ctx.fill();
    
    // 表头文字
    ctx.fillStyle = headerColor;
    ctx.font = `bold ${fontSize}px Microsoft YaHei`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let currentX = x;
    data.headers.forEach((header, index) => {
        ctx.fillText(header, currentX + colWidths[index] / 2, y + headerHeight / 2);
        currentX += colWidths[index];
    });
    
    // 绘制表格行
    ctx.fillStyle = cellBg;
    data.rows.forEach((row, rowIndex) => {
        const rowY = y + headerHeight + rowIndex * rowHeight;
        
        // 行背景
        if (rowIndex % 2 === 0) {
            ctx.fillStyle = '#F8F9FA';
        } else {
            ctx.fillStyle = cellBg;
        }
        ctx.fillRect(x, rowY, colWidths.reduce((a, b) => a + b, 0), rowHeight);
        
        // 单元格文字
        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px Microsoft YaHei`;
        
        currentX = x;
        row.forEach((cell, cellIndex) => {
            ctx.textAlign = cellIndex === 0 ? 'left' : 'center';
            const textAlign = cellIndex === 0 ? 10 : colWidths[cellIndex] / 2;
            ctx.fillText(cell, currentX + textAlign, rowY + rowHeight / 2);
            currentX += colWidths[cellIndex];
        });
    });
    
    // 绘制边框
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, colWidths.reduce((a, b) => a + b, 0), 
                   headerHeight + data.rows.length * rowHeight);
    
    // 绘制垂直线
    currentX = x;
    colWidths.forEach((width, index) => {
        if (index < colWidths.length - 1) {
            currentX += width;
            ctx.beginPath();
            ctx.moveTo(currentX, y);
            ctx.lineTo(currentX, y + headerHeight + data.rows.length * rowHeight);
            ctx.stroke();
        }
    });
}
```

---

## 交互处理规范

### 鼠标交互
```javascript
// 事件监听器设置
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('click', handleClick);
canvas.addEventListener('mouseleave', handleMouseLeave);

// 鼠标移动处理
function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // 检查悬停状态
    let hoveredElement = null;
    
    // 检查数据点
    chartData.forEach(series => {
        if (series.points) {
            series.points.forEach(point => {
                const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
                if (distance < 10) {
                    hoveredElement = point;
                    canvas.style.cursor = 'pointer';
                }
            });
        }
    });
    
    if (!hoveredElement) {
        canvas.style.cursor = 'default';
    }
    
    // 触发重绘
    draw();
}

// 工具提示显示
function showTooltip(x, y, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y - 30 + 'px';
    tooltip.style.opacity = '1';
}
```

### 键盘导航
```javascript
document.addEventListener('keydown', handleKeyboard);

function handleKeyboard(event) {
    switch(event.key) {
        case 'ArrowLeft':
            navigateToPreviousSlide();
            break;
        case 'ArrowRight':
            navigateToNextSlide();
            break;
        case 'Home':
            goToFirstSlide();
            break;
        case 'End':
            goToLastSlide();
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
    }
}
```

---

## 动画实现规范

### 缓动函数
```javascript
const EasingFunctions = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
};

// 动画函数
function animate(duration, easing, callback) {
    const startTime = performance.now();
    
    function frame(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = EasingFunctions[easing](progress);
        
        callback(easedProgress);
        
        if (progress < 1) {
            requestAnimationFrame(frame);
        }
    }
    
    requestAnimationFrame(frame);
}
```

### 页面切换动画
```javascript
function slideTransition(fromSlide, toSlide, direction = 'left') {
    const canvas = document.getElementById('pptCanvas');
    const ctx = canvas.getContext('2d');
    
    animate(400, 'easeInOutQuad', (progress) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (direction === 'left') {
            // 向左滑动
            ctx.save();
            ctx.translate(canvas.width * (1 - progress), 0);
            drawSlide(fromSlide);
            ctx.restore();
            
            ctx.save();
            ctx.translate(-canvas.width * progress, 0);
            drawSlide(toSlide);
            ctx.restore();
        } else {
            // 向右滑动
            ctx.save();
            ctx.translate(-canvas.width * (1 - progress), 0);
            drawSlide(fromSlide);
            ctx.restore();
            
            ctx.save();
            ctx.translate(canvas.width * progress, 0);
            drawSlide(toSlide);
            ctx.restore();
        }
    });
}
```

---

## 性能优化规范

### Canvas优化
- **批量绘制**: 合并相似的绘制操作
- **状态管理**: 减少save/restore调用
- **离屏渲染**: 复杂元素预渲染
- **重绘区域**: 只更新变化的部分

### 内存管理
```javascript
// 对象池模式
class ObjectPool {
    constructor(createFn, resetFn, initialSize = 10) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.pool = [];
        
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }
    
    get() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        return this.createFn();
    }
    
    release(obj) {
        this.resetFn(obj);
        this.pool.push(obj);
    }
}

// 使用示例
const pointPool = new ObjectPool(
    () => ({ x: 0, y: 0, value: 0 }),
    (point) => { point.x = 0; point.y = 0; point.value = 0; }
);
```

---

## 检查清单

### 设计检查
- [ ] 色彩对比度符合标准
- [ ] 字体层级清晰
- [ ] 间距一致性
- [ ] 对齐规范应用
- [ ] 响应式适配

### 内容检查
- [ ] 数据准确性
- [ ] 拼写语法正确
- [ ] 术语一致性
- [ ] 数据源标注
- [ ] 逻辑流畅性

### 技术检查
- [ ] Canvas性能优化
- [ ] 事件处理正确
- [ ] 动画流畅性
- [ ] 内存泄漏检查
- [ ] 跨浏览器兼容性
- [ ] 触摸设备支持
- [ ] 文件大小优化