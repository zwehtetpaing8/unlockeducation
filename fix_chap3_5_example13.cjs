const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

const startIdx = text.indexOf('###### **Example 13**');

const newEx13 = `###### **Example 13**
Find the equation of a sphere that passes through the points $(9, 0, 0)$, $(3, 13, 5)$ and $(11, 0, 10)$, given that its center lies on the $yz$-plane.

**Solution**
Since the center lies on the $yz$-plane, let the center of the sphere be $C(0, y_1, z_1)$ and the radius be $r$. Then the equation of the sphere is
$$x^2 + (y - y_1)^2 + (z - z_1)^2 = r^2$$

Since the sphere passes through the points $(9, 0, 0)$, $(3, 13, 5)$ and $(11, 0, 10)$, we have
$$9^2 + y_1^2 + z_1^2 = r^2$$
$$81 + y_1^2 + z_1^2 = r^2 \\quad \\text{--- (1)}$$

$$3^2 + (13 - y_1)^2 + (5 - z_1)^2 = r^2$$
$$203 - 26y_1 - 10z_1 + y_1^2 + z_1^2 = r^2 \\quad \\text{--- (2)}$$

$$11^2 + y_1^2 + (10 - z_1)^2 = r^2$$
$$221 + y_1^2 - 20z_1 + z_1^2 = r^2 \\quad \\text{--- (3)}$$

Subtracting (1) from (2), we get
$$122 - 26y_1 - 10z_1 = 0$$
$$13y_1 + 5z_1 = 61 \\quad \\text{--- (4)}$$

Subtracting (1) from (3), we get
$$140 - 20z_1 = 0$$
$$z_1 = 7$$

Substituting this in (4), we get
$$13y_1 + 5(7) = 61$$
$$13y_1 = 26$$
$$y_1 = 2$$

Therefore, the center of the sphere is $C(0, 2, 7)$. Substituting in (1),
$$81 + 2^2 + 7^2 = r^2$$
$$r^2 = 134$$
$$r = \\sqrt{134}$$

Therefore, the equation of the sphere is
$$x^2 + (y - 2)^2 + (z - 7)^2 = 134$$
`;

text = text.substring(0, startIdx) + newEx13;
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
