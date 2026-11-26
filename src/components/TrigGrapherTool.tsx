import React, { useState, useMemo, useRef } from 'react';
import { RotateCcw, Eye, EyeOff, Activity, Tag } from 'lucide-react';
import Latex from './Latex';

type TrigFn = 'sin' | 'cos' | 'tan' | 'csc' | 'sec' | 'cot';
type DomainRange = '2pi' | 'pi';

const TRIG_FUNCTIONS: Array<{ id: TrigFn; label: string }> = [
  { id: 'sin', label: 'sin' },
  { id: 'cos', label: 'cos' },
  { id: 'tan', label: 'tan' },
  { id: 'csc', label: 'csc' },
  { id: 'sec', label: 'sec' },
  { id: 'cot', label: 'cot' },
];

const SVG_W = 640;
const SVG_H = 348;
const PAD_L = 42;
const PAD_R = 20;
const PAD_T = 26;
const PAD_B = 42;
const PLOT_W = SVG_W - PAD_L - PAD_R;
const PLOT_H = SVG_H - PAD_T - PAD_B;
const Y_MIN = -5;
const Y_MAX = 5;

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

/** Formats a rational multiple of pi, e.g. num/den * pi, into clean LaTeX */
function formatPiFractionLatex(num: number, den: number): string {
  if (num === 0) return '0';
  const sign = num < 0 ? '-' : '';
  const absNum = Math.abs(num);
  const g = gcd(absNum, den);
  const n = absNum / g;
  const d = den / g;
  if (d === 1) {
    return n === 1 ? `${sign}\\pi` : `${sign}${n}\\pi`;
  }
  return n === 1 ? `${sign}\\frac{\\pi}{${d}}` : `${sign}\\frac{${n}\\pi}{${d}}`;
}

interface PiFrac {
  neg: boolean;
  numText: string;
  denText: string | null;
}

/** Parses any rational multiple of pi (num/den * pi) into structured stacked-fraction parts */
function parsePiFraction(num: number, den: number): PiFrac {
  if (num === 0) {
    return { neg: false, numText: '0', denText: null };
  }
  const neg = num < 0;
  const g = gcd(Math.abs(num), Math.abs(den));
  const n = Math.abs(num) / g;
  const d = Math.abs(den) / g;
  return {
    neg,
    numText: n === 1 ? 'π' : `${n}π`,
    denText: d === 1 ? null : String(d),
  };
}

function measurePiFrac(pf: PiFrac, fontSize: number): {
  w: number;
  h: number;
  subSize: number;
  signW: number;
  barW: number;
} {
  const charW = fontSize * 0.62;
  if (!pf.denText) {
    const len = (pf.neg ? 1 : 0) + pf.numText.length;
    return { w: len * charW, h: fontSize + 2, subSize: fontSize, signW: 0, barW: 0 };
  }
  const subSize = Math.max(7.6, fontSize * 0.82);
  const subCharW = subSize * 0.62;
  const signW = pf.neg ? fontSize * 0.64 : 0;
  const barW = Math.max(pf.numText.length, pf.denText.length) * subCharW + 4;
  return { w: signW + barW, h: subSize * 2 + 6, subSize, signW, barW };
}

function SvgPiFrac({
  pf,
  x,
  cy,
  fontSize,
  textClass,
  lineClass,
}: {
  pf: PiFrac;
  x: number;
  cy: number;
  fontSize: number;
  textClass: string;
  lineClass: string;
}) {
  const m = measurePiFrac(pf, fontSize);
  if (!pf.denText) {
    return (
      <text
        x={x}
        y={cy + fontSize * 0.34}
        textAnchor="start"
        fontSize={fontSize}
        className={textClass}
      >
        {(pf.neg ? '−' : '') + pf.numText}
      </text>
    );
  }

  const barX = x + m.signW;
  const barMid = barX + m.barW / 2;

  return (
    <g>
      {pf.neg && (
        <text
          x={x}
          y={cy + fontSize * 0.33}
          textAnchor="start"
          fontSize={fontSize}
          className={textClass}
        >
          −
        </text>
      )}
      <text
        x={barMid}
        y={cy - 2.3}
        textAnchor="middle"
        fontSize={m.subSize}
        className={textClass}
      >
        {pf.numText}
      </text>
      <line
        x1={barX + 0.5}
        y1={cy}
        x2={barX + m.barW - 0.5}
        y2={cy}
        className={lineClass}
        strokeWidth={0.95}
        strokeLinecap="round"
      />
      <text
        x={barMid}
        y={cy + m.subSize + 0.9}
        textAnchor="middle"
        fontSize={m.subSize}
        className={textClass}
      >
        {pf.denText}
      </text>
    </g>
  );
}

function measureCoordLabel(xFrac: PiFrac, yText: string, fontSize: number) {
  const isStacked = xFrac.denText !== null;
  const parenSize = isStacked ? fontSize * 1.32 : fontSize;
  const parenW = parenSize * 0.44;
  const fracM = measurePiFrac(xFrac, fontSize);
  const commaYText = `, ${yText}`;
  const commaYW = commaYText.length * fontSize * 0.6;
  const contentW = parenW + fracM.w + commaYW + parenW;
  const w = Math.max(38, contentW + 10);
  const h = isStacked ? 25 : 17;
  return { w, h, contentW, parenSize, parenW, fracW: fracM.w, commaYText, commaYW };
}

