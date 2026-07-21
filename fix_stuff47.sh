# Fix starting blocks
sed -i 's/\$\$ *\\begin{aligned}/$$ \\begin{aligned}/g' src/data/chapter4_content.ts
sed -i 's/\$\$ *\\begin{alignedat}/$$ \\begin{alignedat}/g' src/data/chapter4_content.ts
sed -i 's/\$ *\\begin{aligned}/$$ \\begin{aligned}/g' src/data/chapter4_content.ts
sed -i 's/\$ *\\begin{alignedat}/$$ \\begin{alignedat}/g' src/data/chapter4_content.ts

# Fix ending blocks (with any number of backslashes before end)
sed -i 's/\\*end{aligned} *\$/\\end{aligned} $$/g' src/data/chapter4_content.ts
sed -i 's/\\*end{alignedat} *\$/\\end{alignedat} $$/g' src/data/chapter4_content.ts

# Make sure we don't have $$$$
sed -i 's/$$ *$$/$$/g' src/data/chapter4_content.ts
