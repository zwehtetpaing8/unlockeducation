const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');

for (let i = 2650; i < 2700; i++) {
  if (lines[i] && lines[i].includes('#### Equation of a Plane')) {
    // We want to replace the section from here to 'Cartesian form... = d$'
    let endIdx = i + 1;
    while (!lines[endIdx].includes('Example 8')) {
      endIdx++;
    }
    
    const newBox = `#### Equation of a Plane
> $$\\langle AB \\rangle = \\langle l_1, m_1, n_1 \\rangle \\quad \\text{and} \\quad \\langle AC \\rangle = \\langle l_2, m_2, n_2 \\rangle$$
> $$a = m_1 n_2 - m_2 n_1$$
> $$b = n_1 l_2 - n_2 l_1$$
> $$c = l_1 m_2 - l_2 m_1$$
> $$d = ax_1 + by_1 + cz_1$$
> Cartesian form of the plane equation
> $$ax + by + cz = d$$
`;
    lines.splice(i, endIdx - i, ...newBox.split('\n'));
    break;
  }
}

fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
