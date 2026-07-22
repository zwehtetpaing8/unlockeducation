const fs = require("fs");
let content = fs.readFileSync("src/data/chapter4_content.ts", "utf8");

// We want to replace "**Solution.**" with "\\" UNLESS it looks like the actual "**Solution.**" heading.
// Actual "**Solution.**" headings are usually on a line by themselves or followed by whitespace or (a).
// So let's find all occurrences of "**Solution.**" and their surrounding context.

// Replace `**Solution.**` with `\\` if it's followed by a letter, `{`, `_`, `^`, `|`, or another `**Solution.**`.
// But wait, what if it's followed by a space?
// In `\ `, it would be `\\ `. Did we have `\\ `? Probably not.
// Let's replace iteratively or with a function.

content = content.replace(/\*\*Solution\.\*\*/g, (match, offset, str) => {
    // Check characters before and after
    let prevChar = offset > 0 ? str[offset - 1] : "";
    let nextChar = offset + 13 < str.length ? str[offset + 13] : "";
    
    // If it's at the start of a line or after a newline, and followed by a newline, space, or (, it's probably the label.
    if ((prevChar === "\n" || prevChar === "") && (nextChar === "\n" || nextChar === "\r" || nextChar === " " || nextChar === "(")) {
        // Double check if it's followed by `text` or something else that was a macro.
        if (str.substr(offset + 13, 4) === "text") {
            return "\\\\"; // It was `\\text` at the start of a line!
        }
        if (str.substr(offset + 13, 5) === "begin") {
            return "\\\\"; // It was `\\begin` at the start of a line!
        }
        if (str.substr(offset + 13, 3) === "vec") {
            return "\\\\"; // It was `\\vec` at the start of a line!
        }
        if (str.substr(offset + 13, 14) === "overrightarrow") {
            return "\\\\";
        }
        return "**Solution.**";
    }
    
    // Otherwise, it's definitely a backslash
    return "\\\\";
});

fs.writeFileSync("src/data/chapter4_content.ts", content, "utf8");
console.log("Replaced!");
