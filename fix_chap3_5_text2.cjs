const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

const startIdx = text.indexOf('### 3.5 Spheres');
const endIdx = text.indexOf('---', startIdx + 1);

const replacement = `### 3.5 Spheres

[DIAGRAM:Chap3_5_Intro_Sphere]

The distance between center $(x_1, y_1, z_1)$ of a sphere and any point $(x, y, z)$ on the sphere is radius $r$.
> $$\\sqrt{(x - x_1)^2 + (y - y_1)^2 + (z - z_1)^2} = r$$

Therefore, the equation of the sphere with center $(x_1, y_1, z_1)$ and radius $r$ is
> $$(x - x_1)^2 + (y - y_1)^2 + (z - z_1)^2 = r^2$$
`;

text = text.substring(0, startIdx) + replacement + '\n' + text.substring(endIdx);
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
