
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Leadership from "@/components/Leadership";
import Value from "@/components/Value";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Leadership />
      <Value />
      <CaseStudies />
      <Contact />
    </div>
  );
};

export default Index;
