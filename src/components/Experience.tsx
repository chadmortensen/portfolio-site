import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Experience = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const experiences = [
    {
      title: "Director of Product Design",
      company: "Brightside Health",
      period: "Aug 2023 - June 2025",
      location: "Portland, OR",
      description: "Led product design for a fast-scaling mental health platform, defining strategy and processes for both member and clinician experiences in a regulated, high-complexity domain.",
      achievements: [
        "Introduced AI-assisted tools into clinical and design workflows, improving clinician efficiency and unlocking new opportunities for personalized care delivery",
        "Partnered cross-functionally with product, engineering, and clinical leadership to align design strategy with care quality and business goals, contributing to funnel optimization and improved engagement metrics",
        "Fostered a data-informed, human-centered design culture, integrating experimentation, outcomes tracking, and systems thinking to guide scalable design decisions",
        "Managed and mentored a team of senior designers, clarifying growth paths, elevating design leadership within squads, and creating opportunities for impact beyond delivery"
      ]
    },
    {
      title: "Director of Product Design - Fulfillment, Search & Ads",
      company: "Etsy",
      period: "May 2021 - March 2023",
      location: "Portland, OR",
      description: "Led a team of 3 senior managers and 13 designers across three mission-critical product groups, including Fulfillment, Search, and Ads — shaping experiences for millions of buyers and sellers.",
      achievements: [
        "Defined and drove long-term design strategies aligned to company OKRs, directly contributing to improvements in seller performance, buyer satisfaction, and marketplace trust on the Fulfillment team",
        "Helped squads exceed GMV and revenue goals by aligning design outcomes with key business metrics and collaborating deeply with product and engineering leadership",
        "Built and scaled design leadership, hiring senior talent, coaching managers, and implementing performance and growth frameworks to support team development and retention",
        "Owned team budget and cultural initiatives, advocating for investment in travel, collaboration, and recognition to strengthen distributed team cohesion and cross-functional alignment"
      ]
    },
    {
      title: "Associate Director",
      company: "Walmart eCommerce",
      period: "Oct 2016 - April 2021",
      location: "Portland, OR",
      description: "Led product design across multiple verticals including fulfillment, grocery delivery, consumables, and fashion experiences.",
      roles: [
        {
          title: "Associate Director - Fulfillment & Grocery Delivery",
          period: "Feb 2020 - April 2021",
          description: "Led product design for Walmart's fulfillment experiences across web and mobile, including grocery and general merchandise delivery and pickup.",
          achievements: [
            "Responded swiftly to COVID-era challenges, rapidly redesigning critical customer and store-facing workflows",
            "Spearheaded the re-platforming of the grocery pickup and delivery experience, improving usability and alignment with company strategy",
            "Partnered with product and business leads on roadmap prioritization, resourcing, and long-term strategy"
          ]
        },
        {
          title: "Practice Area Head - Routine Consumables",
          period: "Oct 2016 - Feb 2020",
          description: "Led a cross-functional design team focused on high-frequency consumables and registry experiences.",
          achievements: [
            "Conducted data-driven discovery and executed a complete rebuild of Walmart's baby registry product, resulting in increased engagement and improved UX",
            "Balanced rapid iteration with long-term vision to drive customer satisfaction and business growth"
          ]
        },
        {
          title: "Practice Area Head - Fashion",
          period: "Oct 2016 - Feb 2020",
          description: "Directed design strategy for Walmart.com's fashion vertical, transforming how customers discover and shop for apparel.",
          achievements: [
            "Operated as a lean startup within Walmart, using customer insights, rapid experimentation, and iterative design to shape a modern fashion experience",
            "Aligned user mental models with innovative design approaches to increase relevance and conversion"
          ]
        }
      ]
    },
    {
      title: "Sr. Manager - Mobile Apps",
      company: "Sam's Club",
      period: "Oct 2013 - Oct 2016",
      location: "Portland, OR",
      description: "Managed UX for Sam's Club iOS/Android apps, in-store digital tools, and B2B features.",
      achievements: [
        "Built and scaled a multidisciplinary team of visual, UX, and content designers",
        "Drove service design initiatives connecting physical retail with digital experiences across multiple channels",
        "Advocated for and applied behavioral science, research, and design thinking methods to improve member experiences"
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
          
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isExpanded ? (
                <>
                  Hide Experience
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  View Experience
                  <ChevronDown size={16} />
                </>
              )}
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="col-span-12 max-w-[950px] mx-auto space-y-12 sm:space-y-16">
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
                  
                  {/* Render sub-roles if they exist */}
                  {experience.roles ? (
                    <div className="space-y-8">
                      {experience.roles.map((role, roleIndex) => (
                        <div key={roleIndex} className="border-l border-swiss-light pl-6 ml-2">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div>
                              <h4 className="text-body text-text-primary font-bold">{role.title}</h4>
                            </div>
                            <div className="flex items-center space-x-2 text-text-tertiary mt-1 lg:mt-0">
                              <Calendar size={14} />
                              <span className="text-caption">{role.period}</span>
                            </div>
                          </div>
                          
                          <p className="text-body text-text-secondary leading-relaxed mb-4">
                            {role.description}
                          </p>
                          
                          <div>
                            <h5 className="text-body text-text-primary font-medium mb-3">Key Achievements</h5>
                            <ul className="grid gap-3">
                              {role.achievements.map((achievement, achievementIndex) => (
                                <li key={achievementIndex} className="flex items-start space-x-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent-teal mt-2 flex-shrink-0"></div>
                                  <span className="text-body text-text-secondary leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Regular achievements for positions without sub-roles */
                    <div>
                      <h5 className="text-body text-text-primary font-medium mb-4">Key Achievements</h5>
                      <ul className="grid gap-3">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-teal mt-2 flex-shrink-0"></div>
                            <span className="text-body text-text-secondary leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;