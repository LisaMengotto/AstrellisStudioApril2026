import React, { useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface CompanionStar {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  driftFactor: number;
  delay: number;
  duration: number;
}

export const StarField: React.FC = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 48 }, (_, id) => ({
      id,
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: Math.random() * 2.8 + 1.2,
      delay: Math.random() * 6,
      duration: Math.random() * 5 + 6,
      opacity: Math.random() * 0.45 + 0.35,
    }));
  }, []);

  const companionStars = useMemo<CompanionStar[]>(() => {
    return Array.from({ length: 8 }, (_, id) => ({
      id,
      x: 12 + Math.random() * 76,
      y: 10 + Math.random() * 58,
      size: Math.random() * 1.9 + 1.4,
      opacity: Math.random() * 0.22 + 0.2,
      driftFactor: Math.random() * 0.85 + 0.7,
      delay: Math.random() * 6,
      duration: Math.random() * 7 + 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="sky-glow sky-glow-left" />
      <div className="sky-glow sky-glow-right" />

      {stars.map((star) => (
        <span
          key={star.id}
          className="starfield-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {companionStars.map((star) => (
        <span
          key={`companion-${star.id}`}
          className="companion-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            ['--star-drift-factor' as const]: star.driftFactor,
          }}
        />
      ))}
    </div>
  );
};
