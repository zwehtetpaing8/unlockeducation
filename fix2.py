import re

with open('src/data/chapter4_content.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace ` $\n` with ` $$\n` BUT ONLY IF the ` $\n` belongs to a `$$ ` block.
# Since this is a template string, `\n` is represented as the characters `\` and `n`.
# So we are looking for ` $\n`.

# Let's split by `\n` literal string
lines = content.split('\\n')

for i in range(len(lines)):
    line = lines[i]
    if (line.startswith('$$') or line.startswith('> $$')) and line.endswith(' $'):
        lines[i] = line + '$'

content = '\\n'.join(lines)
with open('src/data/chapter4_content.ts', 'w', encoding='utf-8') as f:
    f.write(content)

