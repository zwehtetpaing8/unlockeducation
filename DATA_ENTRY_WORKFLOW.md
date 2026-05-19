# Workflow: Adding a New Past Paper Entry

Follow these steps to add a single question and solution to the Mastery Library.

## Step 1: Content Reception
Identify the source material. You need:
- **Metadata:** Year, Section (A, B, C, D, or Full), Subject, Grade.
- **Question Text:** The raw text of the problem.
- **Solution Text:** The professional step-by-step breakdown.

## Step 2: Formatting (JSON & LaTeX)
Convert the raw text into the structured format defined in `DOCS_DATA_ENTRY.md`.
- Wrap all math in `$...$` or `$$...$$`.
- Use `\begin{aligned}` for multi-step math.
- Escape double backslashes (`\\`) if inserting via JSON/SQL.

## Step 3: Validation
Before integration, verify:
- [ ] Is the `id` unique (e.g., `2026A_Q12`)?
- [ ] Does the `section` match the allowed enum?
- [ ] Are all brackets `{}` and symbols in LaTeX closed?
- [ ] Are paragraph breaks represented by `\n\n`?

## Step 4: Integration (Backend vs Static)

### A. Dynamic (Supabase/API)
Use the following SQL snippet or a script to insert into the database:
```sql
INSERT INTO past_papers (id, year, subject, grade_level, title, section, chapter, content, solution_content)
VALUES ('ID_HERE', 2026, 'Math', 12, 'Title', 'Section', 'Chapter Title', 'Question...', 'Solution...');
```

### B. Static (Fallback/MOCK_DATA)
If adding to the local fallback for testing, append your object to the `MOCK_PAPERS` array in `/src/pages/PastPapers.tsx`.

## Step 5: Update & Verification
- **Dynamic:** The changes will reflect immediately on the live app upon page refresh.
- **Static:** Save the file and ensure the dev server reloads.
- **Test:** Use the "Year" and "Section" filters to find your new question and toggle the "View Solution" button to verify rendering.

## Step 6: Confirmation
Document the addition in the project logs or inform the maintainer that the entry is live.
