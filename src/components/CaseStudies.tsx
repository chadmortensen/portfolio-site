
import { ArrowRight, Calendar, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaseStudies = () => {
  const navigate = useNavigate();

  const caseStudies = [
    {
      id: 1,
      title: "A rapid revamp to the Walmart registry",
      company: "Walmart",
      duration: "1 quarter",
      teamSize: "6 people",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      challenge: "In 1 quarter; design, develop and launch an improved baby registry experience addressing shortcomings of the previous registry tool.",
      goals: [
        "Increase quality registry creations (creations that lead to a first curation action)",
        "Increase curation by 10%",
        "Increase sharing by 20%",
        "Increase purchase conversion by 25%",
        "Helping new parents with this major moment in life"
      ],
      sections: [
        {
          title: "The Challenge",
          content: "In 1 quarter; design, develop and launch an improved baby registry experience addressing shortcomings of the previous registry tool.",
          goals: [
            "Increase quality registry creations (creations that lead to a first curation action)",
            "Increase curation by 10%",
            "Increase sharing by 20%",
            "Increase purchase conversion by 25%",
            "Helping new parents with this major moment in life"
          ],
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Assembling the Team",
          content: "I had 1 staff designer available from my team but I knew in order to pull this off I would need to expand the team. 6 weeks total allocated to design, from discovery to final deliverables. Bulk of work would be in the latter half of the quarter and we had the holiday season to account for.",
          image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "We Have a Team!",
          content: "After discussion and support from product and business partners I was able to convince design leadership to shift some designers to our team and suggested utilizing a couple contractors from our Columbian outsource team.",
          image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Ground the Team in Research and Insights",
          content: "We had past research so let's not lose that in an effort to be efficient. Walmart registrant users have been asking for a greater level of control, guidance and trust within today's experience.",
          quotes: [
            "I became so frustrated in making the registry through the app, that I quit. It is not intuitive nor easy to navigate in order to add or change something.",
            "It's not as user friendly as other registries I've used. It would be better if the registry picks fell into the categories provided. That would make it much easier."
          ],
          insight: "Almost half of moms don't want any help creating a registry - they want to take ownership of their list and pick items that are relevant to their person needs (GCIA Oct 2019)",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Create Design Principles",
          content: "Research backed design principles helped to focus the team",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Ideation Workshop - How Might We",
          content: "After planning the workshop with our staff designer I facilitated the group in generating a list of potential areas of improvement within the experience.",
          stats: [
            "8 cross functional participants",
            "70+ ideas / HMWs",
            "11 categories",
            "Dot voting",
            "Name and rank top 3 categories"
          ],
          image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Design + Product + Business Aligned on Our Areas of Focus",
          content: "Cross-functional alignment on key improvement areas",
          focusAreas: [
            {
              area: "Improve Onboarding",
              details: "Pivot away from pre-population and manually pruning the pre-built registry. Create a 3-tier strategy for customization (no help -> populated)"
            },
            {
              area: "Improve Curation and Management", 
              details: "Continue to provide easy access for making my registry public and to share it with others. Provide additional guidance and control by offering relevant recommendations within the registry experience"
            },
            {
              area: "Improve Gifting",
              details: "Allow Gift Givers to easily find products that are available to purchase and apply ecommerce best practices"
            },
            {
              area: "Improve Internal Processes",
              details: "Remove dependencies on engineering to support changes to pre-curated inventory"
            }
          ],
          image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Low to High Fidelity Design",
          content: "Establishing a cadence of standups, reviews and critiques helped the team to continuously receive direction and allowed me to help unblock moments of uncertainty.",
          schedule: [
            "Mon, Wed, Fri = Leadership Reviews",
            "Tue, Thur = Team Crit", 
            "Daily standup = 15 min"
          ],
          note: "Later in the project we included product/engineering/design as part of reviews to reduce churn",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Examples of Enhancements",
          content: "Key design improvements and feature enhancements implemented throughout the registry experience.",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Constant Prioritization",
          content: "Partnered with my cross functional leaders (product, engineering) to constantly reassess the scope and timelines, aggressively cutting and prioritizing features to fit the time allocated for engineering. At times I needed to rally my partners and the teams to get them excited to build in features that we thought would add delight and an extra layer of polish that was needed to build trust with the customers of the product.",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Results",
          content: "Overall everyone was very proud of the accomplishment and the updated baby registry that was created. This version of the baby registry closer met the needs of the customer and ultimately met the business goals.",
          results: [
            {
              goal: "Increase quality registry creations (creations that lead to a first curation action)",
              result: "+28% vs. Last year"
            },
            {
              goal: "Increase curation by 10%",
              result: "70% edited within 3-7 days. +20% increase"
            },
            {
              goal: "Increase sharing by 20%",
              result: "55% shared within 7 days. +8% increase"
            },
            {
              goal: "Increase purchase conversion by 25%",
              result: "GMV initially increased but then decreased starting in April possibly due to COVID"
            }
          ],
          image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Recap of Learnings",
          content: "Key learnings and methodology from the project",
          learnings: [
            "Established goals and how we will measure success",
            "High level estimates and sequencing the work",
            "Augment the team (1 design lead, 4 designers)",
            "Build empathy, learn from past research",
            "Ideate and iterate",
            "Constant partnership and prioritization to meet an aggressive timeline"
          ],
          image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80"
        }
      ],
      route: "/case-study-1"
    },
    {
      id: 2,
      title: "Market Expansion Strategy",
      company: "Growing SaaS Company",
      duration: "12 months",
      teamSize: "25+ people",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      challenge: "A successful domestic company wanted to expand into international markets but lacked the framework, processes, and cultural understanding to do so effectively.",
      solution: "Developed and executed a comprehensive market entry strategy including market research, localization, partnership development, and team building.",
      results: [
        "Successfully launched in 3 new markets",
        "Generated $2.5M in international revenue",
        "Built local teams in key regions",
        "Established strategic partnerships with 8+ vendors"
      ],
      insights: "International expansion requires deep cultural sensitivity and local partnerships. The key was balancing global consistency with local adaptation.",
      route: "/case-study-2"
    }
  ];

  return (
    <section id="case-studies" className="section-divider">
      <div className="w-full">
        <div className="mondrian-navy py-16 px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Case Studies</h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Real challenges, strategic solutions, and measurable outcomes that demonstrate the impact of effective leadership.
          </p>
        </div>

        <div className="grid grid-cols-1">
          {caseStudies.map((study, index) => (
            <div key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover min-h-[400px]"
                  />
                </div>
                <div className={`lg:col-span-7 p-8 lg:p-16 ${
                  index === 0 ? 'mondrian-white' : 'mondrian-blue'
                }`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div>
                      <h3 className={`text-2xl lg:text-3xl font-bold mb-2 ${
                        index === 0 ? 'text-mondrian-black' : 'text-white'
                      }`}>{study.title}</h3>
                      <p className={`text-lg font-medium ${
                        index === 0 ? 'text-mondrian-gray' : 'text-white/80'
                      }`}>{study.company}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
                      <div className={`flex items-center space-x-2 ${
                        index === 0 ? 'text-mondrian-gray' : 'text-white/80'
                      }`}>
                        <Calendar size={16} />
                        <span className="text-sm font-medium">{study.duration}</span>
                      </div>
                      <div className={`flex items-center space-x-2 ${
                        index === 0 ? 'text-mondrian-gray' : 'text-white/80'
                      }`}>
                        <Users size={16} />
                        <span className="text-sm font-medium">{study.teamSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h4 className={`text-xl font-bold mb-4 ${
                        index === 0 ? 'text-mondrian-black' : 'text-white'
                      }`}>The Challenge</h4>
                      <p className={`leading-relaxed mb-6 ${
                        index === 0 ? 'text-mondrian-black' : 'text-white'
                      }`}>{study.challenge}</p>
                    </div>
                    
                    {study.goals && (
                      <div>
                        <h4 className={`text-xl font-bold mb-4 ${
                          index === 0 ? 'text-mondrian-black' : 'text-white'
                        }`}>Goals & Success Metrics</h4>
                        <ul className="space-y-3">
                          {study.goals.slice(0, 3).map((goal, goalIndex) => (
                            <li key={goalIndex} className="flex items-start space-x-3">
                              <TrendingUp className={`mt-1 flex-shrink-0 ${
                                index === 0 ? 'text-mondrian-teal' : 'text-mondrian-orange'
                              }`} size={16} />
                              <span className={
                                index === 0 ? 'text-mondrian-black' : 'text-white'
                              }>{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {study.results && !study.goals && (
                      <div>
                        <h4 className={`text-xl font-bold mb-4 ${
                          index === 0 ? 'text-mondrian-black' : 'text-white'
                        }`}>Results Achieved</h4>
                        <ul className="space-y-3">
                          {study.results.slice(0, 3).map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-start space-x-3">
                              <TrendingUp className={`mt-1 flex-shrink-0 ${
                                index === 0 ? 'text-mondrian-teal' : 'text-mondrian-orange'
                              }`} size={16} />
                              <span className={
                                index === 0 ? 'text-mondrian-black' : 'text-white'
                              }>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-start">
                    <button
                      onClick={() => navigate(study.route)}
                      className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                        index === 0 
                          ? 'bg-mondrian-teal text-white hover:bg-mondrian-navy' 
                          : 'bg-mondrian-orange text-white hover:bg-mondrian-coral'
                      }`}
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight size={18} />
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
