import re

with open('src/data/chapter4_content.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# First placeholder
s1 = r"direction vectors of the \$xy\$-plane\.\n\n\$xy\$ plane ပေါ်ရှိ"
r1 = "direction vectors of the $xy$-plane.\n\n[DIAGRAM:Chap4_4_4_PlaneEq_Diag1]\n\n$xy$ plane ပေါ်ရှိ"

# Second placeholder
s2 = r"sum of scalar multiples of those two vectors\.\n\nယေဘုယျအားဖြင့်"
r2 = "sum of scalar multiples of those two vectors.\n\n[DIAGRAM:Chap4_4_4_PlaneEq_Diag2]\n\nယေဘုယျအားဖြင့်"

content = re.sub(s1, r1, content)
content = re.sub(s2, r2, content)

with open('src/data/chapter4_content.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Inserted diagram tags")
