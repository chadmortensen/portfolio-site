import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Separator } from "@/components/ui/separator";
import { CaseStudySectionView } from "./SectionLibrary";
import type { CaseStudyData } from "./types";

export const CaseStudyPage = ({ data }: { data: CaseStudyData }) => {
  return (
    <div className="min-h-screen bg-surface-primary">
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <Navigation />
      <header className="pb-16 pt-32 bg-surface-secondary">
        <div className="swiss-grid"><div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
          <h1 className="text-display text-text-primary">{data.title}</h1>
          {data.subtitle && <p className="text-xl text-text-secondary mt-4">{data.subtitle}</p>}
          <div className="h-[3px] w-28 bg-accent-blue mx-auto mt-8" />
        </div></div>
      </header>
      <main id="main-content" className="py-16"><div className="swiss-grid"><div className="col-span-12 space-y-24">
        {data.sections.map((section, index) => <div key={`${section.title}-${index}`}><CaseStudySectionView section={section} />{index < data.sections.length - 1 && <Separator className="bg-swiss-light mt-24" />}</div>)}
      </div></div></main>
      <Footer />
    </div>
  );
};
