
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
    <section id="experience" className="py-20 mondrian-gray">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mondrian-black mb-6">Experience</h2>
          <p className="text-xl text-mondrian-black max-w-3xl mx-auto">
            25+ years of design leadership across health tech, eCommerce, and retail, driving meaningful outcomes through human-centered design.
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className={`mondrian-section p-8 transition-all duration-300 hover:shadow-xl ${
                index % 3 === 0 ? 'mondrian-white' : 
                index % 3 === 1 ? 'mondrian-yellow' : 'mondrian-blue'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                  <div className={`p-3 ${
                    index % 3 === 2 ? 'bg-white' : 'bg-mondrian-black'
                  }`}>
                    <Briefcase className={`${
                      index % 3 === 2 ? 'text-mondrian-black' : 'text-white'
                    }`} size={24} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${
                      index % 3 === 2 ? 'text-white' : 'text-mondrian-black'
                    }`}>{experience.title}</h3>
                    <p className={`text-lg font-medium ${
                      index % 3 === 2 ? 'text-white' : 'text-mondrian-black'
                    }`}>{experience.company}</p>
                    <p className={`text-sm ${
                      index % 3 === 2 ? 'text-white' : 'text-mondrian-black'
                    }`}>{experience.location}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 ${
                  index % 3 === 2 ? 'text-white' : 'text-mondrian-black'
                }`}>
                  <Calendar size={16} />
                  <span className="font-medium">{experience.period}</span>
                </div>
              </div>
              
              <p className={`mb-6 leading-relaxed ${
                index % 3 === 2 ? 'text-white' : 'text-mondrian-black'
              }`}>{experience.description}</p>
              
              <div>
                <h4 className={`text-lg font-semibold mb-3 ${
                  index % 3 === 2 ? 'text-white' : 'text-mondrian-black'
                }`}>Key Achievements</h4>
                <ul className="grid md:grid-cols-2 gap-2">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        index % 3 === 2 ? 'bg-white' : 'bg-mondrian-red'
                      }`}></div>
                      <span className={`${
                        index % 3 === 2 ? 'text-white' : 'text-mondrian-black'
                      }`}>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
