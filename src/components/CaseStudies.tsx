import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaseStudies = () => {
  const navigate = useNavigate();
  const caseStudies = [{
    id: 1,
    title: "Turning Fragmented Growth Efforts Into a Shared Product Vision",
    company: "Brightside Health",
    duration: "6 weeks",
    teamSize: "8",
    image: "/img/case-brightside.jpg?auto=format&fit=crop&w=800&q=80",
    challenge: "The Growth team needed a clear product vision to align cross-functional efforts and guide strategic decisions for scaling mental health services to underserved communities.",
    results: ["Developed comprehensive product vision for Growth initiatives", "Established clear success metrics and KPIs", "Aligned stakeholders across product, engineering, and business teams", "Created roadmap for sustainable growth strategies"],
    route: "/case-study-3"
  },
  {
    id: 2,
    title: "Turning Fulfillment Roadmaps Into a Shared Strategy",
    company: "Etsy",
    duration: "4 weeks",
    teamSize: "5",
    image: "/img/case-etsy.jpg?auto=format&fit=crop&w=800&q=80",
    challenge: "Teams had near term targets and roadmaps but they were missing something to help guide their decisions and align them to where the business was headed.",
    results: ["Created a product vision for Fulfillment at Etsy", "Created design principles", "Aligned team leadership around a unified goal", "Provided needed guidance to supporting teams"],
    route: "/case-study-2"
  },
    {
    id: 3,
    title: "Leading a Rapid Registry Turnaround That Increased Quality Creations by 28%",
    company: "Walmart", 
    duration: "1 quarter",
    teamSize: "6 people",
    image: "/img/case-walmart.jpg?auto=format&fit=crop&w=800&q=80",
    challenge: "In 1 quarter; design, develop and launch an improved baby registry experience addressing shortcomings of the previous registry tool.",
    goals: ["Increase quality registry creations (creations that lead to a first curation action)", "Increase curation by 10%", "Increase sharing by 20%", "Increase purchase conversion by 25%", "Helping new parents with this major moment in life"],
    route: "/case-study-1"
  },  
    {
    id: 4,
    title: "Design Leadership in Practice: Shaping Strategy Across Multiple Verticals",
    company: "Walmart eCommerce",
    duration: "Ongoing",
    teamSize: "Various",
    image: "/img/case-additional-projects.jpg?auto=format&fit=crop&w=800&q=80",
    challenge: "Here are some past examples of my influence in driving product strategy through design leadership",
    results: ["Multiple successful product launches", "Cross-functional team leadership", "Strategic planning and execution", "User research and insights"],
    route: "/case-study-4"
  }];

  return <section id="case-studies" className="py-16 sm:py-24 bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-12 sm:mb-16">
          <h2 className="text-headline text-text-primary mb-4">Case Studies</h2>
          <div className="h-[3px] w-[7rem] bg-accent-blue mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-3xl mx-auto px-4">
            Real challenges, strategic solutions, and measurable outcomes that demonstrate the impact of effective leadership at Fortune 1 companies as well as growing startups.
          </p>
        </div>

        <div className="col-span-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((study) => <article key={study.id} className="flex min-h-[32rem] flex-col overflow-hidden rounded-[10px] border border-swiss-light bg-surface-primary">
              <button
                onClick={() => navigate(study.route)}
                className="group block h-72 w-full overflow-hidden rounded-none text-left focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
                aria-label={`View ${study.title} case study`}
              >
                <img
                  src={study.image}
                  alt={`${study.title} - ${study.company} case study`}
                  className="case-study-card-image h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="space-y-3">
                  <h4 className="text-case-study-title text-text-primary font-light">{study.title}</h4>
                  <p className="text-case-study-label text-accent-blue font-medium">{study.company}</p>
                </div>

                <button
                  onClick={() => navigate(study.route)}
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-body font-medium text-text-primary transition-colors duration-200 hover:text-accent-blue focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
                  aria-label={`View ${study.title} case study`}
                >
                  <span>{study.id === 4 ? "View Projects" : "View Case Study"}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>)}
        </div>
      </div>
    </section>;
};

export default CaseStudies;
