import re
with open("src/components/Latex.tsx", "r") as f:
    text = f.read()

# 1. Remove empty line spacer
text = text.replace(
    "renderedElements.push(<div key={`empty-${i}`} className=\"h-2\" />);",
    "// empty line spacer removed"
)

# 2. Reduce margin on DraggableScroll in Latex.tsx multi-line block math
text = text.replace(
    'className="katex-block my-3 py-1 w-full font-serif text-slate-800 dark:text-slate-200"',
    'className="katex-block w-full font-serif text-slate-800 dark:text-slate-200"'
)

# 3. Reduce margin for the pure block requested via props
text = text.replace(
    '<DraggableScroll className="katex-block my-3 py-1" dangerouslySetInnerHTML',
    '<DraggableScroll className="katex-block my-1" dangerouslySetInnerHTML'
)

# 4. Text line div margin reduction
# className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs md:text-sm my-2 overflow-x-auto scrollbar-none py-1"
text = text.replace(
    'className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs md:text-sm my-2 overflow-x-auto scrollbar-none py-1"',
    'className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs md:text-sm my-0.5 overflow-x-auto scrollbar-none py-0.5"'
)

with open("src/components/Latex.tsx", "w") as f:
    f.write(text)
