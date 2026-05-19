# Verification Guide: Past Papers Module

Follow these steps to verify that new content (single or bulk) has been correctly integrated and is rendering as expected.

## 1. Access the Module
Navigate to the **Past Papers** page in your browser.
- **Local/Dev:** Check the preview pane in AI Studio.
- **Production:** Navigate to the `/past-papers` route on your live URL.

## 2. Locate the New Content
Use the interactive selectors to filter the view:
1. **Year Selector:** Select the year corresponding to your update (e.g., `2026`).
2. **Section Selector:** Select the specific section (e.g., `Section A Multiple Choice`).
3. **Search:** If you know the title or ID, use the search bar for direct access.

## 3. Visual & Functional Inspection

### A. Question Rendering
- [ ] **Heading:** Does it say "Question X" with the correct index?
- [ ] **Context:** Does the metadata (Year • Section) below the heading match?
- [ ] **Text:** Is the question text clear and legible?
- [ ] **Math:** Are equations (LaTeX) rendering correctly? (Check for broken symbols like `[math error]` or raw code).

### B. Interactive Solutions
- [ ] **Toggle Button:** Click "View Professional Solution". Does it expand smoothly?
- [ ] **Label:** Does the "Expert Solution" tag appear?
- [ ] **Solution Content:** Is the step-by-step breakdown visible?
- [ ] **Alignment:** Are multi-line equations (`aligned` blocks) properly aligned at the equals sign?
- [ ] **Hide Toggle:** Click "Hide Solution". Does it collapse correctly?

### C. Responsive Checks
Resize your browser window or use DevTools "Toggle Device Toolbar" (Cmd+Shift+M):
- [ ] **Mobile Layout:** Does the question text scale correctly?
- [ ] **Equation Overflow:** Do long equations allow horizontal scrolling instead of breaking the card boundary?
- [ ] **Tap Targets:** Are buttons easily clickable on small screens?

## 4. Reporting & Troubleshooting
If issues are found, follow this protocol:

| Issue | Likely Cause | Fix |
| :--- | :--- | :--- |
| Math Error / Raw Code | Malformed LaTeX | Check `DOCS_DATA_ENTRY.md` for symbol escaping rules. |
| Nothing Found | Filter mismatch or ID conflict | Reset filters and check the `MOCK_PAPERS` or DB for the correct Section name. |
| Layout Breakage | Long unbreakable strings | Ensure spaces are present between text and math blocks. |

## 5. Final Confirmation
Once verified, provide a confirmation message:
> "New entry [ID] is now LIVE. Verified rendering of LaTeX equations and responsive layout on desktop and mobile."
