const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

const startIdx = text.indexOf('###### **Exercise 3.5 Q6**');
const endIdx = text.indexOf('###### **Example 13**', startIdx);

const newQ6 = `###### **Exercise 3.5 Q6**
6. What is the equation of the sphere which passes through the points $(3, 0, 2)$, $(-1, 1, 1)$ and $(2, -5, 4)$ and whose center lies on the plane $2x + 3y + 4z = 6$?

**Solution**
Let the center of the sphere be $C(x_1, y_1, z_1)$ and the radius be $r$. Then the equation of the sphere is
$$(x - x_1)^2 + (y - y_1)^2 + (z - z_1)^2 = r^2$$

Since the sphere passes through the points $(3, 0, 2)$, $(-1, 1, 1)$ and $(2, -5, 4)$, we have
$$(3 - x_1)^2 + (0 - y_1)^2 + (2 - z_1)^2 = r^2$$
$$x_1^2 - 6x_1 + 9 + y_1^2 + z_1^2 - 4z_1 + 4 = r^2 \\quad \\text{--- (1)}$$

$$(-1 - x_1)^2 + (1 - y_1)^2 + (1 - z_1)^2 = r^2$$
$$x_1^2 + 2x_1 + 1 + y_1^2 - 2y_1 + 1 + z_1^2 - 2z_1 + 1 = r^2 \\quad \\text{--- (2)}$$

$$(2 - x_1)^2 + (-5 - y_1)^2 + (4 - z_1)^2 = r^2$$
$$x_1^2 - 4x_1 + 4 + y_1^2 + 10y_1 + 25 + z_1^2 - 8z_1 + 16 = r^2 \\quad \\text{--- (3)}$$

Also, since the center lies on the plane $2x + 3y + 4z = 6$,
$$2x_1 + 3y_1 + 4z_1 = 6 \\quad \\text{--- (4)}$$

Subtracting (2) from (1), we get
$$-6x_1 + 9 - 4z_1 + 4 = 2x_1 + 1 - 2y_1 + 1 - 2z_1 + 1$$
$$-8x_1 + 2y_1 - 2z_1 + 10 = 0$$
$$-4x_1 + y_1 - z_1 = -5 \\quad \\text{--- (5)}$$

Multiplying (4) by $2$, we get
$$4x_1 + 6y_1 + 8z_1 = 12$$
Adding this to (5), $x_1$ is eliminated. Therefore,
$$7y_1 + 7z_1 = 7$$
$$y_1 + z_1 = 1 \\quad \\text{--- (6)}$$

Subtracting (2) from (3), we get
$$-4x_1 + 4 + 10y_1 + 25 - 8z_1 + 16 = 2x_1 + 1 - 2y_1 + 1 - 2z_1 + 1$$
$$-6x_1 + 12y_1 - 6z_1 + 42 = 0$$
$$x_1 - 2y_1 + z_1 = 7 \\quad \\text{--- (7)}$$

Multiplying (7) by $2$ and subtracting it from (4), $x_1$ is eliminated. Therefore,
$$2x_1 + 3y_1 + 4z_1 - (2x_1 - 4y_1 + 2z_1) = 6 - 14$$
$$7y_1 + 2z_1 = -8 \\quad \\text{--- (8)}$$

Multiplying (6) by $2$ and subtracting it from (8), we get
$$7y_1 + 2z_1 - (2y_1 + 2z_1) = -8 - 2$$
$$5y_1 = -10, \\quad y_1 = -2$$
$$z_1 = 3 \\quad \\text{from (6)}$$
$$x_1 = 0 \\quad \\text{from (7)}$$

Since, the center of the sphere is $C(0, -2, 3)$. Substituting in (1),
$$(3 - 0)^2 + (0 + 2)^2 + (2 - 3)^2 = r^2$$
$$r^2 = 14$$
$$r = \\sqrt{14}$$

Therefore, the equation of the sphere is
$$x^2 + (y + 2)^2 + (z - 3)^2 = 14$$

`;

text = text.substring(0, startIdx) + newQ6 + text.substring(endIdx);
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
