import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const Hero = () => {
  const { content } = useLanguage();

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-display text-text-primary px-4">{content.hero.name}</h1>
              <div className="w-16 h-px bg-accent-blue mx-auto" />
              <p className="text-title2 font-light text-text-secondary max-w-4xl mx-auto px-4">
                {content.hero.tagline}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 px-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 sm:pt-8">
                <button
                  onClick={scrollToAbout}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-text-primary text-surface-primary text-body hover:bg-swiss-gray rounded transition-all duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
                  aria-label={content.hero.primaryCtaAria}
                >
                  {content.hero.primaryCta}
                </button>
                <button
                  onClick={() => document.querySelector("#case-studies")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-swiss-charcoal text-text-primary hover:bg-surface-secondary rounded transition-all duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
                  aria-label={content.hero.secondaryCtaAria}
                >
                  {content.hero.secondaryCta}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 sm:pt-16">
            <button
              onClick={scrollToAbout}
              className="text-text-tertiary hover:text-accent-blue transition-colors duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
              aria-label={content.hero.scrollAria}
            >
              <ArrowDown size={24} className="animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
