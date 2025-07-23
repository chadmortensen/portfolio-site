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
  return <section id="home" className="min-h-screen flex items-center justify-center bg-surface-primary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-display text-text-primary px-4">
                Chad Mortensen
              </h1>
              <div className="w-16 h-px bg-accent-blue mx-auto"></div>
              <p className="text-title font-light text-text-secondary max-w-4xl mx-auto px-4">
                Product design leader with 25+ years of experience turning complex problems into meaningful outcomes
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6 px-4">
              <p className="text-body text-text-tertiary max-w-3xl mx-auto leading-relaxed">Yes, I used AI tools to create this portfolio. I even used an LLM to rewrite some of the content, so you might see the occasional em dash. Do know that I approve of and stand behind everything on this website as truth.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 sm:pt-8">
                <button onClick={scrollToAbout} className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-text-primary text-surface-primary text-body hover:bg-swiss-gray transition-all duration-200">
                  Learn About Me
                </button>
                <button onClick={() => document.querySelector("#case-studies")?.scrollIntoView({
                behavior: "smooth"
              })} className="w-full sm:w-auto px-6 sm:px-8 py-3 border border-swiss-light text-text-primary hover:bg-surface-secondary transition-all duration-200">
                  View My Work
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 sm:pt-16">
            <button onClick={scrollToAbout} className="text-text-tertiary hover:text-accent-blue transition-colors duration-200">
              <ArrowDown size={24} className="animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;