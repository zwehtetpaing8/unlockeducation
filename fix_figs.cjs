const fs = require('fs');

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig13_old = `export function Chap4_Fig13() {  return (    <div className="flex flex-col items-center my-6">      <div className="relative w-full max-w-[320px] aspect-[320/120]">        <svg viewBox="0 0 320 120" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">          <line x1="60" y1="80" x2="258.0" y2="40.4" className="stroke-[#ca8a04]" strokeWidth="2" />          <polygon points="260.0,40.0 252.5,46.6 250.5,36.8" className="fill-[#ca8a04] stroke-none" />          <foreignObject x="140" y="30" width="60" height="30" overflow="visible">            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">              <Latex text="$\\vec{a}$" />            </div>          </foreignObject>          <line x1="60" y1="80" x2="98.0" y2="72.4" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />          <polygon points="100.0,72.0 92.5,78.6 90.5,68.8" className="fill-slate-900 dark:fill-slate-100 stroke-none" />          <foreignObject x="70" y="40" width="60" height="30" overflow="visible">            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">              <Latex text="$\\hat{\\mathbf{a}}$" />            </div>          </foreignObject>          <circle cx="60" cy="80" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />        </svg>      </div>    </div>  );}`;

const fig13_new = `export function Chap4_Fig13() {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative w-full max-w-[320px] aspect-[320/120]">
        <svg viewBox="0 0 320 120" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          <line x1="60" y1="80" x2="258.0" y2="40.4" className="stroke-[#ca8a04]" strokeWidth="2" />
          <polygon points="260.0,40.0 252.5,46.6 250.5,36.8" className="fill-[#ca8a04] stroke-none" />
          <foreignObject x="150" y="65" width="40" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\vec{a}$" />
            </div>
          </foreignObject>
          <line x1="60" y1="80" x2="98.0" y2="72.4" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />
          <polygon points="100.0,72.0 92.5,78.6 90.5,68.8" className="fill-slate-900 dark:fill-slate-100 stroke-none" />
          <foreignObject x="65" y="45" width="40" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>
          <circle cx="60" cy="80" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
        </svg>
      </div>
    </div>
  );
}`;

const fig14_old = `export function Chap4_Fig14() {  return (    <div className="flex flex-col items-center my-6">      <div className="relative w-full max-w-[320px] aspect-[320/150]">        <svg viewBox="0 0 320 150" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">          <line x1="60" y1="50" x2="98.0" y2="42.4" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />          <polygon points="100.0,42.0 92.5,48.6 90.5,38.8" className="fill-slate-900 dark:fill-slate-100 stroke-none" />          <foreignObject x="70" y="10" width="60" height="30" overflow="visible">            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">              <Latex text="$\\hat{\\mathbf{a}}$" />            </div>          </foreignObject>          <line x1="60" y1="90" x2="258.0" y2="50.4" className="stroke-[#ca8a04]" strokeWidth="2" />          <polygon points="260.0,50.0 252.5,56.6 250.5,46.8" className="fill-[#ca8a04] stroke-none" />          <foreignObject x="140" y="40" width="60" height="30" overflow="visible">            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">              <Latex text="$\\vec{b} = 5\\hat{\\mathbf{a}}$" />            </div>          </foreignObject>          <line x1="260" y1="120" x2="62.0" y2="159.6" className="stroke-[#d97706]" strokeWidth="2" />          <polygon points="60.0,160.0 67.5,153.4 69.5,163.2" className="fill-[#d97706] stroke-none" />          <foreignObject x="140" y="110" width="60" height="30" overflow="visible">            <div className="flex items-center justify-center w-full h-full text-[#d97706]">              <Latex text="$\\vec{b} = -5\\hat{\\mathbf{a}}$" />            </div>          </foreignObject>          <circle cx="60" cy="50" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />          <circle cx="60" cy="90" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />          <circle cx="260" cy="120" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />        </svg>      </div>    </div>  );}`;

const fig14_new = `export function Chap4_Fig14() {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative w-full max-w-[320px] aspect-[320/150]">
        <svg viewBox="0 0 320 150" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          <line x1="60" y1="50" x2="98.0" y2="42.4" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />
          <polygon points="100.0,42.0 92.5,48.6 90.5,38.8" className="fill-slate-900 dark:fill-slate-100 stroke-none" />
          <foreignObject x="70" y="15" width="40" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>
          <line x1="60" y1="90" x2="258.0" y2="50.4" className="stroke-[#ca8a04]" strokeWidth="2" />
          <polygon points="260.0,50.0 252.5,56.6 250.5,46.8" className="fill-[#ca8a04] stroke-none" />
          <foreignObject x="110" y="40" width="100" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\vec{b} = 5\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>
          <line x1="260" y1="120" x2="62.0" y2="159.6" className="stroke-[#d97706]" strokeWidth="2" />
          <polygon points="60.0,160.0 67.5,163.4 69.5,153.6" className="fill-[#d97706] stroke-none" />
          <foreignObject x="110" y="150" width="100" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#d97706]">
              <Latex text="$\\vec{b} = -5\\hat{\\mathbf{a}}$" />
            </div>
          </foreignObject>
          <circle cx="60" cy="50" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
          <circle cx="60" cy="90" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
          <circle cx="260" cy="120" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
        </svg>
      </div>
    </div>
  );
}`;

text = text.replace(fig13_old, fig13_new);
text = text.replace(fig14_old, fig14_new);

fs.writeFileSync('src/components/Latex.tsx', text);
