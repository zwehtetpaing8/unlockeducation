import { useState, useRef, useEffect } from 'react';
import { Sliders, RefreshCw, Layers, ArrowRight, Eye } from 'lucide-react';

interface VisualizerProps {
  type: 'complex-plane' | 'induction-steps' | 'solid-geometry' | 'vector-calc' | 'perm-comb' | 'conic-explorer' | 'trig-wave' | 'log-exp' | 'derivative-tangent' | 'integration-area';
}

export default function Visualizer({ type }: VisualizerProps) {
  // State for all visualizers compiled in one neat component
  const [real, setReal] = useState<number>(3);
  const [imag, setImag] = useState<number>(4);

  const [inductionN, setInductionN] = useState<number>(5);
  const [inductionRunning, setInductionRunning] = useState<boolean>(false);
  const [inductionStep, setInductionStep] = useState<number>(0);

  const [vecAx, setVecAx] = useState<number>(4);
  const [vecAy, setVecAy] = useState<number>(3);
  const [vecBx, setVecBx] = useState<number>(2);
  const [vecBy, setVecBy] = useState<number>(-3);

  const [nVal, setNVal] = useState<number>(7);
  const [rVal, setRVal] = useState<number>(3);

  const [conicType, setConicType] = useState<'circle' | 'parabola' | 'ellipse' | 'hyperbola'>('ellipse');
  const [conicA, setConicA] = useState<number>(4);
  const [conicB, setConicB] = useState<number>(3);

  const [trigAmp, setTrigAmp] = useState<number>(2);
  const [trigFreq, setTrigFreq] = useState<number>(1);
  const [trigPhase, setTrigPhase] = useState<number>(0);

  const [expBase, setExpBase] = useState<number>(2);

  const [diffX, setDiffX] = useState<number>(1);

  const [intA, setIntA] = useState<number>(-2);
  const [intB, setIntB] = useState<number>(2);

  // Analytical Solid Geometry states
  const [ptX, setPtX] = useState<number>(3);
  const [ptY, setPtY] = useState<number>(4);
  const [ptZ, setPtZ] = useState<number>(5);
  const [solidMode, setSolidMode] = useState<'point' | 'line' | 'plane' | 'sphere'>('point');
  const [lineK, setLineK] = useState<number>(1.5);
  const [sphereR, setSphereR] = useState<number>(4.0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Math helper for Permutations & Combinations
  const factorial = (num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const getPermutations = (n: number, r: number) => {
    if (r > n) return 0;
    return factorial(n) / factorial(n - r);
  };

  const getPermutationFactors = (n: number, r: number): string => {
    if (r === 0) return "1";
    const factors: number[] = [];
    for (let i = 0; i < r; i++) {
      factors.push(n - i);
    }
    return factors.join(" \\times ");
  };

  const getCombinations = (n: number, r: number) => {
    if (r > n) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  // Trigger Induction simulation
  useEffect(() => {
    if (type !== 'induction-steps') return;
    setInductionStep(0);
    setInductionRunning(false);
  }, [inductionN, type]);

  const startInduction = () => {
    setInductionStep(0);
    setInductionRunning(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inductionRunning) {
      if (inductionStep < inductionN) {
        timer = setTimeout(() => {
          setInductionStep((prev) => prev + 1);
        }, 350);
      } else {
        setInductionRunning(false);
      }
    }
    return () => clearTimeout(timer);
  }, [inductionRunning, inductionStep, inductionN]);

  // Canvas drawing handler for graphs/charts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and establish dimension sizes
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 30; // px per unit

    // Drawer helper for Grid and Axes
    const drawGrid = (step = 1, showSubGrid = true) => {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 0.5;

      if (showSubGrid) {
        // Horizontal grid lines
        for (let y = centerY % scale; y < height; y += scale) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        // Vertical grid lines
        for (let x = centerX % scale; x < width; x += scale) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
      }

      // Main Axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;

      // X-Axis
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Y-Axis
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();

      // Axis labels & tick marks
      ctx.fillStyle = '#64748b';
      ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';

      // X ticks
      for (let xVal = -Math.floor(centerX / scale); xVal <= Math.floor(centerX / scale); xVal++) {
        if (xVal === 0) continue;
        const xPos = centerX + xVal * scale;
        ctx.beginPath();
        ctx.moveTo(xPos, centerY - 3);
        ctx.lineTo(xPos, centerY + 3);
        ctx.stroke();
        ctx.fillText(xVal.toString(), xPos - 4, centerY + 15);
      }

      // Y ticks
      for (let yVal = -Math.floor(centerY / scale); yVal <= Math.floor(centerY / scale); yVal++) {
        if (yVal === 0) continue;
        const yPos = centerY - yVal * scale;
        ctx.beginPath();
        ctx.moveTo(centerX - 3, yPos);
        ctx.lineTo(centerX + 3, yPos);
        ctx.stroke();
        ctx.fillText(yVal.toString(), centerX + 8, yPos + 3);
      }

      // Origin
      ctx.fillText('0', centerX - 10, centerY + 12);
    };

    if (type === 'complex-plane') {
      drawGrid();
      const zX = centerX + real * scale;
      const zY = centerY - imag * scale;

      // Draw vector line from origin to z
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(zX, zY);
      ctx.stroke();

      // Draw dotted vertical and horizontal projection lines
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.moveTo(zX, zY);
      ctx.lineTo(zX, centerY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(zX, zY);
      ctx.lineTo(centerX, zY);
      ctx.stroke();

      ctx.setLineDash([]); // Reset line dash

      // Draw angle arc
      const radius = Math.sqrt(real * real + imag * imag);
      const angle = Math.atan2(imag, real);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, -angle, angle < 0);
      ctx.stroke();

      // Draw complex point
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.arc(zX, zY, 6, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#1e3a8a';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(`z = ${real} + ${imag}i`, zX + 8, zY - 8);

      // Label angle θ
      ctx.fillStyle = '#d97706';
      ctx.fillText('θ', centerX + 25, centerY - 10);
    }

    else if (type === 'vector-calc') {
      drawGrid();

      const aX = centerX + vecAx * scale;
      const aY = centerY - vecAy * scale;
      const bX = centerX + vecBx * scale;
      const bY = centerY - vecBy * scale;

      // Helper to draw arrow
      const drawArrow = (fromX: number, fromY: number, toX: number, toY: number, color: string, label: string) => {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();

        const angle = Math.atan2(toY - fromY, toX - fromX);
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - 10 * Math.cos(angle - Math.PI / 6), toY - 10 * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(toX - 10 * Math.cos(angle + Math.PI / 6), toY - 10 * Math.sin(angle + Math.PI / 6));
        ctx.fill();

        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(label, toX + 8, toY - 4);
      };

      // Draw vector A
      drawArrow(centerX, centerY, aX, aY, '#10b981', 'a');

      // Draw vector B
      drawArrow(centerX, centerY, bX, bY, '#3b82f6', 'b');

      // Draw sum vector (a + b) with dotted lines
      const sumX = centerX + (vecAx + vecBx) * scale;
      const sumY = centerY - (vecAy + vecBy) * scale;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      ctx.beginPath();
      ctx.moveTo(aX, aY);
      ctx.lineTo(sumX, sumY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(bX, bY);
      ctx.lineTo(sumX, sumY);
      ctx.stroke();

      ctx.setLineDash([]);

      drawArrow(centerX, centerY, sumX, sumY, '#8b5cf6', 'a + b');
    }

    else if (type === 'conic-explorer') {
      drawGrid();

      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 2.5;

      if (conicType === 'circle') {
        // x^2 + y^2 = r^2
        const r = conicA; // Use conicA as radius
        ctx.beginPath();
        ctx.arc(centerX, centerY, r * scale, 0, 2 * Math.PI);
        ctx.stroke();

        // Highlight radius line
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + r * scale, centerY);
        ctx.stroke();

        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText(`Center (0,0)`, centerX - 25, centerY + 18);
        ctx.fillText(`r = ${r}`, centerX + (r * scale) / 2, centerY - 6);
      }

      else if (conicType === 'parabola') {
        // y^2 = 4ax => x = y^2 / (4a)
        const a = conicA;
        ctx.beginPath();
        let first = true;

        for (let screenY = 0; screenY < height; screenY++) {
          const y = -(screenY - centerY) / scale; // math y
          const x = (y * y) / (4 * a); // math x
          const screenX = centerX + x * scale;

          if (screenX >= 0 && screenX <= width) {
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          }
        }
        ctx.stroke();

        // Focus point: (a, 0)
        const focusX = centerX + a * scale;
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(focusX, centerY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText(`Focus F(${a}, 0)`, focusX + 6, centerY - 8);

        // Directrix line: x = -a
        const dirX = centerX - a * scale;
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(dirX, 0);
        ctx.lineTo(dirX, height);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#1d4ed8';
        ctx.fillText(`Directrix x = -${a}`, dirX + 6, 20);
      }

      else if (conicType === 'ellipse') {
        // x^2/a^2 + y^2/b^2 = 1
        const a = conicA;
        const b = conicB;

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, a * scale, b * scale, 0, 0, 2 * Math.PI);
        ctx.stroke();

        // Plot Foci: F = +/- sqrt(a^2 - b^2)
        if (a > b) {
          const fDist = Math.sqrt(a * a - b * b);
          ctx.fillStyle = '#2563eb';
          ctx.beginPath();
          ctx.arc(centerX + fDist * scale, centerY, 4, 0, 2 * Math.PI);
          ctx.arc(centerX - fDist * scale, centerY, 4, 0, 2 * Math.PI);
          ctx.fill();
          ctx.fillText(`F₁`, centerX + fDist * scale - 5, centerY - 8);
          ctx.fillText(`F₂`, centerX - fDist * scale - 5, centerY - 8);
        }
      }

      else if (conicType === 'hyperbola') {
        // x^2/a^2 - y^2/b^2 = 1 => x = +/- a * sqrt(1 + y^2/b^2)
        const a = conicA;
        const b = conicB;

        // Asymptotes: y = +/- (b/a) * x
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);

        ctx.beginPath();
        ctx.moveTo(0, centerY - (b / a) * centerX);
        ctx.lineTo(width, centerY + (b / a) * (width - centerX));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, centerY + (b / a) * centerX);
        ctx.lineTo(width, centerY - (b / a) * (width - centerX));
        ctx.stroke();

        ctx.setLineDash([]);

        // Draw hyperbola curves
        ctx.strokeStyle = '#e11d48';
        ctx.lineWidth = 2.5;

        // Right branch
        ctx.beginPath();
        let first = true;
        for (let screenY = 0; screenY < height; screenY++) {
          const y = -(screenY - centerY) / scale; // math y
          const x = a * Math.sqrt(1 + (y * y) / (b * b)); // positive branch
          const screenX = centerX + x * scale;

          if (screenX >= 0 && screenX <= width) {
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          }
        }
        ctx.stroke();

        // Left branch
        ctx.beginPath();
        first = true;
        for (let screenY = 0; screenY < height; screenY++) {
          const y = -(screenY - centerY) / scale;
          const x = -a * Math.sqrt(1 + (y * y) / (b * b)); // negative branch
          const screenX = centerX + x * scale;

          if (screenX >= 0 && screenX <= width) {
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          }
        }
        ctx.stroke();
      }
    }

    else if (type === 'trig-wave') {
      drawGrid();

      // Plot y = A * sin(f * x + phi)
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      let first = true;
      for (let screenX = 0; screenX < width; screenX++) {
        const x = (screenX - centerX) / scale;
        const y = trigAmp * Math.sin(trigFreq * x + trigPhase);
        const screenY = centerY - y * scale;

        if (first) {
          ctx.moveTo(screenX, screenY);
          first = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
      ctx.stroke();

      ctx.fillStyle = '#0891b2';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText(`Amplitude: ${trigAmp} units`, 15, 25);
      ctx.fillText(`Period: ${(2 * Math.PI / trigFreq).toFixed(2)} units`, 15, 42);
    }

    else if (type === 'log-exp') {
      drawGrid();

      // Plot exponential y = base^x (blue)
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let first = true;
      for (let screenX = 0; screenX < width; screenX++) {
        const x = (screenX - centerX) / scale;
        const y = Math.pow(expBase, x);
        const screenY = centerY - y * scale;

        if (screenY >= 0 && screenY <= height) {
          if (first) {
            ctx.moveTo(screenX, screenY);
            first = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
      }
      ctx.stroke();

      // Plot logarithm y = log_base(x) (orange)
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      first = true;
      for (let screenX = centerX + 1; screenX < width; screenX++) {
        const x = (screenX - centerX) / scale;
        if (x <= 0) continue;
        const y = Math.log(x) / Math.log(expBase);
        const screenY = centerY - y * scale;

        if (screenY >= 0 && screenY <= height) {
          if (first) {
            ctx.moveTo(screenX, screenY);
            first = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
      }
      ctx.stroke();

      // Label lines
      ctx.fillStyle = '#3b82f6';
      ctx.fillText(`y = ${expBase}ˣ`, centerX + 40, centerY - Math.pow(expBase, 40/scale)*scale - 10);
      ctx.fillStyle = '#f97316';
      ctx.fillText(`y = log_${expBase}(x)`, centerX + 80, centerY - (Math.log(80/scale)/Math.log(expBase))*scale - 10);
    }

    else if (type === 'derivative-tangent') {
      drawGrid();

      // Let function be f(x) = 0.2 * x^3 - x
      // f'(x) = 0.6 * x^2 - 1
      const f = (x: number) => 0.2 * Math.pow(x, 3) - x;
      const df = (x: number) => 0.6 * Math.pow(x, 2) - 1;

      // Draw the curve
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      let first = true;
      for (let screenX = 0; screenX < width; screenX++) {
        const x = (screenX - centerX) / scale;
        const y = f(x);
        const screenY = centerY - y * scale;

        if (screenY >= 0 && screenY <= height) {
          if (first) {
            ctx.moveTo(screenX, screenY);
            first = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
      }
      ctx.stroke();

      // Point of tangency
      const tX = diffX;
      const tY = f(tX);
      const m = df(tX);

      const screenTX = centerX + tX * scale;
      const screenTY = centerY - tY * scale;

      // Draw tangent line: y - tY = m * (x - tX) => y = m*(x - tX) + tY
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let screenX = 0; screenX < width; screenX++) {
        const x = (screenX - centerX) / scale;
        const y = m * (x - tX) + tY;
        const screenY = centerY - y * scale;
        if (screenX === 0) ctx.moveTo(screenX, screenY);
        else ctx.lineTo(screenX, screenY);
      }
      ctx.stroke();

      // Draw normal line: y - tY = (-1/m) * (x - tX) if m != 0
      if (Math.abs(m) > 0.01) {
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 2]);
        ctx.beginPath();
        for (let screenX = 0; screenX < width; screenX++) {
          const x = (screenX - centerX) / scale;
          const y = (-1 / m) * (x - tX) + tY;
          const screenY = centerY - y * scale;
          if (screenX === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw point
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(screenTX, screenTY, 6, 0, 2 * Math.PI);
      ctx.fill();

      // Display info
      ctx.fillStyle = '#1e293b';
      ctx.font = '11px ui-monospace, monospace';
      ctx.fillText(`Point P: (${tX.toFixed(1)}, ${tY.toFixed(2)})`, 15, 25);
      ctx.fillStyle = '#e11d48';
      ctx.fillText(`Tangent slope m = f'(x) = ${m.toFixed(2)}`, 15, 42);
      ctx.fillStyle = '#2563eb';
      ctx.fillText(`Normal slope = -1/m = ${(-1/m).toFixed(2)}`, 15, 59);
    }

    else if (type === 'integration-area') {
      drawGrid();

      // f(x) = 0.1 * x^2 + 1
      const f = (x: number) => 0.1 * x * x + 1;

      // Draw curve
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      let first = true;
      for (let screenX = 0; screenX < width; screenX++) {
        const x = (screenX - centerX) / scale;
        const y = f(x);
        const screenY = centerY - y * scale;
        if (first) {
          ctx.moveTo(screenX, screenY);
          first = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
      ctx.stroke();

      // Shade the integration area under curve from intA to intB
      ctx.fillStyle = 'rgba(139, 92, 246, 0.25)';
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 1;

      ctx.beginPath();
      const startScreenX = centerX + intA * scale;
      const endScreenX = centerX + intB * scale;

      ctx.moveTo(startScreenX, centerY);

      for (let sx = Math.max(0, startScreenX); sx <= Math.min(width, endScreenX); sx++) {
        const x = (sx - centerX) / scale;
        const y = f(x);
        const sy = centerY - y * scale;
        ctx.lineTo(sx, sy);
      }

      ctx.lineTo(endScreenX, centerY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Calculate integration value
      // Int(0.1x^2 + 1) = [0.1/3 * x^3 + x]
      const F = (x: number) => (0.1 / 3) * Math.pow(x, 3) + x;
      const areaVal = F(intB) - F(intA);

      ctx.fillStyle = '#6d28d9';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(`∫ f(x) dx from ${intA} to ${intB} = ${areaVal.toFixed(3)} sq. units`, 15, 25);
    }

    else if (type === 'solid-geometry') {
      // Isometric projection scale
      const sScale = 16; // scale down slightly to fit the axes and labels

      const project3D = (x: number, y: number, z: number) => {
        // x-axis points down-left (cos 30 deg, sin 30 deg)
        // y-axis points down-right (cos 30 deg, sin 30 deg)
        // z-axis points straight up
        const cos30 = Math.cos(Math.PI / 6);
        const sin30 = Math.sin(Math.PI / 6);
        const sx = centerX + sScale * (y * cos30 - x * cos30);
        const sy = centerY + sScale * (x * sin30 + y * sin30 - z);
        return { sx, sy };
      };

      // Draw 3D Coordinate Planes (Bottom xy-plane)
      ctx.fillStyle = 'rgba(226, 232, 240, 0.25)';
      ctx.beginPath();
      const origin = project3D(0, 0, 0);
      const xMax = project3D(7, 0, 0);
      const xyMax = project3D(7, 7, 0);
      const yMax = project3D(0, 7, 0);
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(xMax.sx, xMax.sy);
      ctx.lineTo(xyMax.sx, xyMax.sy);
      ctx.lineTo(yMax.sx, yMax.sy);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw Axes (Dotted negative side first)
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      // Negative X-axis
      ctx.beginPath();
      const xNeg = project3D(-6, 0, 0);
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(xNeg.sx, xNeg.sy);
      ctx.stroke();

      // Negative Y-axis
      ctx.beginPath();
      const yNeg = project3D(0, -6, 0);
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(yNeg.sx, yNeg.sy);
      ctx.stroke();

      // Negative Z-axis
      ctx.beginPath();
      const zNeg = project3D(0, 0, -6);
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(zNeg.sx, zNeg.sy);
      ctx.stroke();

      ctx.setLineDash([]); // Reset line dash

      // Positive Solid Axes
      ctx.lineWidth = 1.5;

      // X-axis (Red)
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(xMax.sx, xMax.sy);
      ctx.stroke();

      // Y-axis (Green)
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(yMax.sx, yMax.sy);
      ctx.stroke();

      // Z-axis (Blue)
      ctx.strokeStyle = '#3b82f6';
      ctx.beginPath();
      ctx.moveTo(origin.sx, origin.sy);
      const zMax = project3D(0, 0, 7);
      ctx.lineTo(zMax.sx, zMax.sy);
      ctx.stroke();

      // Labels for Axes
      ctx.font = 'bold 10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
      ctx.fillStyle = '#ef4444';
      ctx.fillText('X', xMax.sx - 12, xMax.sy + 10);
      ctx.fillStyle = '#10b981';
      ctx.fillText('Y', yMax.sx + 8, yMax.sy + 10);
      ctx.fillStyle = '#3b82f6';
      ctx.fillText('Z', zMax.sx - 3, zMax.sy - 8);

      // Draw actual visualizer mode element
      if (solidMode === 'point') {
        const pt = project3D(ptX, ptY, ptZ);

        // Calculate other box corners for projection
        const ptO = project3D(0, 0, 0);
        const ptA = project3D(ptX, 0, 0);
        const ptB = project3D(ptX, ptY, 0);
        const ptC = project3D(0, ptY, 0);
        const ptD = project3D(0, 0, ptZ);
        const ptE = project3D(ptX, 0, ptZ);
        const ptG = project3D(0, ptY, ptZ);

        // Draw dotted projection box
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        // Base rectangle
        ctx.beginPath();
        ctx.moveTo(ptO.sx, ptO.sy);
        ctx.lineTo(ptA.sx, ptA.sy);
        ctx.lineTo(ptB.sx, ptB.sy);
        ctx.lineTo(ptC.sx, ptC.sy);
        ctx.closePath();
        ctx.stroke();

        // Top rectangle
        ctx.beginPath();
        ctx.moveTo(ptD.sx, ptD.sy);
        ctx.lineTo(ptE.sx, ptE.sy);
        ctx.lineTo(pt.sx, pt.sy);
        ctx.lineTo(ptG.sx, ptG.sy);
        ctx.closePath();
        ctx.stroke();

        // Vertical connectors
        ctx.beginPath();
        ctx.moveTo(ptO.sx, ptO.sy); ctx.lineTo(ptD.sx, ptD.sy);
        ctx.moveTo(ptA.sx, ptA.sy); ctx.lineTo(ptE.sx, ptE.sy);
        ctx.moveTo(ptB.sx, ptB.sy); ctx.lineTo(pt.sx, pt.sy);
        ctx.moveTo(ptC.sx, ptC.sy); ctx.lineTo(ptG.sx, ptG.sy);
        ctx.stroke();

        ctx.setLineDash([]); // Reset

        // Draw distance vector from origin
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ptO.sx, ptO.sy);
        ctx.lineTo(pt.sx, pt.sy);
        ctx.stroke();

        // Draw the point
        ctx.fillStyle = '#8b5cf6';
        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#4c1d95';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText(`P(${ptX}, ${ptY}, ${ptZ})`, pt.sx + 8, pt.sy - 6);
      }
      else if (solidMode === 'line') {
        // Line equation: A(1, 1, 2) + k * d(2, 3, 2)
        // Draw the line for k in [-2, 2.5]
        const getLinePt = (k: number) => {
          return { x: 1 + 2*k, y: 1 + 3*k, z: 2 + 2*k };
        };

        const kStart = -1.5;
        const kEnd = 2.0;
        const pStart = getLinePt(kStart);
        const pEnd = getLinePt(kEnd);

        const screenStart = project3D(pStart.x, pStart.y, pStart.z);
        const screenEnd = project3D(pEnd.x, pEnd.y, pEnd.z);

        // Draw line
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(screenStart.sx, screenStart.sy);
        ctx.lineTo(screenEnd.sx, screenEnd.sy);
        ctx.stroke();

        // Draw base point A(1, 1, 2)
        const ptA = project3D(1, 1, 2);
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(ptA.sx, ptA.sy, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#1e3a8a';
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText('A(1,1,2)', ptA.sx + 8, ptA.sy + 12);

        // Draw sliding point R for current lineK
        const curPt = getLinePt(lineK);
        const screenR = project3D(curPt.x, curPt.y, curPt.z);

        // Draw projection to ground xy-plane for point R
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        const screenR0 = project3D(curPt.x, curPt.y, 0);
        ctx.beginPath();
        ctx.moveTo(screenR.sx, screenR.sy);
        ctx.lineTo(screenR0.sx, screenR0.sy);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.arc(screenR.sx, screenR.sy, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#ea580c';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillText(`R(${curPt.x.toFixed(1)}, ${curPt.y.toFixed(1)}, ${curPt.z.toFixed(1)})`, screenR.sx + 8, screenR.sy - 6);
      }
      else if (solidMode === 'plane') {
        // Plane passing through A(ptX, ptY, ptZ) with normal vector n(2, 1, 3)
        const norm = { x: 2, y: 1, z: 3 };
        
        // Perpendicular basis vectors in plane
        const u = { x: 3, y: 0, z: -2 };
        const v = { x: 1, y: -2, z: 0 };

        // Generate 4 corner points of plane patch
        const size = 1.2;
        const c1 = project3D(ptX - size*u.x - size*v.x, ptY - size*u.y - size*v.y, ptZ - size*u.z - size*v.z);
        const c2 = project3D(ptX + size*u.x - size*v.x, ptY + size*u.y - size*v.y, ptZ + size*u.z - size*v.z);
        const c3 = project3D(ptX + size*u.x + size*v.x, ptY + size*u.y + size*v.y, ptZ + size*u.z + size*v.z);
        const c4 = project3D(ptX - size*u.x + size*v.x, ptY - size*u.y + size*v.y, ptZ - size*u.z + size*v.z);

        // Draw plane patch
        ctx.fillStyle = 'rgba(13, 148, 136, 0.2)';
        ctx.strokeStyle = '#0d9488';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(c1.sx, c1.sy);
        ctx.lineTo(c2.sx, c2.sy);
        ctx.lineTo(c3.sx, c3.sy);
        ctx.lineTo(c4.sx, c4.sy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw base point A
        const ptA = project3D(ptX, ptY, ptZ);
        ctx.fillStyle = '#0f766e';
        ctx.beginPath();
        ctx.arc(ptA.sx, ptA.sy, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Draw normal vector arrow starting from A
        const ptN = project3D(ptX + norm.x * 0.8, ptY + norm.y * 0.8, ptZ + norm.z * 0.8);
        ctx.strokeStyle = '#ea580c';
        ctx.fillStyle = '#ea580c';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(ptA.sx, ptA.sy);
        ctx.lineTo(ptN.sx, ptN.sy);
        ctx.stroke();

        // Draw arrowhead
        const angle = Math.atan2(ptN.sy - ptA.sy, ptN.sx - ptA.sx);
        ctx.beginPath();
        ctx.moveTo(ptN.sx, ptN.sy);
        ctx.lineTo(ptN.sx - 8 * Math.cos(angle - Math.PI / 6), ptN.sy - 8 * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(ptN.sx - 8 * Math.cos(angle + Math.PI / 6), ptN.sy - 8 * Math.sin(angle + Math.PI / 6));
        ctx.fill();

        ctx.fillStyle = '#ea580c';
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.fillText('Normal n(2,1,3)', ptN.sx + 8, ptN.sy - 4);

        ctx.fillStyle = '#0f766e';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillText(`Plane: 2x+y+3z=${(2*ptX + ptY + 3*ptZ).toFixed(0)}`, ptA.sx - 40, ptA.sy + 18);
      }
      else if (solidMode === 'sphere') {
        const centerPt = project3D(ptX, ptY, ptZ);
        const radiusPx = sphereR * sScale;

        // Draw solid horizontal and vertical wire hoops
        ctx.strokeStyle = 'rgba(109, 40, 217, 0.15)';
        ctx.lineWidth = 1;

        // Draw Equatorial Hoop (xy-parallel)
        ctx.beginPath();
        for (let th = 0; th <= 2 * Math.PI; th += 0.15) {
          const px = ptX + sphereR * Math.cos(th);
          const py = ptY + sphereR * Math.sin(th);
          const p = project3D(px, py, ptZ);
          if (th === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.closePath();
        ctx.stroke();

        // Draw Vertical Hoop 1 (xz-parallel)
        ctx.beginPath();
        for (let th = 0; th <= 2 * Math.PI; th += 0.15) {
          const px = ptX + sphereR * Math.cos(th);
          const pz = ptZ + sphereR * Math.sin(th);
          const p = project3D(px, ptY, pz);
          if (th === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.closePath();
        ctx.stroke();

        // Draw Vertical Hoop 2 (yz-parallel)
        ctx.beginPath();
        for (let th = 0; th <= 2 * Math.PI; th += 0.15) {
          const py = ptY + sphereR * Math.cos(th);
          const pz = ptZ + sphereR * Math.sin(th);
          const p = project3D(ptX, py, pz);
          if (th === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.closePath();
        ctx.stroke();

        // Draw Center Point C
        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.arc(centerPt.sx, centerPt.sy, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Draw dynamic radius line
        const edgePt = project3D(ptX, ptY + sphereR, ptZ);
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerPt.sx, centerPt.sy);
        ctx.lineTo(edgePt.sx, edgePt.sy);
        ctx.stroke();

        // Label Radius
        ctx.fillStyle = '#db2777';
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText(`r = ${sphereR}`, (centerPt.sx + edgePt.sx)/2 + 5, (centerPt.sy + edgePt.sy)/2);

        // Draw Outer Sphere boundary circle (always a perfect projected circle!)
        ctx.strokeStyle = '#6d28d9';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(centerPt.sx, centerPt.sy, radiusPx, 0, 2 * Math.PI);
        ctx.stroke();

        // Label Sphere Center
        ctx.fillStyle = '#4c1d95';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillText(`C(${ptX}, ${ptY}, ${ptZ})`, centerPt.sx - 35, centerPt.sy - 8);
      }
    }

  }, [
    type,
    real,
    imag,
    vecAx,
    vecAy,
    vecBx,
    vecBy,
    conicType,
    conicA,
    conicB,
    trigAmp,
    trigFreq,
    trigPhase,
    expBase,
    diffX,
    intA,
    intB,
    ptX,
    ptY,
    ptZ,
    solidMode,
    lineK,
    sphereR
  ]);

  return (
    <div id="visualizer-container" className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm transition-all">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          <h4 className="font-display font-medium text-slate-800 dark:text-slate-200">
            Interactive Chapter Visualizer
          </h4>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-full font-medium">
          Live Graph Mode
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Canvas Viewport for Graphic Visualizers */}
        {type !== 'induction-steps' && type !== 'perm-comb' ? (
          <div className="lg:col-span-7 flex justify-center bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-inner">
            <canvas
              ref={canvasRef}
              width={380}
              height={260}
              className="w-full max-w-[380px] h-[260px] block bg-transparent"
            />
          </div>
        ) : null}

        {/* Custom non-canvas visualizers */}
        {type === 'induction-steps' && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-inner min-h-[260px] flex flex-col justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium mb-3">Mathematical Induction Domino Cascade</div>
              <div className="flex justify-center items-end gap-1.5 py-6 overflow-x-auto min-h-[140px]">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const number = idx + 1;
                  const isFallen = number <= inductionStep;
                  const isInScope = number <= inductionN;

                  return (
                    <div
                      key={idx}
                      className={`flex flex-col items-center transition-all duration-300 ${
                        isInScope ? 'opacity-100 scale-100' : 'opacity-30 scale-90'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-slate-400 mb-1">P({number})</div>
                      <div
                        className={`w-6 rounded shadow-md transform origin-bottom transition-all duration-300 ${
                          isFallen ? 'rotate-75 translate-x-2' : ''
                        } ${
                          isInScope
                            ? isFallen
                              ? 'h-24 bg-gradient-to-t from-indigo-800 to-indigo-600'
                              : 'h-24 bg-gradient-to-t from-indigo-500 to-indigo-400 hover:from-indigo-600'
                            : 'h-24 bg-slate-300 dark:bg-slate-800'
                        }`}
                        style={{
                          transform: isFallen ? 'rotate(72deg) translate(8px, 4px)' : 'none',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {inductionStep === 0 && 'Base case P(1) ready.'}
                {inductionStep > 0 && inductionStep < inductionN && `Inductive Step: P(${inductionStep}) ⟹ P(${inductionStep + 1}) is active.`}
                {inductionStep === inductionN && `Statement proved true for all n up to ${inductionN}!`}
              </div>
              <button
                onClick={startInduction}
                disabled={inductionRunning}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium text-xs rounded-lg shadow-sm transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${inductionRunning ? 'animate-spin' : ''}`} />
                {inductionStep > 0 ? 'Reset & Proof' : 'Trigger Proof'}
              </button>
            </div>
          </div>
        )}

        {type === 'perm-comb' && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-inner min-h-[260px] flex flex-col justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium mb-2">Visualizing Selection vs Arrangement</div>
              <div className="flex flex-wrap gap-2 py-4 justify-center">
                {/* Visual spheres representing items */}
                {Array.from({ length: nVal }).map((_, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = idx < rVal;
                  return (
                    <div
                      key={idx}
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border shadow-sm transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-purple-500 to-indigo-600 border-indigo-700 text-white scale-110 ring-2 ring-indigo-300'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
              <div className="text-xs bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 mt-2 space-y-1 font-mono">
                <div>Total Items (n) = {nVal}, Group Size (r) = {rVal}</div>
                <div>{`Permutations $P(${nVal}, ${rVal}) = {}^{${nVal}}P_{${rVal}} = ${getPermutationFactors(nVal, rVal)} = \\frac{${nVal}!}{(${nVal - rVal})!} = ${getPermutations(nVal, rVal).toLocaleString()}$`}</div>
                <div>{`Combinations $C(${nVal}, ${rVal}) = \\frac{${nVal}!}{${rVal}!(${nVal - rVal})!} = ${getCombinations(nVal, rVal).toLocaleString()}$`}</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 italic">
              Notice: Combinations ignores the order, while Permutations factors in all rearrangements of the {rVal} selected balls (highlighted in purple).
            </div>
          </div>
        )}

        {/* Dynamic Controls Side-Bar */}
        <div className={`lg:col-span-${type === 'induction-steps' || type === 'perm-comb' ? '12' : '5'} flex flex-col gap-4 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800/60`}>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-indigo-500" />
            <span>Interactive Parameters</span>
          </div>

          <div className="space-y-4">
            {type === 'complex-plane' && (
              <>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Real Part (a)</span>
                    <span className="font-mono font-bold text-blue-600">{real}</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={real}
                    onChange={(e) => setReal(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Imaginary Part (bi)</span>
                    <span className="font-mono font-bold text-indigo-600">{imag}i</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={imag}
                    onChange={(e) => setImag(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/60 dark:border-blue-900/40 rounded-lg text-xs space-y-1">
                  <div className="font-semibold text-blue-900 dark:text-blue-300">Modulus & Arg Calculated:</div>
                  <div className="font-mono text-slate-600 dark:text-slate-400">
                    Modulus |z| = √({real}² + {imag}²) = <span className="font-bold">{Math.sqrt(real*real + imag*imag).toFixed(2)}</span>
                  </div>
                  <div className="font-mono text-slate-600 dark:text-slate-400">
                    Argument θ = <span className="font-bold">{((Math.atan2(imag, real) * 180) / Math.PI).toFixed(1)}°</span>
                  </div>
                </div>
              </>
            )}

            {type === 'induction-steps' && (
              <>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Number of Domino Steps (n)</span>
                    <span className="font-mono font-bold text-indigo-600">{inductionN}</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    step="1"
                    value={inductionN}
                    onChange={(e) => setInductionN(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800 space-y-2">
                  <p className="font-medium text-slate-700 dark:text-slate-300">Induction Proof Analogy:</p>
                  <p>1. **Base Case**: P(1) falls. This sets off the chain reaction.</p>
                  <p>2. **Inductive Step**: If domino k falls, it inevitably knocks down domino k+1. Thus, all dominoes fall to infinity!</p>
                </div>
              </>
            )}

            {type === 'vector-calc' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Vector a (x)</span>
                      <span className="font-mono text-emerald-600 font-bold">{vecAx}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={vecAx}
                      onChange={(e) => setVecAx(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Vector a (y)</span>
                      <span className="font-mono text-emerald-600 font-bold">{vecAy}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={vecAy}
                      onChange={(e) => setVecAy(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Vector b (x)</span>
                      <span className="font-mono text-blue-500 font-bold">{vecBx}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={vecBx}
                      onChange={(e) => setVecBx(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Vector b (y)</span>
                      <span className="font-mono text-blue-500 font-bold">{vecBy}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={vecBy}
                      onChange={(e) => setVecBy(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>

                <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-lg text-xs font-mono space-y-1">
                  <div>a · b = ({vecAx})({vecBx}) + ({vecAy})({vecBy}) = <span className="font-bold text-indigo-700 dark:text-indigo-400">{(vecAx * vecBx + vecAy * vecBy)}</span></div>
                  <div>a × b (k-component) = <span className="font-bold text-indigo-700 dark:text-indigo-400">{(vecAx * vecBy - vecAy * vecBx)}</span></div>
                </div>
              </div>
            )}

            {type === 'perm-comb' && (
              <>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Total items (n)</span>
                    <span className="font-mono font-bold text-indigo-600">{nVal}</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    step="1"
                    value={nVal}
                    onChange={(e) => {
                      const newN = parseInt(e.target.value);
                      setNVal(newN);
                      if (rVal > newN) setRVal(newN);
                    }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Choose / Arrange (r)</span>
                    <span className="font-mono font-bold text-indigo-600">{rVal}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={nVal}
                    step="1"
                    value={rVal}
                    onChange={(e) => setRVal(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </>
            )}

            {type === 'conic-explorer' && (
              <>
                <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg mb-2">
                  {(['circle', 'parabola', 'ellipse', 'hyperbola'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setConicType(mode)}
                      className={`flex-1 text-[10px] uppercase tracking-wider py-1 font-medium rounded-md transition ${
                        conicType === mode
                          ? 'bg-white dark:bg-slate-800 shadow-sm text-rose-600 dark:text-rose-400 font-semibold'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>{conicType === 'circle' ? 'Radius (r)' : conicType === 'parabola' ? 'Param (a)' : 'Semi-major Axis (a)'}</span>
                    <span className="font-mono font-bold text-rose-500">{conicA}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="5"
                    step="0.5"
                    value={conicA}
                    onChange={(e) => setConicA(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>

                {(conicType === 'ellipse' || conicType === 'hyperbola') && (
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                      <span>Semi-minor Axis (b)</span>
                      <span className="font-mono font-bold text-rose-500">{conicB}</span>
                    </div>
                    <input
                      type="range"
                      min="1.5"
                      max="4.5"
                      step="0.5"
                      value={conicB}
                      onChange={(e) => setConicB(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                  </div>
                )}
              </>
            )}

            {type === 'trig-wave' && (
              <>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Amplitude (A)</span>
                    <span className="font-mono font-bold text-cyan-600">{trigAmp}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.5"
                    value={trigAmp}
                    onChange={(e) => setTrigAmp(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Frequency (f)</span>
                    <span className="font-mono font-bold text-cyan-600">{trigFreq}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.5"
                    value={trigFreq}
                    onChange={(e) => setTrigFreq(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              </>
            )}

            {type === 'log-exp' && (
              <>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Base (a)</span>
                    <span className="font-mono font-bold text-blue-600">{expBase}</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="4"
                    step="0.5"
                    value={expBase}
                    onChange={(e) => setExpBase(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div className="text-xs text-slate-500 space-y-1 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">Inverse Relationship:</div>
                  <p>As Base increases, exponential $y = a^x$ shoots up faster, while the logarithm $y = \\log_a(x)$ flattens out quicker. They are symmetrical across the mirror line $y = x$.</p>
                </div>
              </>
            )}

            {type === 'derivative-tangent' && (
              <>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Point of Tangency (x)</span>
                    <span className="font-mono font-bold text-rose-600">{diffX.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="-2.5"
                    max="2.5"
                    step="0.1"
                    value={diffX}
                    onChange={(e) => setDiffX(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>
                <div className="text-xs text-slate-400 italic">
                  Note: The dashed blue line is the **Normal Line**, which is always perpendicular to the solid red **Tangent Line**.
                </div>
              </>
            )}

            {type === 'solid-geometry' && (
              <>
                <div>
                  <div className="text-xs text-slate-500 mb-1.5 font-medium">Visualizing Geometric Element</div>
                  <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                    {(['point', 'line', 'plane', 'sphere'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSolidMode(mode)}
                        className={`flex-1 py-1 text-[10px] font-semibold rounded-md transition-all uppercase tracking-wider ${
                          solidMode === mode
                            ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {solidMode !== 'line' && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>X Coordinate (x)</span>
                        <span className="font-mono text-rose-500 font-bold">{ptX}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="6"
                        step="1"
                        value={ptX}
                        onChange={(e) => setPtX(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>Y Coordinate (y)</span>
                        <span className="font-mono text-emerald-500 font-bold">{ptY}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="6"
                        step="1"
                        value={ptY}
                        onChange={(e) => setPtY(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>Z Coordinate (z)</span>
                        <span className="font-mono text-blue-500 font-bold">{ptZ}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="6"
                        step="1"
                        value={ptZ}
                        onChange={(e) => setPtZ(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                  </div>
                )}

                {solidMode === 'point' && (
                  <div className="p-3 bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100/60 dark:border-purple-900/40 rounded-lg text-xs space-y-1">
                    <div className="font-semibold text-purple-900 dark:text-purple-300">Point Position & Distance:</div>
                    <div className="font-mono text-slate-600 dark:text-slate-400">
                      P = ({ptX}, {ptY}, {ptZ})
                    </div>
                    <div className="font-mono text-slate-600 dark:text-slate-400">
                      Distance from O(0,0,0):
                      <br />
                      d = √({ptX}² + {ptY}² + {ptZ}²) = <span className="font-bold">√{(ptX*ptX + ptY*ptY + ptZ*ptZ).toFixed(0)}</span> ≈ <span className="font-bold text-purple-600">{Math.sqrt(ptX*ptX + ptY*ptY + ptZ*ptZ).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {solidMode === 'line' && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>Line Parameter (k)</span>
                        <span className="font-mono text-amber-500 font-bold">{lineK.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="-1.5"
                        max="2.0"
                        step="0.1"
                        value={lineK}
                        onChange={(e) => setLineK(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                    <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100/60 dark:border-amber-900/40 rounded-lg text-xs space-y-1.5">
                      <div className="font-semibold text-amber-900 dark:text-amber-300">Symmetric Line Equation:</div>
                      <div className="font-mono text-slate-600 dark:text-slate-400 text-[10px]">
                        (x-1)/2 = (y-1)/3 = (z-2)/2 = k
                      </div>
                      <div className="font-mono text-slate-600 dark:text-slate-400">
                        Line Point R(x, y, z):
                        <br />
                        x = 1 + 2k = <span className="font-bold">{(1 + 2*lineK).toFixed(1)}</span>
                        <br />
                        y = 1 + 3k = <span className="font-bold">{(1 + 3*lineK).toFixed(1)}</span>
                        <br />
                        z = 2 + 2k = <span className="font-bold">{(2 + 2*lineK).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {solidMode === 'plane' && (
                  <div className="p-3 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100/60 dark:border-teal-900/40 rounded-lg text-xs space-y-1">
                    <div className="font-semibold text-teal-900 dark:text-teal-300">Plane Equation (A=2, B=1, C=3):</div>
                    <div className="font-mono text-slate-600 dark:text-slate-400">
                      Normal Vector: n = (2, 1, 3)
                    </div>
                    <div className="font-mono text-slate-600 dark:text-slate-400">
                      Point on Plane: A = ({ptX}, {ptY}, {ptZ})
                    </div>
                    <div className="font-mono text-teal-700 dark:text-teal-400 font-bold mt-1">
                      2(x - {ptX}) + (y - {ptY}) + 3(z - {ptZ}) = 0
                      <br />
                      ⟹ 2x + y + 3z = {2*ptX + ptY + 3*ptZ}
                    </div>
                  </div>
                )}

                {solidMode === 'sphere' && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>Sphere Radius (r)</span>
                        <span className="font-mono text-violet-500 font-bold">{sphereR}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={sphereR}
                        onChange={(e) => setSphereR(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                      />
                    </div>
                    <div className="p-3 bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100/60 dark:border-violet-900/40 rounded-lg text-xs space-y-1">
                      <div className="font-semibold text-violet-900 dark:text-violet-300">Sphere Equation:</div>
                      <div className="font-mono text-slate-600 dark:text-slate-400">
                        Center C = ({ptX}, {ptY}, {ptZ}), Radius r = {sphereR}
                      </div>
                      <div className="font-mono text-violet-700 dark:text-violet-400 font-bold mt-1">
                        (x - {ptX})² + (y - {ptY})² + (z - {ptZ})² = {sphereR*sphereR}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {type === 'integration-area' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Lower Bound (a)</span>
                      <span className="font-mono text-purple-600 font-bold">{intA}</span>
                    </div>
                    <input
                      type="range"
                      min="-4"
                      max={intB - 1}
                      step="1"
                      value={intA}
                      onChange={(e) => setIntA(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Upper Bound (b)</span>
                      <span className="font-mono text-purple-600 font-bold">{intB}</span>
                    </div>
                    <input
                      type="range"
                      min={intA + 1}
                      max="4"
                      step="1"
                      value={intB}
                      onChange={(e) => setIntB(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-snug">
                  Moving the sliders recalculates the exact Riemann definite integral representing the sum of values on $[a, b]$, which equals the shaded area.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
