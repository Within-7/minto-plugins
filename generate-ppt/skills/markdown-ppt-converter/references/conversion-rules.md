# Markdown to HTML PPT Conversion Rules

## Overview
This document defines the systematic rules for converting Markdown content into professional HTML presentations following McKinsey/BCG design standards.

## 1. Content Analysis Rules

### 1.1 Slide Boundary Detection
```markdown
# Main Title → Cover Slide
## Section Header → New Slide with Header
### Subsection → Content within current slide or *** → Explicit slide break
```

### 1.2 Content Type Recognition
- Headers (`#`, `##`, `###`) → Slide titles and section headers
- Lists (`-`, `*`, `1.`) → Bullet or numbered lists
- Tables (`|`) → Data tables with professional styling
- Code blocks (```) → Syntax highlighted code cards
- Images (`![]()`) → Image focus slides
- Quotes (`>`) → Quote slides with emphasis

## 2. Slide Type Assignment Rules

### 2.1 Cover Slide
**Trigger**: First `#` header in document
**Template**: `cover-slide`
**Required Elements**:
- Main title from `#` header
- Subtitle from first paragraph after title
- Date and author if provided

### 2.2 Table of Contents
**Trigger**: Document has more than 3 sections
**Template**: `toc-slide`
**Auto-generated from**: All `##` headers

### 2.3 Content Slide
**Trigger**: Standard `##` section header
**Template**: `content-slide`
**Layout**: Card-based content organization

### 2.4 Two Column Slide
**Trigger**: Section with comparison keywords
**Keywords**: "对比", "比较", "vs", "versus", "差异"
**Template**: `two-column-slide`

### 2.5 Chart Slide
**Trigger**: Section containing data or statistics
**Keywords**: "数据", "统计", "图表", "趋势", "分析"
**Template**: `chart-slide`

### 2.6 Process Flow Slide
**Trigger**: Sequential content or steps
**Keywords**: "流程", "步骤", "阶段", "过程", "顺序"
**Template**: `process-slide`

### 2.7 Comparison Slide
**Trigger**: Pros/cons or advantages/disadvantages
**Keywords**: "优势", "劣势", "优点", "缺点", "pros", "cons"
**Template**: `comparison-slide`

## 3. Typography Conversion Rules

### 3.1 Header Hierarchy
```markdown
# H1 → 36px bold, white on black background
## H2 → 32px bold, deep blue (#556EE6)
### H3 → 28px bold, orange (#F85d42)
#### H4 → 24px bold, green (#34c38f)
##### H5 → 20px bold, light blue (#50a5f1)
###### H6 → 18px bold, yellow (#f1b44c)
```

### 3.2 Text Emphasis
```markdown
**bold** → <strong class="highlight"> (orange #F85d42)
*italic* → <em class="emphasis"> (slightly darker)
`code` → <code class="inline-code"> (gray background)
~~strikethrough~~ → <del> (light red)
```

### 3.3 Data Highlighting
- Numbers with `%` → `<span class="key-data">` (large orange)
- Currency values → `<span class="currency-data">` (green for positive, red for negative)
- Dates → `<span class="date-data">` (professional formatting)

## 4. List Conversion Rules

### 4.1 Unordered Lists
```markdown
- Item 1 → <ul class="bullet-list"><li class="list-item">
  - Orange bullet points (•)
  - 24px font size for bullets
  - 18px font size for text
  - 16px spacing between items
```

### 4.2 Ordered Lists
```markdown
1. Item 1 → <ol class="number-list"><li class="list-item">
   - Orange circular numbers
   - Professional numbering style
   - Consistent indentation
```

### 4.3 Nested Lists
- Maintain hierarchy with proper indentation
- Different bullet styles for each level
- Consistent color scheme throughout

## 5. Table Conversion Rules

### 5.1 Basic Table Structure
```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
```
→
```html
<table class="data-table">
  <thead><tr><th>Header 1</th>...</thead>
  <tbody><tr><td>Data 1</td>...</tbody>
</table>
```

### 5.2 Table Styling Rules
- Header row: Black background (#000000), white text
- Alternating row colors: White and light gray (#F8F9FA)
- Hover effects: Light orange background on row hover
- Cell padding: 16px vertical, 20px horizontal
- Border: 1px solid #E0E0E0 between rows

### 5.3 Special Table Types
- **Comparison tables**: Use two-column layout with color coding
- **Data tables**: Highlight key metrics in orange
- **Timeline tables**: Use process flow styling

## 6. Image Handling Rules

### 6.1 Image Slides
- Large images get dedicated slides
- Automatic caption extraction from alt text
- Professional border and shadow effects

### 6.2 Inline Images
- Sized appropriately for content area
- Maintained aspect ratio
- Professional spacing and alignment

## 7. Code Block Rules

### 7.1 Syntax Highlighting
- Automatic language detection
- Professional color scheme for code
- Line numbers if specified
- Copy functionality

### 7.2 Code Card Styling
```html
<div class="code-card">
  <div class="code-header">
    <span class="code-language">{{LANGUAGE}}</span>
    <button class="copy-code">复制</button>
  </div>
  <pre class="code-content"><code>{{CODE}}</code></pre>
</div>
```

## 8. Color Application Rules

### 8.1 Primary Colors
- **Background**: White (#FFFFFF)
- **Headers**: Black (#000000)
- **Accent**: Orange (#F85d42)

### 8.2 Secondary Colors (used systematically)
- **Deep Blue**: #556EE6 (for main sections)
- **Green**: #34c38f (for positive data/success)
- **Light Blue**: #50a5f1 (for informational content)
- **Yellow**: #f1b44c (for warnings/highlights)

### 8.3 Color Usage Guidelines
- Maximum 3 colors per slide
- Consistent color coding throughout presentation
- Accessibility-compliant contrast ratios

## 9. Layout Rules

### 9.1 Content Spacing
- Slide header: 80px fixed height
- Content padding: 40px all sides
- Card margins: 16px vertical spacing
- Grid gaps: 24px between items

### 9.2 Grid System
- Responsive grid with minimum 280px columns
- Automatic wrapping for multiple items
- Consistent alignment across slides

### 9.3 Alignment Rules
- Headers always centered
- Content left-aligned by default
- Images centered when standalone
- Tables full-width when possible

## 10. Animation and Transition Rules

### 10.1 Slide Transitions
- Fade transition between slides (0.5s)
- Smooth opacity changes
- No jarring movements

### 10.2 Content Animations
- Cards slide up on appearance (0.6s)
- Subtle hover effects on interactive elements
- Loading states for downloads

## 11. Download and Export Rules

### 11.1 Image Generation
- Fixed dimensions: 960x540px
- High quality (scale: 3x)
- PNG format with transparency support
- Professional filename format

### 11.2 File Naming Convention
```
PPT_第{X}页_{TIMESTAMP}_960x540.png
```

## 12. Quality Assurance Rules

### 12.1 Pre-generation Checks
- Validate markdown syntax
- Check for broken images/links
- Ensure content fits slide dimensions
- Verify color contrast ratios

### 12.2 Post-generation Validation
- Confirm all slides have proper structure
- Validate navigation functionality
- Test download feature
- Check responsive behavior

## 13. Error Handling Rules

### 13.1 Content Errors
- Malformed markdown → Clean up and continue
- Missing images → Placeholder with error message
- Oversized content → Automatic scaling/wrapping

### 13.2 Technical Errors
- html2canvas failure → Graceful degradation with alert
- Network issues for external resources → Fallback to local
- JavaScript errors → Basic functionality preservation

This rule set ensures consistent, professional output that meets McKinsey/BCG presentation standards while maintaining technical reliability and user experience quality.