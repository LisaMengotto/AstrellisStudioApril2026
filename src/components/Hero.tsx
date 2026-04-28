import React from 'react';

interface HeroProps {
  scrollY: number;
}

export const Hero: React.FC<HeroProps> = ({ scrollY }) => {
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight || 900 : 900;
  const startTop = viewportHeight * 0.24;
  const currentTop = Math.max(20, startTop - scrollY * 0.7);

  const subtitleProgress = Math.min(1, scrollY / (viewportHeight * 0.14));
  const subtitleOpacity = Math.max(0, 1 - subtitleProgress);
  const subtitleBlur = subtitleProgress * 18;
  const subtitleLift = subtitleProgress * 18;

  return (
    <div className="hero-fixed-frame z-30">
      <div className="max-w-6xl mx-auto">
        <div
          className="hero-copy hero-stage"
          style={{ top: `${currentTop}px` }}
        >
          <div className="hero-aura" />
          <div className="hero-title-wrap">
            <h1 className="text-6xl md:text-8xl lg:text-9xl text-stone-50 tracking-tight mb-4 hero-wordmark">
              Astrellis
            </h1>
          </div>
          <p
            className="hero-subcopy text-stone-100/90"
            style={{
              opacity: subtitleOpacity,
              filter: `blur(${subtitleBlur}px)`,
              transform: `translateY(${-subtitleLift}px)`,
              visibility: subtitleOpacity <= 0.02 ? 'hidden' : 'visible',
            }}
          >
            Stories, language, and strategic clarity for founders who should be impossible to ignore.
          </p>
        </div>
      </div>
    </div>
  );
};
