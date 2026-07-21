const fs = require('fs');
let text = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');

text = text.replace(
/\*\*5\. How many different 4-digit codes can be formed using the digits \$0, 1, 2, 3\$ if\*\*\r?\n\*\*\((a)\) there is no restriction\?\*\*\r?\n\*\*\((b)\) repetition is not allowed\?\*\*\r?\n\*\*\((c)\) repetition is not allowed, and 0 is either the first or the last digit\?\*\*/,
`**5. How many different 4-digit codes can be formed using the digits $0, 1, 2, 3$ if**
**(a)** there is no restriction? &nbsp;&nbsp;&nbsp; **(b)** repetition is not allowed? &nbsp;&nbsp;&nbsp; **(c)** repetition is not allowed, and 0 is either the first or the last digit?`
);

text = text.replace(
/\*\*6\. Using the letters of the word EQUATION without repetitions, how many 4-letter codes can be formed:\*\*\r?\n\*\*\((a)\) starting with \$T\$ and ending with \$N\?\*\*\r?\n\*\*\((b)\) starting and ending with a consonant\?\*\*\r?\n\*\*\((c)\) with vowels only\?\*\*\r?\n\*\*\((d)\) if it contains 3 consonants\?\*\*/,
`**6. Using the letters of the word EQUATION without repetitions, how many 4-letter codes can be formed:**
**(a)** starting with $T$ and ending with $N$? &nbsp;&nbsp;&nbsp; **(b)** starting and ending with a consonant? &nbsp;&nbsp;&nbsp; **(c)** with vowels only? &nbsp;&nbsp;&nbsp; **(d)** if it contains 3 consonants?`
);

text = text.replace(
/\*\*7\. Three brothers and three sisters are lining up to be photographed\. How many arrangements are there\*\*\r?\n\*\*\((a)\) with 3 sisters standing together\?\*\*\r?\n\*\*\((b)\) if brothers and sisters are in alternating positions\?\*\*/,
`**7. Three brothers and three sisters are lining up to be photographed. How many arrangements are there**
**(a)** with 3 sisters standing together? &nbsp;&nbsp;&nbsp; **(b)** if brothers and sisters are in alternating positions?`
);

text = text.replace(
/\*\*8\. How many permutations of the letters \$H, E, X, A, G, O, N\$ are there if\*\*\r?\n\*\*\((a)\) the 3 vowels are placed together\?\*\*\r?\n\*\*\((b)\) the 3 vowels are not placed together\?\*\*\r?\n\*\*\((c)\) consonants and vowels do not appear alternately\?\*\*/,
`**8. How many permutations of the letters $H, E, X, A, G, O, N$ are there if**
**(a)** the 3 vowels are placed together? &nbsp;&nbsp;&nbsp; **(b)** the 3 vowels are not placed together? &nbsp;&nbsp;&nbsp; **(c)** consonants and vowels do not appear alternately?`
);

text = text.replace(
/\*\*10\. Find the number of permutations of all the letters of the word STRESSLESS in such a way that there are exactly 5 letters between:\*\*\r?\n\*\*\((a)\) 2 \$E\$'s\.\*\*\r?\n\*\*\((b)\) 2 \$S\$'s\.\*\*/,
`**10. Find the number of permutations of all the letters of the word STRESSLESS in such a way that there are exactly 5 letters between:**
**(a)** 2 $E$'s. &nbsp;&nbsp;&nbsp; **(b)** 2 $S$'s.`
);

fs.writeFileSync('src/data/chapter5_content.ts', text);
