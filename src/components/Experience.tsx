
import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Director of Product Design",
      company: "Brightside Health",
      period: "Aug 2023 - June 2025",
      location: "Portland, OR",
      description: "Led product design for a fast-scaling mental health platform, defining strategy and processes for both member and clinician experiences in a regulated, high-complexity domain.",
      achievements: [
        "Introduced AI-assisted tools into clinical and design workflows, improving clinician efficiency and unlocking new opportunities for personalized care delivery",
        "Partnered cross-functionally with product, engineering, and clinical leadership to align design strategy with care quality and business goals",
        "Fostered a data-informed, human-centered design culture, integrating experimentation and outcomes tracking",
        "Managed and mentored a team of senior designers, clarifying growth paths and elevating design leadership within squads"
      ]
    },
    {
      title: "Director of Product Design - Fulfillment, Search & Ads",
      company: "Etsy",
      period: "May 2021 - March 2023",
      location: "Portland, OR",
      description: "Led a team of 3 senior managers and 13 designers across three mission-critical product groups, shaping experiences for millions of buyers and sellers.",
      achievements: [
        "Defined and drove long-term design strategies aligned to company OKRs, directly contributing to improvements in seller performance and buyer satisfaction",
        "Helped squads exceed GMV and revenue goals by aligning design outcomes with key business metrics",
        "Built and scaled design leadership, hiring senior talent and implementing performance frameworks",
        "Owned team budget and cultural initiatives, advocating for investment in collaboration and recognition"
      ]
    },
    {
      title: "Associate Director - Fulfillment & Grocery Delivery",
      company: "Walmart",
      period: "Feb 2020 - April 2021",
      location: "Portland, OR",
      description: "Led product design for Walmart's fulfillment experiences across web and mobile, including grocery and general merchandise delivery and pickup.",
      achievements: [
        "Responded swiftly to COVID-era challenges, rapidly redesigning critical customer and store-facing workflows",
        "Spearheaded the re-platforming of the grocery pickup and delivery experience, improving usability",
        "Partnered with product and business leads on roadmap prioritization, resourcing, and long-term strategy"
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 sm:py-24 bg-surface-primary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-12 sm:mb-16">
          <h2 className="text-headline text-text-primary mb-4">Experience</h2>
          <div className="w-16 h-px bg-accent-orange mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-3xl mx-auto px-4">
            25+ years of design leadership across health tech, eCommerce, and retail, driving meaningful outcomes through human-centered design.
          </p>
        </div>

        <div className="col-span-12 space-y-12 sm:space-y-16">
          {experiences.map((experience, index) => (
            <div key={index} className="border-l-2 border-swiss-light pl-6 sm:pl-8 relative">
              <div className="absolute -left-2 top-0 w-3 h-3 bg-accent-blue rounded-full"></div>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-title text-text-primary font-light">{experience.title}</h3>
                    <p className="text-body text-accent-blue font-medium">{experience.company}</p>
                    <p className="text-caption text-text-tertiary">{experience.location}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-text-tertiary mt-2 lg:mt-0">
                    <Calendar size={16} />
                    <span className="text-caption">{experience.period}</span>
                  </div>
                </div>
                
                <p className="text-body text-text-secondary leading-relaxed">
                  {experience.description}
                </p>
                
                <div>
                  <h4 className="text-body text-text-primary font-medium mb-4">Key Achievements</h4>
                  <ul className="grid gap-3">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-teal mt-2 flex-shrink-0"></div>
                        <span className="text-body text-text-secondary leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
