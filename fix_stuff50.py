import re
text = "$$\n\\begin{aligned}"
print("Text:", repr(text))
new_text = re.sub(r'\$\$\s*\\begin\{aligned\}', r'$$ \\begin{aligned}', text)
print("New:", repr(new_text))
