sed -i '/^\$\$$/{
N
/^\$\$\\n\\begin{aligned}/ {
  s/^\$\$\\n\\begin{aligned}/$$ \\begin{aligned}/
}
}' src/data/chapter4_content.ts

# We can just write a quick node script to read all lines, 
# and when we see $$, if the next line is \begin{aligned}, join them.
# Even better:
