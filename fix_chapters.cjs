const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

const s1 = String.raw`$\begin{aligned}
  i^1 &= i & i^5 &= i^4i = i \\
  i^2 &= -1 & i^6 &= i^4i^2 = -1 \\
  i^3 &= i^2i = -i & i^7 &= i^4i^3 = -i \\
  i^4 &= i^2i^2 = 1 & i^8 &= i^4i^4 = 1
\end{aligned}$`;
content = content.replace(s1, String.raw`$$\begin{aligned}
  i^1 &= i & i^5 &= i^4i = i \\
  i^2 &= -1 & i^6 &= i^4i^2 = -1 \\
  i^3 &= i^2i = -i & i^7 &= i^4i^3 = -i \\
  i^4 &= i^2i^2 = 1 & i^8 &= i^4i^4 = 1
\end{aligned}$$`);

const s2 = String.raw`$\begin{aligned}
  i^0 + i^1 + i^2 + i^3 &= 1 + i - 1 - i = 0, \\
  i^1 + i^2 + i^3 + i^4 &= i - 1 - i + 1 = 0, \\
  i^2 + i^3 + i^4 + i^5 &= -1 - i + 1 + i = 0.
\end{aligned}$`;
content = content.replace(s2, String.raw`$$\begin{aligned}
  i^0 + i^1 + i^2 + i^3 &= 1 + i - 1 - i = 0, \\
  i^1 + i^2 + i^3 + i^4 &= i - 1 - i + 1 = 0, \\
  i^2 + i^3 + i^4 + i^5 &= -1 - i + 1 + i = 0.
\end{aligned}$$`);

fs.writeFileSync('src/data/chapters.ts', content);
