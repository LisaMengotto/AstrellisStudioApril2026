import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Star } from 'lucide-react';

interface ContactProps {
  scrollY: number;
}

export const Contact: React.FC<ContactProps> = ({ scrollY }) => {
  const form = useRef<HTMLFormElement>(null);
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight || 900 : 900;

  const logoPinnedScroll = Math.max(0, (viewportHeight * 0.24 - 20) / 0.7);
  const methodRevealStart = logoPinnedScroll - viewportHeight * 0.03;
  const methodRevealDuration = viewportHeight * 0.18;
  const methodFadeStart = methodRevealStart + methodRevealDuration + viewportHeight * 0.28;
  const servicesStart = methodFadeStart + viewportHeight * 0.14;
  const servicesFadeStart = servicesStart + viewportHeight * 0.56;
  const servicesFadeDuration = viewportHeight * 0.18;
  const contactStart = servicesFadeStart + servicesFadeDuration + viewportHeight * 0.02;
  const contactReveal = Math.max(
    0,
    Math.min(1, (scrollY - contactStart) / (viewportHeight * 0.18))
  );

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        'service_i8ncssk',
        'template_i6izron',
        form.current,
        'S_VFLrB9IWB4SEIzQ'
      )
      .then(() => {
        alert('Thank you for reaching out! We will be in touch soon. ');
        form.current?.reset();
      })
      .catch((error) => {
        alert('Something went wrong. Message not delivered.');
        console.error(error);
      });
  };

  return (
    <div
      className="contact-fixed-frame z-10"
      style={{ opacity: contactReveal }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="contact-layout"
          style={{
            transform: `translateY(${(1 - contactReveal) * 88}px)`,
            filter: `blur(${(1 - contactReveal) * 12}px)`,
            visibility: contactReveal <= 0.02 ? 'hidden' : 'visible',
          }}
        >
          <div className="story-cloud contact-cloud" />
          <p className="display-kicker text-stone-200 mb-4">Contact</p>
          <h2 className="text-[2rem] md:text-[3rem] font-semibold text-stone-50 mb-5 tracking-tight">
            Ready to Shine?
          </h2>

          <div className="contact-form-shell max-w-3xl">
            <div className="van-gogh-card contact-form-card">
              <form ref={form} onSubmit={sendEmail} className="contact-form-stack">
                <input type="hidden" name="title" value="Contact Form Submission" />
                <input type="hidden" name="time" value="N/A" />

                <div>
                  <label className="block text-stone-100 mb-1.5 font-medium">Name</label>
                  <input type="text" name="name" className="van-gogh-input" placeholder="Name" required />
                </div>

                <div>
                  <label className="block text-stone-100 mb-1.5 font-medium">Email</label>
                  <input type="email" name="email" className="van-gogh-input" placeholder="Email" required />
                </div>

                <div>
                  <label className="block text-stone-100 mb-1.5 font-medium">Project Type</label>
                  <input type="text" name="title" className="van-gogh-input" placeholder="Project Type" required />
                </div>

                <div>
                  <label className="block text-stone-100 mb-1.5 font-medium">Message</label>
                  <textarea name="message" rows={4} className="van-gogh-input resize-none" placeholder="Message" required />
                </div>

                <button type="submit" className="van-gogh-button w-full py-3.5 flex items-center justify-center space-x-2">
                  <span>Send</span>
                  <Star className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
