
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Leadership from "@/components/Leadership";
import Value from "@/components/Value";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import UXTips from "@/components/UXTips";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Leadership />
        <Value />
        <CaseStudies />
        <Contact />
        <UXTips />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
