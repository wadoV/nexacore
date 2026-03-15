import { useEffect, useRef } from 'react';

export function ParticleBackground({ volatility }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const config = {
      particleCount: 100,
      connectionDistance: 150,
    };

    // Each particle has a "vein" type color
    const palette = ['rgba(0, 240, 255,', 'rgba(176, 38, 255,', 'rgba(0, 255, 102,'];

    const particles = Array.from({ length: config.particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      color: palette[Math.floor(Math.random() * palette.length)],
      pulse: Math.random() * Math.PI * 2, // random starting phase
    }));

    let animId;
    let frame = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const speedMultiplier = volatility === 'high' ? 3 : 1;

      particles.forEach((p) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;
        p.pulse += 0.02 * speedMultiplier;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Dynamic opacity based on pulse
        const opacity = 0.2 + Math.sin(p.pulse) * 0.3;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + (volatility === 'high' ? 0.5 : 0), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${opacity.toFixed(2)})`;
        ctx.fill();
      });

      // Draw connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.connectionDistance) {
            const opacity = (1 - dist / config.connectionDistance) * (volatility === 'high' ? 0.35 : 0.12);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `${a.color}${opacity.toFixed(2)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [volatility]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
