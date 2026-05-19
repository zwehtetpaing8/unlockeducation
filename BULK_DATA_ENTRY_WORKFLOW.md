# Workflow: Bulk Data Entry for Past Papers

This workflow is designed for processing large batches of questions and solutions efficiently while maintaining data integrity.

## 1. Data Receipt Formats
We accept bulk data in the following formats:
- **JSON Array:** A list of objects matching the schema in `DOCS_DATA_ENTRY.md`.
- **CSV/Spreadsheet:** Must include headers matching the database fields (`id`, `year`, `section`, etc.).

## 2. Iteration Process
When a bulk request is received, the processing engine (or AI agent) will:
1. **Initialize a log:** Create a "Success" and "Failure" list.
2. **Batch Processing:** Loop through every item in the provided list.
3. **Internal Validation:** Check each item for required fields and basic LaTeX syntax.

## 3. Implementation (Example Script Logic)
If performing a bulk insert via a script, use the following pattern:

```typescript
const bulkInsert = async (entries: PastPaper[]) => {
  const summary = { success: 0, failed: 0, errors: [] };

  for (const entry of entries) {
    try {
      // Validate entry first
      validateEntry(entry); 
      
      // Attempt DB Insert
      const { error } = await supabase.from('past_papers').insert(entry);
      if (error) throw error;

      summary.success++;
    } catch (err) {
      summary.failed++;
      summary.errors.push({ id: entry.id, error: err.message });
      console.error(`Failed to insert ${entry.id}:`, err.message);
      // Continue to next entry - DO NOT STOP THE ENTIRE PROCESS
    }
  }

  return summary;
};
```

## 4. Error Handling Strategy
- **Resiliency:** If one entry fails (e.g., due to a duplicate ID or malformed LaTeX), the process MUST continue to the next item.
- **Logging:** Every failure must be captured with the specific `id` and the reason for failure (e.g., "Missing field: solution_content").

## 5. Post-Processing Summary Report
After a bulk operation, a report must be generated for the user:

### Sample Report Format:
> **Bulk Operation Complete**
> - **Total Processed:** 50
> - **Successfully Added:** 48
> - **Failed:** 2
> 
> **Failure Details:**
> 1. `2026A_Q15`: Duplicate primary key.
> 2. `2025B_Q02`: LaTeX Syntax Error (Unclosed brace).

## 6. Verification
After bulk import:
1. Randomly sample 3-5 entries in the UI.
2. Verify math rendering on both mobile and desktop views.
3. Check that filters (Year/Section) correctly index the new batch.
