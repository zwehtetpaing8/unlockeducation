# Past Papers Module Implementation Guide

This guide describes the architecture and performance considerations of the Past Papers module.

## 1. Component Architecture
The module is built using a modular React structure:
- **`PastPapers` (Main Page):** Handles orchestration, data fetching from Supabase, and global layout.
- **`QuestionBlock`:** A self-contained component for each question. It manages its own "Show/Hide Solution" state to prevent unnecessary re-renders of the entire list.
- **`Year & Section Selectors`:** Hybrid UI elements that adapt between custom dropdowns (Desktop) and horizontal tab-scrollers (Mobile) for optimal touch targets.

## 2. Performance Optimizations
- **Memoized Filtering:** The `useMemo` hook is used for the filtered list to ensure that typing in the search bar or switching sections doesn't trigger expensive array operations unnecessarily.
- **Lazy Image Loading:** While not explicitly used for text, standard markdown images in the solutions use lazy loading if added.
- **Viewport-Aware Animations:** `Framer Motion`'s `whileInView` is used for question blocks to stagger entrances and reduce initial CPU load during heavy scrolls.

## 3. Responsive Styling Strategy
- **Mobile-First Layout:** The primary grid switches from 1 column (Mobile) to a structured list, with padding and font sizes adjusting via Tailwind breakpoints (`sm`, `md`, `lg`).
- **Equation Overflow Handling:** The `index.css` includes specific rules for `.katex-display` to allow horizontal scrolling on mobile, preventing layout breaks on wide equations.
- **Interaction Feedback:** Large tap targets (minimum 44px height) are used for all buttons, with haptic-simulated `active:scale-95` effects for better user feedback.

## 4. Future Enhancements
- **Infinite Scroll:** Can be implemented if the library grows beyond 50+ questions per section.
- **Search Highlighting:** Using a utility to highlight matches in the question text.
- **PDF Generation:** Using `jsPDF` or `react-to-print` to allow users to generate custom question banks based on their filtered selection.
