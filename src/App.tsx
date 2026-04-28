import React, { useEffect, useRef, useState } from 'react';
import { StarField } from './components/StarField';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Contact } from './components/Contact';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const currentYear = new Date().getFullYear();
  const cursorCloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        frame = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const cloud = cursorCloudRef.current;
    if (!cloud || typeof window === 'undefined') return;

    let animationFrame = 0;
    let currentX = window.innerWidth * 0.24;
    let currentY = window.innerHeight * 0.22;
    let targetX = currentX;
    let targetY = currentY;

    const render = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      cloud.style.setProperty('--cursor-cloud-x', `${currentX}px`);
      cloud.style.setProperty('--cursor-cloud-y', `${currentY}px`);
      document.documentElement.style.setProperty(
        '--cursor-drift-x',
        `${(currentX - window.innerWidth / 2) * 0.028}px`
      );
      document.documentElement.style.setProperty(
        '--cursor-drift-y',
        `${(currentY - window.innerHeight / 2) * 0.028}px`
      );

      const shouldContinue =
        Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2;

      animationFrame = shouldContinue ? window.requestAnimationFrame(render) : 0;
    };

    const startAnimation = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      startAnimation();
    };

    const handlePointerLeave = () => {
      targetX = window.innerWidth * 0.24;
      targetY = window.innerHeight * 0.22;
      startAnimation();
    };

    cloud.style.setProperty('--cursor-cloud-x', `${currentX}px`);
    cloud.style.setProperty('--cursor-cloud-y', `${currentY}px`);
    document.documentElement.style.setProperty('--cursor-drift-x', '0px');
    document.documentElement.style.setProperty('--cursor-drift-y', '0px');

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      document.documentElement.style.removeProperty('--cursor-drift-x');
      document.documentElement.style.removeProperty('--cursor-drift-y');
    };
  }, []);

  const vignetteOpacity = Math.min(scrollY / 2400, 0.45);
  const skyOffset = Math.min(scrollY * 0.06, 120);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-night">
      <div className="sky-backdrop" />
      <div
        className="sky-ambient"
        style={{ transform: `translateY(${skyOffset}px)` }}
      />
      <div
        className="sky-vignette"
        style={{ opacity: vignetteOpacity }}
      />
      <div ref={cursorCloudRef} className="sky-cursor-cloud" />

      <StarField />

      <div className="relative z-10">
        <section className="relative min-h-[284vh]">
          <Hero scrollY={scrollY} />
          <About scrollY={scrollY} />
          <Services scrollY={scrollY} />
          <Contact scrollY={scrollY} />
        </section>
      </div>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center">
          <p className="text-stone-100 text-base display-kicker">
            Astrellis Studio © {currentYear}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