function SvgCoordLabel({
  xFrac,
  yText,
  cx,
  cy,
  fontSize,
  textClass,
  lineClass,
}: {
  xFrac: PiFrac;
  yText: string;
  cx: number;
  cy: number;
  fontSize: number;
  textClass: string;
  lineClass: string;
}) {
  const m = measureCoordLabel(xFrac, yText, fontSize);
  const startX = cx - m.contentW / 2;
  const fracX = startX + m.parenW;
  const commaX = fracX + m.fracW;
  const closeX = commaX + m.commaYW;

  return (
    <g>
      <text
        x={startX}
        y={cy + m.parenSize * 0.32}
        textAnchor="start"
        fontSize={m.parenSize}
        className={textClass}
      >
        (
      </text>
      <SvgPiFrac
        pf={xFrac}
        x={fracX}
        cy={cy}
        fontSize={fontSize}
        textClass={textClass}
        lineClass={lineClass}
      />
      <text
        x={commaX}
        y={cy + fontSize * 0.34}
        textAnchor="start"
        fontSize={fontSize}
        className={textClass}
      >
        {m.commaYText}
      </text>
      <text
        x={closeX}
        y={cy + m.parenSize * 0.32}
        textAnchor="start"
        fontSize={m.parenSize}
        className={textClass}
      >
        )
      </text>
    </g>
  );
}

function measureAsymLabel(xFrac: PiFrac, fontSize: number) {
  const isStacked = xFrac.denText !== null;
  const prefix = 'x=';
  const prefixW = prefix.length * fontSize * 0.62;
  const fracM = measurePiFrac(xFrac, fontSize);
  const contentW = prefixW + fracM.w;
  const w = Math.max(34, contentW + 10);
  const h = isStacked ? 24 : 16;
  return { w, h, contentW, prefix, prefixW };
}

function SvgAsymLabel({
  xFrac,
  cx,
  cy,
  fontSize,
  textClass,
  lineClass,
}: {
  xFrac: PiFrac;
  cx: number;
  cy: number;
  fontSize: number;
  textClass: string;
  lineClass: string;
}) {
  const m = measureAsymLabel(xFrac, fontSize);
  const startX = cx - m.contentW / 2;

  return (
    <g>
      <text
        x={startX}
        y={cy + fontSize * 0.34}
        textAnchor="start"
        fontSize={fontSize}
        className={textClass}
      >
        {m.prefix}
      </text>
      <SvgPiFrac
        pf={xFrac}
        x={startX + m.prefixW}
        cy={cy}
        fontSize={fontSize}
        textClass={textClass}
        lineClass={lineClass}
      />
    </g>
  );
}

function formatNumber(n: number): string {
  if (Object.is(n, -0) || Math.abs(n) < 1e-9) return '0';
  if (Number.isInteger(n)) return String(n);
  return Number(n.toFixed(2)).toString();
}

function evalTrig(fn: TrigFn, theta: number): number | null {
  const s = Math.sin(theta);
  const c = Math.cos(theta);
  const EPS = 1e-4;
  switch (fn) {
    case 'sin':
      return s;
    case 'cos':
      return c;
    case 'tan':
      return Math.abs(c) < EPS ? null : s / c;
    case 'cot':
      return Math.abs(s) < EPS ? null : c / s;
    case 'sec':
      return Math.abs(c) < EPS ? null : 1 / c;
    case 'csc':
      return Math.abs(s) < EPS ? null : 1 / s;
  }
}

function buildEquationLatex(fn: TrigFn, a: number, b: number, cQuarters: number, d: number): string {
  if (Math.abs(a) < 1e-9) {
    return `y = ${formatNumber(d)}`;
  }

  let aStr = '';
  if (a === -1) aStr = '-';
  else if (a !== 1) aStr = formatNumber(a);

  const bStr = b === 1 ? '' : formatNumber(b);
  let inner = 'x';
  if (cQuarters !== 0) {
    const absFrac = formatPiFractionLatex(Math.abs(cQuarters), 4);
    const op = cQuarters > 0 ? '-' : '+';
    inner = `x ${op} ${absFrac}`;
  }

  let arg = '';
  if (b === 1) {
    arg = cQuarters === 0 ? 'x' : `\\left(${inner}\\right)`;
  } else {
    arg = cQuarters === 0 ? `${bStr}x` : `${bStr}\\left(${inner}\\right)`;
  }

  let dStr = '';
  if (d > 0) dStr = ` + ${formatNumber(d)}`;
  else if (d < 0) dStr = ` - ${formatNumber(Math.abs(d))}`;

  return `y = ${aStr}\\${fn} ${arg}${dStr}`;
}

function sampleCurvePaths(
  fn: TrigFn,
  a: number,
  b: number,
  cRad: number,
  d: number,
  xMin: number,
  xMax: number,
  toSvgX: (x: number) => number,
  toSvgY: (y: number) => number
): string[] {
  const samples = 560;
  const paths: string[] = [];
  let currentPts: string[] = [];
  let prevY: number | null = null;
  const clipBound = Y_MAX + 2.5;

  for (let i = 0; i <= samples; i++) {
    const x = xMin + (i / samples) * (xMax - xMin);
    const val = evalTrig(fn, b * (x - cRad));
    if (val === null || !Number.isFinite(val)) {
      if (currentPts.length > 1) paths.push(`M ${currentPts.join(' L ')}`);
      currentPts = [];
      prevY = null;
      continue;
    }

    const y = a * val + d;
    const isJump = prevY !== null && Math.abs(y - prevY) > 6.5;

    if (y < -clipBound || y > clipBound || isJump) {
      if (currentPts.length > 1) paths.push(`M ${currentPts.join(' L ')}`);
      currentPts = [];
      prevY = null;
      if (y >= -clipBound && y <= clipBound) {
        currentPts.push(`${toSvgX(x).toFixed(2)} ${toSvgY(y).toFixed(2)}`);
        prevY = y;
      }
      continue;
    }

    currentPts.push(`${toSvgX(x).toFixed(2)} ${toSvgY(y).toFixed(2)}`);
    prevY = y;
  }

  if (currentPts.length > 1) {
    paths.push(`M ${currentPts.join(' L ')}`);
  }

  return paths;
}

