import re

with open('src/data/chapter4_content.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find any line that starts with $$ or > $$ and ends with exactly one $
def replacer(match):
    return match.group(1) + '$$'

# We'll use a regex that matches the start of the line, then $$ or > $$, then anything up to the end of the line, and exactly one $.
# Actually, let's just do it line by line.

lines = content.split('\n')
for i, line in enumerate(lines):
    stripped = line.rstrip()
    if (stripped.startswith('$$') or stripped.startswith('> $$')) and stripped.endswith('$') and not stripped.endswith('$$'):
        lines[i] = stripped + '$'

with open('src/data/chapter4_content.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

