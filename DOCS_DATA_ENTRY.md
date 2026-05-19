# Past Paper Data Specifications

This document outlines the required structure and formatting for past paper entries in the database to ensure correct rendering in the interactive module.

## 1. Expected JSON Structure

Each row in the `past_papers` table should follow this schema. When importing via JSON or API, ensure these fields are present:

```json
{
  "id": "2026A_Q01",                // Unique Identifier (Year + Section + Question Number)
  "year": 2026,                     // Integer: YYYY
  "subject": "Mathematics",         // String: Subject name
  "grade_level": 12,                // Integer: Grade level
  "title": "Complex Numbers Q1",   // String: Short descriptive title
  "section": "Section A Multiple Choice", // Enum: "Section A Multiple Choice", "B", "C", "D", "Full Paper"
  "chapter": "Chapter 1: Complex Numbers", // String (Optional): The chapter this question belongs to
  "content": "Question text here...", // String (Markdown): The actual question text
  "solution_content": "Solution...", // String (Markdown): The step-by-step solution
  "pdf_url": "https://...",        // String (Optional): URL to original PDF
  "answer_pdf_url": "https://..."   // String (Optional): URL to official answer key
}
```

## 2. LaTeX and Mathematical Equations

Our rendering engine uses **KaTeX**. Follow these rules for all mathematical content in `content` and `solution_content`:

### Inline Equations
Use single dollar signs for inline math:
`The radius $r$ is equal to 5.`

### Block Equations
Use double dollar signs for standalone blocks:
`$$|z| = \sqrt{a^2 + b^2}$$`

### Multi-line & Alignment
For multi-line derivations, use the `aligned` environment. This ensures proper alignment on the equals sign across all devices:

```latex
$$
\begin{aligned}
x^2 - 5x + 6 &= 0 \\
(x-2)(x-3) &= 0 \\
x = 2 \text{ or } x &= 3
\end{aligned}
$$
```

## 3. Image Handling

If a question or solution requires an image, use standard Markdown syntax. 

### Implementation Strategies:
1. **Direct URLs (Recommended):** Host images on a CDN or Supabase Storage and reference them:
   `![Diagram Description](https://your-storage.com/images/2026A_Q01_diagram.png)`
2. **Base64:** For very small SVG snippets or icons, you can use data URLs (avoid for large photos).
3. **Internal Assets:** If using the `src/assets` folder during development:
   Note: Dynamic rendering from imports is complex for DB-driven content. **Always prefer hosted URLs for production data.**

## 4. Markdown Features
We support:
- **Bold/Italics:** `**Correct Choice**`
- **Lists:** Bulleted or numbered steps for solutions.
- **Line Breaks:** Single newlines for paragraph breaks. Use `\n\n` in JSON strings.

## 5. Data Entry Checklist
- [ ] `year` is a 4-digit integer.
- [ ] `section` matches one of the allowed categories exactly.
- [ ] All LaTeX symbols are escaped correctly if entering via raw SQL (e.g., `\\` for `\`).
- [ ] `solution_content` contains clear, step-by-step logic.
- [ ] Titles are consistent across the same paper subset.