interface AsymptoteInfo {
  x: number;
  xFrac: PiFrac;
}

function computeAsymptotes(
  fn: TrigFn,
  b: number,
  cQuarters: number,
  xMin: number,
  xMax: number
): AsymptoteInfo[] {
  if (fn === 'sin' || fn === 'cos' || b === 0) return [];
  const bHalf = Math.round(Math.abs(b) * 2);
  const cRad = (cQuarters * Math.PI) / 4;
  // tan & sec: b(x - c) = pi/2 + k*pi  =>  x = ((cQuarters * bHalf + 4 * (2k + 1)) / (4 * bHalf)) * pi
  // cot & csc: b(x - c) = k*pi         =>  x = ((cQuarters * bHalf + 8 * k) / (4 * bHalf)) * pi
  const offset = fn === 'tan' || fn === 'sec' ? Math.PI / 2 : 0;
  const kStart = Math.floor(((xMin - cRad) * Math.abs(b) - offset) / Math.PI) - 1;
  const kEnd = Math.ceil(((xMax - cRad) * Math.abs(b) - offset) / Math.PI) + 1;
  const items: AsymptoteInfo[] = [];
  for (let k = kStart; k <= kEnd; k++) {
    const num =
      fn === 'tan' || fn === 'sec'
        ? cQuarters * bHalf + 4 * (2 * k + 1)
        : cQuarters * bHalf + 8 * k;
    const den = 4 * bHalf;
    const x = (num / den) * Math.PI;
    if (x > xMin + 0.02 && x < xMax - 0.02) {
      items.push({
        x,
        xFrac: parsePiFraction(num, den),
      });
    }
  }
  return items;
}

interface KeyPoint {
  x: number;
  y: number;
  xFrac: PiFrac;
  yText: string;
  placement: 'above' | 'below' | 'mid-rise' | 'mid-fall';
  priority: number; // lower = higher priority
}

function computeKeyPoints(
  fn: TrigFn,
  a: number,
  b: number,
  cQuarters: number,
  d: number,
  xMin: number,
  xMax: number
): KeyPoint[] {
  if (b === 0) return [];

  if (Math.abs(a) < 1e-9) {
    if (d < Y_MIN || d > Y_MAX) return [];
    return [
      {
        x: 0,
        y: d,
        xFrac: parsePiFraction(0, 1),
        yText: formatNumber(d).replace('-', '−'),
        placement: 'above',
        priority: 0,
      },
    ];
  }

  const bHalf = Math.round(Math.abs(b) * 2);
  const cRad = (cQuarters * Math.PI) / 4;
  const den = 4 * bHalf;
  const pts: KeyPoint[] = [];
  const eps = 1e-4;

  const pushPoint = (
    num: number,
    yVal: number,
    placement: KeyPoint['placement'],
    priority: number
  ) => {
    const x = (num / den) * Math.PI;
    if (x < xMin - eps || x > xMax + eps) return;
    if (yVal < Y_MIN + 0.05 || yVal > Y_MAX - 0.05) return;
    pts.push({
      x,
      y: yVal,
      xFrac: parsePiFraction(num, den),
      yText: formatNumber(yVal).replace('-', '−'),
      placement,
      priority,
    });
  };

  if (fn === 'sin' || fn === 'cos') {
    // Quarter-period critical points: theta = k * pi / 2
    const kStart = Math.floor(((xMin - cRad) * b) / (Math.PI / 2)) - 1;
    const kEnd = Math.ceil(((xMax - cRad) * b) / (Math.PI / 2)) + 1;
    for (let k = kStart; k <= kEnd; k++) {
      const mod = ((k % 4) + 4) % 4;
      let val = 0;
      let derivSign = 0;
      if (fn === 'sin') {
        val = mod === 1 ? 1 : mod === 3 ? -1 : 0;
        derivSign = mod === 0 ? 1 : mod === 2 ? -1 : 0;
      } else {
        val = mod === 0 ? 1 : mod === 2 ? -1 : 0;
        derivSign = mod === 3 ? 1 : mod === 1 ? -1 : 0;
      }
      const y = a * val + d;
      const num = cQuarters * bHalf + 4 * k;
      if (val !== 0) {
        const isPeak = a * val > 0;
        pushPoint(num, y, isPeak ? 'above' : 'below', 1);
      } else {
        const slope = a * derivSign;
        pushPoint(num, y, slope >= 0 ? 'mid-rise' : 'mid-fall', 2);
      }
    }
  } else if (fn === 'sec' || fn === 'csc') {
    // Vertices (turning points of U-branches)
    // sec: theta = k * pi (cos = (-1)^k)
    // csc: theta = pi/2 + k * pi (sin = (-1)^k)
    const offset = fn === 'csc' ? Math.PI / 2 : 0;
    const kStart = Math.floor(((xMin - cRad) * b - offset) / Math.PI) - 1;
    const kEnd = Math.ceil(((xMax - cRad) * b - offset) / Math.PI) + 1;
    for (let k = kStart; k <= kEnd; k++) {
      const val = k % 2 === 0 ? 1 : -1;
      const y = a * val + d;
      const num =
        fn === 'sec'
          ? cQuarters * bHalf + 8 * k
          : cQuarters * bHalf + 4 * (2 * k + 1);
      // For upper U-branch (a*val > 0), curve opens upward, so place label BELOW vertex in the open gap
      const placement = a * val > 0 ? 'below' : 'above';
      pushPoint(num, y, placement, 1);
    }
  } else {
    // tan & cot: midline crossings (priority 1) + quarter-period reference points (priority 2)
    // theta = m * pi / 4
    const mStart = Math.floor(((xMin - cRad) * b) / (Math.PI / 4)) - 1;
    const mEnd = Math.ceil(((xMax - cRad) * b) / (Math.PI / 4)) + 1;
    for (let m = mStart; m <= mEnd; m++) {
      const mod = ((m % 4) + 4) % 4;
      if (fn === 'tan' && mod === 2) continue; // asymptote
      if (fn === 'cot' && mod === 0) continue; // asymptote
      let val = 0;
      if (fn === 'tan') {
        val = mod === 0 ? 0 : mod === 1 ? 1 : -1;
      } else {
        val = mod === 2 ? 0 : mod === 1 ? 1 : -1;
      }
      const y = a * val + d;
      const num = cQuarters * bHalf + 2 * m;
      const rising = (fn === 'tan' ? 1 : -1) * a >= 0;
      if (val === 0) {
        pushPoint(num, y, rising ? 'mid-rise' : 'mid-fall', 1);
      } else {
        pushPoint(num, y, rising ? 'mid-rise' : 'mid-fall', 2);
      }
    }
  }

  return pts;
}

