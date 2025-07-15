import { ArrowRight, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaseStudies = () => {
  const navigate = useNavigate();
  const caseStudies = [{
    id: 1,
    title: "A rapid revamp to the Walmart registry",
    company: "Walmart", 
    duration: "1 quarter",
    teamSize: "6 people",
    image: "img/baby-registry-walmart.png?auto=format&fit=crop&w=800&q=80",
    challenge: "In 1 quarter; design, develop and launch an improved baby registry experience addressing shortcomings of the previous registry tool.",
    goals: ["Increase quality registry creations (creations that lead to a first curation action)", "Increase curation by 10%", "Increase sharing by 20%", "Increase purchase conversion by 25%", "Helping new parents with this major moment in life"],
    route: "/case-study-1"
  }, {
    id: 2,
    title: "Long term vision for Fulfillment at Etsy",
    company: "Etsy",
    duration: "4 weeks",
    teamSize: "5",
    image: "https://images.unsplash.com/photo-1623652554515-91c833e3080e?auto=format&fit=crop&w=800&q=80",
    challenge: "Teams had near term targets and roadmaps but they were missing something to help guide their decisions and align them to where the business was headed.",
    results: ["Created a product vision for Fulfillment at Etsy", "Created design principles", "Aligned team leadership around a unified goal", "Provided needed guidance to supporting teams"],
    route: "/case-study-2"
  }];

  return <section id="case-studies" className="py-16 sm:py-24 bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-12 sm:mb-16">
          <h2 className="text-headline text-text-primary mb-4">Case Studies</h2>
          <div className="w-16 h-px bg-accent-blue mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-3xl mx-auto px-4">
            Real challenges, strategic solutions, and measurable outcomes that demonstrate the impact of effective leadership.
          </p>
        </div>

        <div className="col-span-12 space-y-12 sm:space-y-16">
          {caseStudies.map((study, index) => <div key={index} className="grid lg:grid-cols-12 gap-6 sm:gap-8 bg-surface-primary border border-swiss-light overflow-hidden">
              <div className="lg:col-span-5">
                <img src={study.image} alt={study.title} className="w-full h-48 sm:h-64 lg:h-full object-cover" />
              </div>
              <div className="lg:col-span-7 p-4 sm:p-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-title text-text-primary font-light mb-2">{study.title}</h3>
                      <p className="text-body text-accent-blue font-medium">{study.company}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
                      
                    </div>
                  </div>

                  <div>
                    <h4 className="text-body text-text-primary font-medium mb-3">The Challenge</h4>
                    <p className="text-body text-text-secondary leading-relaxed">{study.challenge}</p>
                  </div>
                  
                  {study.goals && <div>
                      <h4 className="text-body text-text-primary font-medium mb-3">Goals & Success Metrics</h4>
                      <ul className="space-y-2">
                        {study.goals.slice(0, 3).map((goal, goalIndex) => <li key={goalIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-teal mt-2 flex-shrink-0"></div>
                            <span className="text-body text-text-secondary leading-relaxed">{goal}</span>
                          </li>)}
                      </ul>
                    </div>}

                  {study.results && !study.goals && <div>
                      <h4 className="text-body text-text-primary font-medium mb-3">Results Achieved</h4>
                      <ul className="space-y-2">
                        {study.results.slice(0, 3).map((result, resultIndex) => <li key={resultIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-2 flex-shrink-0"></div>
                            <span className="text-body text-text-secondary leading-relaxed">{result}</span>
                          </li>)}
                      </ul>
                    </div>}

                  <div className="pt-4">
                    <button onClick={() => navigate(study.route)} className="inline-flex items-center space-x-2 px-6 py-3 bg-text-primary text-surface-primary hover:bg-swiss-gray transition-colors duration-200 w-full sm:w-auto justify-center sm:justify-start">
                      <span>Read Full Case Study</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};

export default CaseStudies;
