import re
with open("src/data/chapter4_content.ts", "r") as f:
    text = f.read()

text = re.sub(r'\$\$\s*\\\\begin\{aligned\}', r'$$ \\\\begin{aligned}', text)
text = re.sub(r'\\\\end\{aligned\}\s*\$\$', r'\\\\end{aligned} $$', text)

text = re.sub(r'\$\$\s*\\\\begin\{alignedat\}', r'$$ \\\\begin{alignedat}', text)
text = re.sub(r'\\\\end\{alignedat\}\s*\$\$', r'\\\\end{alignedat} $$', text)

with open("src/data/chapter4_content.ts", "w") as f:
    f.write(text)