interface Preset {
  id: string;
  latex: string;
  fn: TrigFn;
  a: number;
  b: number;
  cQuarters: number;
  d: number;
}

const PRESETS: Preset[] = [
  { id: '2sin2x', latex: '2\\sin 2x', fn: 'sin', a: 2, b: 2, cQuarters: 0, d: 0 },
  {
    id: 'cosShift',
    latex: '\\cos\\left(x - \\frac{\\pi}{2}\\right) + 1',
    fn: 'cos',
    a: 1,
    b: 1,
    cQuarters: 2,
    d: 1,
  },
  { id: 'tanx', latex: '\\tan x', fn: 'tan', a: 1, b: 1, cQuarters: 0, d: 0 },
  { id: 'secx', latex: '\\sec x', fn: 'sec', a: 1, b: 1, cQuarters: 0, d: 0 },
];

export default function TrigGrapherTool() {
  const [fn, setFn] = useState<TrigFn>('sin');
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(1);
  const [cQuarters, setCQuarters] = useState<number>(0); // multiples of pi/4
  const [d, setD] = useState<number>(0);
  const [domain, setDomain] = useState<DomainRange>('2pi');
  const [showParent, setShowParent] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [probeX, setProbeX] = useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const cRad = (cQuarters * Math.PI) / 4;
  const xMin = domain === '2pi' ? -2 * Math.PI : -Math.PI;
  const xMax = domain === '2pi' ? 2 * Math.PI : Math.PI;

  const toSvgX = (x: number) => PAD_L + ((x - xMin) / (xMax - xMin)) * PLOT_W;
  const toSvgY = (y: number) => PAD_T + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * PLOT_H;

  const equationLatex = useMemo(
    () => buildEquationLatex(fn, a, b, cQuarters, d),
    [fn, a, b, cQuarters, d]
  );

  const mainPaths = useMemo(
    () => sampleCurvePaths(fn, a, b, cRad, d, xMin, xMax, toSvgX, toSvgY),
    [fn, a, b, cRad, d, xMin, xMax]
  );

  const parentPaths = useMemo(() => {
    if (!showParent) return [];
    const isIdentity = a === 1 && b === 1 && cQuarters === 0 && d === 0;
    if (isIdentity) return [];
    return sampleCurvePaths(fn, 1, 1, 0, 0, xMin, xMax, toSvgX, toSvgY);
  }, [showParent, fn, a, b, cQuarters, d, xMin, xMax]);

  const asymptotes = useMemo(
    () => computeAsymptotes(fn, b, cQuarters, xMin, xMax),
    [fn, b, cQuarters, xMin, xMax]
  );

  const keyPoints = useMemo(
    () => computeKeyPoints(fn, a, b, cQuarters, d, xMin, xMax),
    [fn, a, b, cQuarters, d, xMin, xMax]
  );

  // Non-overlapping layout for coordinate labels & asymptote tags
  const labelLayout = useMemo(() => {
    if (!showLabels) {
      return {
        pointLabels: [] as Array<{
          px: number;
          py: number;
          lx: number;
          ly: number;
          w: number;
          h: number;
          xFrac: PiFrac;
          yText: string;
        }>,
        asymptoteLabels: [] as Array<{
          px: number;
          lx: number;
          ly: number;
          w: number;
          h: number;
          xFrac: PiFrac;
        }>,
      };
    }

    interface Box {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }
    const occupied: Box[] = [];
    const margin = 4;

    const overlaps = (b1: Box) =>
      occupied.some(
        (b2) =>
          b1.x1 - margin < b2.x2 &&
          b1.x2 + margin > b2.x1 &&
          b1.y1 - margin < b2.y2 &&
          b1.y2 + margin > b2.y1
      );

    // Reserve small corner area for axis letters x and y
    occupied.push({
      x1: toSvgX(0) + 2,
      y1: PAD_T,
      x2: toSvgX(0) + 18,
      y2: PAD_T + 16,
    });

    // Place asymptote labels near top of plot first (when spaced out)
    const asymptoteLabels: Array<{
      px: number;
      lx: number;
      ly: number;
      w: number;
      h: number;
      xFrac: PiFrac;
    }> = [];
    const asymSorted = [...asymptotes].sort((p, q) => Math.abs(p.x) - Math.abs(q.x));
    for (const asym of asymSorted) {
      const px = toSvgX(asym.x);
      const { w, h } = measureAsymLabel(asym.xFrac, 9);
      const lx = Math.max(PAD_L + w / 2 + 2, Math.min(SVG_W - PAD_R - w / 2 - 2, px));
      const ly = PAD_T + h / 2 + 2;
      const box: Box = { x1: lx - w / 2, y1: ly - h / 2, x2: lx + w / 2, y2: ly + h / 2 };
      if (!overlaps(box)) {
        occupied.push(box);
        asymptoteLabels.push({ px, lx, ly, w, h, xFrac: asym.xFrac });
      }
    }

    // Sort key points by priority, then prefer points closest to origin / positive primary cycle
    const sorted = [...keyPoints].sort((p, q) => {
      if (p.priority !== q.priority) return p.priority - q.priority;
      return Math.abs(p.x) - Math.abs(q.x);
    });

    const pointLabels: Array<{
      px: number;
      py: number;
      lx: number;
      ly: number;
      w: number;
      h: number;
      xFrac: PiFrac;
      yText: string;
    }> = [];

    for (const pt of sorted) {
      const px = toSvgX(pt.x);
      const py = toSvgY(pt.y);
      const { w, h } = measureCoordLabel(pt.xFrac, pt.yText, 9.5);
      const vOff = h / 2 + 7;

      // Candidate offsets [dx, dy] ordered by best visual placement relative to curve
      const candidates: Array<[number, number]> =
        pt.placement === 'above'
          ? [
              [0, -vOff],
              [0, vOff + 1],
              [w / 2 + 7, -vOff + 4],
              [-(w / 2 + 7), -vOff + 4],
            ]
          : pt.placement === 'below'
          ? [
              [0, vOff + 1],
              [0, -vOff],
              [w / 2 + 7, vOff - 3],
              [-(w / 2 + 7), vOff - 3],
            ]
          : pt.placement === 'mid-rise'
          ? [
              [-(w / 2 + 4), -vOff + 2],
              [w / 2 + 4, vOff - 1],
              [0, -vOff],
              [0, vOff + 1],
            ]
          : [
              [w / 2 + 4, -vOff + 2],
              [-(w / 2 + 4), vOff - 1],
              [0, -vOff],
              [0, vOff + 1],
            ];

      for (const [dx, dy] of candidates) {
        const lx = Math.max(
          PAD_L + w / 2 + 3,
          Math.min(SVG_W - PAD_R - w / 2 - 3, px + dx)
        );
        const ly = Math.max(
          PAD_T + h / 2 + 2,
          Math.min(SVG_H - PAD_B - h / 2 - 2, py + dy)
        );
        const box: Box = {
          x1: lx - w / 2,
          y1: ly - h / 2,
          x2: lx + w / 2,
          y2: ly + h / 2,
        };
        if (!overlaps(box)) {
          occupied.push(box);
          pointLabels.push({
            px,
            py,
            lx,
            ly,
            w,
            h,
            xFrac: pt.xFrac,
            yText: pt.yText,
          });
          break;
        }
      }
    }

    return { pointLabels, asymptoteLabels };
  }, [showLabels, keyPoints, asymptotes, xMin, xMax]);

  // X-axis ticks in quarter-pi units
  const xTicks = useMemo(() => {
    const step = domain === '2pi' ? 2 : 1; // pi/2 for [-2pi, 2pi], pi/4 for [-pi, pi]
    const maxQ = domain === '2pi' ? 8 : 4;
    const ticks: Array<{ q: number; x: number; frac: PiFrac }> = [];
    for (let q = -maxQ; q <= maxQ; q += step) {
      ticks.push({
        q,
        x: (q * Math.PI) / 4,
        frac: parsePiFraction(q, 4),
      });
    }
    return ticks;
  }, [domain]);

  const yTicks = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  // Key mathematical properties
  const keyProperties = useMemo(() => {
    const absA = Math.abs(a);
    // Period = (basePeriod) / b, where basePeriod is pi for tan/cot and 2pi for sin/cos/sec/csc
    // b is in 0.5 increments => b = bHalf / 2
    const bHalf = Math.round(b * 2);
    const baseNum = fn === 'tan' || fn === 'cot' ? 2 : 4; // multiplied by 2 to match bHalf
    const periodLatex = bHalf > 0 ? formatPiFractionLatex(baseNum, bHalf) : '\\infty';

    const amplitudeLatex =
      fn === 'sin' || fn === 'cos' ? formatNumber(absA) : '\\text{None}';

    let rangeLatex = '(-\\infty, \\infty)';
    if (absA < 1e-9) {
      rangeLatex = `\\{${formatNumber(d)}\\}`;
    } else if (fn === 'sin' || fn === 'cos') {
      rangeLatex = `[${formatNumber(d - absA)},\\ ${formatNumber(d + absA)}]`;
    } else if (fn === 'sec' || fn === 'csc') {
      rangeLatex = `(-\\infty, ${formatNumber(d - absA)}] \\cup [${formatNumber(d + absA)}, \\infty)`;
    }

    const phaseLatex =
      cQuarters === 0
        ? '0'
        : `${formatPiFractionLatex(Math.abs(cQuarters), 4)}\\ \\text{${cQuarters > 0 ? 'right' : 'left'}}`;

    return {
      amplitudeLatex,
      periodLatex,
      phaseLatex,
      rangeLatex,
    };
  }, [fn, a, b, cQuarters, d]);

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0) return;
    const svgX = ((e.clientX - rect.left) / rect.width) * SVG_W;
    if (svgX < PAD_L || svgX > SVG_W - PAD_R) {
      setProbeX(null);
      return;
    }
    const mathX = xMin + ((svgX - PAD_L) / PLOT_W) * (xMax - xMin);
    // Soft snap to nearest pi/12 for clean inspection
    const snapStep = Math.PI / 12;
    const snapped = Math.round(mathX / snapStep) * snapStep;
    setProbeX(Math.max(xMin, Math.min(xMax, snapped)));
  };

  const probeInfo = useMemo(() => {
    if (probeX === null) return null;
    const raw = evalTrig(fn, b * (probeX - cRad));
    const y = raw === null ? null : a * raw + d;
    const deg = Math.round((probeX * 180) / Math.PI);
    const piMult = probeX / Math.PI;
    const twelfths = Math.round(piMult * 12);
    const xPiStr = formatPiFractionLatex(twelfths, 12);
    const xFrac = parsePiFraction(twelfths, 12);
    const yText =
      y === null || Math.abs(y) > 1e4
        ? 'undef'
        : formatNumber(y).replace('-', '−');
    return {
      x: probeX,
      y,
      deg,
      xPiStr,
      xFrac,
      yText,
      inBounds: y !== null && y >= Y_MIN && y <= Y_MAX,
    };
  }, [probeX, fn, a, b, cRad, d]);

  const handleReset = () => {
    setA(1);
    setB(1);
    setCQuarters(0);
    setD(0);
    setProbeX(null);
  };

  const applyPreset = (p: Preset) => {
    setFn(p.fn);
    setA(p.a);
    setB(p.b);
    setCQuarters(p.cQuarters);
    setD(p.d);
    setProbeX(null);
  };

  const originX = toSvgX(0);
  const originY = toSvgY(0);
  const midlineY = toSvgY(d);

  return (
    <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-3xl shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 p-2 rounded-xl shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-display font-bold text-slate-950 dark:text-white leading-tight">
              Interactive Trigonometric Grapher
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Chapter 7 · Amplitude, Period, Phase & Vertical Shifts
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowLabels((v) => !v)}
            className={`inline-flex items-center gap-1 min-h-[38px] sm:min-h-[34px] px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
              showLabels
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Toggle coordinate labels on key points"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Coords</span>
          </button>

          <button
            type="button"
            onClick={() => setShowParent((v) => !v)}
            className={`inline-flex items-center gap-1 min-h-[38px] sm:min-h-[34px] px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
              showParent
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Toggle dashed parent curve y = fn(x)"
          >
            {showParent ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Parent</span>
          </button>

          <button
            type="button"
            onClick={() => setDomain((prev) => (prev === '2pi' ? 'pi' : '2pi'))}
            className="min-h-[38px] sm:min-h-[34px] px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            title="Toggle x-axis zoom range"
          >
            {domain === '2pi' ? '±2π' : '±π'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 min-h-[38px] sm:min-h-[34px] px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            title="Reset parameters to parent function"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Function Selector & Live Equation Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div
          className="grid grid-cols-6 gap-1 p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 rounded-xl shrink-0"
          role="tablist"
          aria-label="Trigonometric function"
        >
          {TRIG_FUNCTIONS.map((item) => {
            const active = fn === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFn(item.id);
                  setProbeX(null);
                }}
                className={`min-h-[38px] sm:min-h-[32px] px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                  active
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 rounded-xl text-sm sm:text-base font-bold text-indigo-700 dark:text-indigo-300 text-center overflow-x-auto">
          <Latex text={`$${equationLatex}$`} />
        </div>
      </div>

      {/* Interactive SVG Coordinate Plane */}
      <div className="relative rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 overflow-hidden select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-auto block touch-none cursor-crosshair"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          onPointerLeave={() => setProbeX(null)}
          role="img"
          aria-label={`Interactive graph of ${fn} function`}
        >
          <defs>
            <clipPath id="trig-plot-clip">
              <rect x={PAD_L} y={PAD_T} width={PLOT_W} height={PLOT_H} />
            </clipPath>
          </defs>

          {/* Plot Background */}
          <rect
            x={PAD_L}
            y={PAD_T}
            width={PLOT_W}
            height={PLOT_H}
            className="fill-white dark:fill-slate-950"
          />

          {/* Horizontal Grid Lines (y) */}
          {yTicks.map((yVal) => {
            const py = toSvgY(yVal);
            return (
              <g key={`yg-${yVal}`}>
                <line
                  x1={PAD_L}
                  y1={py}
                  x2={SVG_W - PAD_R}
                  y2={py}
                  className={
                    yVal === 0
                      ? 'stroke-slate-400 dark:stroke-slate-600'
                      : 'stroke-slate-200/80 dark:stroke-slate-800/80'
                  }
                  strokeWidth={yVal === 0 ? 1.4 : 1}
                />
                <text
                  x={PAD_L - 8}
                  y={py + 3.5}
                  textAnchor="end"
                  className="fill-slate-500 dark:fill-slate-400 text-[10px] font-mono tabular-nums"
                >
                  {yVal}
                </text>
              </g>
            );
          })}

          {/* Vertical Grid Lines (x in multiples of pi) */}
          {xTicks.map((t) => {
            const px = toSvgX(t.x);
            const m = measurePiFrac(t.frac, 10);
            const tickCy = t.frac.denText ? SVG_H - PAD_B + 18 : SVG_H - PAD_B + 15;
            return (
              <g key={`xg-${t.q}`}>
                <line
                  x1={px}
                  y1={PAD_T}
                  x2={px}
                  y2={SVG_H - PAD_B}
                  className={
                    t.q === 0
                      ? 'stroke-slate-400 dark:stroke-slate-600'
                      : 'stroke-slate-200/80 dark:stroke-slate-800/80'
                  }
                  strokeWidth={t.q === 0 ? 1.4 : 1}
                />
                <SvgPiFrac
                  pf={t.frac}
                  x={px - m.w / 2}
                  cy={tickCy}
                  fontSize={10}
                  textClass="fill-slate-500 dark:fill-slate-400 font-mono tabular-nums"
                  lineClass="stroke-slate-500 dark:stroke-slate-400"
                />
              </g>
            );
          })}

          {/* Axis Labels */}
          <text
            x={SVG_W - PAD_R - 4}
            y={originY - 6}
            textAnchor="end"
            className="fill-slate-500 dark:fill-slate-400 text-[10px] font-mono italic"
          >
            x
          </text>
          <text
            x={originX + 7}
            y={PAD_T + 11}
            textAnchor="start"
            className="fill-slate-500 dark:fill-slate-400 text-[10px] font-mono italic"
          >
            y
          </text>

          {/* Clipped Curves, Asymptotes & Midline */}
          <g clipPath="url(#trig-plot-clip)">
            {/* Midline y = d */}
            {d !== 0 && (
              <line
                x1={PAD_L}
                y1={midlineY}
                x2={SVG_W - PAD_R}
                y2={midlineY}
                stroke="#f59e0b"
                strokeWidth={1.25}
                strokeDasharray="5 4"
                opacity={0.75}
              />
            )}

            {/* Vertical Asymptotes for tan, cot, sec, csc */}
            {asymptotes.map((asym, idx) => {
              const px = toSvgX(asym.x);
              return (
                <line
                  key={`asym-${idx}`}
                  x1={px}
                  y1={PAD_T}
                  x2={px}
                  y2={SVG_H - PAD_B}
                  stroke="#e11d48"
                  strokeWidth={1.15}
                  strokeDasharray="4 4"
                  opacity={0.55}
                />
              );
            })}

            {/* Parent Reference Curve y = fn(x) */}
            {parentPaths.map((dAttr, idx) => (
              <path
                key={`parent-${idx}`}
                d={dAttr}
                fill="none"
                className="stroke-slate-400 dark:stroke-slate-600"
                strokeWidth={1.4}
                strokeDasharray="4 4"
                opacity={0.65}
              />
            ))}

            {/* Primary Transformed Curve */}
            {mainPaths.map((dAttr, idx) => (
              <path
                key={`main-${idx}`}
                d={dAttr}
                fill="none"
                stroke="#4f46e5"
                className="dark:stroke-indigo-400"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Key Point Markers */}
            {showLabels &&
              keyPoints.map((pt, idx) => (
                <circle
                  key={`kpt-${idx}`}
                  cx={toSvgX(pt.x)}
                  cy={toSvgY(pt.y)}
                  r={3.2}
                  className="fill-white dark:fill-slate-950 stroke-indigo-600 dark:stroke-indigo-400"
                  strokeWidth={1.8}
                />
              ))}

            {/* Asymptote x = ... Labels */}
            {labelLayout.asymptoteLabels.map((lbl, idx) => (
              <g key={`asym-lbl-${idx}`}>
                <rect
                  x={lbl.lx - lbl.w / 2}
                  y={lbl.ly - lbl.h / 2}
                  width={lbl.w}
                  height={lbl.h}
                  rx={4}
                  className="fill-rose-50/95 dark:fill-rose-950/90 stroke-rose-200 dark:stroke-rose-800/80"
                  strokeWidth={0.8}
                />
                <SvgAsymLabel
                  xFrac={lbl.xFrac}
                  cx={lbl.lx}
                  cy={lbl.ly}
                  fontSize={9}
                  textClass="fill-rose-700 dark:fill-rose-300 font-mono font-semibold tabular-nums"
                  lineClass="stroke-rose-700 dark:stroke-rose-300"
                />
              </g>
            ))}

            {/* Key Point Coordinate Labels (x, y) */}
            {labelLayout.pointLabels.map((lbl, idx) => (
              <g key={`pt-lbl-${idx}`}>
                <rect
                  x={lbl.lx - lbl.w / 2}
                  y={lbl.ly - lbl.h / 2}
                  width={lbl.w}
                  height={lbl.h}
                  rx={4.5}
                  className="fill-white/94 dark:fill-slate-900/94 stroke-indigo-200/90 dark:stroke-indigo-800/80"
                  strokeWidth={0.85}
                />
                <SvgCoordLabel
                  xFrac={lbl.xFrac}
                  yText={lbl.yText}
                  cx={lbl.lx}
                  cy={lbl.ly}
                  fontSize={9.5}
                  textClass="fill-slate-800 dark:fill-indigo-200 font-mono font-semibold tabular-nums"
                  lineClass="stroke-slate-800 dark:stroke-indigo-200"
                />
              </g>
            ))}

            {/* Interactive Hover / Tap Trace Point & Floating Coordinate Label */}
            {probeInfo && (
              <g>
                <line
                  x1={toSvgX(probeInfo.x)}
                  y1={PAD_T}
                  x2={toSvgX(probeInfo.x)}
                  y2={SVG_H - PAD_B}
                  stroke="#0284c7"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  opacity={0.7}
                />
                {probeInfo.inBounds && probeInfo.y !== null && (() => {
                  const cx = toSvgX(probeInfo.x);
                  const cy = toSvgY(probeInfo.y);
                  const m = measureCoordLabel(probeInfo.xFrac, probeInfo.yText, 10);
                  const bw = Math.max(50, m.w + 4);
                  const bh = probeInfo.xFrac.denText ? 28 : 20;
                  const bx =
                    cx + bw + 14 > SVG_W - PAD_R
                      ? Math.max(PAD_L + 4, cx - bw - 10)
                      : cx + 10;
                  const by =
                    cy - bh - 8 < PAD_T
                      ? Math.min(SVG_H - PAD_B - bh - 4, cy + 10)
                      : cy - bh - 8;
                  return (
                    <>
                      <line
                        x1={PAD_L}
                        y1={cy}
                        x2={cx}
                        y2={cy}
                        stroke="#0284c7"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        opacity={0.55}
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill="#0284c7"
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                      <rect
                        x={bx}
                        y={by}
                        width={bw}
                        height={bh}
                        rx={5}
                        className="fill-slate-900 dark:fill-sky-600"
                        opacity={0.95}
                      />
                      <SvgCoordLabel
                        xFrac={probeInfo.xFrac}
                        yText={probeInfo.yText}
                        cx={bx + bw / 2}
                        cy={by + bh / 2}
                        fontSize={10}
                        textClass="fill-white font-mono font-bold tabular-nums"
                        lineClass="stroke-white"
                      />
                    </>
                  );
                })()}
              </g>
            )}
          </g>

          {/* Outer Plot Frame */}
          <rect
            x={PAD_L}
            y={PAD_T}
            width={PLOT_W}
            height={PLOT_H}
            fill="none"
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth={1}
          />
        </svg>

        {/* Clean Unboxed Coordinate Inspector Footer Strip */}
        <div className="px-3.5 py-2 border-t border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-300 tabular-nums">
          {probeInfo ? (
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 font-mono">
              <span>
                x = <Latex text={`$${probeInfo.xPiStr}$`} /> ({probeInfo.deg}°)
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="font-bold text-indigo-700 dark:text-indigo-300">
                {probeInfo.y === null || Math.abs(probeInfo.y) > 1e4
                  ? 'y = undefined (asymptote)'
                  : `y = ${probeInfo.y.toFixed(3)}`}
              </span>
            </div>
          ) : (
            <span className="text-slate-500 dark:text-slate-400">
              Hover or touch the graph to trace exact (x, y) coordinates
            </span>
          )}

          <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-0.5 bg-indigo-600 dark:bg-indigo-400 inline-block" />
              Curve
            </span>
            {showParent && (
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-0 border-t border-dashed border-slate-400 inline-block" />
                y = {fn}(x)
              </span>
            )}
            {asymptotes.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-0 border-t border-dashed border-rose-500 inline-block" />
                Asymptote
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Parameter Sliders (a, b, c, d) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 pt-0.5">
        {/* Amplitude / Vertical Scale a */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs tabular-nums">
            <label htmlFor="trig-a" className="font-semibold text-slate-700 dark:text-slate-300">
              Amplitude / Scale <span className="font-mono text-indigo-600 dark:text-indigo-400">a</span>
            </label>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {formatNumber(a)}
            </span>
          </div>
          <input
            id="trig-a"
            type="range"
            min={-4}
            max={4}
            step={0.5}
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Frequency b */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs tabular-nums">
            <label htmlFor="trig-b" className="font-semibold text-slate-700 dark:text-slate-300">
              Frequency <span className="font-mono text-indigo-600 dark:text-indigo-400">b</span>
            </label>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {formatNumber(b)}
            </span>
          </div>
          <input
            id="trig-b"
            type="range"
            min={0.5}
            max={4}
            step={0.5}
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Phase Shift c */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs tabular-nums">
            <label htmlFor="trig-c" className="font-semibold text-slate-700 dark:text-slate-300">
              Phase Shift <span className="font-mono text-indigo-600 dark:text-indigo-400">c</span>
            </label>
            <span className="font-bold text-slate-900 dark:text-white">
              <Latex text={`$${formatPiFractionLatex(cQuarters, 4)}$`} />
            </span>
          </div>
          <input
            id="trig-c"
            type="range"
            min={-8}
            max={8}
            step={1}
            value={cQuarters}
            onChange={(e) => setCQuarters(parseInt(e.target.value, 10))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Vertical Shift d */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs tabular-nums">
            <label htmlFor="trig-d" className="font-semibold text-slate-700 dark:text-slate-300">
              Vertical Shift <span className="font-mono text-indigo-600 dark:text-indigo-400">d</span>
            </label>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {formatNumber(d)}
            </span>
          </div>
          <input
            id="trig-d"
            type="range"
            min={-3}
            max={3}
            step={0.5}
            value={d}
            onChange={(e) => setD(parseFloat(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Key Properties Summary & Quick Presets */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs tabular-nums">
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Amplitude</div>
            <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
              <Latex text={`$${keyProperties.amplitudeLatex}$`} />
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Period</div>
            <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
              <Latex text={`$${keyProperties.periodLatex}$`} />
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Phase Shift</div>
            <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
              <Latex text={`$${keyProperties.phaseLatex}$`} />
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Range</div>
            <div className="font-semibold text-slate-900 dark:text-white mt-0.5 overflow-x-auto">
              <Latex text={`$${keyProperties.rangeLatex}$`} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mr-1">
            Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p)}
              className="min-h-[36px] sm:min-h-[32px] px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            >
              <Latex text={`$${p.latex}$`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
