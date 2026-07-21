const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
`$$ \\overrightarrow{AB} = \\overrightarrow{DC} = \\vec{a}, \\quad \\overrightarrow{AD} = \\overrightarrow{BC} = \\vec{b}. $$
$$ \\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{BC} = \\vec{a} + \\vec{b}. $$`,
`$$
\\begin{aligned}
\\overrightarrow{AB} &= \\overrightarrow{DC} = \\vec{a}, \\quad \\overrightarrow{AD} = \\overrightarrow{BC} = \\vec{b}. \\\\
\\overrightarrow{AC} &= \\overrightarrow{AB} + \\overrightarrow{BC} = \\vec{a} + \\vec{b}.
\\end{aligned}
$$`
);

fs.writeFileSync('src/data/chapter4_content.ts', code);
