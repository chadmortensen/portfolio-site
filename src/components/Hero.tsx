import { ArrowDown } from "lucide-react";
const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section id="home" className="min-h-screen flex items-center justify-center bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-display text-text-primary px-4">
                Chad Mortensen
              </h1>
              <div className="w-16 h-px bg-accent-blue mx-auto"></div>
              <p className="text-title2 font-light text-text-secondary max-w-4xl mx-auto px-4">
                My work blends human-centered craft with strategic clarity to move people and products forward.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6 px-4">
              {/* Removing, might add back later
              <p className="text-body text-text-tertiary max-w-3xl mx-auto leading-relaxed">Yes, I used AI tools to create this portfolio. Rest assured, I approve of and stand behind everything on this website as true.</p>
              */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 sm:pt-8">
                <button
                  onClick={scrollToAbout}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-text-primary text-surface-primary text-body hover:bg-swiss-gray rounded transition-all duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
                  aria-label="Learn more about Chad Mortensen's background and experience"
                >
                  Learn About Me
                </button>
                <button
                  onClick={() => document.querySelector("#case-studies")?.scrollIntoView({
                    behavior: "smooth"
                  })}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-swiss-charcoal text-text-primary hover:bg-surface-secondary rounded transition-all duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
                  aria-label="View Chad Mortensen's case studies and design work"
                >
                  View My Work
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 sm:pt-16">
            <button 
              onClick={scrollToAbout} 
              className="text-text-tertiary hover:text-accent-blue transition-colors duration-200 focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
              aria-label="Scroll down to learn more about Chad Mortensen"
            >
              <ArrowDown size={24} className="animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
