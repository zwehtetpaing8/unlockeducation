const fs = require('fs');
let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

function replaceSubstr(text, search, replacement) {
  if (text.includes(search)) {
    return text.replace(search, replacement);
  }
  console.log("NOT FOUND: " + search);
  return text;
}

const s1 = `<foreignObject x="140" y="30" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\vec{a}$" />
            </div>
          </foreignObject>`;
const r1 = `<foreignObject x="150" y="65" width="40" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\vec{a}$" />
            </div>
          </foreignObject>`;
text = replaceSubstr(text, s1, r1);

const s2 = `<foreignObject x="70" y="40" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>`;
const r2 = `<foreignObject x="65" y="45" width="40" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>`;
text = replaceSubstr(text, s2, r2);

const s3 = `<foreignObject x="70" y="10" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>`;
const r3 = `<foreignObject x="70" y="15" width="40" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>`;
text = replaceSubstr(text, s3, r3);

const s4 = `<foreignObject x="140" y="40" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\vec{b} = 5\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>`;
const r4 = `<foreignObject x="110" y="40" width="100" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\vec{b} = 5\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>`;
text = replaceSubstr(text, s4, r4);

const s5 = `<foreignObject x="140" y="110" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#d97706]">
              <Latex text="$\\vec{b} = -5\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>`;
const r5 = `<foreignObject x="110" y="150" width="100" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#d97706]">
              <Latex text="$\\vec{b} = -5\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>`;
text = replaceSubstr(text, s5, r5);

text = replaceSubstr(text, 'points="60.0,160.0 67.5,153.4 69.5,163.2"', 'points="60.0,160.0 67.5,163.4 69.5,153.6"');

fs.writeFileSync('src/components/Latex.tsx', text);
