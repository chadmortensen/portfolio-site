import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

const CaseStudies = () => {
  const navigate = useNavigate();
  const { content } = useLanguage();

  return (
    <section id="case-studies" className="py-16 sm:py-24 bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-12 sm:mb-16">
          <h2 className="text-headline text-text-primary mb-4">{content.caseStudies.title}</h2>
          <div className="w-16 h-px bg-accent-blue mx-auto mb-6" />
          <p className="text-body text-text-secondary max-w-3xl mx-auto px-4">{content.caseStudies.intro}</p>
        </div>

        <div className="col-span-12 space-y-12 sm:space-y-16">
          {content.caseStudies.cards.map((study) => (
            <div key={study.id} className="grid lg:grid-cols-12 gap-6 sm:gap-8 bg-surface-primary border border-swiss-light overflow-hidden rounded-[2em]">
              <div className="lg:col-span-5">
                <img src={study.image} alt={study.imageAlt} className="w-full h-48 sm:h-64 lg:h-full object-cover" />
              </div>
              <div className="lg:col-span-7 p-4 sm:p-8 flex flex-col justify-center">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-title text-text-primary font-light mb-2">{study.title}</h3>
                      <p className="text-body text-accent-blue font-medium">{study.company}</p>
                    </div>
                  </div>

                  <p className="text-body text-text-secondary leading-relaxed">{study.challenge}</p>

                  {study.goals && (
                    <div>
                      <h4 className="text-body text-text-primary font-medium mb-3">{content.caseStudies.goalsLabel}</h4>
                      <ul className="space-y-2">
                        {study.goals.slice(0, 3).map((goal, goalIndex) => (
                          <li key={goalIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-teal mt-2 flex-shrink-0" />
                            <span className="text-body text-text-secondary leading-relaxed">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      onClick={() => navigate(study.route)}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-text-primary text-surface-primary hover:bg-swiss-gray rounded transition-colors duration-200 w-full sm:w-auto justify-center sm:justify-start"
                    >
                      <span>{study.ctaLabel}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
