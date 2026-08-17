import re

with open('src/data/chapter4_content.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the text placeholders with actual [DIAGRAM:...] syntax that the Markdown parser supports.
content = content.replace("Placeholder for diagram: Chap4_4_4_PlaneEq_Diag1", "[DIAGRAM:Chap4_4_4_PlaneEq_Diag1]")
content = content.replace("Placeholder for diagram: Chap4_4_4_PlaneEq_Diag2", "[DIAGRAM:Chap4_4_4_PlaneEq_Diag2]")

with open('src/data/chapter4_content.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Placeholders converted.")
