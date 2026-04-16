import { useState, useEffect } from 'react';

export default function ParallaxBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="parallax-bg">
      <div
        className="parallax-orb"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)',
          top: '10%',
          right: '10%',
          transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)`,
          animationDuration: '20s',
        }}
      />
      <div
        className="parallax-orb"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(185,28,28,0.25) 0%, transparent 70%)',
          bottom: '20%',
          left: '5%',
          transform: `translate(${offset.x * -0.3}px, ${offset.y * -0.3}px)`,
          animationDuration: '25s',
          animationDelay: '-5s',
        }}
      />
      <div
        className="parallax-orb"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: `translate(${offset.x * 0.8}px, ${offset.y * 0.8}px)`,
          animationDuration: '15s',
          animationDelay: '-10s',
        }}
      />
      <div
        className="parallax-orb"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          top: '70%',
          right: '30%',
          transform: `translate(${offset.x * -0.2}px, ${offset.y * -0.2}px)`,
          animationDuration: '30s',
          animationDelay: '-15s',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220,38,38,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,38,38,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translate(${offset.x * 0.1}px, ${offset.y * 0.1}px)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
