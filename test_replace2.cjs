let str = "$$\\$\\begin{aligned}";
console.log(str.replace(/[$]*\\begin\{aligned\}/g, '$$$$\\begin{aligned}'));
