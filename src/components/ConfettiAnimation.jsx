import React, { useEffect, useRef } from 'react';

const COLORS = ['#00c896', '#ff6b35', '#ffd166', '#4dddb8', '#ff9a6c', '#ffffff', '#a8eddd'];

const random = (min, max) => Math.random() * (max - min) + min;

const ConfettiAnimation = ({ active, onDone }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    particles.current = Array.from({ length: 160 }, () => ({
      x: random(0, canvas.width),
      y: random(-200, -10),
      w: random(8, 16),
      h: random(5, 10),
      color: COLORS[Math.floor(random(0, COLORS.length))],
      vx: random(-2, 2),
      vy: random(1, 4),
      angle: random(0, 360),
      spin: random(-4, 4),
      opacity: 1,
    }));

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity (reduced for slower fall)
        p.angle += p.spin;
        if (frame > 120) p.opacity -= 0.008; // slower fade
        if (p.opacity < 0) p.opacity = 0;
        if (p.y < canvas.height && p.opacity > 0) alive = true;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      frame++;
      if (alive) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (onDone) onDone();
      }
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [active, onDone]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none' }}
    />
  );
};

export default ConfettiAnimation;
