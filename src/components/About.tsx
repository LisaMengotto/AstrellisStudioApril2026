import React from 'react';

interface AboutProps {
  scrollY: number;
}

const pillars = [
  {
    number: '01',
    title: 'Vision Clarity',
    description: 'Get radically clear on your mission.',
  },
  {
    number: '02',
    title: 'Narrative Craft',
    description: 'Craft a narrative that inspires belief.',
  },
  {
    number: '03',
    title: 'Strategic Messaging',
    description: 'Use your story to mobilize people.',
  },
];

export const About: React.FC<AboutProps> = ({ scrollY }) => {
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight || 900 : 900;
  const logoPinnedScroll = Math.max(0, (viewportHeight * 0.24 - 20) / 0.7);
  const revealStart = logoPinnedScroll - viewportHeight * 0.03;
  const revealDuration = viewportHeight * 0.18;
  const revealProgress = Math.max(
    0,
    Math.min(1, (scrollY - revealStart) / revealDuration)
  );

  const fadeOutStart = revealStart + revealDuration + viewportHeight * 0.28;
  const fadeOutDuration = viewportHeight * 0.2;
  const fadeOutProgress = Math.max(
    0,
    Math.min(1, (scrollY - fadeOutStart) / fadeOutDuration)
  );

  const aboutOpacity = revealProgress * (1 - fadeOutProgress);
  const aboutLift = (1 - revealProgress) * 26 - fadeOutProgress * 92;
  const aboutBlur = (1 - revealProgress) * 8 + fadeOutProgress * 18;

  return (
    <div
      className="story-fixed-frame z-20"
      style={{
        opacity: aboutOpacity,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div
        className="story-layout"
        style={{
          transform: `translateY(${aboutLift}px)`,
          filter: `blur(${aboutBlur}px)`,
          visibility: aboutOpacity <= 0.02 ? 'hidden' : 'visible',
        }}
      >
        <div className="story-cloud" />
          <p className="display-kicker text-stone-200 mb-4">Approach</p>
          <h2 className="text-[2rem] md:text-[3rem] font-semibold text-stone-50 mb-8 tracking-tight">
            The Astrellis Method
          </h2>

          <div className="space-y-9">
            {pillars.map((pillar) => (
              <article key={pillar.number} className="story-step">
                <p className="story-step-number">{pillar.number}</p>
                <div>
                  <h2 className="text-3xl md:text-4xl text-stone-50 mb-2">
                    {pillar.title}
                  </h2>
                  <p className="text-2xl md:text-3xl text-stone-200 leading-tight">
                    {pillar.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
