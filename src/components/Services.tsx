import React from 'react';
import { BlocksIcon, FeatherIcon, Lightbulb, SpeechIcon } from 'lucide-react';

interface ServicesProps {
  scrollY: number;
}

export const Services: React.FC<ServicesProps> = ({ scrollY }) => {
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight || 900 : 900;
  const logoPinnedScroll = Math.max(0, (viewportHeight * 0.24 - 20) / 0.7);
  const methodRevealStart = logoPinnedScroll - viewportHeight * 0.03;
  const methodRevealDuration = viewportHeight * 0.18;
  const methodFadeStart = methodRevealStart + methodRevealDuration + viewportHeight * 0.28;
  const servicesStart = methodFadeStart + viewportHeight * 0.14;
  const servicesReveal = Math.max(
    0,
    Math.min(1, (scrollY - servicesStart) / (viewportHeight * 0.24))
  );
  const servicesFadeStart = servicesStart + viewportHeight * 0.56;
  const servicesFadeProgress = Math.max(
    0,
    Math.min(1, (scrollY - servicesFadeStart) / (viewportHeight * 0.18))
  );
  const servicesOpacity = servicesReveal * (1 - servicesFadeProgress);
  const servicesLift = (1 - servicesReveal) * 108 - servicesFadeProgress * 70;
  const servicesBlur = (1 - servicesReveal) * 12 + servicesFadeProgress * 16;

  const services = [
    {
      icon: FeatherIcon,
      title: 'Founder Story Development',
      description:
        'Your story is how you build trust. We help you uncover, refine, and articulate the origin story that defines your leadership and sets your company apart.',
      features: [
        'Founder Archetype Discovery',
        'Longform Origin Story & Biography Writing',
        'Hero Narrative for Decks, Sites, and Press',
        'Brand-Aligned Storytelling Frameworks',
      ],
    },
    {
      icon: Lightbulb,
      title: 'Thought Leadership Strategy',
      description:
        'Say the things only you can say. We help you clarify your unique lens and design a strategy for sharing it so you build credibility, momentum, and a following rooted in depth.',
      features: [
        'Narrative Positioning & POV Definition',
        'Topic Mapping & Content Pillar Development',
        'LinkedIn / Substack / Medium Strategy',
        'Ghostwriting, Editing, and Content Review',
      ],
    },
    {
      icon: BlocksIcon,
      title: 'Brand Messaging Architecture',
      description:
        'Align every word with your vision. Your brand is how people feel when they encounter your work. We help you build a cohesive voice, story, and messaging system that holds everything together.',
      features: [
        'Brand Voice & Tone Development',
        'Tagline, Positioning, and Messaging Hierarchy',
        'Website Copy & Headline Refinement',
        'Foundational Story Decks & Messaging Playbooks',
      ],
    },
    {
      icon: SpeechIcon,
      title: 'Strategic Communications',
      description:
        'Clarity is a leadership skill. We help you say the right thing, the right way, internally and externally. Because your team, investors, and customers are all listening.',
      features: [
        'Pitch Deck Storytelling & Editing',
        'Internal Memos, Team Updates, and All-Hands Prep',
        'Vision Speeches & Executive Ghostwriting',
        'Board/Investor Comms and Strategic Email Review',
      ],
    },
  ];
  const carouselStart = servicesStart + viewportHeight * 0.28;
  const carouselEnd = servicesFadeStart - viewportHeight * 0.04;
  const carouselProgress = Math.max(
    0,
    Math.min(0.999, (scrollY - carouselStart) / Math.max(1, carouselEnd - carouselStart))
  );
  const activeIndex = Math.min(
    services.length - 1,
    Math.floor(carouselProgress * services.length)
  );
  const activeService = services[activeIndex];

  return (
    <div
      className="services-fixed-frame z-20"
      style={{ opacity: servicesOpacity }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="services-layout"
          style={{
            transform: `translateY(${servicesLift}px)`,
            filter: `blur(${servicesBlur}px)`,
            visibility: servicesOpacity <= 0.02 ? 'hidden' : 'visible',
          }}
        >
          <div className="story-cloud services-cloud" />
          <p className="display-kicker text-stone-200 mb-4">Services</p>
          <h2 className="text-[2rem] md:text-[3rem] font-semibold text-stone-50 mb-5 tracking-tight">
            Sharpen the Signal
          </h2>

          <div className="service-carousel">
            <div className="service-carousel-progress" aria-hidden="true">
              {services.map((service, index) => (
                <span
                  key={service.title}
                  className={`service-carousel-dot${index === activeIndex ? ' is-active' : ''}`}
                />
              ))}
            </div>

            <article key={activeService.title} className="service-carousel-card van-gogh-card">
              <div className="service-carousel-header">
                <div className="service-carousel-title-row">
                  <activeService.icon className="w-12 h-12 text-amber-200 flex-shrink-0" />
                  <h3 className="text-[2rem] md:text-[2.7rem] text-stone-50 service-title">
                    {activeService.title}
                  </h3>
                </div>
                <p className="service-carousel-index text-amber-100/80">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                </p>
              </div>

              <p className="service-description service-carousel-description text-slate-200/90">
                {activeService.description}
              </p>
              <div className="service-divider" />
              <p className="service-features service-carousel-features text-slate-200/90">
                {activeService.features.join('  •  ')}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
