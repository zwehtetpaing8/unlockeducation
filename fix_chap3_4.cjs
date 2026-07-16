const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');

const startIdx = lines.findIndex(l => l.includes('### 3.4 Planes'));
const endIdx = lines.findIndex(l => l.includes('### 3.5 Spheres'));

const newContent = `### 3.4 Planes
[DIAGRAM:Chap3_4_PlaneABC]

#### Equation of a Plane
If a plane contains points $A$, $B$, and $C$, we can write its equation using directed values:
$$\\langle AB \\rangle = \\langle l_1, m_1, n_1 \\rangle \\quad \\text{and} \\quad \\langle AC \\rangle = \\langle l_2, m_2, n_2 \\rangle$$
$$a = m_1 n_2 - m_2 n_1$$
$$b = n_1 l_2 - n_2 l_1$$
$$c = l_1 m_2 - l_2 m_1$$
$$d = ax_1 + by_1 + cz_1$$
Cartesian form of the plane equation
$$ax + by + cz = d$$

###### **Example 8**
Find the equation of the plane containing $A(1, 0, 1)$, $B(3, 6, 4)$, and $C(-2, 3, 1)$.
**Solution**
$$\\langle AB \\rangle = \\langle 2, 6, 3 \\rangle, \\quad \\langle AC \\rangle = \\langle -3, 3, 0 \\rangle$$
Hence,
$$a = m_1n_2 - m_2n_1 = 6(0) - 3(3) = -9$$
$$b = n_1l_2 - n_2l_1 = 3(-3) - 0(2) = -9$$
$$c = l_1m_2 - l_2m_1 = 2(3) - (-3)(6) = 24$$
Using the point $A(1, 0, 1)$,
$$-9x - 9y + 24z = d$$
$$d = (-9)(1) + (-9)(0) + (24)(1) = 15$$
Therefore, the equation of the plane is
$$-9x - 9y + 24z = 15$$
$$3x + 3y - 8z = -5$$

###### **Exercise 3.4 Q1**
1. Find the equation of the plane containing
(a) $A(2, -5, 4)$, $B(-5, 2, 4)$ and $C(-2, 3, -1)$
(b) $A(4, 2, -3)$, $B(1, -2, 4)$ and $C(-1, 0, 3)$
**Solutions**
(a) $\\langle AB \\rangle = \\langle -7, 7, 0 \\rangle$ and $\\langle AC \\rangle = \\langle -4, 8, -5 \\rangle$.
Hence,
$$a = 7(-5) - 8(0) = -35$$
$$b = 0(-4) - (-5)(-7) = -35$$
$$c = (-7)(8) - (-4)(7) = -28$$
Using the point $A(2, -5, 4)$,
$$-35x - 35y - 28z = d$$
$$d = (-35)(2) + (-35)(-5) + (-28)(4) = -7$$
Therefore, the equation of the plane is
$$-35x - 35y - 28z = -7$$
$$5x + 5y + 4z = 1$$

(b) $\\langle AB \\rangle = \\langle -3, -4, 7 \\rangle$ and $\\langle AC \\rangle = \\langle -5, -2, 6 \\rangle$.
Hence,
$$a = (-4)(6) - (-2)(7) = -10$$
$$b = 7(-5) - 6(-3) = -17$$
$$c = (-3)(-2) - (-5)(-4) = -14$$
Using the point $A(4, 2, -3)$,
$$-10x - 17y - 14z = d$$
$$d = (-10)(4) + (-17)(2) + (-14)(-3) = -32$$
Therefore, the equation of the plane is
$$-10x - 17y - 14z = -32$$
$$10x + 17y + 14z = 32$$

###### **Example 9**
Find the equation of the line through the point $(-1, 3, 2)$ and perpendicular to the plane $3x - 2y - z = 3$. Find the point of intersection of the line and plane.
**Solution**
Directed values of the line perpendicular to the plane $3x - 2y - z = 3$ are $\\langle 3, -2, -1 \\rangle$. Then the equation of the line is
[DIAGRAM:Chap3_4_Ex9]
$$\\frac{x - (-1)}{3} = \\frac{y - 3}{-2} = \\frac{z - 2}{-1}$$
$$\\frac{x + 1}{3} = \\frac{y - 3}{-2} = \\frac{z - 2}{-1} = k$$
So, coordinates of the points on this line are
$$(x, y, z) = (-1 + 3k, \\, 3 - 2k, \\, 2 - k), \\quad \\text{for some real number } k.$$
If one of these points $P$ lies on the plane, then
$$3(-1 + 3k) - 2(3 - 2k) - (2 - k) = 3$$
$$-3 + 9k - 6 + 4k - 2 + k = 3$$
$$14k - 11 = 3$$
$$14k = 14$$
$$k = 1$$
Hence, the point of intersection of the line and the given plane is
$$P = (x, y, z) = (-1 + 3(1), \\, 3 - 2(1), \\, 2 - 1) = (2, 1, 1).$$

###### **Exercise 3.4 Q2**
2. Find the equation of the line that passes through the point $(3, -2, -2)$ and perpendicular to the plane $-2x + 3y - z = 4$. Find the point of intersection of the line and the given plane.
**Solution**
Directed values of the line perpendicular to the plane $-2x + 3y - z = 4$ are $\\langle -2, 3, -1 \\rangle$. Then the equation of the line is
[DIAGRAM:Chap3_4_Q2]
$$\\frac{x - 3}{-2} = \\frac{y + 2}{3} = \\frac{z + 2}{-1} = k$$
So, coordinates of the points on this line are
$$(x, y, z) = (3 - 2k, \\, -2 + 3k, \\, -2 - k), \\quad \\text{for some real number } k.$$
If one of these points $P$ lies on the plane, then
$$-2(3 - 2k) + 3(-2 + 3k) - (-2 - k) = 4$$
$$-6 + 4k - 6 + 9k + 2 + k = 4$$
$$14k - 10 = 4$$
$$14k = 14$$
$$k = 1$$
Hence, the point of intersection of the line and the given plane is
$$P = (x, y, z) = (3 - 2(1), \\, -2 + 3(1), \\, -2 - 1) = (1, 1, -3).$$

###### **Example 10**
Find the equation of the plane containing the point $(-1, 3, 2)$ and parallel to the plane $3x - 2y - 3z = 2$.
**Solution (1)**
[DIAGRAM:Chap3_4_Ex10_Sol1]
Since the required plane is parallel to the plane $3x - 2y - 3z = 2$, both planes have the same normal vector $\\langle 3, -2, -3 \\rangle$.
Therefore, the equation of the required plane is of the form
$$3x - 2y - 3z = d$$
Using the point $(-1, 3, 2)$,
$$d = 3(-1) - 2(3) - 3(2) = -15$$
Therefore, the equation of the plane is
$$3x - 2y - 3z = -15$$

**Solution (2)**
[DIAGRAM:Chap3_4_Ex10_Sol2]
Directed values of the line perpendicular to the given plane $3x - 2y - 3z = 2$ are $\\langle 3, -2, -3 \\rangle$.
This line is also perpendicular to the required plane. So the equation of the required plane is
$$3x - 2y - 3z = d$$
Since the point $(-1, 3, 2)$ is on the plane,
$$d = 3(-1) - 2(3) - 3(2) = -15$$
The equation of the required plane is
$$3x - 2y - 3z = -15$$

###### **Exercise 3.4 Q3**
3. Find the equation of the plane containing the point $(2, 3, -1)$ and parallel to the plane $-2x + y + 3z = 6$.
**Solution**
[DIAGRAM:Chap3_4_Q3_Sol]
Directed values of the line perpendicular to the given plane $-2x + y + 3z = 6$ are $\\langle -2, 1, 3 \\rangle$.
This line is also perpendicular to the required plane. So the equation of the required plane is
$$-2x + y + 3z = d$$
Since the point $(2, 3, -1)$ is on the plane,
$$d = -2(2) + 3 + 3(-1) = -4$$
The equation of the required plane is
$$-2x + y + 3z = -4$$

---
`;

lines.splice(startIdx, endIdx - startIdx, ...newContent.split('\n'));
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
