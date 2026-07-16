const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

text = text.replace(
  '### 3.5 Spheres\n\n#### 1. Equation of the Sphere\n*   **Standard Form**:\n    $$(x - x_1)^2 + (y - y_1)^2 + (z - z_1)^2 = r^2$$\n*   **General Form**:\n    $$x^2 + y^2 + z^2 + 2ux + 2vy + 2wz + d = 0$$\n    with Center $= (-u, -v, -w)$ and Radius $r = \\sqrt{u^2 + v^2 + w^2 - d}$.\n\n#### 2. Tangent Plane to a Sphere\nThe equation of the tangent plane at $(x_0, y_0, z_0)$ is:\n$$(x_0 - x_1)(x - x_1) + (y_0 - y_1)(y - y_1) + (z_0 - z_1)(z - z_1) = r^2$$',
  `### 3.5 Spheres

[DIAGRAM:Chap3_5_Intro_Sphere]

The distance between center $(x_1, y_1, z_1)$ of a sphere and any point $(x, y, z)$ on the sphere is radius $r$.
> $$\\sqrt{(x - x_1)^2 + (y - y_1)^2 + (z - z_1)^2} = r$$
> Therefore, the equation of the sphere with center $(x_1, y_1, z_1)$ and radius $r$ is
> $$(x - x_1)^2 + (y - y_1)^2 + (z - z_1)^2 = r^2$$`
);

fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
