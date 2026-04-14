"use client";
import { useEffect, useRef } from "react";

interface Point { x: number; y: number }
interface Particle { t: number; s: number; sz: number; trail: Point[] }
interface Stream {
  pts: [Point, Point, Point, Point];
  color: string;
  lw: number;
  la: number;
  particles: Particle[];
}

function bez(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y,
  };
}

function drawPath(ctx: CanvasRenderingContext2D, W: number, H: number, pts: [Point,Point,Point,Point], color: string, alpha: number, lw: number) {
  const p = pts.map(q => ({ x: q.x * W, y: q.y * H }));
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(p[0].x, p[0].y);
  ctx.bezierCurveTo(p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y);
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = lw;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.restore();
}

function drawParticle(ctx: CanvasRenderingContext2D, W: number, H: number, pts: [Point,Point,Point,Point], t: number, color: string, sz: number, trail: Point[]) {
  const p = pts.map(q => ({ x: q.x * W, y: q.y * H }));
  const pt = bez(t, p[0], p[1], p[2], p[3]);
  if (trail.length > 22) trail.shift();
  trail.push({ x: pt.x, y: pt.y });
  for (let i = 1; i < trail.length; i++) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.globalAlpha = (i / trail.length) * 0.55;
    ctx.lineWidth = sz * (i / trail.length) * 0.9;
    ctx.shadowColor = color; ctx.shadowBlur = 10;
    ctx.moveTo(trail[i-1].x, trail[i-1].y);
    ctx.lineTo(trail[i].x, trail[i].y);
    ctx.stroke();
    ctx.restore();
  }
  ctx.save();
  const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, sz * 4);
  g.addColorStop(0, color);
  g.addColorStop(0.35, color + "88");
  g.addColorStop(1, color + "00");
  ctx.fillStyle = g;
  ctx.globalAlpha = 0.95;
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, sz * 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

const C = "#509FD1", G = "#8FC045", B = "#1A69B2";

type FlowKey = "hero" | "problem" | "howworks" | "impact" | "cta";

const FLOWS: Record<FlowKey, Stream[]> = {
  hero: [
    { pts:[{x:0,y:.52},{x:.28,y:.33},{x:.68,y:.58},{x:1,y:.46}], color:C, lw:2.0, la:.42, particles:[{t:.05,s:.0009,sz:3,trail:[]},{t:.32,s:.0010,sz:2.5,trail:[]},{t:.60,s:.0009,sz:3,trail:[]},{t:.82,s:.0008,sz:2,trail:[]}] },
    { pts:[{x:0,y:.56},{x:.32,y:.40},{x:.72,y:.62},{x:1,y:.52}], color:G, lw:1.3, la:.32, particles:[{t:.18,s:.0011,sz:2.5,trail:[]},{t:.55,s:.0009,sz:2,trail:[]},{t:.80,s:.0010,sz:2,trail:[]}] },
  ],
  problem: [
    { pts:[{x:0,y:.47},{x:.22,y:.42},{x:.46,y:.46},{x:.65,y:.44}], color:C, lw:1.0, la:.18, particles:[{t:.10,s:.0005,sz:1.5,trail:[]},{t:.50,s:.0005,sz:1.5,trail:[]}] },
    { pts:[{x:.68,y:.44},{x:.78,y:.43},{x:.90,y:.45},{x:1,y:.44}], color:C, lw:1.0, la:.12, particles:[{t:.20,s:.0006,sz:1.5,trail:[]}] },
  ],
  howworks: [
    { pts:[{x:.02,y:.52},{x:.25,y:.38},{x:.75,y:.38},{x:.98,y:.52}], color:G, lw:2.2, la:.46, particles:[{t:.08,s:.0008,sz:3,trail:[]},{t:.30,s:.0009,sz:3,trail:[]},{t:.56,s:.0007,sz:3,trail:[]},{t:.80,s:.0010,sz:2.5,trail:[]}] },
    { pts:[{x:.02,y:.54},{x:.25,y:.40},{x:.75,y:.40},{x:.98,y:.54}], color:C, lw:1.0, la:.26, particles:[{t:.45,s:.0009,sz:2,trail:[]}] },
  ],
  impact: [
    { pts:[{x:.05,y:.58},{x:.30,y:.42},{x:.70,y:.55},{x:.95,y:.48}], color:G, lw:1.8, la:.38, particles:[{t:.10,s:.0009,sz:2.5,trail:[]},{t:.46,s:.0008,sz:2.5,trail:[]},{t:.76,s:.0010,sz:2,trail:[]}] },
    { pts:[{x:.50,y:.90},{x:.48,y:.65},{x:.51,y:.40},{x:.50,y:.10}], color:G, lw:1.5, la:.34, particles:[{t:.05,s:.0012,sz:2,trail:[]},{t:.40,s:.0010,sz:2,trail:[]},{t:.72,s:.0013,sz:1.5,trail:[]}] },
    { pts:[{x:.50,y:.92},{x:.49,y:.70},{x:.50,y:.45},{x:.50,y:.08}], color:C, lw:.8, la:.20, particles:[{t:.25,s:.0011,sz:1.5,trail:[]}] },
  ],
  cta: [
    { pts:[{x:.50,y:.95},{x:.49,y:.65},{x:.50,y:.35},{x:.50,y:.02}], color:G, lw:2.0, la:.48, particles:[{t:.05,s:.0011,sz:3.5,trail:[]},{t:.32,s:.0009,sz:3,trail:[]},{t:.60,s:.0012,sz:2.5,trail:[]},{t:.82,s:.0010,sz:2,trail:[]}] },
    { pts:[{x:.50,y:.58},{x:.35,y:.55},{x:.18,y:.60},{x:.02,y:.58}], color:C, lw:1.5, la:.36, particles:[{t:.10,s:.0010,sz:2.5,trail:[]},{t:.60,s:.0009,sz:2,trail:[]}] },
    { pts:[{x:.50,y:.58},{x:.65,y:.55},{x:.82,y:.60},{x:.98,y:.58}], color:C, lw:1.5, la:.36, particles:[{t:.15,s:.0010,sz:2.5,trail:[]},{t:.65,s:.0009,sz:2,trail:[]}] },
    { pts:[{x:.50,y:.60},{x:.38,y:.65},{x:.22,y:.72},{x:.05,y:.78}], color:B, lw:1.0, la:.28, particles:[{t:.20,s:.0009,sz:2,trail:[]}] },
    { pts:[{x:.50,y:.60},{x:.62,y:.65},{x:.78,y:.72},{x:.95,y:.78}], color:B, lw:1.0, la:.28, particles:[{t:.25,s:.0009,sz:2,trail:[]}] },
  ],
};

export function useEnergyCanvas(flowKey: FlowKey) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const def = FLOWS[flowKey];
    const section = canvas.parentElement;
    if (!section) return;

    let W = 0, H = 0, rafId = 0;

    function resize() {
      if (!canvas || !section) return;
      W = canvas.width  = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
      def.forEach(s => s.particles.forEach(p => { p.trail = []; p.t = Math.random(); }));
    }

    function render() {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      def.forEach(s => {
        drawPath(ctx, W, H, s.pts, s.color, s.la * 0.55, s.lw * 0.65);
        s.particles.forEach(p => {
          drawParticle(ctx, W, H, s.pts, p.t, s.color, p.sz, p.trail);
          p.t += p.s;
          if (p.t > 1) { p.t = 0; p.trail = []; }
        });
      });
      rafId = requestAnimationFrame(render);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();
    render();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [flowKey]);

  return canvasRef;
}
