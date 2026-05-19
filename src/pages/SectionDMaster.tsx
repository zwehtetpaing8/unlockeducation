import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, Brain, ArrowLeft, Target, 
  CheckCircle2, Info, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { NoteCard } from '../components/ui/NoteCard';
import { cn } from '../lib/utils';

const TouchingPlaneDiagram: React.FC<{ centerLabel?: string, equation?: string }> = ({ centerLabel, equation }) => {
  return (
    <div className="my-12 flex flex-col items-center gap-6 bg-slate-50/30 p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm overflow-visible">
      <svg width="480" height="360" viewBox="0 0 480 360" className="max-w-full overflow-visible drop-shadow-2xl">
        <defs>
          <radialGradient id="sphereBall" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FAFAFF" />
            <stop offset="100%" stopColor="#283593" stopOpacity={0.2} />
          </radialGradient>
          <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a237e" />
            <stop offset="100%" stopColor="#5c6bc0" />
          </linearGradient>
          <filter id="shadowBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
        </defs>

        {/* Global Ground Shadow */}
        <ellipse cx="240" cy="280" rx="140" ry="25" fill="black" opacity="0.08" filter="url(#shadowBlur)" />
        
        {/* Plane Shadow */}
        <path d="M 65 265 L 385 265 L 445 225 L 125 225 Z" fill="black" opacity="0.12" transform="translate(4, 4)" />
        
        {/* The Plane (Prism Blue) */}
        <path d="M 60 260 L 380 260 L 440 220 L 120 220 Z" fill="url(#planeGrad)" stroke="#1a237e" strokeWidth="1.5" />
        
        {/* Highlight on front edge of plane */}
        <line x1="60" y1="260" x2="380" y2="260" stroke="white" strokeWidth="1" strokeOpacity="0.3" />

        {/* Touching Area Highlight (Gold) */}
        <ellipse cx="240" cy="240" rx="45" ry="12" fill="#F9A825" opacity="0.15" />

        {/* Sphere Body */}
        <circle cx="240" cy="115" r="125" fill="url(#sphereBall)" stroke="#283593" strokeWidth="2.5" />
        
        {/* Latitude/Longitude dashed lines */}
        <ellipse cx="240" cy="115" rx="125" ry="38" fill="none" stroke="#283593" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.25" />
        <ellipse cx="240" cy="115" rx="38" ry="125" fill="none" stroke="#283593" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.2" />

        {/* Radius (Prism Gold) */}
        <line x1="240" y1="115" x2="240" y2="240" stroke="#F9A825" strokeWidth="5" strokeLinecap="round" />
        
        {/* Labels Box for r ⊥ Plane */}
        <g transform="translate(60, 185)">
          <rect x="0" y="0" width="85" height="22" rx="6" fill="white" stroke="#F9A825" strokeWidth="1.5" />
          <text x="42.5" y="14" textAnchor="middle" className="text-[9px] font-black tracking-tighter" fill="#F9A825">r ⊥ Plane</text>
        </g>
        
        {/* Right Angle Symbol */}
        <path d="M 240 215 H 265 V 240" fill="none" stroke="#F9A825" strokeWidth="1.5" opacity="0.8" />

        {/* Center Point */}
        <circle cx="240" cy="115" r="5" fill="#283593" />
        {centerLabel && (
          <text x="240" y="100" textAnchor="middle" className="text-[13px] font-black" fill="#1e293b">C({centerLabel})</text>
        )}

        {/* Touching Point */}
        <circle cx="240" cy="240" r="5" fill="#F9A825" />
        <text x="250" y="255" className="text-[10px] font-black tracking-[0.2em] uppercase" fill="#F9A825">TOUCHING POINT</text>
        
        {/* Equation on plane */}
        {equation && (
          <text x="175" y="240" textAnchor="middle" fill="white" className="text-[10px] font-black italic tracking-wide" opacity="0.95">{equation}</text>
        )}
      </svg>
    </div>
  );
};

