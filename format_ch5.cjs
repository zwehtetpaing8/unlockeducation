const fs = require('fs');
let lines = fs.readFileSync('src/data/chapter5_content.ts', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('5. How many different 4-digit codes')) {
        if (lines[i+1] && lines[i+1].includes('**(a)**')) {
            lines[i+1] = '**(a)** there is no restriction? &nbsp;&nbsp;&nbsp; **(b)** repetition is not allowed? &nbsp;&nbsp;&nbsp; **(c)** repetition is not allowed, and 0 is either the first or the last digit?';
            lines.splice(i+2, 2);
        }
    }
    if (lines[i].includes('6. Using the letters of the word EQUATION')) {
        if (lines[i+1] && lines[i+1].includes('**(a)**')) {
            lines[i+1] = '**(a)** starting with $T$ and ending with $N$? &nbsp;&nbsp;&nbsp; **(b)** starting and ending with a consonant? &nbsp;&nbsp;&nbsp; **(c)** with vowels only? &nbsp;&nbsp;&nbsp; **(d)** if it contains 3 consonants?';
            lines.splice(i+2, 3);
        }
    }
    if (lines[i].includes('7. Three brothers and three sisters')) {
        if (lines[i+1] && lines[i+1].includes('**(a)**')) {
            lines[i+1] = '**(a)** with 3 sisters standing together? &nbsp;&nbsp;&nbsp; **(b)** if brothers and sisters are in alternating positions?';
            lines.splice(i+2, 1);
        }
    }
    if (lines[i].includes('8. How many permutations of the letters')) {
        if (lines[i+1] && lines[i+1].includes('**(a)**')) {
            lines[i+1] = '**(a)** the 3 vowels are placed together? &nbsp;&nbsp;&nbsp; **(b)** the 3 vowels are not placed together? &nbsp;&nbsp;&nbsp; **(c)** consonants and vowels do not appear alternately?';
            lines.splice(i+2, 2);
        }
    }
    if (lines[i].includes('10. Find the number of permutations')) {
        if (lines[i+1] && lines[i+1].includes('**(a)**')) {
            lines[i+1] = '**(a)** 2 $E$\'s. &nbsp;&nbsp;&nbsp; **(b)** 2 $S$\'s.';
            lines.splice(i+2, 1);
        }
    }
}

fs.writeFileSync('src/data/chapter5_content.ts', lines.join('\n'));
