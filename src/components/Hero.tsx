
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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden mondrian-grid" style={{
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateRows: '1fr 3fr 1fr'
    }}>
      {/* Mondrian-inspired color blocks */}
      <div className="mondrian-red"></div>
      <div className="mondrian-white"></div>
      <div className="mondrian-blue"></div>
      
      <div className="mondrian-yellow"></div>
      <div className="mondrian-white flex items-center justify-center relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-mondrian-black mb-6 leading-tight">
              Hello, I'm
              <span className="block text-mondrian-red">Chad Mortensen</span>
            </h1>
            <p className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed text-center text-mondrian-black md:text-xl">
              I'm a product design leader with 25+ years of experience turning complex problems into meaningful outcomes — by guiding teams, shaping culture, and building thoughtful, scalable design solutions across eCommerce, health tech, and omnichannel platforms.  
              <br /><br />
              FYI, this portfolio site was 100% vibe coded & designed, allowing me to experiment with these emerging tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button onClick={scrollToAbout} className="px-8 py-3 bg-forest-dark text-white rounded-lg hover:bg-forest-medium transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Learn About Me
              </button>
              <button onClick={() => document.querySelector("#case-studies")?.scrollIntoView({
                behavior: "smooth"
              })} className="px-8 py-3 border-2 border-mondrian-blue text-mondrian-blue rounded-lg hover:bg-mondrian-blue hover:text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                View My Work
              </button>
            </div>
          </div>
          
          <button onClick={scrollToAbout} className="animate-bounce text-mondrian-black hover:text-mondrian-red transition-colors duration-200">
            <ArrowDown size={32} />
          </button>
        </div>
      </div>
      <div className="mondrian-gray"></div>
      
      <div className="mondrian-blue"></div>
      <div className="mondrian-yellow"></div>
      <div className="mondrian-red"></div>
    </section>
  );
};

export default Hero;