interface Question {
  id: number;
  title: string;
  tag: string;
  question: string;
  solution: string;
  algorithm: string[];
  diagramData?: { center: string, equation: string };
}

const SECTION_D_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Question 1 (2025)",
    tag: "Line Distance",
    question: "Point $A$ has coordinates $(7,-1,8)$ and line $l$ is defined by the Cartesian equation $\\frac{x-3}{1}=\\frac{y+1}{2}=z$. Point $B$ lies on $l$ such that line $AB$ is perpendicular to $l$. Find the distance between $A$ and $B$.",
    solution: `$A=(7,-1,8)$.

Cartesian equation of the line $l$ is $\\frac{x-3}{1}=\\frac{y+1}{2}=z.$

Thus, the directed values of line $l$ are $\\langle l\\rangle=\\langle 1,2,1\\rangle.$

Since point $B$ lies on $l$, $B=(x,y,z)=(3+k,-1+2k,k)$ for some real number $k$.

Therefore, $\\langle AB\\rangle=\\langle k-4,2k,k-8\\rangle.$

Since $AB\\bot l$,
$$\\begin{aligned} (k-4)+2(2k)+(k-8)&=0\\\\ 6k-12&=0\\\\ k&=2. \\end{aligned}$$

The distance between $A$ and $B$ is
$$\\begin{aligned} AB&=\\sqrt{(k-4)^2+(2k)^2+(k-8)^2}\\\\ &=\\sqrt{(2-4)^2+4^2+(2-8)^2}\\\\ &=\\sqrt{4+16+36}\\\\ &=2\\sqrt{14}. \\end{aligned}$$`,
    algorithm: [
      "From the Cartesian equation of line $l$, find the directed values of line $l$, $\\langle l\\rangle$.",
      "Since $B$ lies on line $l$, write the coordinates of $B$ using a parameter $k$.",
      "Find the vector $\\langle AB\\rangle$ using point $A$ and point $B$.",
      "Since $AB$ is perpendicular to $l$, use the dot product condition $\\langle AB\\rangle\\cdot\\langle l\\rangle=0$.",
      "Solve for $k$, then substitute it into the distance formula to find $AB$."
    ]
  },
  {
    id: 2,
    title: "Question 2 (2025)",
    tag: "Perpendicular Lines",
    question: "Find the equation of the line passing through the point $(-1,5,4)$ and perpendicular to the line $(x,y,z)=(1+2k,-2+k,1-k)$. Find also the point of intersection of two lines.",
    solution: `Let $A=(-1,5,4)$. The given line is $(x,y,z)=(1+2k,-2+k,1-k)$.

Thus, the directed values of this line are $\\langle l_1\\rangle=\\langle 2,1,-1\\rangle.$

Let $B$ be the point of intersection of the two lines. Since $B$ lies on $l_1$, $B=(1+2k,-2+k,1-k)$ for some real number $k$.

Therefore, the directed values of the required line are $\\langle AB\\rangle=\\langle 2+2k,-7+k,-3-k\\rangle.$

Since the two lines are perpendicular,
$$\\begin{aligned} \\langle AB\\rangle\\cdot\\langle l_1\\rangle&=0\\\\ 2(2+2k)+(-7+k)-(-3-k)&=0\\\\ 6k&=0\\\\ k&=0. \\end{aligned}$$

So the point of intersection is $B=(1,-2,1)$.

The directed values of the required line are $\\langle AB\\rangle=\\langle 2,-7,-3\\rangle.$

Therefore, the equation of the required line is $(x,y,z)=(-1+2t,5-7t,4-3t), \\quad t\\in\\mathbf{R}$.`,
    algorithm: [
      "Find the directed values of the given line.",
      "Let the point of intersection be $B$, a general point on the given line.",
      "Find $\\langle AB\\rangle$ from the given point $A$ to the intersection point $B$.",
      "Use the perpendicular condition $\\langle AB\\rangle\\cdot\\langle l_1\\rangle=0$ to find $k$.",
      "Substitute $k$ to get the intersection point and write the required line equation."
    ]
  },
  {
    id: 3,
    title: "Question 3 (2025)",
    tag: "Sphere & Plane",
    question: "Find the equation of the sphere with center $(2,2,2)$ and touching the plane $x-2y+2z+5=0$.",
    diagramData: { center: "2,2,2", equation: "x-2y+2z+5=0" },
    solution: `Directed values of the line (radius) passing through the center $(2,2,2)$ and perpendicular to the plane $x-2y+2z+5=0$ are $\\langle 1,-2,2\\rangle.$

Coordinates of the points on this line (radius) are $(x,y,z)=(2+k,2-2k,2+2k)$ for some real number $k$.

If one of these points is on the plane,
$$\\begin{aligned} (2+k)-2(2-2k)+2(2+2k)+5&=0\\\\ 9k+7&=0\\\\ k&=-\\frac{7}{9}. \\end{aligned}$$

So the touching point is $(\\frac{11}{9},\\frac{32}{9},\\frac{4}{9})$.

The radius of the sphere is $r = \\frac{7}{3}.$

Therefore, the equation of the sphere is $(x-2)^2+(y-2)^2+(z-2)^2=\\frac{49}{9}$.`,
    algorithm: [
      "Since the sphere touches the plane, the radius is perpendicular to the plane.",
      "Use the plane normal vector $\\langle 1,-2,2\\rangle$ as the radius direction.",
      "Draw a line from the center $(2,2,2)$ in that direction.",
      "Find where this line meets the plane; this is the touching point.",
      "The distance from the center to the touching point is the radius."
    ]
  },
  {
    id: 4,
    title: "Question 4 (2025)",
    tag: "Sphere & Plane",
    question: "Find the equation of the sphere with center $(2,1,-1)$ and touching the plane $x+3y+2z-17=0$.",
    diagramData: { center: "2,1,-1", equation: "x+3y+2z-17=0" },
    solution: `Directed values of the line (radius) passing through the center $(2,1,-1)$ and perpendicular to the plane $x+3y+2z-17=0$ are $\\langle 1,3,2\\rangle.$

Coordinates of the points on this line (radius) are $(x,y,z)=(2+k,1+3k,-1+2k)$ for some real number $k$.

If one of these points is on the plane,
$$\\begin{aligned} (2+k)+3(1+3k)+2(-1+2k)-17&=0\\\\ 14k-14&=0\\\\ k&=1. \\end{aligned}$$

So the tangential point of the plane and the sphere is $(3,4,1).$

The radius is $r = \\sqrt{(3-2)^2+(4-1)^2+(1+1)^2} = \\sqrt{14}.$

Therefore, the equation of the sphere is $(x-2)^2+(y-1)^2+(z+1)^2=14$.`,
    algorithm: [
      "Since the sphere touches the plane, the radius is perpendicular to the plane.",
      "Use the plane normal vector $\\langle 1,3,2\\rangle$ as the radius direction.",
      "Draw a line from the center $(2,1,-1)$ in that direction.",
      "Find where this line meets the plane; this is the touching point.",
      "The distance from the center to the touching point is the radius."
    ]
  },
  {
    id: 5,
    title: "Question 5 (2025)",
    tag: "Sphere & Plane",
    question: "Find the equation of the sphere with center $(0,1,0)$ and touching the plane $x+2y-2z=11$.",
    diagramData: { center: "0,1,0", equation: "x+2y-2z=11" },
    solution: `Directed values of the line (radius) passing through the center $(0,1,0)$ and perpendicular to the plane $x+2y-2z=11$ are $\\langle 1,2,-2\\rangle.$

Coordinates of the points on this line (radius) are $(x,y,z)=(k,1+2k,-2k)$ for some real number $k$.

If one of these points is on the plane,
$$\\begin{aligned} k+2(1+2k)-2(-2k)&=11\\\\ 9k+2&=11\\\\ k&=1. \\\\end{aligned}$$

So the tangential point of the plane and the sphere is $(1,3,-2).$

The radius is $r = \\sqrt{(1-0)^2+(3-1)^2+(-2-0)^2} = 3.

Therefore, the equation of the sphere is $x^2+(y-1)^2+z^2=9$.`,
    algorithm: [
      "Since the sphere touches the plane, the radius is perpendicular to the plane.",
      "Use the plane normal vector $\\langle 1,2,-2\\rangle$ as the radius direction.",
      "Draw a line from the center $(0,1,0)$ in that direction.",
      "Find where this line meets the plane; this is the touching point.",
      "The distance from the center to the touching point is the radius."
    ]
  },
  {
    id: 6,
    title: "Question 6 (2025)",
    tag: "Sphere & Plane",
    question: "Find the equation of the sphere with center $(1,1,2)$ and touching the plane $2x-2y+z=5$.",
    diagramData: { center: "1,1,2", equation: "2x-2y+z=5" },
    solution: `Directed values of the line (radius) passing through the center $(1,1,2)$ and perpendicular to the plane $2x-2y+z=5$ are $\\langle 2,-2,1\\rangle.$

Coordinates of the points on this line (radius) are $(x,y,z)=(1+2k,1-2k,2+k)$ for some real number $k$.

If one of these points is on the plane,
$$\\begin{aligned} 2(1+2k)-2(1-2k)+(2+k)&=5\\\\ 9k+2&=5\\\\ k&=\\frac{1}{3}. \\\\end{aligned}$$

So the tangential point of the plane and the sphere is $(\\frac{5}{3},\\frac{1}{3},\\frac{7}{3}).$

The radius is $r = \\sqrt{(\\frac{5}{3}-1)^2+(\\frac{1}{3}-1)^2+(\\frac{7}{3}-2)^2} = 1.

Therefore, the equation of the sphere is $(x-1)^2+(y-1)^2+(z-2)^2=1$.`,
    algorithm: [
      "Since the sphere touches the plane, the radius is perpendicular to the plane.",
      "Use the plane normal vector $\\langle 2,-2,1\\rangle$ as the radius direction.",
      "Draw a line from the center $(1,1,2)$ in that direction.",
      "Find where this line meets the plane; this is the touching point.",
      "The distance from the center to the touching point is the radius."
    ]
  },
  {
    id: 7,
    title: "Question 7 (2025)",
    tag: "Sphere & Plane",
    question: "Find the equation of the sphere with center $(1,1,1)$ and touching the plane $x-2y+2z+5=0$.",
    diagramData: { center: "1,1,1", equation: "x-2y+2z+5=0" },
    solution: `Directed values of the line (radius) passing through the center $(1,1,1)$ and perpendicular to the plane $x-2y+2z+5=0$ are $\\langle 1,-2,2\\rangle.$

Coordinates of the points on this line (radius) are $(x,y,z)=(1+k,1-2k,1+2k)$ for some real number $k$.

If one of these points is on the plane,
$$\\begin{aligned} (1+k)-2(1-2k)+2(1+2k)+5&=0\\\\ 9k+6&=0\\\\ k&=-\\frac{2}{3}. \\\\end{aligned}$$

So the tangential point of the plane and the sphere is $(\\frac{1}{3},\\frac{7}{3},-\\frac{1}{3}).$

The radius is $r = \\sqrt{(\\frac{1}{3}-1)^2+(\\frac{7}{3}-1)^2+(-\\frac{1}{3}-1)^2} = 2.

Therefore, the equation of the sphere is $(x-1)^2+(y-1)^2+(z-1)^2=4$.`,
    algorithm: [
      "Since the sphere touches the plane, the radius is perpendicular to the plane.",
      "Use the plane normal vector $\\langle 1,-2,2\\rangle$ as the radius direction.",
      "Draw a line from the center $(1,1,1)$ in that direction.",
      "Find where this line meets the plane; this is the touching point.",
      "The distance from the center to the touching point is the radius."
    ]
  },
  {
    id: 8,
    title: "Question 8 (2024)",
    tag: "Line Distance",
    question: "Point $A$ has coordinates $(5,2,2)$ and the line $l$ passes through the points $(2,5,-1)$ and $(1,9,-3)$. Point $B$ lies on $l$ such that line $AB$ is perpendicular to $l$. Find the distance between points $A$ and $B$.",
    solution: `$A=(5,2,2)$.

Let $P$ be the point $(2,5,-1)$ and $Q$ be the point $(1,9,-3)$.
$$\\langle l\\rangle = \\langle PQ\\rangle = \\langle -1,4,-2\\rangle.$$

Since point $B$ lies on $l$, $B=(x,y,z)=(2-k,5+4k,-1-2k)$ for some real number $k$.

Therefore, $\\langle AB\\rangle=\\langle 3+k,-3-4k,3+2k\\rangle$.

Since $AB \\bot l$,
$$\\begin{aligned} -3-k-12-16k-6-4k&=0\\\\ k&=-1 \\\\end{aligned}$$

The distance between $A$ and $B$ is
$$\\begin{aligned} AB&=\\sqrt{(3+k)^2+(-3-4k)^2+(3+2k)^2}\\\\ &=\\sqrt{(3-1)^2+(-3+4)^2+(3-2)^2}\\\\ &=\\sqrt{2^2+1^2+1^2}\\\\ &=\\sqrt{6}. \\\\end{aligned}$$`,
    algorithm: [
      "Since $B$ lies on line $l$, write the coordinates of $B$ using a parameter $k$.",
      "Find the direction vector of line $l$ from the two given points.",
      "Find the vector $\\langle AB\\rangle$ using point $A$ and point $B$.",
      "Since $AB$ is perpendicular to $l$, use the dot product condition $\\langle AB\\rangle \\cdot \\langle l\\rangle = 0$.",
      "Solve for $k$, then substitute it into the distance formula to find $AB$."
    ]
  },
  {
    id: 9,
    title: "Question 9 (2024)",
    tag: "Sphere & Plane",
    question: "Find the equation of the sphere with center $(5,-6,-2)$ and touching the plane $3x-y-2z=17$.",
    diagramData: { center: "5,-6,-2", equation: "3x-y-2z=17" },
    solution: `Directed values of the line (radius) passes through the center $(5,-6,-2)$ and perpendicular to the plane $3x-y-2z=17$ are $\\langle 3,-1,-2\\rangle.$

Coordinates of the points on this line (radius) are $(x,y,z)=(5+3k,-6-k,-2-2k)$ for some real number $k$.

If one of these points is on the plane,
$$\\begin{aligned} 3(5+3k)-(-6-k)-2(-2-2k)&=17\\\\ 15+9k+6+k+4+4k&=17\\\\ 14k+25&=17\\\\ 14k&=-8\\\\ k&=-4/7. \\\\end{aligned}$$

The radius is $r = \\frac{4\\sqrt{14}}{7}$.

Equation: $(x-5)^2+(y+6)^2+(z+2)^2=\\frac{32}{7}$.`,
    algorithm: [
      "Since the sphere touches the plane, the radius is perpendicular to the plane.",
      "Use the plane normal vector $\\langle 3,-1,-2\\rangle$ as the radius direction.",
      "Draw a line from the center $(5,-6,-2)$ in that direction.",
      "Find where this line meets the plane; this is the touching point.",
      "The distance from the center to the touching point is the radius."
    ]
  },
  {
    id: 10,
    title: "Question 10 (2024)",
    tag: "Sphere & Plane",
    question: "Find the equation of the sphere with center $(1,2,-1)$ and touching the plane $2x+y+z-9=0$.",
    diagramData: { center: "1,2,-1", equation: "2x+y+z-9=0" },
    solution: `Normal vector $\\langle 2,1,1\\rangle$.
Line: $(1+2k, 2+k, -1+k)$.
Substitute: $2(1+2k)+(2+k)+(-1+k)-9=0 \\implies 6k-6=0 \\implies k=1$.
Radius: $r = \\sqrt{2^2+1^2+1^2} = \\sqrt{6}$.
Equation: $(x-1)^2+(y-2)^2+(z+1)^2=6$.`,
    algorithm: [
      "Since the sphere touches the plane, the radius is perpendicular to the plane.",
      "Use the plane normal vector $\\langle 2,1,1\\rangle$ as the radius direction.",
      "Draw a line from the center $(1,2,-1)$ in that direction.",
      "Find where this line meets the plane; this is the touching point.",
      "The distance from the center to the touching point is the radius."
    ]
  },
  {
    id: 11,
    title: "Question 11 (2024)",
    tag: "Sphere & Plane",
    question: "Find the equation of the sphere with center $(0,2,0)$ and touching the plane $2x-4y+4z+10=0$.",
    diagramData: { center: "0,2,0", equation: "2x-4y+4z+10=0" },
    solution: `Normal vector $\\langle 2,-4,4\\rangle$.
Line: $(2k, 2-4k, 4k)$.
Substitute: $2(2k)-4(2-4k)+4(4k)+10=0 \\implies 4k-8+16k+16k+10=0 \\implies 36k+2=0 \\implies k=-1/18$.
Radius: $r = \\sqrt{(2/18)^2+(4/18)^2+(4/18)^2} = \\sqrt{36/324} = 1/3$.
Equation: $x^2+(y-2)^2+z^2=1/9$.`,
    algorithm: [
      "Since the sphere touches the plane, the radius is perpendicular to the plane.",
      "Use the plane normal vector $\\langle 2,-4,4\\rangle$ as the radius direction.",
      "Draw a line from the center $(0,2,0)$ in that direction.",
      "Find where this line meets the plane; this is the touching point.",
      "The distance from the center to the touching point is the radius."
    ]
  },
  {
    id: 12,
    title: "Question 12 (2024)",
    tag: "Sphere & Plane",
    question: "Find the equation of the sphere with center $(3,6,-4)$ and touching the plane $2x-2y-z-10=0$.",
    diagramData: { center: "3,6,-4", equation: "2x-2y-z-10=0" },
    solution: `Normal vector $\\langle 2,-2,-1\\rangle$.
Line: $(3+2k, 6-2k, -4-k)$.
Substitute: $2(3+2k)-2(6-2k)-(-4-k)-10=0 \\implies 6+4k-12+4k+4+k-10=0 \\implies 9k-12=0 \\implies k=4/3$.
Radius: $r = \\sqrt{(8/3)^2+(-8/3)^2+(-4/3)^2} = \\sqrt{64/9+64/9+16/9} = \\sqrt{144/9} = 4$.
Equation: $(x-3)^2+(y-6)^2+(z+4)^2=16$.`,
    algorithm: [
      "Since the sphere touches the plane, the radius is perpendicular to the plane.",
      "Use the plane normal vector $\\langle 2,-2,-1\\rangle$ as the radius direction.",
      "Draw a line from the center $(3,6,-4)$ in that direction.",
      "Find where this line meets the plane; this is the touching point.",
      "The distance from the center to the touching point is the radius."
    ]
  },
  {
    id: 13,
    title: "Question 13 (2024)",
    tag: "Sphere & Plane",
    question: "Find the equation of the sphere with center $(1,2,-1)$ and touching the plane $2x+y+z=5$.",
    diagramData: { center: "1,2,-1", equation: "2x+y+z=5" },
    solution: `Normal vector $\\langle 2,1,1\\rangle$.
Line: $(1+2k, 2+k, -1+k)$.
Substitute: $2(1+2k)+(2+k)+(-1+k)=5 \\implies 6k+3=5 \\implies k=1/3$.
Radius: $r = \\sqrt{(2/3)^2+(1/3)^2+(1/3)^2} = \\sqrt{6}/3$.
Equation: $(x-1)^2+(y-2)^2+(z+1)^2=2/3$.`,
    algorithm: [
      "Since the sphere touches the plane, the radius is perpendicular to the plane.",
      "Use the plane normal vector $\\langle 2,1,1\\rangle$ as the radius direction.",
      "Draw a line from the center $(1,2,-1)$ in that direction.",
      "Find where this line meets the plane; this is the touching point.",
      "The distance from the center to the touching point is the radius."
    ]
  }
];

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border-y md:border border-slate-100 px-4 py-10 sm:p-12 md:p-16 lg:p-24 md:rounded-[2.5rem] shadow-sm relative overflow-hidden text-left"
    >
      {/* Index Badge */}
      <div className="absolute top-0 right-0 p-8 md:p-12">
        <span className="text-8xl md:text-[12rem] font-black text-slate-50 select-none leading-none">
          {String(question.id).padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-2 bg-slate-900 text-white border-slate-900">
               <Brain size={12} /> Question {question.id}
            </div>
            <div className="px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-2 bg-blue-50 text-blue-600 border-blue-100">
               {question.tag}
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "p-4 rounded-2xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
              isOpen ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {isOpen ? "Hide Solutions" : "Reveal Solutions"}
            <ChevronDown size={14} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
          </button>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 tracking-tight uppercase">
          {question.title}
        </h2>

        <div className="space-y-8">
          {/* Question Text */}
          <div className={cn(
            "p-6 md:p-10 rounded-[2rem] border transition-all duration-500",
            isOpen ? "bg-slate-50/50 border-slate-100" : "bg-slate-900 border-slate-800"
          )}>
            <h3 className={cn("text-xs font-black uppercase tracking-widest mb-4", isOpen ? "text-slate-400" : "text-amber-500")}>
              The Challenge
            </h3>
            <div className={cn("markdown-body", !isOpen && "text-white")}>
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {question.question}
              </ReactMarkdown>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="overflow-hidden space-y-12"
              >
                {/* Diagram if applicable */}
                {question.diagramData && (
                  <TouchingPlaneDiagram 
                    centerLabel={question.diagramData.center} 
                    equation={question.diagramData.equation} 
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Solution */}
                  <NoteCard type="tip" title="Strategic Solution">
                    <div className="markdown-body">
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {question.solution}
                      </ReactMarkdown>
                    </div>
                  </NoteCard>

                  {/* Algorithm */}
                  <NoteCard type="info" title="Problem Solving Algorithm">
                    <ol className="space-y-3">
                      {question.algorithm.map((step, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black">
                            {i + 1}
                          </span>
                          <div className="text-sm font-medium text-slate-600">
                            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                              {step}
                            </ReactMarkdown>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </NoteCard>
                </div>

                {/* Verified Badge */}
                <div className="pt-12 border-t border-slate-50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Expert Verified</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">New 2024 Standards</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};

const SectionDMaster: React.FC = () => {
  return (
    <div className="max-w-screen-2xl mx-auto pb-24">
      {/* Header */}
      <header className="mb-12 space-y-6">
        <Link 
          to="/past-papers"
          className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Exam Center
        </Link>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-amber-100">
             <Target size={14} /> Ultimate Collection
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tight leading-[0.9]">
            Section D <br />
            <span className="text-amber-500">Mastery</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl font-medium">
            All Section D questions (2024-2025) consolidated into one professional review experience. 
            The solutions are hidden by default—attempt the challenge first.
          </p>
        </div>
      </header>

      {/* Questions Stack */}
      <div className="space-y-12">
        {SECTION_D_QUESTIONS.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>

      {/* Footer Nav */}
      <footer className="mt-20 text-center">
        <Link 
          to="/past-papers"
          className="inline-flex items-center gap-3 px-12 py-6 bg-slate-900 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-2xl active:scale-95"
        >
          Explore More Papers <ArrowLeft size={16} className="rotate-180" />
        </Link>
      </footer>
    </div>
  );
};

export default SectionDMaster;
